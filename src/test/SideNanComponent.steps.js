import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SideNav from '../components/SideNavComponent';
import '@testing-library/jest-dom';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import React from 'react';
// Mocking the navigate function from useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

// Mocking SweetAlert2
jest.mock('sweetalert2', () => ({
  fire: jest.fn().mockResolvedValue({ isConfirmed: true }), // Mock resolved value when confirmed
}));

describe('SideNav', () => {
  let navigate;

  beforeEach(() => {
    navigate = useNavigate();
  });

  // Test if the metrics tab is active on the initial render
  it('should highlight the metrics tab as active by default', () => {
    render(
      <MemoryRouter>
        <SideNav />
      </MemoryRouter>
    );
    
    const metricsTab = screen.getByText(/Metrics/i);
    expect(metricsTab).toBeInTheDocument();
    expect(metricsTab.closest('li')).toHaveClass('active-tab');
  });

  // Test clicking on the Metrics tab should navigate to /metrics
  it('should navigate to the /metrics page when the metrics tab is clicked', () => {
    render(
      <MemoryRouter>
        <SideNav />
      </MemoryRouter>
    );

    const metricsTab = screen.getByText(/Metrics/i);
    fireEvent.click(metricsTab);
    
    // Assert navigate was called with /metrics
    expect(navigate).toHaveBeenCalledWith('/metrics', expect.any(Object));
  });

  // Test clicking on the Logout tab triggers a logout confirmation modal
  it('should trigger a logout confirmation modal when the logout tab is clicked', async () => {
    render(
      <MemoryRouter>
        <SideNav />
      </MemoryRouter>
    );

    const logoutTab = screen.getByText(/Logout/i);
    fireEvent.click(logoutTab);

    // Assert SweetAlert2 is called
    await waitFor(() => expect(Swal.fire).toHaveBeenCalled());
    expect(Swal.fire).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Warning',
      text: 'Are you sure you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Logout',
      cancelButtonText: 'Cancel',
    }));
  });

  // Test if logout leads to navigation to the root path
  it('should navigate to the root path ("/") when the logout is confirmed', async () => {
    render(
      <MemoryRouter>
        <SideNav />
      </MemoryRouter>
    );

    const logoutTab = screen.getByText(/Logout/i);
    fireEvent.click(logoutTab);

    // Confirm the logout in the modal
    await waitFor(() => expect(Swal.fire).toHaveBeenCalled());
    Swal.fire.mockResolvedValueOnce({ isConfirmed: true });

    // Assert navigate was called with "/"
    await waitFor(() => expect(navigate).toHaveBeenCalledWith('/'));
  });

  // Test if the active tab updates when navigating
  it('should update the active tab when a tab is clicked', () => {
    render(
      <MemoryRouter>
        <SideNav />
      </MemoryRouter>
    );

    const metricsTab = screen.getByText(/Metrics/i);
    const logoutTab = screen.getByText(/Logout/i);

    // Initially, Metrics tab should be active
    expect(metricsTab.closest('li')).toHaveClass('active-tab');
    expect(logoutTab.closest('li')).not.toHaveClass('active-tab');

    // Click on the Logout tab
    fireEvent.click(logoutTab);

    // Now, the Logout tab should be active
    expect(logoutTab.closest('li')).toHaveClass('active-tab');
    expect(metricsTab.closest('li')).not.toHaveClass('active-tab');
  });

  // Test if the SweetAlert modal is not triggered when canceling logout
  it('should not navigate when logout is canceled in the modal', async () => {
    render(
      <MemoryRouter>
        <SideNav />
      </MemoryRouter>
    );

    const logoutTab = screen.getByText(/Logout/i);
    fireEvent.click(logoutTab);

    // Cancel the logout
    Swal.fire.mockResolvedValueOnce({ isConfirmed: false });

    await waitFor(() => expect(Swal.fire).toHaveBeenCalled());

    // Assert that navigate was not called after canceling the logout
    await waitFor(() => expect(navigate).not.toHaveBeenCalled());
  });
});
