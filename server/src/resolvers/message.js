const { writeDB } = require('../dbController');
const { v4 } = require('uuid');

const setMessages = msgs => writeDB('messages', msgs);

const messageResolver = {
  Query: {
    messages: (obj, { cursor = '' }, { db }) => {
      const request_cnt = 15;
      const fromIndex = db.messages.findIndex(msg => msg.id === cursor) + 1;

      return db.messages?.slice(fromIndex, fromIndex + request_cnt) || [];
    },
    message: (parent, { id = '' }, { db }) => {
      return db.messages.find(m => m.id === id);
    },
  },
  Mutation: {
    createMessage: (parent, { text, userId }, { db }) => {
      const newMsg = {
        id: v4(),
        text,
        userId,
        timestamp: Date.now(),
      };
      db.messages.unshift(newMsg);
      setMessages(db.messages);
      return newMsg;
    },
    updateMessage: (obj, { id, text, userId }, { db }) => {
      const index = db.messages.findIndex(m => m.id === id);
      if (index < 0) {
        throw new Error('Not Found Message');
      }
      if (db.messages[index].userId !== userId) {
        throw new Error('Not Match User');
      }

      const newMsg = {
        ...db.messages[index],
        text: text,
      };
      db.messages.splice(index, 1, newMsg);
      setMessages(db.messages);
      return newMsg;
    },
    deleteMessage: (obj, { id, userId }, { db }) => {
      const index = db.messages.findIndex(m => m.id === id);
      if (index < 0) {
        throw new Error('Not Found Message');
      }
      if (db.messages[index].userId !== userId) {
        throw new Error('Not Match User');
      }
      db.messages.splice(index, 1);
      setMessages(db.messages);
      return id;
    },
  },
  Message: {
    user: (msg, args, { db }) => db.users[msg.userId],
  },
};

module.exports = messageResolver;
