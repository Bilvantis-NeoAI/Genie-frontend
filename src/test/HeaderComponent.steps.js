import { render, screen } from '@testing-library/react';
import { HeaderComponent } from '../components/HeaderComponent';
import '@testing-library/jest-dom';
import React from 'react';

describe('HeaderComponent', () => {
    it('renders the header with the username from localStorage', () => {
    localStorage.setItem('username', 'John Doe');
    render(<HeaderComponent />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Welcome to Genie')).toBeInTheDocument();
  });
  it('renders the header with "Admin" when no username is in localStorage', () => {
    localStorage.removeItem('username');
    render(<HeaderComponent />);
    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getByText('Welcome to Genie')).toBeInTheDocument();
  });
    it('renders the UserOutlined icon correctly', () => {
    render(<HeaderComponent />);
    const icon = screen.getByRole('img');
    expect(icon).toHaveClass('anticon');
    expect(icon).toHaveAttribute('aria-label', 'user');
  });
  it('renders the correct welcome text', () => {
    render(<HeaderComponent />);
    expect(screen.getByText('Welcome to Genie')).toBeInTheDocument();
  });
});
