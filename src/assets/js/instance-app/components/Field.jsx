import React from 'react';
import PropTypes from 'prop-types';

export default function Field(props) {
  const {
    name,
    value,
    onChange,
  } = props;
  return (
    <input type="hidden" name={name} id={name} value={value} onChange={onChange} />
  );
}
Field.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

Field.defaultProps = {
  name: '',
  value: 'no value',
  onChange: undefined,
};
