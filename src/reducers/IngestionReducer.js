import { ADD_INGESTION_FAILURE,ADD_INGESTION_DATA,ADD_INGESTION_SUCCESS } from "../actionTypes/ingestionActionTypes";
const initialState = {
    loading: false,
   IngestionData: null,
    successMessage: null,
    error: null,
  };
  const ingestionReducer =(state =initialState , action)=>{    
    switch(action.type){
    case ADD_INGESTION_DATA :
        return {
            ...state,
            loading: true,
            successMessage: null,
            error: null,
          };
    case ADD_INGESTION_SUCCESS:
        return {
            ...state,
            loading: false,
            IngestionData: action.payload,
            successMessage: "Ingetion Added successfully!",
            error: null,
          };
    case ADD_INGESTION_FAILURE :
        return {
            ...state,
            loading: false,
            error: action.payload,
            successMessage: null,
          };
        default:
          return state;
  }
}
export default ingestionReducer;