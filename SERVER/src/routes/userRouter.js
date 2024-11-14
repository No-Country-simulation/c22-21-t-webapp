const { getAll } = require('../controllers/userController');
const express = require('express');

const userRouter = express.Router();

userRouter.route('/users')
    .get(getAll)

module.exports = userRouter;
