const express = require('express');
const { readDB, writeDB } = require('../dbController');
const { v4 } = require('uuid');

const router = express.Router();

const getMessages = () => readDB('messages');
const setMessages = msgs => writeDB('messages', msgs);

router
  .route('/')
  .get(({ query: { cursor } }, res) => {
    const request_cnt = 15;

    const msgs = getMessages();
    const fromIndex = msgs.findIndex(msg => msg.id === cursor) + 1;
    res.send(msgs.slice(fromIndex, fromIndex + request_cnt));
  })
  .post(({ body }, res) => {
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
  });

router
  .route('/:id')
  .put(({ body, params: { id } }, res) => {
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
  })
  .delete(({ params: { id }, query }, res) => {
    try {
      const { userId } = query;
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
  });

module.exports = router;
