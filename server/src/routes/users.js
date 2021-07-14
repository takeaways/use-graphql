const express = require('express');
const { readDB } = require('../dbController');

const router = express.Router();

const getUsers = () => readDB('users');

router.get('/', (req, res) => {
  const users = getUsers();
  res.send(users);
});

router.get('/:id', ({ params: { id } }, res) => {
  try {
    const user = getUsers()[id];
    if (!user) {
      throw new Error('Not Found User');
    }
    res.send(user);
  } catch (error) {
    res.send({ error });
  }
});

module.exports = router;
