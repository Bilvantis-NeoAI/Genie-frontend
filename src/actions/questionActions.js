import {
  FETCH_ANSWERS_DATA,
  FETCH_ANSWERS_SUCCESS,
  FETCH_ANSWERS_FAILURE,
  INCREMENT_COUNTER
} from "../actionTypes/questionActionTypes.js"
import { Api } from "../Interceptor/interceptor.js";
import { ENDPOINT_FULL_QA } from "../Utils.js";
import { apis } from "../utils/config.js";

export const fetchAnswersRequest = () => ({
  type: FETCH_ANSWERS_DATA,
});

export const fetchAnswersSuccess = (data, index) => ({
  type: FETCH_ANSWERS_SUCCESS,
  payload: data,
  index : index
});

export const fetchAnswersFailure = (error) => ({
  type: FETCH_ANSWERS_FAILURE,
  payload: error,
});

export const fetchAnswersList = (payload, index) => {
  
  
  return (dispatch) => {
    dispatch(fetchAnswersRequest());
    return Api
      .post(apis.ENDPOINT_FULL_QA, payload )
      .then((response) => {
        const answersData = response.data;
        dispatch(fetchAnswersSuccess(answersData, index));
        return response ;
      })
      .catch((error) => {
        dispatch(fetchAnswersFailure(error.message));
      });
  };
};

export const incrementCounter = () => ({
  type: INCREMENT_COUNTER,
});