import { Router } from 'express';
import { UserController } from '@controllers/users.controller';
import { CreateUserDto, UserIdDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { PaginationDto } from '@dtos/pagination.dto';

export class UserRoute implements Routes {
  public path = '/users';
  public router = Router();
  public user = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      ValidationMiddleware({
        type: PaginationDto,
        target: 'query',
      }),
      this.user.getUsers,
    );
    this.router.get(
      `${this.path}/:id(\\d+)`,
      ValidationMiddleware({
        type: UserIdDto,
        target: 'params',
      }),
      this.user.getUserById,
    );
    this.router.post(
      `${this.path}`,
      ValidationMiddleware({
        type: CreateUserDto,
      }),
      this.user.createUser,
    );
    this.router.put(
      `${this.path}/:id(\\d+)`,
      ValidationMiddleware({
        type: CreateUserDto,
      }),
      this.user.updateUser,
    );
    this.router.delete(
      `${this.path}/:id(\\d+)`,
      ValidationMiddleware({
        type: UserIdDto,
        target: 'params',
      }),
      this.user.deleteUser,
    );
  }
}
