import {RETRIVE_DATA_FAILURE,RETRIVE_DATA_SUCCESS,RETRIVE_DATA} from '../actionTypes/retriveDataActionTypes'
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
export const retriveRepoData =(payload) => {
    return async(dispatch) => {
         await dispatch(retriveData())
        return GitIngestion
            .post(apis.retriveRepoData, payload)
            .then(async(response) => {                
                await dispatch(retriveDataSuccess(response))
            })
            .catch((error) => {
                
                dispatch(retriveDataFailure(error))
            })
    }

}