import { Service } from 'typedi';
import { DB } from '@database';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@/exceptions/httpException';
import { User } from '@interfaces/users.interface';
import { UserProfileModel } from '@models/users-profiles.model';
import { PaginationDto } from '@dtos/pagination.dto';

@Service()
export class UserService {
  public async findAllUser({ limit, offset }: PaginationDto): Promise<{ users: User[]; total: number }> {
    const allUser = await DB.Users.findAndCountAll({
      include: [{ model: UserProfileModel, as: 'profile' }],
      limit,
      offset,
    });
    return {
      users: allUser.rows,
      total: allUser.count,
    };
  }

  public async findOne(userId: number): Promise<User> {
    const findUser: User = await DB.Users.findByPk(userId, {
      include: [{ model: UserProfileModel, as: 'profile' }],
    });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async findUserById(userId: number): Promise<User> {
    const findUser: User = await DB.Users.findByPk(userId, {
      include: [{ model: UserProfileModel, as: 'profile' }],
    });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    const findUser: User = await DB.Users.findOne({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const createUserData: User = await DB.Users.create(userData, {
      include: [
        {
          model: UserProfileModel,
          as: 'profile',
        },
      ],
    });
    return createUserData;
  }

  public async updateUser(userId: number, { profile, ...userData }: CreateUserDto): Promise<User> {
    // Find the existing user
    const user = await DB.Users.findByPk(userId);
    if (!user) throw new HttpException(409, "User doesn't exist");

    // Start a transaction
    const transaction = await DB.sequelize.transaction();

    try {
      // Update user data if provided
      if (Object.keys(userData).length > 0) {
        await DB.Users.update(userData, { where: { id: userId }, transaction });
      }
      console.info(`User ${userId} updated successfully`);
      // Upsert profile data if provided
      if (profile && Object.keys(profile).length > 0) {
        await DB.UsersProfiles.update(
          { ...profile, user_id: userId },
          {
            where: {
              user_id: userId,
            },
            transaction,
          },
        );
      }

      // Commit the transaction
      await transaction.commit();

      // Fetch the updated user
      const updatedUser: User = await DB.Users.findByPk(userId, {
        include: [{ model: UserProfileModel, as: 'profile' }],
      });
      return updatedUser;
    } catch (error) {
      // Rollback the transaction on error
      await transaction.rollback();
      throw error;
    }
  }

  public async deleteUser(userId: number): Promise<User> {
    const findUser: User = await DB.Users.findByPk(userId);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    await DB.Users.destroy({ where: { id: userId } });

    return findUser;
  }
}
