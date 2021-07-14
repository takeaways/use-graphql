import PropTypes from 'prop-types';
import React from 'react';

import MsgList from '../components/msgList';

import { fetcher } from '../utils/queryClient';

import { GET_MESSAGES } from '../graphql/message';
import { GET_USERS } from '../graphql/user';

const Home = ({ smsgs, users }) => {
  return (
    <div>
      <MsgList smsgs={smsgs} users={users} />
    </div>
  );
};

Home.propTypes = {
  smsgs: PropTypes.any,
  users: PropTypes.any,
};

export const getServerSideProps = async () => {
  const [{ users }, { messages: smsgs }] = await Promise.all([
    fetcher(GET_USERS),
    fetcher(GET_MESSAGES),
  ]);

  return {
    props: { smsgs, users },
  };
};

export default Home;
