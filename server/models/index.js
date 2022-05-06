'use strict';

const { Sequelize, DataTypes } = require('sequelize');

const messageModel = require('./todo');

// This will assign the Heroku-specific configs if the database is deployed.
const sequelizeConfig = process.env.DATABASE_URL ?
  {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      }, 
    },
  } :
  {};

const dbUrl = process.env.DATABASE_URL || 'sqlite:todoDb';

const sequelize = new Sequelize(dbUrl, sequelizeConfig);

module.exports = {
  contentSequelize: sequelize,
  messages: messageModel(sequelize, DataTypes),
};
