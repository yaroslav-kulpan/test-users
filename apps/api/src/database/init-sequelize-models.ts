import { Sequelize } from 'sequelize';
import UserModel from '@models/users.model';
import UserProfileModel from '@models/users-profiles.model';

export function initSequelizeModels(sequelize: Sequelize) {
  const Users = UserModel(sequelize);
  const UsersProfiles = UserProfileModel(sequelize);

  Users.hasOne(UsersProfiles, {
    foreignKey: 'user_id',
    as: 'profile',
  });

  UsersProfiles.belongsTo(Users, {
    foreignKey: 'id',
    as: 'user',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  return {
    Users,
    UsersProfiles,
  };
}
