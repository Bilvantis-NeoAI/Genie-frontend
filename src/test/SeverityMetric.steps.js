import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import SeverityMetric from "../components/SeverityMetric";
import '@testing-library/jest-dom';
import React from "react";
import configureMockStore from "redux-mock-store";
import { fetchGraphList } from "../actions/graphsDataActions";
jest.mock("../actions/graphsDataActions", () => ({
    fetchGraphList: jest.fn(),
}));
const mockStore = configureMockStore([thunk]);
describe("Severity Component", () => {
    let store;
    beforeEach(() => {
        store = mockStore({
            graphs: {
                severity: {
                    data: {
                        "issue_severity_distribution": {
                            "title": "Issue severity distribution",
                            "graph_type": "double_bar_graph",
                            "data": [
                                {
                                    "severity": "critical",
                                    "count": 334,
                                    "percentage": 14.917
                                },
                            ]
                        },
                        "issue_severity_by_user_and_project": {
                            "title": "Issue severity distribution by User",
                            "graph_type": "double_bar_graph",
                            "data": [
                                {
                                    "severity": "cosmetic",
                                    "count": 240,
                                    "percentage": 10.719
                                }
                            ]
                        },
                        "issue_severity_pie_chart_data": {
                            "title": "Issue Severity Data",
                            "graph_type": "pie",
                            "data": [
                                {
                                    "severity": "cosmetic",
                                    "percentage": 10.73
                                }
                            ]
                        },
                        "issue_severity_area_chart_data": {
                            "title": "Issue Severity Distribution",
                            "graph_type": "area_chart",
                            "data": [
                                {
                                    "date": "2025-01-23",
                                    "critical": 1,
                                    "major": 6,
                                    "minor": 7,
                                    "cosmetic": 5
                                },
                            ]
                        },
                        "issue_severity_frequency_by_project": {
                            "title": "Issue Severity Frequency by Project",
                            "graph_type": "bar",
                            "data": [
                                {
                                    "project": "Genie",
                                    "critical": 2,
                                    "major": 2,
                                    "minor": 3,
                                    "cosmetic": 0
                                },
                            ]
                        },
                        "project_user_count": {
                            "title": "Project User Count",
                            "graph_type": "bar_graph",
                            "data": [
                                {
                                    "project": "hello-world",
                                    "count": 1
                                },
                                {
                                    "project": "medicalapp-react",
                                    "count": 1
                                },
                            ]
                        },
                        "project_user_mapping": [
                            {
                                "_id": "6763e7bc388b54276371ed27",
                                "project_name": "hello-world",
                                "users": [
                                    {
                                        "user_id": "6749680d179953e102f1d99c",
                                        "email": "rahul97@gmail.com",
                                        "full_name": "Rahul97"
                                    }
                                ]
                            },
                        ]
                    },
                },
            },
        });
        store.dispatch = jest.fn();
    });
    test("dispatches fetchGraphList on mount", async () => {
        render(
            <Provider store={store}>
                <SeverityMetric />
            </Provider>
        );
        await waitFor(() => {
            expect(fetchGraphList).toHaveBeenCalledWith(
                { type: "severity", filter: false },
                "severity"
            );
        });
    });
    it("should open offcanvas when clicking the filter button", () => {
        render(
            <Provider store={store}>
                <SeverityMetric />
            </Provider>
        );
        const filterButtons = screen.queryAllByTestId("filter-button");
        const filterButton = filterButtons[0];
        fireEvent.click(filterButton);

        const offcanvasElements = screen.getAllByText("Issue severity distribution", { hidden: true });
        const offcanvas = offcanvasElements[0];

        expect(offcanvas).toBeInTheDocument();
    });
    it("should Submit offcanvas when clicking the submit button", async () => {
        render(
            <Provider store={store}>
                <SeverityMetric />
            </Provider>
        );

        fireEvent.click(screen.getAllByTestId("filter-button")[0]);
        fireEvent.change(screen.getByLabelText(/Project Name/i), { target: { value: 'medicalapp-react' } });
        fireEvent.click(screen.getByTestId("submit-button"));
    });
    it("should Reset offcanvas when clicking the Rest button", async () => {
        render(
            <Provider store={store}>
                <SeverityMetric />
            </Provider>
        );

        fireEvent.click(screen.getAllByTestId("filter-button")[0]);
        fireEvent.click(screen.getByTestId("reset-button"));
    });

});