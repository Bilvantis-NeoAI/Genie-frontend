import Swal from "sweetalert2";
import CryptoJS from 'crypto-js';
export const IP = process.env.REACT_APP_IP;
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
    INGESTED_LIST :'/get_repos',
    retriveRepoData :'/explain',
    GET_CODE : '/get_code',
    LOGIN : 'auth/login',
    REGISTER : 'auth/register',
    TEST_AI:'/generate_test_cases_file',
    TEST_AI2 :'/generate_output',
    USERS_LIST :'/users',
    PENDING_LIST :'/pending-registrations',
    APPROVE_USER :'/approve-user',
    DELETE_USER:'/delete-user',
    REJECT_USER:'/reject-user',
    EDIT_USER_ROLE:'/users',
    RESET_PASSWORD:'/reset-password',
    GIT_RELEASE_NOTE :'generate_release_notes',
    GIT_RELEASE_FEEDBACK :'rephrase_release_notes',
    GIT_COMMIT_FEEDBACK:'rephrase_commit_logs_summary',
    DEL_TEM_DIR:'temp_dir_delete',
    TEST_AI_METRICS:'/metrics',
     USER_DETAILS :'auth/users/me',
    DEAD_CODE:'deadcode_data_identification',
    GET_USER_ROLES : 'user-roles'
}
    export const URL ={
        Api : `${IP}`,
        ApiInject :`${IP}genieapi`,
        ApiAnswer:`${IP}genieapi`,
 
 
        GitIngestion: `${IP}/genieapi/gitkb`,
        DeployedURL:`${IP}/genieapi/`,
        GIT_GRAPH_DATA:`${IP}genieapi`,
        TEST_AI_METRICS :`${IP}/genieapi/testAI`,
 
        API_BASE_AI :`${IP}`,
        TEST_AI :`${IP}/genieapi/testAI`,
       
 
        ADMIN_USERS :`${IP}/genieapi/admin`,
    }
    export const showSuccessAlert = (title = 'Success', text = 'Operation completed successfully!') => {
        return Swal.fire({
            title,
            text,
            icon: 'success',
            confirmButtonText: 'OK',
        });
    };
   
    export const showErrorAlert = (title = 'Error', text = 'Something went wrong.') => {
        return Swal.fire({
            title,
            text,
            icon: 'error',
            confirmButtonText: 'OK',
        });
    };
   
    export const showConfirmAlert = (
        title = 'Are you sure?',
        text = 'Do you want to proceed?',
        confirmButtonText = 'Yes',
        cancelButtonText = 'Cancel'
    ) => {
        return Swal.fire({
            title,
            text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText,
            cancelButtonText,
            reverseButtons: true,
        });
    };

    export const encryptData = (requestData) => {
        try {
          const key = CryptoJS.enc.Utf8.parse("1234567890123456");
          const iv = CryptoJS.enc.Utf8.parse("abcdefghijklmnop");
      
          const encrypted = CryptoJS.AES.encrypt(requestData, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
          });
      
          return encrypted.toString();
        } catch (error) {
          return { status: false, data: error.toString() };
        }
      };