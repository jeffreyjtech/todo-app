'use strict';

const express = require('express');
const router = express.Router();
const { todoModel } = require('./models');

const bearerAuth = require('./auth/middleware/bearer.js');
const accessAuth = require('./auth/middleware/access.js');

router.post('/todo', bearerAuth, async (req, res, next) => {
  try {
    if (!req.body) throw new Error('No req.body');
    let newRecord = await todoModel.create({ 
      ...req.body,
      author: req.user.username,
    });

    res.status(201).json(newRecord);
  } catch (error) {
    console.error(error);
    next(error);
  }

});

router.get('/todo', bearerAuth, async (req, res, next) => {
  try {
    let records = await todoModel.findAll({});
    res.status(200).json(records);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/todo/:id', bearerAuth, async (req, res, next) => {
  try {
    let record = await todoModel.findOne({ where: { id: req.params.id } });
    if (!record) throw new Error('Record not found');
    res.status(200).json(record);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.put('/todo/:id', bearerAuth, accessAuth, async (req, res, next) => {
  try {
    let record = await todoModel.update(req.body, { where: { id: req.params.id } });
    if (record[0] === 0) {
      throw new Error('Record not found');
    }
    let updatedRecord = await todoModel.findOne({ where: { id: req.params.id } });
    res.status(200).json(updatedRecord);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/todo/:id', bearerAuth, accessAuth, async (req, res, next) => {
  try {
    let deletedRecord = await todoModel.findOne({ where: { id: req.params.id } });
    if (deletedRecord) {
      await todoModel.destroy({ where: { id: req.params.id } });
      res.status(204).send('Todo Item Deleted');
    } else {
      throw new Error('Record not found');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
