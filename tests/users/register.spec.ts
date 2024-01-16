import request from "supertest";
import app from "../../src/app";
import { DataSource } from "typeorm";
import { AppDataSource } from "../../src/config/data-source";
// import { truncateTables } from "../utils";
import { User } from "../../src/entity/User";
import { Roles } from "../../src/constants";

describe("POST /auth/register", () => {
    let connection: DataSource;

    beforeAll(async () => {
        connection = await AppDataSource.initialize();

        //    console.log("Connection", connection)
    });

    beforeEach(async () => {
        // database truncate
        await connection.dropDatabase();
        await connection.synchronize();
        // await truncateTables(connection);
    });

    afterAll(async () => {
        await connection.destroy();
    });

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

        it("should return valid json response", async () => {
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

            expect(response.header["content-type"]).toEqual(
                expect.stringContaining("json"),
            );
        });

        it("should persist the user in the database", async () => {
            // arrange
            const userData = {
                firstName: "Binod",
                lastName: "gautam",
                email: "gautambinod629@gmail.com",
                password: "secret",
            };

            // act
            await request(app).post("/auth/register").send(userData);

            // Assert
            const userRepository = connection.getTreeRepository(User);
            const users = await userRepository.find();
            expect(users).toHaveLength(1);
            expect(users[0].firstName).toBe(userData.firstName);
            expect(users[0].lastName).toBe(userData.lastName);
            expect(users[0].email).toBe(userData.email);
        });

        it("should return and id of the created user", async () => {
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

            //assert

            expect(response.body).toHaveProperty("id");
            const repository = connection.getRepository(User);
            const users = await repository.find();
            expect((response.body as Record<string, string>).id).toBe(
                users[0].id,
            );
        });

        it("should assign a customer role", async () => {
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

            // assert
            const userRepository = connection.getRepository(User);
            const users = await userRepository.find();

            expect(users[0]).toHaveProperty("role");
            expect(users[0].role).toBe(Roles.CUSTOMER);
        });

        it("should store the hash password in the database", async () => {
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

            //Assert
            const userRepository = connection.getRepository(User);
            const users = await userRepository.find();
            expect(users[0].password).not.toBe(userData.password);
        });
    });

    describe("Fields are missing", () => {});
});
