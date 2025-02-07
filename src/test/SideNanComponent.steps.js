// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import { MemoryRouter } from 'react-router-dom';
// import SideNav from '../components/SideNavComponent';
// import '@testing-library/jest-dom';
// import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';
// import React from 'react';
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: jest.fn(),
// }));
// jest.mock('sweetalert2', () => ({
//   fire: jest.fn().mockResolvedValue({ isConfirmed: true }), // Mock resolved value when confirmed
// }));

// describe('SideNav', () => {
//   let navigate;

//   beforeEach(() => {
//     navigate = useNavigate();
//   });
//   it('should highlight the metrics tab as active by default', () => {
//     render(
//       <MemoryRouter>
//         <SideNav />
//       </MemoryRouter>
//     );
    
//     const metricsTab = screen.getByText(/Metrics/i);
//     expect(metricsTab).toBeInTheDocument();
//     expect(metricsTab.closest('li')).toHaveClass('active-tab');
//   });
//   it('should navigate to the /metrics page when the metrics tab is clicked', () => {
//     render(
//       <MemoryRouter>
//         <SideNav />
//       </MemoryRouter>
//     );

//     const metricsTab = screen.getByText(/Metrics/i);
//     fireEvent.click(metricsTab);
//      expect(navigate).toHaveBeenCalledWith('/metrics', expect.any(Object));
//   });

//   it('should navigate to the root path ("/") when the logout is confirmed', async () => {
//     render(
//       <MemoryRouter>
//         <SideNav />
//       </MemoryRouter>
//     );

//     const logoutTab = screen.getByText(/Logout/i);
//     fireEvent.click(logoutTab);

//     // Confirm the logout in the modal
//     await waitFor(() => expect(Swal.fire).toHaveBeenCalled());
//     Swal.fire.mockResolvedValueOnce({ isConfirmed: true });

//     // Assert navigate was called with "/"
//     await waitFor(() => expect(navigate).toHaveBeenCalledWith('/'));
//   });
// });

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SideNav from "../components/SideNavComponent";
import Swal from "sweetalert2";
import React from "react";
// Mocking useNavigate
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate, // Mocking the navigate function
}));

jest.mock("sweetalert2", () => ({
  fire: jest.fn(() => Promise.resolve({ isConfirmed: true })),
}));

describe("SideNav", () => {
  it("should navigate to the /metrics page when the metrics tab is clicked", () => {
    render(
      <MemoryRouter>
        <SideNav />
      </MemoryRouter>
    );

    const metricsTab = screen.getByText(/Metrics/i);
    fireEvent.click(metricsTab);

    expect(mockNavigate).toHaveBeenCalledWith("/metrics", expect.any(Object));
  });

  it("should navigate to the root path ('/') when the logout is confirmed", async () => {
    render(
      <MemoryRouter>
        <SideNav />
      </MemoryRouter>
    );

    const logoutTab = screen.getByText(/Logout/i);
    fireEvent.click(logoutTab);

    // Confirm the logout in the modal
    await waitFor(() => expect(Swal.fire).toHaveBeenCalled());

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/"));
  });
});

