'use strict';

// Import message model
const { todoModel } = require('../../models');

module.exports = async (req, res, next) => {
  try {
    const foundMessage = await todoModel.findOne({ where: { id: req.params.id } });

    if (!foundMessage) throw new Error('Message not found');

    // req.user has all the user info from bearerAuth middleware
    // Including the user's verified role and username
    if (req.user.username === foundMessage.author || req.user.role === 'admin') {
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
