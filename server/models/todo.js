

const todoModel = (sequelize, DataTypes) => {
  const model = sequelize.define('todo', {
    author: { type: DataTypes.STRING, allowNull: false },
    text: { type: DataTypes.STRING, allowNull: false },
    assignee: { type: DataTypes.STRING, allowNull: true },
    complete: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
  });

  return model;
};

module.exports = todoModel;
