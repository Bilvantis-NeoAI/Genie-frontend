export const sweetalert = {
    SUCCESS_TITLE: 'SUCCESS',
    SUCCESS_ICON: 'success',
    OK_CONFIRMED_TEXT: 'OK',
    ERROR_TITLE: 'Error',
    ERROR_ICON: 'error',
    ERROR_CONFIRMED_TEXT: 'Error',
    LOGOUT_CONFIRM_TEXT: 'Are you sure you want to logout?',
    WARNING_TITLE:'Warning',
    WARNING_ICON:'warning',
    CONFIRM_BUTTON_TEXT:'Yes, Logout',
    CANCEL_BUTTON_TEXT:'Cancel'
}
export const XAXISKEYS = {
    SEVERITY: 'severity',
    ASSISTANCE: 'assistant_name',
    REVIEW: 'review_name',
    APPLICATION: 'Application',
    MONTH: 'month',
    REPO_NAME :'repo_name',
    WEEK : 'week',
}
export const XAXISNAMES = {
    AVARAGE_QUALITY: 'Average quality',
    AVARAGE_SEVERITY: 'Average severity',
    COUNT: 'Count',
    PERCENTAGE: 'Percentage',
   SECRETS_COUNT: 'Secrets Count',
   DISABLE_FILES_COUNT : 'Disallowed Files Count'
}
export const DATAKEY = {
    COUNT: 'count',
    PERCENTAGE: 'percentage',
    AVARAGE_QUALITY: 'average_quality',
    AVARAGE_SEVERITY: 'average_severity',
    SECRETS_COUNT : 'secrets_count',
    DISABLE_FILES_COUNT:"disallowed_files_count",
    PROJECT:'project'
}
export const TITLE = {
    AVARAGE_CODE_QUALITY: 'Average Code Quality',
    AVARAGE_CODE_SEVERITY: 'Average Code Severity',
    COMMIT_ISSUES_SEVERITY:"Commit Issue Severity Distribution By User",
    COMMIT_VIOLATE :"Commit Violation Metrics"
}
export const CANVASKEY = {
    ASSISTANCE : 'Assistant',
    REVIEW : 'Review',
    SEVERITY: 'severity',

}
export const homePageTextSamples = {
    VIEW_SIMILARITY : 'View PDF - Similairty',
    VIEW_REVELANT : 'View PDF - Relevant',
    OPEN_IMAGES : 'Open images',
    OPEN_GRAPHS : 'Open Graphs',
    DOWNLOAD_IMAGES : 'Download Images',
    SUBMIT_BUTTON : 'Submit',
    EXPLAIN:'Explain',
    GET_CODE : 'Get Code',
    CLOSE : 'Close',
    HYPERLINKS : 'Hyperlinks'
};
export const  baseURL =  'https://neoai.bilvantis.com/'
export const homePage1TextSamples = {
    UPLOAD_FILES: "Upload Files",
    URL_INPUT: "Enter URL",
    FILES_REQUIRED: "At least one file is required.",
    URL_REQUIRED: "URL is required.",
    SUBMIT: "Submit",
    ONLY_FILE : 'Please select only 1 file.',
    TOKEN:'Enter Pat',
    BRANCH_NAME:'Branch Name'
};
export const homePage3TextSamples = {
    LINE_GRAPH_DATA : [1, 7, 8, 9, 5, 3, 4, 10, 11, 5, 6, 7],
    LINE_GRAPH_X_AXIS_DATA : ['Jan','Feb', 'Mar', 'Apr','May','Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov','Dec'],
    BAR_GRAPH_DATA : [10, 15, 7, 4, 6, 8, 7],
    BAR_GRAPH_X_AXIS_DATA : ['Node Js','React Js','Angular','Java','Spring Boot','CDE','Data',],
    PIE_CHART_DATA : [{ label: 'Project Manager', value: 400 },{ label: 'User', value: 300 },],
    DOCUMENT_NAME : 'Document Name',
    DOCUMENT_SIZE : 'Document Size in MB',
    INGESTION_TIME : 'Ingestion time',
    NO_OF_PAGES : 'No of Pages',
    NO_OF_IMAGE_DOCS : 'No of Image Docs',
    NO_OF_TABLE_DOCS : 'No of Table Docs',
    NO_OF_TEXT_DOCS : 'No of Text Docs',
    TOTAL_INGESTION_TOKENS : 'Total Ingestion Tokens in K',
    QUESTIONS_TABLE_DATA_HEADERS : ["Question","Tech","Pages context","Pages relv","No of Chroma Tokens in K","No ES Tokens in K","No of Neo4j Tokens in K","Total tokens in K"]
}

export const headerTextSamples = {
    SOLAR_WINDS : 'Welcome  to Genie'
}

export const footerTextSamples = {
    BILVANTIS : '@Bilvantis 2024'
}

export const adminDashboardTextSamples = {
    FLUSH_DB : 'flushDB',
    CONATAINER_RESTART : 'App Restart',
    RELOAD : 'Reload',
    NEO_FOURJ : 'Neo4j Status',
    APP_RESATRT_MSG : 'App restart sucessful',
    FLUSH_ERROR : 'An error occurred while flushing.',
    RESTART_ERROR : 'An Error occured while restarting',
    RELOAD_ERROR : 'An error occurred while Reloading.',
    CHANDE_STATUS_ERROR : 'An error occurred while changing status.',
    API_ERROR : 'API call failed:',
    STORAGE_LOCATION : 'Storage Location',
}

export const Retrive_repo_data={
    THIS_FIELD_CANT_NOT_BE_EMPTY :'This field cannot be empty',
    FAILED_TO_RETRIVE_DATA : 'Failed to retrieve data. Please try again.',
    NO_DATA_AVAILABLE : 'No data available'
}
export const repo_Ingestion ={
    URL_REQUIRED : 'URL is required',
    INGESTION_INITIATED_SUCCEEFULLY :"Ingestion initiated successfully!",
    ERROR_OCCURED_REPO_INGESTION :"An error occurred while repo ingestion!"
}
export const GRAPHKEYS ={
COMMIT_AVARAGE_CODE_QUALITY :'commit_avg_code_quality',
COMMIT_VIOLATE:'commit_violation_metrics',
COMMIT_ISSUE_SEVERITY_BY_USER_PROJECT :'commit_issue_severity_by_user_and_project',
COMMIT_ORG_COMMIT_METRICS : 'org_commit_metrics',
ISSUSE_SEVERITY_FREQUESCY_PROJECT : 'issue_severity_frequency_by_project',
MONTH_USAGE:'monthly_usage',
ISSUE_SEVERITY_DISTRIBUTION : 'issue_severity_distribution',
AVARAGE_CODE_QUALITY :'avg_code_quality',
AVARAGE_CODE_SEVERITY:'avg_code_severity',
REVIEW_USAGE_DATA : 'review_usage_data',
ASSIANCE_USAGE_DTA : 'assistant_usage_data',
TEST_CASES_METRICS :'test_cases_metrics',
HTTP_METHOD_METRICS:'http_methods_metrics',
RELEASENOTE_COMMIT:'releasenotes_commitlogs',
REPHASE_RELEASENOTE:'rephrase_releasenotes',
REPHASE_COMMITLOGS:'rephrase_commit_logs'

}
export const API_BASE_AI = 'http://34.134.148.250:7000';
