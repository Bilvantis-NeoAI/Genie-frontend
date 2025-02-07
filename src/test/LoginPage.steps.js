import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import LoginPage from '../components/LoginPage';
import { userLogin } from '../actions/LoginActions';

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
  userLogin: jest.fn(),
}));

describe('LoginPage', () => {
  let mockNavigate;
  let mockDispatch;

  beforeEach(() => {
    mockNavigate = jest.fn();
    mockDispatch = jest.fn(() => Promise.resolve({ status: 200, data: { access_token: 'fake_token' } }));
    useNavigate.mockReturnValue(mockNavigate);
    useDispatch.mockReturnValue(mockDispatch);
  });

  it('handles input change events', () => {
    render(<LoginPage />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password');
  });

  // it('toggles password visibility', () => {
  //   render(<LoginPage />);
  //   const passwordInput = screen.getByLabelText('Password:');
  //   const toggleButton = screen.getByRole('button', { hidden: true });

  //   expect(passwordInput.type).toBe('password');
  //   fireEvent.click(toggleButton);
  //   expect(passwordInput.type).toBe('text');
  //   fireEvent.click(toggleButton);
  //   expect(passwordInput.type).toBe('password');
  // });

  // it('dispatches login action on form submission and navigates on success', async () => {
  //   render(<LoginPage />);
  //   const emailInput = screen.getByLabelText('Email:');
  //   const passwordInput = screen.getByLabelText('Password:');

  //   fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  //   fireEvent.change(passwordInput, { target: { value: 'password' } });
  //   // fireEvent.click(submitButton);
  //   fireEvent.click(screen.getByRole('button', { name: /Login/i }));

  //   expect(userLogin).toHaveBeenCalled();
  //   expect(mockDispatch).toHaveBeenCalled();
  //   await mockDispatch();
  //   expect(mockNavigate).toHaveBeenCalledWith('/metrics');
  // });

  it('displays an error alert on failed login attempt', async () => {
    mockDispatch.mockReturnValueOnce(Promise.resolve({ status: 400, data: 'Error' }));
    render(<LoginPage />);
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await mockDispatch();
    expect(Swal.fire).toHaveBeenCalledWith({
      title: 'Error',
      text: {
             "data": "Error",
         "status": 400,
           },
      icon: 'error',
      confirmButtonText: 'Error',
    });
  });

  it('navigates to the register page when clicking the register link', () => {
    render(<LoginPage />);
    const registerLink = screen.getByText('Register');
    fireEvent.click(registerLink);
    expect(mockNavigate).toHaveBeenCalledWith('/register');
  });
});
