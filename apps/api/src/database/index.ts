import Sequelize from 'sequelize';
import { NODE_ENV, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } from '@config';
import { logger } from '@utils/logger';
import { initSequelizeModels } from '@/database/init-sequelize-models';

const URI = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

const sequelize = new Sequelize.Sequelize(URI, {
  dialect: 'postgres',
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    underscored: true,
    freezeTableName: true,
  },
  pool: {
    min: 0,
    max: 5,
  },
  logQueryParameters: NODE_ENV === 'development',
  logging: (query, time) => {
    logger.info(time + 'ms' + ' ' + query);
  },
  benchmark: true,
});

sequelize
  .authenticate()
  .then(() => {
    console.log('DB connection established successfully');
  })
  .catch(err => {
    console.log('Unable to connect to DB', err);
  });

export const DB = {
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
  ...initSequelizeModels(sequelize),
};
