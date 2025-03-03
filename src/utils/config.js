const IP ='http://34.58.219.249/'
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
    TEST_AI2 :'/workflow2'
}
    export const URL ={
        Api : 'http://34.58.219.249/',
        ApiInject :`${IP}kbmsapi`, //Upload Documnet and upload URL
        ApiAnswer:`${IP}kbmsapi`,


        GitIngestion: `${IP}gitkbapi`,  //Ingestion repo
        DeployedURL:`${IP}genieapi/`,  // Login and Genie metrics
        GIT_GRAPH_DATA:`${IP}kbmsapi`, //git metrics


        API_BASE_AI :'http://34.134.148.250:7000',
        TEST_AI :`${IP}crewapi` //Test Ai

    }
