import request from "supertest";
import app from "../../src/app";

describe("POST /auth/register", () => {
    describe("Given all fields", () => {
        it("should return 201 status  code", async () => {
            // AAA =>Arrane, Act, Assert

            // arrange
            const userData = {
                firstName: "Binod",
                lastName: "gautam",
                email: "gautambinod629@gmail.com",
                password: "secret",
            };

            // act
            const response = await request(app)
                .post("/auth/register")
                .send(userData);

            // Assert

            expect(response.statusCode).toBe(201);
        });
    });

    describe("Fields are missing", () => {});
});
