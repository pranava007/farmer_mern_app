import React, { useState } from 'react';
import { Stack, TextField, Button } from '@mui/material';
import PropTypes from 'prop-types';

export const NumberInputWithButtons = ({ label, value, onChange }) => {
  const [inputValue, setInputValue] = useState(value);

  const handleIncrement = () => {
    setInputValue(prevValue => prevValue + 1);
    onChange(inputValue + 1);
  };

  const handleDecrement = () => {
    console.log("value",inputValue)
    if (inputValue > 0) {
    setInputValue(prevValue => prevValue - 1);
    onChange(inputValue - 1);
    }
  };

  const handleChange = (e) => {
    const newValue = parseInt(e.target.value,10);
    setInputValue(newValue);
    onChange(newValue);
  };

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <TextField
        label={label}
        type="number"
        value={inputValue}
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button variant="contained" onClick={handleIncrement}>+</Button>
      <Button variant="contained" onClick={handleDecrement}>-</Button>
    </Stack>
  );
};

NumberInputWithButtons.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

