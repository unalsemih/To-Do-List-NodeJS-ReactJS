const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

/* GET -- List all data */
router.get('/all', function (req, res, next) {
  Task.find({}, (err, tasks) => {
    if (err)
      res.json(err);


      //res.render("list",{newListItems:f});

      //res.render("list",{newListItems:tasks});

    res.json(tasks);

  })
});

/* POST -- Create Task */
router.post('/createTask', function (req, res, next) {
  const { title, description } = req.body;

  const task = new Task({
    title: title,
    description: description
  });

  task.save((err, data) => {
    if (err)
      res.json(err);

    res.json(data);
  });
});

/* DELETE -- Delete data */
router.delete('/delete', function (req, res, next) {
  Task.find({ _id: req.body.id }).remove((err, data) => {
    if (err)
      res.json(err);

    res.json(data);
  });
});

/* UPDATE -- Update data */
router.put('/update', function (req, res, next) {
  Task.findOneAndUpdate({ '_id': req.body.id }, req.body, { upsert: true }, (err, data) => {
    if (err)
      res.json(err);

    res.json(data);
  });
});

module.exports = router;