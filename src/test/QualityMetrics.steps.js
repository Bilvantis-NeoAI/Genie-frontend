import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import QualityMetric from '../components/QualityMetric'; // Adjust this path according to your folder structure
import { fetchGraphList } from '../actions/graphsDataActions';

const mockStore = configureStore([]);

describe('QualityMetric Component', () => {
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
    });

    const renderComponent = () =>
        render(
            <Provider store={store}>
                <QualityMetric />
            </Provider>
        );

    test('renders graph components based on data', () => {
        renderComponent();
        
        // Check if both metrics are rendered
        expect(screen.getByText('Average Code Quality')).toBeInTheDocument();
        expect(screen.getByText('Average Code Severity')).toBeInTheDocument();
    });

    test('opens off canvas on filter button click', () => {
        renderComponent();

        // Simulate clicking the filter button (assuming it's in the LineGraph component)
        const filterButton = screen.getAllByRole('button', { name: /filter/i })[0]; // Adjust selector based on actual button
        fireEvent.click(filterButton);

        // Check if off-canvas is visible
        expect(screen.getByText(/off canvas/i)).toBeVisible(); // Adjust based on actual text in OffCanvas
    });

    test('submits filters correctly', () => {
        renderComponent();

        // Open off canvas
        const filterButton = screen.getAllByRole('button', { name: /filter/i })[0];
        fireEvent.click(filterButton);

        // Fill out form fields (example)
        fireEvent.change(screen.getByLabelText(/project name/i), { target: { value: 'medicalapp-react' } });
        fireEvent.change(screen.getByLabelText(/user/i), { target: { value: '6749680d179953e102f1d99c' } });
        
        // Submit form
        const submitButton = screen.getByRole('button', { name: /submit/i }); // Adjust selector based on actual button text
        fireEvent.click(submitButton);

        // Check if fetchGraphList was called with correct parameters (mocked function)
        const actions = store.getActions();
        const expectedPayload = expect.objectContaining({
            type: 'FETCH_GRAPH_LIST',
            payload: expect.objectContaining({
                filters: JSON.stringify({ project_name: 'medicalapp-react', user_id: '6749680d179953e102f1d99c', month: '' }),
            }),
        });
        
        expect(actions).toEqual(expect.arrayContaining([expectedPayload]));
    });

    test('clears filters correctly', () => {
        renderComponent();

        // Open off canvas
        const filterButton = screen.getAllByRole('button', { name: /filter/i })[0];
        fireEvent.click(filterButton);

        // Clear filters
        const clearButton = screen.getByRole('button', { name: /clear/i }); // Adjust selector based on actual button text
        fireEvent.click(clearButton);

        // Assert that state has been cleared (e.g., check if input fields are empty)
    });
});