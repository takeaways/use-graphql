import React from "react";
import PropTypes from "prop-types";

const MsgItem = ({ userId, timestamp, text }) => {
  return (
    <li className="message__item">
      <h3>
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
  userId: PropTypes.string,
  timestamp: PropTypes.string,
  text: PropTypes.string,
};

export default MsgItem;
