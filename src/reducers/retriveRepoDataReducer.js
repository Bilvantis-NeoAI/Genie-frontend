import {RETRIVE_DATA , RETRIVE_DATA_FAILURE,RETRIVE_DATA_SUCCESS} from '../actionTypes/retriveDataActionTypes'
let initialState={
    loading: false,
    repoData: null,
    error: null,
}
const repoRetriveReducer =(state = initialState, action)=>{
    switch(action.type) {
    case RETRIVE_DATA:
        return {
            ...state,
            loading: true,
            repoData: null,
            error: null,
          };
          case RETRIVE_DATA_FAILURE :
            return{
                ...state,
                loading : false,
                repoData:null,
                error: action
            };
            case RETRIVE_DATA_SUCCESS :
            return {                
                ...state,
                loading : false,
                repoData : action,
                error : null
            }
            default:
        return state;

    }
}
export default repoRetriveReducer;