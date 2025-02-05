
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
    it("fires onChange when developer is selected", () => {
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

        fireEvent.change(screen.getByLabelText("Developer"), {
            target: { value: mockUsers[0].user_id },
        });
        expect(mockOnChange).toHaveBeenCalledTimes(1);
    });
    it("fires handleDateChange when a date range is selected", () => {
        const selectedFilter = { key: "commit_issue_severity_by_user_and_project",
            start_date :'2025-01-10',
            end_date :"2025-02-04"
         };
        const users = [{
            "user_id": "67498e2eb96484d566d74a46",
            "email": "sahithi26@gmail.com",
            "full_name": "sahithi"
        }];
        const data = { project_user_mapping: [] };
        const mockHandleDateChange = jest.fn();
    
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
                handleDateChange={mockHandleDateChange}
            />
        );
    

        const label=  screen.getByText((content, element) => content.includes("Select Date Range"));

        // Find the input field by its role (DatePicker custom input has role 'textbox')
        const input = label.closest('div').querySelector('input[type="text"]');
    
        // Fire event for the date range change
        fireEvent.change(input, { target: { value: "2024-01-15" } });
    
        // Check if the mock function was called
        expect(mockHandleDateChange).toHaveBeenCalledTimes(1);
    });
    
    // it("fires handleDateChange when a date range is selected", () => {
    //     const selectedFilter = { key: "GRAPHKEYS.COMMIT_ISSUE_SEVERITY_BY_USER_PROJECT" }; // ensure this key is correct
    //     const users = [{
    //         "user_id": "67498e2eb96484d566d74a46",
    //         "email": "sahithi26@gmail.com",
    //         "full_name": "sahithi"
    //     }];
    //     const data = { project_user_mapping: [] };
    //     const mockHandleDateChange = jest.fn();
    
    //     render(
    //         <OffCanvas
    //             isVisible={true}
    //             onClose={jest.fn()}
    //             selectedFilter={selectedFilter}
    //             users={users}
    //             data={data}
    //             handleProjectChange={jest.fn()}
    //             onChange={jest.fn()}
    //             handleReset={jest.fn()}
    //             handleSubmit={jest.fn()}
    //             handleDateChange={mockHandleDateChange}
    //         />
    //     );
    
    //     // Use getByText instead of getByLabelText to locate the label
    //     fireEvent.change(screen.screen.getByText(/Select Date Range:/i), {
    //         target: { value: "2024-01-15" },
    //     });
    
    //     // Check if the mock function was called
    //     expect(mockHandleDateChange).toHaveBeenCalledTimes(1);
    // });
    
      

    // it("fires handleDateChange when a date range is selected", () => {
    //     const selectedFilter = { key: "GRAPHKEYS.ISSUE_SEVERITY_DISTRIBUTION", initiatedBy: "issue_severity_distribution" };
    //     const users = [{
    //         "user_id": "67498e2eb96484d566d74a46",
    //         "email": "sahithi26@gmail.com",
    //         "full_name": "sahithi"
    //     }];
    //     const data = { project_user_mapping: [] };
    //     render(
    //         <OffCanvas
    //             isVisible={true}
    //             onClose={mockOnClose}
    //             selectedFilter={selectedFilter}
    //             users={users}
    //             data={mockData}
    //             handleProjectChange={mockHandleProjectChange}
    //             onChange={mockOnChange}
    //             handleReset={mockHandleReset}
    //             handleSubmit={mockHandleSubmit}
    //             handleDateChange={mockHandleDateChange}
    //         />
    //     );

    //     fireEvent.change(screen.getAllByLabelText("Select Date Range:"), {
    //         target: { value: "2024-01-15" },
    //     });
    //     expect(mockHandleDateChange).toHaveBeenCalledTimes(1);
    // });

    test("fires handleDateChange when a date range is selected", () => {
        const handleDateChange = jest.fn();
        
        const selectedFilter = { 
            key: "commit_issue_severity_by_user_and_project",
            start_date: "2025-01-10",
            end_date: "2025-02-04"
        };
    
        const users = [{
            user_id: "67498e2eb96484d566d74a46",
            email: "sahithi26@gmail.com",
            full_name: "sahithi"
        }];
    
        const { getByPlaceholderText } = render(
            <OffCanvas 
                isVisible={true}
                onClose={() => {}}
                selectedFilter={selectedFilter}
                users={users}
                data={{}}
                handleProjectChange={() => {}}
                onChange={() => {}}
                handleReset={() => {}}
                handleSubmit={() => {}}
                handleDateChange={handleDateChange}
            />
        );
    
        const dateInput = getByPlaceholderText(/Select Date Range:/); 
    
        fireEvent.click(dateInput); // Open date picker
    
        // Simulate selecting a date range (replace with actual user events depending on library support)
        fireEvent.change(dateInput, { target: { value: "2025-01-10 - 2025-02-04" } });
    
        expect(handleDateChange).toHaveBeenCalled();
    });
});