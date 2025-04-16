import { USER_DETAILS_FAILURE, USER_DETAILS_SUCCESS } from '../actionTypes/loginActionTypes';

const initialState = {
  loading: false,
  username:'',
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        username: action.action.full_name,
      };

    case USER_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.action || action,
      };

    default:
      return state;
  }
};

export default userReducer;
