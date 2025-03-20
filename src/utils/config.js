export const IP ='http://34.72.75.193/' //'http://34.46.36.105:3000/'

export const apis = {
    ENDPOINT_FULL_QA : '/answer',
    DOCUMENT_UPLOAD : '/ingest',
    URL_UPLOAD : '/ingest_url',
    GRAPHS_DATA :'/metrics',
    FLUSH_DB : '/flushDB',
    CONTAINER_RESTART : '/restart-container',
    NEO4J_STATUS : '/neo4j_status',
    RELOAD_API : '/reload-docs',
    ingetion :'/process_multibranch_repo',
    retriveRepoData :'/explain',
    GET_CODE : '/get_code',
    LOGIN : 'auth/login',
    REGISTER : 'auth/register',
    TEST_AI:'/workflow1',
    TEST_AI2 :'/workflow2',
    USERS_LIST :'/users',
    PENDING_LIST :'/pending-registrations',
    APPROVE_USER :'/approve-user',
    DELETE_USER:'/delete-user',
    REJECT_USER:'/reject-user',
    EDIT_USER_ROLE:'/users',
    RESET_PASSWORD:'/reset-password'
}
    export const URL ={
        Api : `${IP}`,
        ApiInject :`${IP}kbmsapi`, //Upload Documnet and upload URL
        ApiAnswer:`${IP}kbmsapi`,


        GitIngestion: `${IP}gitkbapi`,  //Ingestion repo
        DeployedURL:`${IP}genieapi/`,  // Login and Genie metrics
        GIT_GRAPH_DATA:`${IP}kbmsapi`, //git metrics


        API_BASE_AI :`${IP}:7000`,
        TEST_AI :`${IP}crewapi`, //Test Ai

        ADMIN_USERS :`${IP}genieapi/admin`, //admin 
    }
