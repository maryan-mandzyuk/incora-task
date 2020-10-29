import React, { useEffect } from 'react';
import { Button, CircularProgress, Container, Grid } from '@material-ui/core';
import axios from 'axios';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchPost, setOpen } from '../../store/actions/postActions';
import { CommentList } from '../Comment/CommentList';
import PostPopupForm from '../Popup/PostPopupForm';

const PostDetailsPage = ({ postData, fetchPost, setOpen, }) => {
  const { postId } = useParams();
  const history = useHistory();
  const { post } = postData;
  console.log(postData);
  useEffect(() => {
    fetchPost(postId);
  }, [fetchPost, postId]);

  if (!postData || !post || post.loading) {
    return (<CircularProgress />)
  }

  const deleteHandler = async () => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${post.id}`);
      history.goBack();
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <Container maxWidth="md">
      <Grid container direction="column" alignContent="center">
        <Grid item>
          <h1>{post.title}</h1>
        </Grid>
        <Grid item>
          <p>{post.body}</p>
        </Grid>
        <Grid item container direction="column" alignContent="center">
          <CommentList comments={post.comments} />
        </Grid>
        <Grid item>
          <Grid container direction="row" justify="space-around">
            <Grid item>
              <Button color="primary" variant="contained" onClick={() => setOpen(true)} >Edit</Button>
            </Grid>
            <Grid item>
              <Button color="default" variant="contained" onClick={deleteHandler} >Delete</Button>
            </Grid>
            <Grid item>
              <Button color="secondary" variant="contained" onClick={() => history.goBack()} >Go back</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <PostPopupForm open={postData.open} handleClose={() => setOpen(false)} post={post} popupTitle="Edit Post" />
    </Container>
  );
};

const mapStateToProps = ({ post }) => {
  return {
    postData: post,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPost: (id) => dispatch(fetchPost(id)),
    setOpen: (open) => dispatch(setOpen(open)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetailsPage);
