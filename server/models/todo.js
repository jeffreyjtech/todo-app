

const todoModel = (sequelize, DataTypes) => {
  const model = sequelize.define('todo', {
    author: { type: DataTypes.STRING, allowNull: false },
    text: { type: DataTypes.STRING, allowNull: false },
    assignee: { type: DataTypes.STRING, allowNull: false },
    complete: { type: DataTypes.BOOLEAN, default: false, allowNull: false },
  });

  return model;
};

module.exports = todoModel;
