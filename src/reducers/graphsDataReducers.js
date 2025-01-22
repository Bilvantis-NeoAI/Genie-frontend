import {
  FETCH_GRAPH_DATA,
  FETCH_GRAPH_SUCCESS,
  FETCH_GRAPH_FAILURE,
  FETCH_FILTER_GRAPH_DATA,
  FETCH_FILTER_GRAPH_SUCCESS,
  FETCH_FILTER_GRAPH_FAILURE,
} from "../actionTypes/graphsDataActionTypes";

const initialState = {
  severity: {
    loading: false,
    data: {
      issue_severity_distribution: null,
      issue_severity_by_user_and_project: null,
      issue_severity_pie_chart_data: null,
      issue_severity_area_chart_data: null,
      issue_severity_frequency_by_project: null,
      project_user_count:null

    },
    error: null,
  },
  usage: {
    loading: false,
    data: {
      monthly_usage: null,
      assistant_usage_data: null,
      review_usage_data: null
    },
    error: null,
  },
  quality: {
    loading: false,
    data: {
      avg_code_quality: null,
      avg_code_severity: null
    },
    error: null,
  },
  commit:{
    loading :false,
    data:{
      commit_issue_severity_by_user_and_project:null,
      commit_avg_code_quality:null,
      org_commit_metrics:null,
      commit_violation_metrics:null
    }
  }
};
export const graphReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GRAPH_DATA:
    case FETCH_FILTER_GRAPH_DATA:
      return {
        ...state,
        [action.graphType]: {
          ...state[action.graphType],
          loading: true,
        },
      };

    case FETCH_GRAPH_SUCCESS:
    case FETCH_FILTER_GRAPH_SUCCESS: {
      const { filter } = action.payload; // Check if the request was filtered
      const metricsData = action.payload.metrics || {};
      if (filter) {
        return {
          ...state,
          [action.graphType]: {
            ...state[action.graphType],
            loading: false,
            data: {
              ...state[action.graphType].data,
              issue_severity_distribution: metricsData.issue_severity_distribution ??
                state[action.graphType].data.issue_severity_distribution,
              issue_severity_by_user_and_project: metricsData.issue_severity_by_user_and_project ??
                state[action.graphType].data.issue_severity_by_user_and_project,

              issue_severity_area_chart_data: metricsData.issue_severity_area_chart_data ??
                state[action.graphType].data.issue_severity_area_chart_data,

              issue_severity_pie_chart_data: metricsData.issue_severity_pie_chart_data ??
                state[action.graphType].data.issue_severity_pie_chart_data,

              issue_severity_frequency_by_project: metricsData.issue_severity_frequency_by_project ??
                state[action.graphType].data.issue_severity_frequency_by_project,

              monthly_usage: metricsData.monthly_usage ??
                state[action.graphType].data.monthly_usage,

              assistant_usage_data: metricsData.assistant_usage_data ??
                state[action.graphType].data.assistant_usage_data,

              review_usage_data: metricsData.review_usage_data ??
                state[action.graphType].data.review_usage_data,

              avg_code_quality: metricsData.avg_code_quality ??
                state[action.graphType].data.avg_code_quality,

              avg_code_severity: metricsData.avg_code_severity ??
                state[action.graphType].data.avg_code_severity,

                commit_issue_severity_by_user_and_project :metricsData.commit_issue_severity_by_user_and_project ??
                state[action.graphType].data.commit_issue_severity_by_user_and_project,

                commit_avg_code_quality : metricsData.commit_avg_code_quality ??
                state[action.graphType].data.commit_avg_code_quality,

                commit_violation_metrics :metricsData.commit_violation_metrics ??
                state[action.graphType].data.commit_violation_metrics
            },
            error: null,
          },
        };
      } else {
        return {
          ...state,
          [action.graphType]: {
            ...state[action.graphType],
            loading: false,
            data: {
              ...state[action.graphType].data,
              ...metricsData,
            },
            error: null,
          },
        };
      }
    }

    case FETCH_GRAPH_FAILURE:
    case FETCH_FILTER_GRAPH_FAILURE:
      return {
        ...state,
        [action.graphType]: {
          ...state[action.graphType],
          loading: false,
          error: action.payload,
        },
      };

    default:
      return state;
  }
};

