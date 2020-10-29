import React from 'react';
import { List } from '@material-ui/core';
import { CommentItem } from './CommentItem';
import { useStyles } from './styles';



export const CommentList = ({ comments }) => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {comments && comments.map((comment) => <CommentItem key={comment.id} comment={comment} />)}
    </List>
  )
};
