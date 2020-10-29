import * as types from '../types';
import axios from 'axios';

export const fetchPosts = (userId) => async (dispatch) => {
  dispatch({
    type: types.FETCH_POSTS_REQUEST,
  });
  try {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    dispatch({
      type: types.FETCH_POSTS_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: types.FETCH_POSTS_FAILURE,
      payload: err.message
    })
  }
};

export const fetchPost = (id) => async (dispatch) => {
  dispatch({
    type: types.FETCH_POST_REQUEST,
  });
  try {
    const post = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const comments = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);

    const postData = {
      ...post.data,
      comments: comments.data
    }

    dispatch({
      type: types.FETCH_POST_SUCCESS,
      payload: postData
    });
  } catch (err) {
    dispatch({
      type: types.FETCH_POST_FAILURE,
      payload: err.message
    })
  }
};

export const setOpen = (open) => {
  return {
    type: types.SET_OPEN,
    payload: open
  }
}

export const setPost = (post) => {
  return {
    type: types.SET_POST,
    payload: post
  }
}

export const setSnackbar = (message, severity, open) => {
  return {
    type: types.SET_SNACKBAR,
    payload: {
      message,
      severity,
      open,
    }
  }
}