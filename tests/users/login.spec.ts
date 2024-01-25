import { DataSource } from "typeorm";
import { AppDataSource } from "../../src/config/data-source";

describe("POST/auth/login", () => {
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
        it.todo("should login the user");
    });
});
