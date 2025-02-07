import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import CommitReviewMetric from "../components/CommitReviewMetric";
import '@testing-library/jest-dom';
import React from "react";
import { fetchGraphList } from "../actions/graphsDataActions";
import configureMockStore from "redux-mock-store";
jest.mock("../actions/graphsDataActions", () => ({
    fetchGraphList: jest.fn(() => async (dispatch) => { }),
}));
const mockStore = configureMockStore([thunk]);
describe("Commit Component", () => {
    let store;

    beforeEach(() => {
        store = mockStore({
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
    })
    test("dispatches fetchGraphList on mount", async () => {
        render(
            <Provider store={store}>
                <CommitReviewMetric />
            </Provider>
        );
        await waitFor(() => {
            expect(fetchGraphList).toHaveBeenCalledWith(
                { type: "commit", filter: false },
                "commit"
            );
        });
    });
    it("should open offcanvas when clicking the filter button", () => {
        render(
            <Provider store={store}>
                <CommitReviewMetric />
            </Provider>
        );
        const filterButtons = screen.queryAllByTestId("filter-button");
        const filterButton = filterButtons[0];
        fireEvent.click(filterButton);

        const offcanvasElements = screen.getAllByText("Commit Issue severity distribution by User", { hidden: true });
        const offcanvas = offcanvasElements[0];

        expect(offcanvas).toBeInTheDocument();
    });
    it("should Submit offcanvas when clicking the submit button", async () => {
        render(
            <Provider store={store}>
                <CommitReviewMetric />
            </Provider>
        );

        fireEvent.click(screen.getAllByTestId("filter-button")[0]);
        fireEvent.change(screen.getByLabelText(/Project Name/i), { target: { value: 'medicalapp-react' } });
        fireEvent.change(screen.getByLabelText(/Developer/i), { target: { value: 'medicalapp-react' } });
        fireEvent.click(screen.getByTestId("submit-button"));
    });
    it("should Reset offcanvas when clicking the Rest button", async () => {
        render(
            <Provider store={store}>
                <CommitReviewMetric />
            </Provider>
        );

        fireEvent.click(screen.getAllByTestId("filter-button")[0]);
        fireEvent.click(screen.getByTestId("reset-button"));

    })
})