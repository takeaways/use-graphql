const fs = require('fs');
const { resolve } = require('path');

const basePath = resolve();

const filenames = {
  messages: resolve(basePath, 'src/db/messages.json'),
  users: resolve(basePath, 'src/db/users.json'),
};

exports.readDB = target => {
  try {
    return JSON.parse(fs.readFileSync(filenames[target], 'utf-8'));
  } catch (error) {
    console.log(error);
  }
};

exports.writeDB = (target, data) => {
  try {
    return fs.writeFileSync(filenames[target], JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};
