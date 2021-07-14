/* eslint-disable no-unreachable */
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useInfiniteQuery, useMutation, useQueryClient } from 'react-query';

import MsgInput from './msgInput';
import MsgItem from './msgItem';

import useInfiniteScroll from '../hooks/useInfiniteScroll';

import { fetcher, QueryKeys } from '../utils/queryClient';
import { CREATE_MESSAGE, DELETE_MESSAGE, GET_MESSAGES, UPDATE_MESSAGE } from '../graphql/message';

const MsgList = ({ smsgs = [], users }) => {
  const {
    query: { userId = '' },
  } = useRouter();

  const client = useQueryClient();

  const [msgs, setMsgs] = useState(smsgs);
  const [editingId, setEditingId] = useState(null);

  const fetchMoreEl = useRef(null);
  const intersecting = useInfiniteScroll(fetchMoreEl);

  const startEdit = id => setEditingId(id);

  const { data, error, isError, fetchNextPage, hasNextPage } = useInfiniteQuery(
    QueryKeys.MESSAGES,
    ({ pageParam = '' }) => fetcher(GET_MESSAGES, { cursor: pageParam }),
    {
      getNextPageParam: ({ messages }) => {
        return messages?.[messages.length - 1]?.id;
      },
    },
  );

  console.log(data);

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

  const { mutate: handleUpdateMgs } = useMutation(
    ({ id, text }) => fetcher(UPDATE_MESSAGE, { text, id, userId }),
    {
      onSuccess: ({ updateMessage }) => {
        client.setQueryData(QueryKeys.MESSAGES, old => {
          const targetIndex = old.messages.findIndex(msg => msg.id === updateMessage.id);
          if (targetIndex < 0) return old;
          const tempMsgs = [...old.messages];
          tempMsgs.splice(targetIndex, 1, updateMessage);
          startEdit(null);
          return { messages: tempMsgs };
        });
      },
    },
  );

  const { mutate: handleDeleteMsg } = useMutation(id => fetcher(DELETE_MESSAGE, { id, userId }), {
    onSuccess: ({ deleteMessage }) => {
      client.setQueryData(QueryKeys.MESSAGES, old => {
        const targetIndex = old.messages.findIndex(msg => msg.id === deleteMessage);
        if (targetIndex < 0) {
          return old;
        }
        const tempMsgs = [...msgs];
        tempMsgs.splice(targetIndex, 1);
        return { messages: tempMsgs };
      });
    },
  });

  useEffect(() => {
    if (!data?.pages) return;
    const merged = data.pages.flatMap(d => d.messages);
    setMsgs(merged);
  }, [data?.pages]);

  useEffect(() => {
    if (hasNextPage && intersecting) {
      fetchNextPage();
    }
  }, [intersecting, hasNextPage]);

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
