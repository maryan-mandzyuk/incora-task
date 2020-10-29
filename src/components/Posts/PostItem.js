import React from 'react';
import { Button, TableCell, TableRow } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

export const PostItem = ({ post }) => {
  const history = useHistory();

  return (
    <TableRow key={post.id}>
      <TableCell component="th" scope="row">
        {post.title}
      </TableCell>
      <TableCell align="right">
        <Button onClick={() => history.push(`/post/${post.id}`)} color="primary" variant="contained">
          Details
                  </Button>
      </TableCell>
    </TableRow>
  )
}
