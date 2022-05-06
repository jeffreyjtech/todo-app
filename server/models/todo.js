'use strict';

const todoModel = (sequelize, DataTypes) => {
  const model = sequelize.define('todo', {
    author: { type: DataTypes.STRING, allowNull: false },
    body: { type: DataTypes.STRING, allowNull: false },
    length: { type: DataTypes.INTEGER, allowNull: false },
  });

  return model;
};

module.exports = todoModel;
