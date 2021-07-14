import PropTypes from 'prop-types';
import React from 'react';

import MsgList from '../components/msgList';

import fetcher from '../utils/fetcher';

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
  const smsgs = await fetcher('get', '/messages');
  const users = await fetcher('get', '/users');
  return {
    props: { smsgs, users },
  };
};

export default Home;
