import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import CommitReviewMetric from "../components/CommitReviewMetric";
import * as graphsDataActions from "../actions/graphsDataActions";
import "@testing-library/jest-dom";
import React from "react";
import { act } from "react-dom/test-utils";

jest.mock("../actions/graphsDataActions");

const createMockStore = (initialState = {}) => {
    let state = initialState;
    const actions = [];
    return {
        getState: () => state,
        dispatch: (action) => {
            actions.push(action);
            if (typeof action === "function") {
                return action(() => state, (newAction) => actions.push(newAction));
            }
        },
        getActions: () => actions,
        clearActions: () => {
            actions.length = 0;
        },
        subscribe: () => () => {},
    };
};

describe("CommitReviewMetric - handleSubmit", () => {
    let mockStore;

    beforeEach(() => {
        mockStore = createMockStore({
            graphs: {
                commit: {
                    data: {
                        "commit_issue_severity_by_user_and_project": {
                            "title": "Commit Issue severity distribution by User",
                            "graph_type": "double_bar_graph",
                            "data": [
                                {
                                    "severity": "cosmetic",
                                    "count": 104,
                                    "percentage": 18.44
                                }
                            ]
                        },
                        "commit_avg_code_quality": {
                            "title": "Average Code Quality",
                            "graph_type": "line",
                            "data": [
                                {
                                    "week": "2025-W4",
                                    "average_quality": 1.65
                                },
                                {
                                    "week": "2025-W5",
                                    "average_quality": 1.83
                                }
                            ]
                        },
                        "org_commit_metrics": {
                            "title": "ORG commit metrics",
                            "graph_type": "stacked_bar_graph",
                            "data": [
                                {
                                    "repo_name": "data-tools",
                                    "total_issues": {
                                        "security_count": 1,
                                        "maintainability_count": 1
                                    },
                                    "recent_commit_issues": {
                                        "security_count": 1,
                                        "maintainability_count": 1
                                    },
                                    "total_commits": {
                                        "pat_taylor_commits": 1
                                    }
                                },
                            ]
                        },
                        "commit_violation_metrics": {
                            "title": "Commit violation metrics",
                            "graph_type": "double_bar_graph",
                            "data": [
                                {
                                    "repo_name": "data-pipeline",
                                    "disallowed_files_count": 5,
                                    "secrets_count": 12
                                },
                             ]
                        },
                        "project_user_mapping": [
                            {
                                "_id": "67640956388b54276371ed43",
                                "project_name": "medicalapp-react",
                                "users": [
                                    {
                                        "user_id": "6749680d179953e102f1d99c",
                                        "email": "rahul97@gmail.com",
                                        "full_name": "Rahul97"
                                    }
                                ]
                            },
                                       {
                                "_id": "67641b8b388b54276371ed4b",
                                "project_name": "medicalapp-admin-portal",
                                "users": [
                                    {
                                        "user_id": "67641b52388b54276371ed4a",
                                        "email": "sharief.shaik@bilvantis.io",
                                        "full_name": "Shaik Nagur Sharief"
                                    }
                                ]
                            },
                     ]
                
                
                    },
                },
            },
        });

        graphsDataActions.fetchGraphList.mockImplementation(() => Promise.resolve());
    });

    it("should dispatch fetchGraphList with correct parameters when OffCanvas form is submitted", async () => {
        await act(async () => {
            render(
                <Provider store={mockStore}>
                    <CommitReviewMetric />
                </Provider>
            );
        });

        const graphTitle = screen.getByText(/Commit violation metrics/i);
        fireEvent.click(graphTitle);
        expect(graphsDataActions.fetchGraphList).toHaveBeenCalledTimes(1);
        expect(graphsDataActions.fetchGraphList).toHaveBeenCalledWith(
            expect.objectContaining({
                type: "commit",
                filter: false,
            }),
            "commit"
        );
    });
    it("should dispatch fetchGraphList with correct parameters when OffCanvas form is filter true", async () => {
        await act(async () => {
            render(
                <Provider store={mockStore}>
                    <CommitReviewMetric />
                </Provider>
            );
        });

        const graphTitle = screen.getByText(/Commit violation metrics/i);
        fireEvent.click(graphTitle);
        expect(graphsDataActions.fetchGraphList).toHaveBeenCalledTimes(1);
        expect(graphsDataActions.fetchGraphList).toHaveBeenCalledWith(
            expect.objectContaining({
                type: "commit",
                filter: false,
            }),
            "commit"
        );
    });
});
