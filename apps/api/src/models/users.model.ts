import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { User } from '@interfaces/users.interface';
import { UserProfile } from '@interfaces/users-profile.interface';

export type UserCreationAttributes = Optional<User & { profile: UserProfile }, 'id'>;

export class UserModel extends Model<User, UserCreationAttributes> implements User {
  public id: number;
  public email: string;
  public first_name: string;
  public last_name: string;

  public profile?: UserProfile;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof UserModel {
  UserModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(45),
        unique: true,
      },
      first_name: {
        allowNull: false,
        type: DataTypes.STRING(30),
      },
      last_name: {
        allowNull: false,
        type: DataTypes.STRING(30),
      },
    },
    {
      tableName: 'users',
      sequelize,
    },
  );

  return UserModel;
}
