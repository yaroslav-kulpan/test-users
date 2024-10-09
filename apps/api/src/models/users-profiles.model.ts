import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

import { GenderEnum, UserProfile } from '@interfaces/users-profile.interface';

export type UserProfileCreationAttributes = Optional<UserProfile, 'id'>;

export class UserProfileModel extends Model<UserProfile, UserProfileCreationAttributes> implements UserProfile {
  public id: number;

  public height: number;
  public weight: number;
  public age: number;

  public user_id: number;
  public gender: GenderEnum;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof UserProfileModel {
  UserProfileModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      age: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      height: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      gender: {
        allowNull: false,
        type: DataTypes.ENUM(...Object.values(GenderEnum)),
      },
      weight: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: 'user_profiles',
      sequelize,
    },
  );

  return UserProfileModel;
}
