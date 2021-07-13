import React from 'react';
import PropTypes from 'prop-types';
import MsgInput from './msgInput';

const MsgItem = ({ id, userId, timestamp, text, onUpdate, isEditing, startEdit }) => {
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
      {isEditing ? <MsgInput mutate={onUpdate.bind(null, id)} /> : text}

      <div className="messages__buttons">
        <button onClick={startEdit.bind(null, id)}>Fix</button>
      </div>
    </li>
  );
};

MsgItem.propTypes = {
  id: PropTypes.number,
  isEditing: PropTypes.bool,
  onUpdate: PropTypes.any,

  startEdit: PropTypes.any,

  text: PropTypes.string,
  timestamp: PropTypes.number,
  userId: PropTypes.string,
};

export default MsgItem;
