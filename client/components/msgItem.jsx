import React from "react";
import PropTypes from "prop-types";

const MsgItem = ({ id, userId, timestamp, text }) => {
  return (
    <li className="messages__item">
      <h3>
        {id}
        {userId}
        <sub>
          {new Date(timestamp).toLocaleString("ko-KR", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </sub>
      </h3>
      {text}
    </li>
  );
};

MsgItem.propTypes = {
  id: PropTypes.number,
  text: PropTypes.string,
  timestamp: PropTypes.string,
  userId: PropTypes.string,
};

export default MsgItem;
