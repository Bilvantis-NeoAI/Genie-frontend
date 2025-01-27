import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import Register from '../components/Register';
import { userRegistration } from '../actions/LoginActions';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

jest.mock('../actions/LoginActions', () => ({
  userRegistration: jest.fn(),
}));

describe('Register Component', () => {
  let mockNavigate;
  let mockDispatch;

  beforeEach(() => {
    mockNavigate = jest.fn();
    mockDispatch = jest.fn(() => Promise.resolve({ status: 200, data: { message: 'Success' } }));
    useNavigate.mockReturnValue(mockNavigate);
    useDispatch.mockReturnValue(mockDispatch);
  });

  it('renders the registration form with required fields', () => {
    render(<Register />);
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Username:')).toBeInTheDocument();
    expect(screen.getByLabelText('Full Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Company Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('new Password:')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password:')).toBeInTheDocument();
  });

  it('handles input change events', () => {
    render(<Register />);
    const emailInput = screen.getByLabelText('Email:');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');
  });

  it('toggles password visibility', () => {
    render(<Register />);
    const passwordInput = screen.getByLabelText('new Password:');
    const toggleButton = screen.getAllByRole('button')[0];

    expect(passwordInput.type).toBe('password');
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('text');
  });

  it('submits the form and navigates on successful registration', async () => {
    render(<Register />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('new Password:');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password:');
    // const submitButton = screen.getByText('Register');
    fireEvent.click(screen.getByRole('button', { name: /register/i }));
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password' } });
    // fireEvent.click(submitButton);

    expect(userRegistration).toHaveBeenCalled();
    // expect(mockDispatch).toHaveBeenCalledWith(expect.anything());
    await mockDispatch();
    expect(Swal.fire).toHaveBeenCalledWith({
      title: "SUCCESS",
      text: 'Success',
      icon: "success",
      confirmButtonText: "SUCCESS",
      didOpen: expect.any(Function),
    });
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('displays an error alert on failed registration', async () => {
    mockDispatch.mockReturnValueOnce(Promise.resolve({ status: 400, data: { message: 'Error' } }));
    render(<Register />);
    fireEvent.click(screen.getByRole('button', { name: /register/i }));
    await mockDispatch();
    expect(Swal.fire).toHaveBeenCalledWith({
      title: expect.anything(),
      text: 'Error',
      icon: 'error',
      confirmButtonText: expect.anything(),
    });
  });

  it('navigates to the login page when clicking the login link', () => {
    render(<Register />);
    const loginLink = screen.getByText('Login');
    fireEvent.click(loginLink);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});