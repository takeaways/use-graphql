import React, { useState } from 'react';
import MsgInput from './msgInput';

import MsgItem from './msgItem';

const UserIds = ['roy', 'jay'];
const getRandomUserId = () => UserIds[Math.round(Math.random())];
const temp = Array(50)
  .fill(0)
  .map((_, index) => ({
    id: 50 - index,
    userId: getRandomUserId(),
    timestamp: 1234567890123 + (50 - index * 1000 * 60),
    text: `${50 - index} mock text`,
  }));

const MsgList = () => {
  const [msgs, setMsgs] = useState(temp);
  const [editingId, setEditingId] = useState(null);

  const startEdit = id => setEditingId(id);

  const handleCreateMsg = text => {
    const newMsg = {
      id: msgs.length + 1,
      userId: getRandomUserId(),
      timestamp: Date.now(),
      text: `${msgs.length + 1} ${text}`,
    };
    setMsgs(msgs => [newMsg, ...msgs]);
  };

  const handleUpdateMgs = (id, text) => {
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

  const handleDeleteMsg = id => {
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
          />
        ))}
      </ul>
    </>
  );
};

export default MsgList;
