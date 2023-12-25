import { enableFetchMocks } from "jest-fetch-mock";

enableFetchMocks();
import fetch from "jest-fetch-mock";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Form from "../Form";
import { act } from "react-dom/test-utils";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));
const useRouter = jest.spyOn(require("next/navigation"), "useRouter");

const FIELDS = ["Username", "Password"];
const CONFIRM_FIELD = "Confirm password";

const RESPONSE_SUCCESS = { msg: "Login successful" };
describe("<Form />", () => {
  beforeAll(() => {
    useRouter.mockImplementationOnce(() => ({
      push: jest.fn(),
    }));
  });
  beforeEach(() => {
    fetch.resetMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
  test("renders Signup", () => {
    render(<Form endpoint={"signup"} />);
    //expect(screen.queryByRole("form")).toBeInTheDocument();
    [...FIELDS, CONFIRM_FIELD].forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
    const btn = screen.getByRole("button");
    expect(btn).toHaveTextContent("Sign up");
  });

  test("renders Login", () => {
    render(<Form endpoint={"login"} />);
    [...FIELDS].forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
    expect(screen.queryByText(CONFIRM_FIELD)).toBeNull();
    const btn = screen.getByRole("button");
    expect(btn).toHaveTextContent("Log in");
  });

  test.skip("Spinner appears on login", async () => {
    render(<Form endpoint={"login"} />);
    const btn = screen.getByRole("button");
    // userEvent.click(btn)
    // await waitFor(() => {
    //   const spinner = screen.queryByTestId("spinner");
    //   expect(spinner).toBeInTheDocument();
    // });
  });
});
