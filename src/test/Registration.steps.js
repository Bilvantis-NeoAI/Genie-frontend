// import React from 'react';
// import { render, fireEvent, screen, waitFor } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import { BrowserRouter as Router } from 'react-router-dom';
// import { store } from '../store/store';
// import Register from '../components/Register';
// import Swal from 'sweetalert2/dist/sweetalert2.all.js';
// jest.mock('../actions/LoginActions', () => ({
//     userRegistration: jest.fn(),
// }));
// jest.mock('sweetalert2/dist/sweetalert2.all.js', () => ({
//     fire: jest.fn(),
//     showLoading: jest.fn(),
//     close: jest.fn(),
// }));
// describe('Register Component', () => {
//     beforeEach(() => {
//         jest.clearAllMocks();
//     });
//     test('submitting the form triggers the registration action', async () => {
//         render(
//             <Provider store={store}>
//                 <Router>
//                     <Register />
//                 </Router>
//             </Provider>
//         );
//         fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
//         fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
//         fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'Test User' } });
//         fireEvent.change(screen.getByLabelText(/company name/i), { target: { value: 'Test Company' } });
//         fireEvent.change(screen.getByLabelText(/Your Password/i), { target: { value: 'password123' } });
//         fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: '' } });
//         fireEvent.click(screen.getByRole('button', { name: /register/i }));
//         await waitFor(() => expect(Swal.fire).toHaveBeenCalledWith(
//             expect.objectContaining({
//                 title: "Error",
//                 text: expect.stringContaining("Actions must be plain objects"),
//             })
//         ));
//     });
//     test('submitting the form triggers the registration successfull', async () => {
//         render(
//             <Provider store={store}>
//                 <Router>
//                     <Register />
//                 </Router>
//             </Provider>
//         );
//         fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
//         fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
//         fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'Test User' } });
//         fireEvent.change(screen.getByLabelText(/company name/i), { target: { value: 'Test Company' } });
//         fireEvent.change(screen.getByLabelText(/Your Password/i), { target: { value: 'password123' } });
//         fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'password123' } });
//         fireEvent.click(screen.getByRole('button', { name: /register/i }));
//         await waitFor(() => expect(Swal.fire).toHaveBeenCalledWith(
//             expect.objectContaining({
//                 title: "success",
//                 // text: expect.stringContaining("Actions must be plain objects"),
//             })
//         ));
//     });
// });

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import Register from '../components/Register';

import Swal from "sweetalert2";

// Mock the Redux store and actions
const mockStore = configureStore([]);
const mockDispatch = jest.fn();

jest.mock("../actions/LoginActions", () => ({
  userRegistration: jest.fn(() => ({
    type: "USER_REGISTRATION",
  })),
}));

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

describe("Register Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = mockDispatch;
  });

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <Router>
          <Register />
        </Router>
      </Provider>
    );

    test('renders all form fields and buttons correctly', () => {
        // render(<Register />); // Render the component
      
        // Check for input fields
        expect(screen.getByRole({name:'email'})).toBeInTheDocument(); // Email field
        expect(screen.getByLabelText(/username/i)).toBeInTheDocument(); // Username field
        expect(screen.getByLabelText(/full name/i)).toBeInTheDocument(); // Full Name field
        expect(screen.getByLabelText(/company name/i)).toBeInTheDocument(); // Company Name field
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument(); // Password field
        expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument(); // Confirm Password field
      
        // Check for buttons
        expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument(); // Register button
        expect(screen.getByText(/login/i)).toBeInTheDocument(); // Login button
      });

  test("allows user to type in all fields", () => {
    renderComponent();

    // Simulate typing into each input field
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    expect(screen.getByLabelText(/email/i).value).toBe("test@example.com");

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });
    expect(screen.getByLabelText(/username/i).value).toBe("testuser");

    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: "Test User" },
    });
    expect(screen.getByLabelText(/full name/i).value).toBe("Test User");

    fireEvent.change(screen.getByLabelText(/company name/i), {
      target: { value: "Test Company" },
    });
    expect(screen.getByLabelText(/company name/i).value).toBe("Test Company");

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });
    expect(screen.getByLabelText(/password/i).value).toBe("password123");

    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: "password123" },
    });
    expect(screen.getByLabelText(/confirm password/i).value).toBe("password123");
  });

  test("shows error when passwords do not match", async () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: "password456" },
    });

        fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Error",
      text: expect.stringContaining("Registration failed"),
icon: "error",
        })
      );
    });
  });

  test("calls userRegistration action on valid form submission", async () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByLabelText(/company name/i), {
      target: { value: "Test Company" },
    });
    fireEvent.change(screen.getByLabelText(/your password/i), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    // fireEvent.click(screen.getByText(/register/i));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalled();
    });
  });

  test("shows error alert on failed registration", async () => {
    mockDispatch.mockImplementation(() => Promise.reject(new Error("Registration failed")));

    renderComponent();

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/your password/i), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Error",
          text: "Registration failed",
          icon: "error",
        })
      );
    });
  });
});
