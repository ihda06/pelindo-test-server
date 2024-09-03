// __tests__/app.test.js
// server\main.test.js
import request from "supertest";
import app from "./main.js";

describe("GET /tasks", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    process.env = { ...OLD_ENV }; // Make a copy
  });
  it("should respond with a greeting message", async () => {
    return request(app)
      .get("/tasks")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.statusCode).toBe(200);
      });
  });
});
