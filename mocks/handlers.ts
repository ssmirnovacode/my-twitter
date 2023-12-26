import { rest } from "msw";

export const handlers = [
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
  }),
];
