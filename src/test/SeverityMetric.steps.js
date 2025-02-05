import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import SeverityMetric from "../components/SeverityMetric";
import * as graphsDataActions from "../actions/graphsDataActions";
import '@testing-library/jest-dom';
import React from "react";
import store from '../store/store'
jest.mock("../actions/graphsDataActions");

const createMockStore = (initialState = {}) => {
    let state = initialState;
    console.log("===statestate",state);
    
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
        subscribe: () => () => { },
    };
};

const apiData = {
    "metrics": {
        "issue_severity_distribution": {
            "title": "Issue severity distribution",
            "graph_type": "double_bar_graph",
            "data": [
                { "severity": "critical", "count": 290, "percentage": 14.515 },
                { "severity": "major", "count": 890, "percentage": 44.545 },
                { "severity": "minor", "count": 597, "percentage": 29.88 },
                { "severity": "cosmetic", "count": 219, "percentage": 10.961 }
            ]
        },
        "issue_severity_by_user_and_project": {
            "title": "Issue severity distribution by User",
            "graph_type": "double_bar_graph",
            "data": [
                {
                    "severity": "critical",
                    "count": 290,
                    "percentage": 14.515
                },
                {
                    "severity": "major",
                    "count": 890,
                    "percentage": 44.545
                },
            ]
        },
        "issue_severity_pie_chart_data": {
            "title": "Issue Severity Data",
            "graph_type": "pie",
            "data": [
                { "severity": "critical", "percentage": 14.53 },
                { "severity": "major", "percentage": 44.59 },
                { "severity": "minor", "percentage": 29.91 },
                { "severity": "cosmetic", "percentage": 10.97 }
            ]
        },
        "issue_severity_area_chart_data": {
            "title": "Issue Severity Distribution",
            "graph_type": "area_chart",
            "data": [
                {
                    "date": "2025-01-16",
                    "critical": 0,
                    "major": 8,
                    "minor": 3,
                    "cosmetic": 0
                },
                {
                    "date": "2025-01-17",
                    "critical": 12,
                    "major": 59,
                    "minor": 70,
                    "cosmetic": 15
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
                {
                    "project": "Zelis",
                    "critical": 1,
                    "major": 10,
                    "minor": 4,
                    "cosmetic": 1
                }
            ]
        },
        "project_user_count": {
            "title": "Project User Count",
            "graph_type": "bar_graph",
            "data": [
                {
                    "project": "sample_project",
                    "count": 1
                },
                {
                    "project": "tokens_sample",
                    "count": 1
                }
            ]
        },
    }
};

describe("SeverityMetric Component", () => {
    const mockState = {
        graphs: {
            severity: {
                data: apiData.metrics,
            },
        },
    };

    const mockStore = createMockStore(mockState);
console.log('=====mockStoremockStore',mockStore.getState);

    test("shows loading state initially", () => {
        render(
            <Provider store={mockStore}>
                <SeverityMetric />
            </Provider>
        );

        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });
    test("renders severity metrics when data is available", async () => {
        render(
            <Provider store={mockStore}>
                <SeverityMetric />
            </Provider>
        );
    
        console.log("mock data", mockStore.getState());
        screen.debug(); // Prints the current DOM in the test
    
        await waitFor(() => {
            
            expect(screen.getByText("Issue severity distribution")).toBeInTheDocument();
        });
    });
    it("should update selectedFilter state and set offCanvas to true when handleFilter is called", () => {
        const {container} = render(
            <Provider store={mockStore}>
                <SeverityMetric />
            </Provider>
        );    
            const offcanvasComponent = container.querySelector("OffVanvas"); 
            console.log("offcanvasComponent",offcanvasComponent);
            
            const handleFilter = offcanvasComponent?.props?.handleSubmit;  
            console.log("handleFilter",handleFilter);
                   
        expect(handleFilter).toBeDefined();
            act(() => {
            handleFilter("Critical");
        });
    
        expect(screen.getByText("Selected Filter: Critical")).toBeInTheDocument();
        expect(screen.getByRole("dialog")).toBeVisible();
    });
    

});