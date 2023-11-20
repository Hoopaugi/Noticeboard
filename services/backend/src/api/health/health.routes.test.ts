import request from "supertest";

import app from "../../app";

describe("health.routes", () => {
  test("/api/ping returns 200", async () => {
    const res = await request(app).get("/api/ping");

    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('pong');
  });
});
