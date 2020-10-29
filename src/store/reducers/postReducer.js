import * as types from '../types'

const initialState = {
  loading: false,
  posts: [],
  post: {},
  error: '',
  open: false,
}
export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_POSTS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case types.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload,
        error: ''
      }
    case types.FETCH_POSTS_FAILURE:
      return {
        ...state,
        loading: false,
        posts: [],
        error: action.payload
      }

    case types.FETCH_POST_REQUEST:
      return {
        ...state,
        loading: true
      }
    case types.FETCH_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        post: action.payload,
        error: ''
      }
    case types.FETCH_POST_FAILURE:
      return {
        ...state,
        loading: false,
        post: {},
        error: action.payload
      }
    case types.SET_OPEN:
      return {
        ...state,
        open: action.payload
      }
    case types.SET_POST:
      return {
        ...state,
        post: {
          ...state.post,
          ...action.payload
        }
      }
    default:
      return state
  }
}