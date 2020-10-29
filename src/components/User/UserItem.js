import React from 'react';
import { TableCell, TableRow } from '@material-ui/core';

export const UserItem = (user) => {
  return (
    <TableRow key={user.name}>
      <TableCell component="th" scope="row">
        {user.name}
      </TableCell>
      <TableCell align="right">{user.name}</TableCell>
      <TableCell align="right">{user.username}</TableCell>
      <TableCell align="right">{user.email}</TableCell>
      <TableCell align="right">{user.phone}</TableCell>
    </TableRow>
  );
};
