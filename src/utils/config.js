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
    retriveRepoData :'qa_git',
    LOGIN : 'auth/login',
    REGISTER : 'auth/register'
}
export const URL ={
    Api : 'http://3.139.66.49:9002/',
    ApiInject : 'http://3.139.66.49:9001/',
    ApiAnswer:'http://3.139.66.49:9000/',
    GitIngestion: 'http://34.27.22.123:3001',//'http://localhost:9000', //local
    // Metric : 'http://localhost:3005' //local
    Metric:'http://34.27.22.123:3000'
}