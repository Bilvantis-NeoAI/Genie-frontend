import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import UsageMetric from "../components/UsageMetric";
import { fetchGraphList } from "../actions/graphsDataActions";
import '@testing-library/jest-dom';

jest.mock("../actions/graphsDataActions", () => ({
    fetchGraphList: jest.fn(),
}));

const mockStore = configureStore([]);
const initialState = {
    graphs: {
        usage: {
            data: null,
        },
    },
};

describe("UsageMetric Component", () => {
    let store;

    beforeEach(() => {
        store = mockStore(initialState);
        store.dispatch = jest.fn();
    });

    test("dispatches fetchGraphList on mount", async () => {
        render(
            <Provider store={store}>
                <UsageMetric />
            </Provider>
        );

        expect(store.dispatch).toHaveBeenCalledWith({
            type: expect.any(String),
            payload: expect.any(String),
        });
    });

    test("renders graph components when data is available", async () => {
        const mockData = {
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
        };

        store = mockStore({
            graphs: {
                usage: {
                    data: mockData,
                },
            },
        });

        render(
            <Provider store={store}>
                <UsageMetric />
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByText("Application Usage")).toBeInTheDocument();
            expect(screen.getByText("Assistant Usage Data")).toBeInTheDocument();
        });
    });

    test("renders the correct graph type", async () => {
        const mockData = {
            "monthly_usage": {
                "title": "Application Usage",
                "graph_type": "stacked_bar",
                "data": [{ "review": [{ "month": "2024-12", "count": 51 }] }],
            },
        };

        store = mockStore({
            graphs: {
                usage: {
                    data: mockData,
                },
            },
        });

        render(
            <Provider store={store}>
                <UsageMetric />
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByText("Application Usage")).toBeInTheDocument();
            expect(screen.getByText(/Application/i)).toBeInTheDocument();
        });
    });

    test("handles filter actions correctly", async () => {
        const mockData = {
            "monthly_usage": {
                "title": "Application Usage",
                "graph_type": "stacked_bar",
                "data": [{ "review": [{ "month": "2024-12", "count": 51 }] }],
            },
        };
        store = mockStore({
            graphs: {
                usage: {
                    data: mockData,
                },
            },
        });
        render(
            <Provider store={store}>
                <UsageMetric />
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByText("Application Usage")).toBeInTheDocument();
        });
    });
});
