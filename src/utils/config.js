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
    REGISTER : 'auth/register'}
    export const URL ={
        Api : 'http://3.139.66.49:9002/',
        ApiInject : 'http://3.139.66.49:9001/',
        ApiAnswer:'http://3.139.66.49:9000/',
        GitIngestion: 'http://34.46.36.105:3001',//'http://localhost:3001/app', //'http://34.66.193.112/'
        DeployedURL:'http://34.123.3.28:3000'//'https://genie.bilvantis.in/fastapi//' ,//http://localhost:3000/app/' //'http://34.57.32.181',
    }