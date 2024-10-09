import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

import { CreateUserDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import { UserService } from '@services/users.service';
import { PaginationDto } from '@dtos/pagination.dto';

export class UserController {
  public user = Container.get(UserService);

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.query as unknown as PaginationDto;
      const { users, total } = await this.user.findAllUser(query);

      res.status(200).json({ data: users, total });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = +req.params.id;
      const findOneUserData: User = await this.user.findUserById(userId);

      res.status(200).json({ data: findOneUserData });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const createUserData: User = await this.user.createUser(userData);

      res.status(201).json({ data: createUserData });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async ({ params, body }: Request, res: Response, next: NextFunction) => {
    try {
      const userId = +params.id;
      const userData: CreateUserDto = body;
      const updateUserData: User = await this.user.updateUser(userId, userData);

      res.status(200).json({ data: updateUserData });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.id);
      const deleteUserData: User = await this.user.deleteUser(userId);

      res.status(200).json({ data: deleteUserData });
    } catch (error) {
      next(error);
    }
  };
}
