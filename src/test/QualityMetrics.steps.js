import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import QualityMetric from "../components/QualityMetric";
import { fetchGraphList } from "../actions/graphsDataActions";
jest.mock("../actions/graphsDataActions", () => ({
    fetchGraphList: jest.fn(),
}));
const mockStore = configureMockStore([thunk]);
describe("QualityMetric Component", () => {
    let store;
    beforeEach(() => {
        store = mockStore({
            graphs: {
                quality: {
                    data: {
                        avg_code_quality: {
                            title: "Average Code Quality",
                            graph_type: "line",
                            data: [
                                { month: "2025-01", average_quality: 2.197 },
                            ],
                        },
                        avg_code_severity: {
                            title: "Average Code Severity",
                            graph_type: "line",
                            data: [
                                { month: "2025-01", average_severity: 1.739 },
                            ],
                        },
                        project_user_mapping: [
                            {
                                _id: "67640956388b54276371ed43",
                                project_name: "medicalapp-react",
                                users: [
                                    {
                                        user_id: "6749680d179953e102f1d99c",
                                        email: "rahul97@gmail.com",
                                        full_name: "Rahul97",
                                    },
                                ],
                            },
                        ],
                    },
                },
            },
        });
        store.dispatch = jest.fn();
    });
    test("dispatches fetchGraphList on mount", async () => {
        render(
            <Provider store={store}>
                <QualityMetric />
            </Provider>
        );

        await waitFor(() => {
            expect(fetchGraphList).toHaveBeenCalledWith(
                { type: "quality", filter: false },
                "quality"
            );
        });
    });
    it("should open offcanvas when clicking the filter button", () => {
        render(
            <Provider store={store}>
                <QualityMetric />
            </Provider>
        );
        const filterButtons = screen.queryAllByTestId("filter-button");
        const filterButton = filterButtons[0];
        fireEvent.click(filterButton);

        const offcanvasElements = screen.getAllByText("Average Code Quality", { hidden: true });
        const offcanvas = offcanvasElements[0];

        expect(offcanvas).toBeInTheDocument();
    });
    it("should Submit offcanvas when clicking the submit button", async () => {
        render(
            <Provider store={store}>
                <QualityMetric />
            </Provider>
        );

        fireEvent.click(screen.getAllByTestId("filter-button")[0]);
        fireEvent.change(screen.getByLabelText(/Project Name/i), { target: { value: 'medicalapp-react' } });
        fireEvent.click(screen.getByTestId("submit-button"));
    });
    it("should Reset offcanvas when clicking the Rest button", async () => {
        render(
            <Provider store={store}>
                <QualityMetric />
            </Provider>
        );

        fireEvent.click(screen.getAllByTestId("filter-button")[0]);
        fireEvent.click(screen.getByTestId("reset-button"));
    });
});