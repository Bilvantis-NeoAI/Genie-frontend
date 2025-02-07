
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import OffCanvas from '../components/OffVanvas';
import React from "react";
import '@testing-library/jest-dom';

const mockUsers = [
    {
        "user_id": "67498e2eb96484d566d74a46",
        "email": "sahithi26@gmail.com",
        "full_name": "sahithi"
    },
];

const mockData = {
    project_user_mapping: [
        { _id: "677cce43719ca2dfe08e507d", project_name: "sample_asd" },
        { _id: "1", project_name: "Project_B" },
    ],
};

const mockSelectedFilter = {
    key: 'issue_severity_distribution',
    initiatedBy: "issue_severity_distribution",
    start_date: "2024-01-01",
    end_date: "2024-01-31",
};

const mockOnClose = jest.fn();
const mockOnChange = jest.fn();
const mockHandleProjectChange = jest.fn();
const mockHandleReset = jest.fn();
const mockHandleSubmit = jest.fn();
const mockHandleDateChange = jest.fn();

describe("OffCanvas Component", () => {
    test("renders the OffCanvas component when isVisible is true", async () => {
        const selectedFilter = { key: "GRAPHKEYS.ISSUE_SEVERITY_DISTRIBUTION", initiatedBy: "issue_severity_distribution" };
        const users = [{
            "user_id": "67498e2eb96484d566d74a46",
            "email": "sahithi26@gmail.com",
            "full_name": "sahithi"
        }];
        const data = { project_user_mapping: [] };
        
        render(
          <OffCanvas
            isVisible={true}
            onClose={jest.fn()}
            selectedFilter={selectedFilter}
            users={users}
            data={data}
            handleProjectChange={jest.fn()}
            onChange={jest.fn()}
            handleReset={jest.fn()}
            handleSubmit={jest.fn()}
            handleDateChange={jest.fn()}
          />
        );
           expect(screen.getByLabelText("Developer")).toBeInTheDocument();
    });
    it("fires the onClose callback when the close button is clicked", () => {
        render(
            <OffCanvas
                isVisible={true}
                onClose={mockOnClose}
                selectedFilter={mockSelectedFilter}
                users={mockUsers}
                data={mockData}
                handleProjectChange={mockHandleProjectChange}
                onChange={mockOnChange}
                handleReset={mockHandleReset}
                handleSubmit={mockHandleSubmit}
                handleDateChange={mockHandleDateChange}
            />
        );

        fireEvent.click(screen.getByLabelText("Close"));
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
    it("fires the handleReset callback when the reset button is clicked", () => {
        render(
            <OffCanvas
                isVisible={true}
                onClose={mockOnClose}
                selectedFilter={mockSelectedFilter}
                users={mockUsers}
                data={mockData}
                handleProjectChange={mockHandleProjectChange}
                onChange={mockOnChange}
                handleReset={mockHandleReset}
                handleSubmit={mockHandleSubmit}
                handleDateChange={mockHandleDateChange}
            />
        );
    
        const resetButton = screen.getByRole("button", { name: /reset/i });
        expect(resetButton).toBeInTheDocument();
    
        fireEvent.click(resetButton)
    })
    it("fires the handleSubmit callback when the submit button is clicked", async () => {
        render(
            <OffCanvas
                isVisible={true}
                onClose={mockOnClose}
                selectedFilter={mockSelectedFilter}
                users={mockUsers}
                data={mockData}
                handleProjectChange={mockHandleProjectChange}
                onChange={mockOnChange}
                handleReset={mockHandleReset}
                handleSubmit={mockHandleSubmit}
                handleDateChange={mockHandleDateChange}
            />
        );

        fireEvent.click(screen.getByText("Submit"));
        expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
    });
    it("fires handleProjectChange when project name is selected", () => {
        render(
            <OffCanvas
                isVisible={true}
                onClose={mockOnClose}
                selectedFilter={mockSelectedFilter}
                users={mockUsers}
                data={mockData}
                handleProjectChange={mockHandleProjectChange}
                onChange={mockOnChange}
                handleReset={mockHandleReset}
                handleSubmit={mockHandleSubmit}
                handleDateChange={mockHandleDateChange}
            />
        );

        fireEvent.change(screen.getByLabelText("Project Name"), {
            target: { value: mockData.project_user_mapping[0]._id },
        });
        expect(mockHandleProjectChange).toHaveBeenCalledTimes(1);
        expect(mockOnChange).toHaveBeenCalledTimes(1);
    });
});


