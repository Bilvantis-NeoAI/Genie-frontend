import { FETCH_CODE_DATA, FETCH_CODE_FAILUE, FETCH_CODE_SUCCESS } from "../actionTypes/retriveDataActionTypes";
const initialState = {
  loading: false,
  getCode: null,
  error: null,
};
const getCodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CODE_DATA:
      return {
        ...state,
        loading: true,
        successMessage: null,
        error: null,
      };
    case FETCH_CODE_SUCCESS:
      return {
        ...state,
        loading: false,
        getCode: action,
        error: null,
      };
    case FETCH_CODE_FAILUE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
}
export default getCodeReducer;