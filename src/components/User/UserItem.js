import React from 'react';
import { Button, TableCell, TableRow } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

export const UserItem = ({ user }) => {
  const history = useHistory();

  return (
    <TableRow key={user.id}>
      <TableCell component="th" scope="row">
        {user.name}
      </TableCell>
      <TableCell align="right">{user.username}</TableCell>
      <TableCell align="right">{user.email}</TableCell>
      <TableCell align="right">{user.website}</TableCell>
      <TableCell align="right">
        <Button onClick={() => history.push(`/posts/${user.id}`)} color="primary" variant="contained">
          Posts
        </Button>
      </TableCell>
    </TableRow>
  );
};
