import React, { PropTypes } from 'react';

const InputGroup = (props) => {
  return (
    <div>
      <input
        type={props.type}
        id={props.id}
        name={props.name}
        value={props.value}
        className={props.className}
        onChange={props.onChange}
      />
      <span className='error' hidden={props.error ? 'true' : 'false'} > {props.error}</span>
    </div>
  );
};

InputGroup.propTypes = {
  type: PropTypes.String.isRequired,
  id: PropTypes.String.isRequired,
  name: PropTypes.String.isRequired,
  value: PropTypes.String.isRequired,
  className: PropTypes.String.isRequired,
  onChange: PropTypes.object.isRequired,
  error: PropTypes.String.isRequired
};
export default InputGroup;
