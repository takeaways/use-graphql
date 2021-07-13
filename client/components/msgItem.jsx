import React from 'react';
import PropTypes from 'prop-types';
import MsgInput from './msgInput';

const MsgItem = ({ id, userId, timestamp, text, onUpdate, isEditing, startEdit, onDelete }) => {
  return (
    <li className="messages__item">
      <h3>
        {id}
        {userId}
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

      <div className="messages__buttons">
        <button onClick={startEdit.bind(null, id)}>Fix</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </li>
  );
};

MsgItem.propTypes = {
  id: PropTypes.number,
  isEditing: PropTypes.bool,
  onDelete: PropTypes.any,
  onUpdate: PropTypes.shape({
    bind: PropTypes.func,
  }),
  startEdit: PropTypes.shape({
    bind: PropTypes.func,
  }),
  text: PropTypes.string,
  timestamp: PropTypes.number,
  userId: PropTypes.string,
};

export default MsgItem;
