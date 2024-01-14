import app from "./app";
import { Config } from "./config";
import { AppDataSource } from "./config/data-source";
import logger from "./config/logger";
// import createError from 'http-errors';
const startServer = async () => {
    const PORT = Config.PORT;

    try {
        // const err=createError(401,"you are not allowed to access this page")
        // throw err;
        await AppDataSource.initialize();
        logger.info("Database connected successfully.");
        app.listen(PORT, () => logger.info(`Listening on port ${PORT}`));
    } catch (err: unknown) {
        if (err instanceof Error) {
            logger.error(err.message);
            setTimeout(() => {
                process.exit(1);
            }, 1000);
        }
    }
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
startServer();
