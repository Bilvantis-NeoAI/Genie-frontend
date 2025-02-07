import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import UsageMetric from "../components/UsageMetric";
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
                usage: {
                    data: {
                        "monthly_usage": {
                            "title": "Application Usage",
                            "graph_type": "stacked_bar",
                            "data": [
                                { "review": [{ "month": "2024-12", "count": 51 }] },
                                { "assistant": [{ "month": "2024-12", "count": 65 }] },
                            ],
                        },
                        "assistant_usage_data": {
                            "title": "Assistant Usage Data",
                            "graph_type": "bar",
                            "data": [{ "count": 53, "assistant_name": "comments" }],
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
                <UsageMetric />
            </Provider>
        );
        await waitFor(() => {
            expect(fetchGraphList).toHaveBeenCalledWith(
                { type: "usage", filter: false },
                "usage"
            );
        });
    });
    it("should open offcanvas when clicking the filter button", () => {
        render(
            <Provider store={store}>
                <UsageMetric />
            </Provider>
        );
        const filterButtons = screen.queryAllByTestId("filter-button");
        const filterButton = filterButtons[0];
        fireEvent.click(filterButton);

        const offcanvasElements = screen.getAllByText("Assistant Usage Data", { hidden: true });
        const offcanvas = offcanvasElements[0];

        expect(offcanvas).toBeInTheDocument();
    });
    it("should Submit offcanvas when clicking the submit button", async () => {
        render(
            <Provider store={store}>
                <UsageMetric />
            </Provider>
        );

        fireEvent.click(screen.getAllByTestId("filter-button")[0]);
        fireEvent.change(screen.getByLabelText(/Project Name/i), { target: { value: 'medicalapp-react' } });
        fireEvent.click(screen.getByTestId("submit-button"));
    });
    it("should Reset offcanvas when clicking the Rest button", async () => {
        render(
            <Provider store={store}>
                <UsageMetric />
            </Provider>
        );

        fireEvent.click(screen.getAllByTestId("filter-button")[0]);
        fireEvent.change(screen.getByLabelText(/Project Name/i), { target: { value: '' } });
        fireEvent.click(screen.getByTestId("reset-button"));

    })
})