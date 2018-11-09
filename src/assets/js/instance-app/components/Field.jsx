import React from 'react';
import PropTypes from 'prop-types';

export default function Field(props) {
  const {
    name,
    value,
    // labelText,
    error,
    onChange,
  } = props;
  return (
    <label htmlFor={name}>
      {/* <span>{labelText}</span> */}
      <input type="hidden" name={name} id={name} value={value} onChange={onChange} />
      {error
        ? <span className="error">{error}</span>
        : null
      }
    </label>
  );
}
Field.propTypes = {
  name: PropTypes.string,
//   value: PropTypes.string,
  error: PropTypes.string,
  //   labelText: PropTypes.string,
  onChange: PropTypes.func,
};

Field.defaultProps = {
  name: '',
  value: 'no value',
  error: undefined,
  //   labelText: '',
  onChange: undefined,
};
