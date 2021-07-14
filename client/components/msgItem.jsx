import React from 'react';
import PropTypes from 'prop-types';
import MsgInput from './msgInput';

const MsgItem = ({
  id,
  userId,
  timestamp,
  text,
  onUpdate,
  isEditing,
  startEdit,
  onDelete,
  isMine,
  user,
}) => {
  return (
    <li className="messages__item">
      <h3>
        {userId}
        {user?.nickname}
        <sub>
          {new Date(timestamp).toLocaleString('ko-KR', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          })}
        </sub>
      </h3>
      {isEditing ? <MsgInput mutate={onUpdate.bind(null, id)} text={text} /> : text}
      {isMine && (
        <div className="messages__buttons">
          <button onClick={startEdit.bind(null, id)}>Fix</button>
          <button onClick={onDelete}>Delete</button>
        </div>
      )}
    </li>
  );
};

MsgItem.propTypes = {
  id: PropTypes.string,
  isEditing: PropTypes.bool,
  isMine: PropTypes.any,
  onDelete: PropTypes.any,
  onUpdate: PropTypes.any,
  startEdit: PropTypes.any,
  text: PropTypes.string,
  timestamp: PropTypes.number,
  user: PropTypes.any,
  userId: PropTypes.string,
};

export default MsgItem;
