const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();
const Task = require('../models/Task');
const JWT_SECRET = 'tes+^%+^&+%/ta^+sda%^sd&&%68adasdad_131ı4u3128++!as28+%dsa%+dasd';

/* GET -- List all data */
router.get('/all', function (req, res, next) {
  if (!jwt.verify(req.headers.token, JWT_SECRET)) {
    res.json({ error: 'Authentication Failed' });
  }

  const userPayload = jwt.decode(req.headers.token);

  console.log(userPayload);

  Task.find({ email: userPayload.email }, (err, tasks) => {
    if (err)
      res.json(err);

    res.json(tasks);

  })
});

/* POST -- Create Task */
router.post('/createTask', function (req, res, next) {
  if (!jwt.verify(req.headers.token, JWT_SECRET)) {
    res.json({ error: 'Authentication Failed' });
  }

  const userPayload = jwt.decode(req.headers.token);

  const { title, description } = req.body;

  const task = new Task({
    title: title,
    description: description,
    email: userPayload.email
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