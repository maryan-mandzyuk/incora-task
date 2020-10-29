import React, { useEffect } from 'react';
import { Button, CircularProgress, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { fetchPosts, setOpen } from '../../store/actions/postActions';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import PostPopupForm from '../Popup/PostPopupForm';
import { useStyles } from './styles';
import { PostItem } from './PostItem';

const PostTable = ({ fetchPosts, postData, setOpen }) => {
  const classes = useStyles();
  const { userId } = useParams();
  const history = useHistory();

  useEffect(() => {
    fetchPosts(userId);
  }, [fetchPosts, userId]);

  if (!postData.posts || postData.loading) {
    return (<CircularProgress />)
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead color="primary" >
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">
              <Button onClick={() => setOpen(true)} color="secondary" variant="contained">
                Add new
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {postData &&
            postData.posts && postData.posts.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
        </TableBody>
      </Table>
      <PostPopupForm open={postData.open} handleClose={() => setOpen(false)} popupTitle="Create New Post" />
      <Grid container>
        <Button
          className={classes.usersButton}
          color="primary"
          variant="contained"
          onClick={() => history.push('/users')}>
          Users
        </Button>
      </Grid>
    </TableContainer>
  );
}

const mapStateToProps = ({ post }) => {
  return {
    postData: post,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: (userId) => dispatch(fetchPosts(userId)),
    setOpen: (open) => dispatch(setOpen(open)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostTable);