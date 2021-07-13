import React, { useRef } from 'react';
import PropTypes from 'prop-types';

const MsgInput = ({ mutate }) => {
  const textRef = useRef(null);
  const formRef = useRef(null);

  const handleSubmit = e => {
    e.preventDefault();
    e.stopPropagation();

    const text = textRef.current.value;
    mutate(text);

    formRef.current.reset();
  };

  return (
    <form ref={formRef} className="messages__input" onSubmit={handleSubmit}>
      <textarea ref={textRef} placeholder="Write something yours"></textarea>
      <button type="submit">GO</button>
    </form>
  );
};

MsgInput.propTypes = {
  mutate: PropTypes.func,
};

export default MsgInput;
