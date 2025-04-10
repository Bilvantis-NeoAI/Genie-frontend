import { INGESTED_REPO_FAILURE,INGETSED_REPO_DATA,INGESTED_REPO_SUCCESS } from "../actionTypes/ingestionActionTypes"
const initialState={
    loading:null,
    ingestionRepos:null,
    error:null
}
const repoListReducer =(state=initialState ,action)=>{
    switch(action.type){
        case INGETSED_REPO_DATA:
            return{
                loading:true,
                ingestionRepos:null,
                error:null
            }
        case INGESTED_REPO_SUCCESS:
            return{
                loading:false,
                ingestionRepos:action,
                error:null
            }
        case INGESTED_REPO_FAILURE:
            return{
                loading :false,
                ingestionRepos:null,
                error:action
            }
        default:
        return  state
    }
}
export default repoListReducer