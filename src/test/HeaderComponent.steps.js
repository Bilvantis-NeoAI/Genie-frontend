import { render, screen } from '@testing-library/react';
import { HeaderComponent } from '../components/HeaderComponent';
import '@testing-library/jest-dom';
import React from 'react';

describe('HeaderComponent', () => {
  
  // Test when a username is available in localStorage
  it('renders the header with the username from localStorage', () => {
    // Set a username in localStorage for this test
    localStorage.setItem('username', 'John Doe');
    
    render(<HeaderComponent />);
    
    // Check if the username is displayed correctly
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Welcome to Genie')).toBeInTheDocument();
  });

  // Test when no username is available in localStorage
  it('renders the header with "Admin" when no username is in localStorage', () => {
    // Remove the username from localStorage (simulate no username)
    localStorage.removeItem('username');
    
    render(<HeaderComponent />);
    
    // Check if "Admin" is displayed as the username
    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getByText('Welcome to Genie')).toBeInTheDocument();
  });
  
  // Test if the icon is displayed
  it('renders the UserOutlined icon correctly', () => {
    render(<HeaderComponent />);
    
    // Check if the user icon is displayed
    const icon = screen.getByRole('img');
    expect(icon).toHaveClass('anticon');
    expect(icon).toHaveAttribute('aria-label', 'user');
  });

  // Test the layout of the header (checking styles)
  it('should have the correct styles applied to the header elements', () => {
    render(<HeaderComponent />);
    
    // Check header's general layout styles
    const header = screen.getByRole('banner');
    expect(header).toHaveStyle('display: flex');
    expect(header).toHaveStyle('align-items: center');
    expect(header).toHaveStyle('height: 50px');
    
    // Check the username section layout
    const usernameDiv = screen.getByText('Admin').parentElement;
    expect(usernameDiv).toHaveStyle('display: flex');
    expect(usernameDiv).toHaveStyle('justify-content: flex-end');
  });

  // Test that the header has the correct text
  it('renders the correct welcome text', () => {
    render(<HeaderComponent />);
    
    // Check if the welcome text is displayed
    expect(screen.getByText('Welcome to Genie')).toBeInTheDocument();
  });
  
});
