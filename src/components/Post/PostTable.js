import React, { useEffect } from 'react';
import { Button, CircularProgress, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { fetchPosts, setOpen } from '../../store/actions/postActions';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import PostPopupForm from '../Popup/PostPopupForm';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const PostTable = ({ fetchPosts, postData, setOpen }) => {
  const classes = useStyles();
  const history = useHistory();
  const { userId } = useParams();

  useEffect(() => {
    fetchPosts(userId);
  }, [fetchPosts, userId]);

  if (!postData.posts || postData.loading) {
    return (<CircularProgress />)
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
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
            ))}
        </TableBody>
      </Table>
      <PostPopupForm open={postData.open} handleClose={() => setOpen(false)} popupTitle="Create New Post" />
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