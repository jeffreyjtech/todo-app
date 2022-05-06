'use strict';

// Import todo item model
const { todoModel } = require('../../models');

module.exports = async (req, res, next) => {
  try {
    const foundTodo = await todoModel.findOne({ where: { id: req.params.id } });

    if (!foundTodo) throw new Error('Todo item not found');

    // req.user has all the user info from bearerAuth middleware
    // Including the user's verified role and username
    if (req.user.username === foundTodo.author || req.user.role === 'admin') {
      next();
    } else {
      // throw an error 
      let error = new Error('You cannot modify another user\'s content');
      error.status = 403;
      next(error);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }

};
