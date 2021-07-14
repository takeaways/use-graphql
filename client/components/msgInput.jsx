import React, { useRef } from 'react';
import PropTypes from 'prop-types';

const MsgInput = ({ mutate, text = '', id = '' }) => {
  const textRef = useRef(null);
  const formRef = useRef(null);

  const handleSubmit = e => {
    e.preventDefault();
    e.stopPropagation();

    const text = textRef.current.value;
    mutate({ text, id });

    formRef.current.reset();
  };

  return (
    <form ref={formRef} className="messages__input" onSubmit={handleSubmit}>
      <textarea ref={textRef} placeholder="Write something yours" defaultValue={text}></textarea>
      <button type="submit">GO</button>
    </form>
  );
};

MsgInput.propTypes = {
  id: PropTypes.string,
  mutate: PropTypes.func,
  text: PropTypes.string,
};

export default MsgInput;
