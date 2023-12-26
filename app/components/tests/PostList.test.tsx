// import { enableFetchMocks } from "jest-fetch-mock";
// enableFetchMocks();
import fetch from "jest-fetch-mock";
import { render, screen, waitFor } from "@testing-library/react";
import PostList from "../PostList";
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.get("/api/posts", (req, res, ctx) => {
    // Mock the response for /api/posts
    console.log("api posts!");
    return res(
      ctx.json({
        data: [
          {
            id: 1,
            username: "Lana",
            avatar: "/example.jpg",
            content: "Lorem ipsum",
            created_at: "some date",
          },
          {
            id: 2,
            username: "Lana",
            avatar: "/example.jpg",
            content: "Lorem ipsum another",
            created_at: "some other date",
          },
        ],
      })
    );
  }),
  rest.get("/api/users/profile", (req, res, ctx) => {
    // Mock the response for /api/users/profile
    console.log("api profile");
    return res(
      ctx.json({
        data: {
          username: "Lana",
          // other data
        },
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("<PostList />", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  test("renders the users list", async () => {
    render(<PostList username="Lana" index={1} />);
    const list = await screen.findByTestId("postlist");
    expect(list).toBeInTheDocument();
  });
});
