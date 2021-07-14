import { request } from 'graphql-request';

// import axios from 'axios';

const URL = 'http://localhost:8000/graphql';

export const fetcher = (query, variables) => request(URL, query, variables);

export const QueryKeys = {
  MESSAGES: 'MESSAGES',
  MESSAGE: 'MESSAGE',
  USERS: 'USERS',
  USER: 'USER',
};

export const findTargetMsgIndex = (pages, id) => {
  let messageIndex = -1;
  const pageIndex = pages.findIndex(({ messages }) => {
    messageIndex = messages.findIndex(m => m.id === id);
    return messageIndex > -1;
  });
  return { pageIndex, messageIndex };
};

export const getNewMessages = old => ({
  ...old,
  pages: old.pages.map(({ messages }) => ({ messages: [...messages] })),
});
