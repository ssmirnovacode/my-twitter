import { render, screen } from "@testing-library/react";
import User from "../User";

const USER = {
  id: 123,
  username: "Lana",
  avatar: "/example.jpg",
};

const HREF = "/user";

describe("<User />", () => {
  test("renders", () => {
    render(<User user={USER} href={HREF} />);
    const userComponent = screen.getByTestId("user-component");
    expect(userComponent).toBeInTheDocument();
    const usernameText = screen.getByText(USER.username);
    expect(usernameText).toBeInTheDocument();
  });
});
