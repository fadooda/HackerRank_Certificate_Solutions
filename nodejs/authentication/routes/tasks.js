var express = require('express');
var router = express.Router();
var tasksController = require('../controllers/tasks.controller');
var middleware = require('../middleware');

router
    .get('/',
        middleware(''),
        tasksController.get)
    .post('/',
        middleware('tasks.create'),
        tasksController.create)
    .get('/:id',
        middleware('tasks.getById'),
        tasksController.getById);

module.exports = router;
