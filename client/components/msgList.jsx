import React from "react";
import MsgItem from "./msgItem";

const UserIds = ["roy", "jay"];
const getRandomUserId = () => UserIds[Math.round(Math.random())];
const msgs = Array(50)
  .fill(0)
  .map((_, index) => ({
    id: index + 1,
    userId: getRandomUserId(),
    timestamp: 1234567890123 + index * 1000 * 60,
    text: `${index + 1} mock text`,
  }));

const MsgList = () => {
  return (
    <ul className="messages">
      {msgs.map((msg) => (
        <MsgItem key={msg.id} {...msg} />
      ))}
    </ul>
  );
};

export default MsgList;
