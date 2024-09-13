// import { urls } from "../utils/config";
import {
  FETCH_ANSWERS_DATA,
  FETCH_ANSWERS_SUCCESS,
  FETCH_ANSWERS_FAILURE,
  INCREMENT_COUNTER
} from "../actionTypes/questionActionTypes.js"
import { Api } from "../Interceptor/interceptor.js";
import { ENDPOINT_FULL_QA } from "../Utils.js";

export const fetchAnswersRequest = () => ({
  type: FETCH_ANSWERS_DATA,
});

export const fetchAnswersSuccess = (data) => ({
  type: FETCH_ANSWERS_SUCCESS,
  payload: data,
});

export const fetchAnswersFailure = (error) => ({
  type: FETCH_ANSWERS_FAILURE,
  payload: error,
});

export const fetchAnswersList = (page) => {
  return (dispatch) => {
    dispatch(fetchAnswersRequest());
    Api
      .post(ENDPOINT_FULL_QA, { page })
      .then((response) => {
        const answersData = response.data;
        dispatch(fetchAnswersSuccess(answersData));
      })
      .catch((error) => {
        dispatch(fetchAnswersFailure(error.message));
      });
  };
};

export const incrementCounter = () => ({
  type: INCREMENT_COUNTER,
});