import React from 'react';
import { List, makeStyles } from '@material-ui/core';
import { CommentItem } from './CommentItem';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '84ch',
    backgroundColor: theme.palette.background.paper,
  },
}));

export const CommentList = ({ comments }) => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {comments && comments.map((comment) => <CommentItem key={comment.id} comment={comment} />)}
    </List>
  )
};
