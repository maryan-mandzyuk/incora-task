import React from 'react';
import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import { useStyles } from './styles';

export const CommentItem = ({ comment }) => {
  const classes = useStyles();

  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={comment.email} />
        </ListItemAvatar>
        <ListItemText
          primary={comment.name}
          secondary={
            <>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {`${comment.email} `}
              </Typography>
              {comment.body}
            </>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};
