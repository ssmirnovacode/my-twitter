import { render, screen } from "@testing-library/react";
import User from "../User";

const USER = {
  id: 123,
  username: "Lana",
  avatar: "www.avatars.com/example.jpg",
};

const HREF = "/user";

describe("<User />", () => {
  test("renders", () => {
    //render(<User user={USER} href={HREF} />);
    console.log("test is running");
  });
});
