import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/UserService";
import { ICreateUserRequest, UserQueryParams } from "../types";
import { validationResult, matchedData } from "express-validator";
import createHttpError from "http-errors";
import { Logger } from "winston";

export class UserController {
    constructor(
        private userService: UserService,
        private logger: Logger,
    ) {}

    async create(req: ICreateUserRequest, res: Response, next: NextFunction) {
        //validation
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return next(createHttpError(400, result.array()));
        }

        const { firstName, lastName, email, password, role, tenantId } =
            req.body;

        try {
            const user = await this.userService.create({
                firstName,
                lastName,
                email,
                password,
                role,
                tenantId,
            });

            res.status(201).json({ id: user.id });
        } catch (error) {
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const validatedQuery = matchedData(req, { onlyValidData: true });
            const [users, count] = await this.userService.getAll(
                validatedQuery as UserQueryParams,
            );
            this.logger.info("All users have been fetched");
            res.json({
                currentPage: validatedQuery.currentPage as number,
                perPage: validatedQuery.perPage as number,
                total: count,
                data: users,
            });
        } catch (err) {
            next(err);
        }
    }
    async getOne(req: Request, res: Response, next: NextFunction) {
        const userId = req.params.id;

        if (isNaN(Number(userId))) {
            next(createHttpError(400, "Invalid url param."));
            return;
        }

        try {
            const user = await this.userService.findById(Number(userId));

            if (!user) {
                next(createHttpError(400, "User does not exist."));
                return;
            }

            this.logger.info("User has been fetched", { id: user.id });
            res.json(user);
        } catch (err) {
            next(err);
        }
    }

    async update(req: ICreateUserRequest, res: Response, next: NextFunction) {
        // In our project: We are not allowing user to change the email id since it is used as username
        // In our project: We are not allowing admin user to change others password

        const { firstName, lastName, role, email, tenantId } = req.body;
        const userId = req.params.id;

        if (isNaN(Number(userId))) {
            next(createHttpError(400, "Invalid url param."));
            return;
        }

        this.logger.debug("Request for updating a user", req.body);

        try {
            await this.userService.update(Number(userId), {
                firstName,
                lastName,
                role,
                email,
                tenantId,
            });

            this.logger.info("User has been updated", { id: userId });

            res.json({ id: Number(userId) });
        } catch (err) {
            next(err);
        }
    }

    async destroy(req: Request, res: Response, next: NextFunction) {
        const userId = req.params.id;

        if (isNaN(Number(userId))) {
            next(createHttpError(400, "Invalid url param."));
            return;
        }

        try {
            await this.userService.deleteById(Number(userId));

            this.logger.info("User has been deleted", {
                id: Number(userId),
            });
            res.json({ id: Number(userId) });
        } catch (err) {
            next(err);
        }
    }
}

export default UserController;
