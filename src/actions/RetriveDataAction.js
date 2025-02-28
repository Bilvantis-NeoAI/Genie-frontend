import { RETRIVE_DATA_FAILURE, RETRIVE_DATA_SUCCESS, RETRIVE_DATA ,FETCH_CODE_DATA,FETCH_CODE_FAILUE,FETCH_CODE_SUCCESS} from '../actionTypes/retriveDataActionTypes'
import { GitIngestion } from '../Interceptor/interceptor'
import { apis } from '../utils/config'
const retriveData = () => ({
    type: RETRIVE_DATA
})
const retriveDataSuccess = (response) => ({
    type: RETRIVE_DATA_SUCCESS,
    action: response
})
const retriveDataFailure = (error) => ({
    type: RETRIVE_DATA_FAILURE,
    action: error
})
const getCodeData = ()=>({
    type : FETCH_CODE_DATA
})
const getCodeSuccess =(data)=>({
    type : FETCH_CODE_SUCCESS,
    action : data
})
const getCodeFailure =(error)=>({
    type : FETCH_CODE_FAILUE,
    action : error
})
export const retriveRepoData = (payload) => {
    return async (dispatch) => {
        await dispatch(retriveData())
        return GitIngestion
            .post(apis.retriveRepoData, payload)
            .then(async (response) => {
                await dispatch(retriveDataSuccess(response))
            })
            .catch((error) => {
                dispatch(retriveDataFailure(error))
            })
    }

}
export const getRepoCodeData = (payload)=>{
    return async(dispatch)=>{
        await dispatch(getCodeData())
            return GitIngestion
            .post(apis.GET_CODE,payload)
            .then(async(response)=>{
                await dispatch(getCodeSuccess(response.data))
            })
            .catch((error)=>{
                dispatch(getCodeFailure(error))
            })
        }
}