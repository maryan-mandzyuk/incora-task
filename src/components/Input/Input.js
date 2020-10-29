import React from 'react';
import { TextField } from '@material-ui/core';

export const Input = ({
  name,
  value,
  onChangeHandler,
  error, errorMessage,
  multiline = false,
  rowsMax = 1,
  rows = 1
}) => {
  return (
    <TextField
      autoFocus
      margin="dense"
      id={name}
      label={name.charAt(0).toUpperCase() + name.slice(1)}
      type="text"
      autoComplete="off"
      fullWidth
      value={value}
      InputLabelProps={{
        shrink: true,
      }}
      onChange={onChangeHandler}
      error={error}
      helperText={error ? errorMessage : ' '}
      multiline={multiline}
      rowsMax={rowsMax}
      rows={rows}
    />
  );
};
