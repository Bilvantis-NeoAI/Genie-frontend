import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SideNav from "../components/SideNavComponent";
import Swal from "sweetalert2";
import React from "react";
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
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
    await waitFor(() => expect(Swal.fire).toHaveBeenCalled());
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/"));
  });
});

