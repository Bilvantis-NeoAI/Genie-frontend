import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import LoginPage from "../components/LoginPage";

const mockStore = configureStore([]);

describe("LoginPage Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  test("renders LoginPage without crashing", () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );

    expect(getByText(/Login/i)).toBeInTheDocument();
  });
});
