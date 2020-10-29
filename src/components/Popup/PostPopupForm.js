import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, TextField } from '@material-ui/core';
import axios from 'axios';
import { connect } from 'react-redux';
import { setPost } from '../../store/actions/postActions';
import { Input } from '../Input/Input';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PostPopupForm = ({ open, handleClose, popupTitle, post = {}, setPost }) => {
  const [title, setTitle] = useState(post.title || '');
  const [body, setBody] = useState(post.body || '');
  const [titleError, setTitleError] = useState(false);
  const [bodyError, setBodyError] = useState(false);

  const validate = () => {
    if (title.length < 3) {
      setTitleError(true);
    }

    if (body.length < 10) {
      setBodyError(true);
    }
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    validate();

    if (!titleError && bodyError) {
      if (post.id) {
        try {
          const res = await axios.put(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
            id: post.id,
            title,
            body,
            userId: post.userId,
          });

          setPost(res.data);
          handleClose();
        } catch (err) {
          console.error(err)
        }
      } else {
        try {
          await axios.post('https://jsonplaceholder.typicode.com/posts', {
            id: 1,
            title,
            body,
            userId: 1,
          });
          handleClose();
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
    setTitleError(false);
  };

  const bodyChangeHandler = (e) => {
    setBody(e.target.value);
    setBodyError(false);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" TransitionComponent={Transition}>
        <DialogTitle id="form-dialog-title">{popupTitle}</DialogTitle>
        <DialogContent>
          <Input
            onChangeHandler={titleChangeHandler}
            name="title"
            value={title}
            error={titleError}
            errorMessage="Title must have at least 3 characters"
          />
          <Input
            onChangeHandler={bodyChangeHandler}
            name="body"
            value={body}
            error={bodyError}
            errorMessage="Body must have at least 10 characters"
            multiline
            rowsMax={8}
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" onClick={submitHandler} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPost: (post) => dispatch(setPost(post)),
  }
};

export default connect(
  null,
  mapDispatchToProps
)(PostPopupForm);
