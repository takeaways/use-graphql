/* eslint-disable no-unreachable */
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation, useQueryClient } from 'react-query';

import MsgInput from './msgInput';
import MsgItem from './msgItem';

// import useInfiniteScroll from '../hooks/useInfiniteScroll';

import { fetcher, QueryKeys } from '../utils/queryClient';
import { CREATE_MESSAGE, GET_MESSAGES } from '../graphql/message';

const MsgList = ({ smsgs = [], users }) => {
  const {
    query: { userId = '' },
  } = useRouter();

  const client = useQueryClient();

  const [msgs, setMsgs] = useState(smsgs);
  const [editingId, setEditingId] = useState(null);

  // const [hasNext, setHasNext] = useState(true);
  const fetchMoreEl = useRef(null);
  // const intersecting = useInfiniteScroll(fetchMoreEl);

  const startEdit = id => setEditingId(id);

  const { data, error, isError } = useQuery(QueryKeys.MESSAGES, fetcher.bind(null, GET_MESSAGES));

  const { mutate: handleCreateMsg } = useMutation(
    ({ text }) => fetcher(CREATE_MESSAGE, { text, userId }),
    {
      onSuccess: ({ createMessage }) => {
        client.setQueryData(QueryKeys.MESSAGES, old => {
          return {
            messages: [createMessage, ...old.messages],
          };
        });
      },
    },
  );

  useEffect(() => {
    setMsgs(data?.messages || []);
  }, [data?.messages]);

  // const handleCreateMsg = async text => {
  //   const newMsg = await fetcher('post', '/messages', { text, userId });
  //   if (!newMsg) throw new Error('went something wrong');
  //   setMsgs(msgs => [newMsg, ...msgs]);
  // };

  const handleUpdateMgs = async (id, text) => {
    const newMsg = await fetcher('put', `/messages/${id}`, { text, userId });
    if (!newMsg) throw new Error('went something wrong');

    setMsgs(msgs => {
      const targetIndex = msgs.findIndex(msg => msg.id === id);

      if (targetIndex < 0) {
        return msgs;
      }

      const tempMsgs = [...msgs];
      tempMsgs.splice(targetIndex, 1, {
        ...tempMsgs[targetIndex],
        text,
      });

      return tempMsgs;
    });
    startEdit(null);
  };

  const handleDeleteMsg = async id => {
    const deletedId = await fetcher('delete', `/messages/${id}`, { params: { userId } });
    if (!deletedId) throw new Error('went something wrong');

    setMsgs(msgs => {
      const targetIndex = msgs.findIndex(msg => msg.id === id);
      if (targetIndex < 0) {
        return msgs;
      }
      const tempMsgs = [...msgs];
      tempMsgs.splice(targetIndex, 1);

      return tempMsgs;
    });
  };

  // const getMessages = async () => {
  //   const messages = await fetcher('get', '/messages', {
  //     params: { cursor: msgs[msgs.length - 1]?.id || '' },
  //   });
  //   if (messages.length === 0) setHasNext(false);

  //   setMsgs(prev => [...prev, ...messages]);
  // };

  // useEffect(() => {
  //   if (hasNext && intersecting) {
  //     getMessages();
  //   }
  // }, [intersecting]);

  return (
    <>
      <MsgInput mutate={handleCreateMsg} />
      <ul className="messages">
        {msgs.map(msg => (
          <MsgItem
            key={msg.id}
            {...msg}
            onUpdate={handleUpdateMgs}
            onDelete={handleDeleteMsg.bind(null, msg.id)}
            startEdit={startEdit}
            isEditing={editingId === msg.id}
            isMine={userId === msg.userId}
            user={users.find(u => u.id === msg.userId)}
          />
        ))}
        <div ref={fetchMoreEl} />
      </ul>
    </>
  );
};

MsgList.propTypes = {
  smsgs: PropTypes.any,
  users: PropTypes.any,
};

export default MsgList;
