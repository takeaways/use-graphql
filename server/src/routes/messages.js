const { readDB, writeDB } = require('../dbController');
const { v4 } = require('uuid');

const getMessages = () => readDB('messages');
const setMessages = msgs => writeDB('messages', msgs);
const messagesRoute = [
  {
    method: 'get',
    route: '/messages',
    handler: (req, res) => {
      const msgs = getMessages();
      res.send(msgs);
    },
  },
  {
    method: 'post',
    route: '/messages',
    handler: ({ body }, res) => {
      const msgs = getMessages();
      const newMsg = {
        id: v4(),
        text: body.text,
        userId: body.userId,
        timestamp: Date.now(),
      };
      msgs.unshift(newMsg);
      setMessages(msgs);
      res.send(newMsg);
    },
  },
  {
    method: 'put',
    route: '/messages/:id',
    handler: ({ body, params: { id } }, res) => {
      try {
        const { text, userId } = body;
        const msgs = getMessages();
        const index = msgs.findIndex(m => m.id === id);
        if (index < 0) {
          throw 'Not Found Message';
        }
        if (msgs[index].userId !== userId) {
          throw 'Not Match User';
        }

        const newMsg = {
          ...msgs[index],
          text: text,
        };
        msgs.splice(index, 1, newMsg);
        setMessages(msgs);
        res.send(newMsg);
      } catch (error) {
        res.status(500).send({ error });
      }
    },
  },
  {
    method: 'delete',
    route: '/messages/:id',
    handler: ({ params: { id }, body }, res) => {
      try {
        const { userId } = body;
        const msgs = getMessages();
        const index = msgs.findIndex(m => m.id === id);
        if (index < 0) {
          throw 'Not Found Message';
        }
        if (msgs[index].userId !== userId) {
          throw 'Not Match User';
        }

        msgs.splice(index, 1);
        setMessages(msgs);
        res.send(id);
      } catch (error) {
        res.status(500).send({ error });
      }
    },
  },
];

module.exports = messagesRoute;
