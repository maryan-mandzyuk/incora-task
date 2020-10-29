import * as types from '../types';
import axios from 'axios';

export const fetchUsers = () => async (dispatch) => {
  dispatch({
    type: types.FETCH_USERS_REQUEST,
  });
  try {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users');
    dispatch({
      type: types.FETCH_USERS_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: types.FETCH_USERS_FAILURE,
      payload: err.message
    })
  }
};