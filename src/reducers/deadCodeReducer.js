import { DEAD_CODE_DATA,DEAD_CODE_FAILURE,DEAD_CODE_SUCCESS, CLEAR_DEAD_CODE_DATA } from "../actionTypes/deadCodeActionTypes";
const initialState={
    loading:null,
    deadCoderesponse:null,
    error:null
}
const deadCodeReducer =(state=initialState ,action)=>{
    switch(action.type){
        case DEAD_CODE_DATA:
            return{
                loading:true,
                deadCoderesponse:null,
                error:null
            }
        case DEAD_CODE_SUCCESS:
            return{
                loading:false,
                deadCoderesponse:action,
                error:null
            }
        case DEAD_CODE_FAILURE:
            return{
                loading :false,
                deadCoderesponse:null,
                error:action
            }
         case CLEAR_DEAD_CODE_DATA:
      return {
        ...initialState,
      };    
        default:
        return  state
    }
}
export default deadCodeReducer