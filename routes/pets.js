const express = require('express');
const Pet = require('../db/models/Pet.js');
const _ = require('lodash');
const { protect } = require('../util');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const pets = await Pet.findAll();
    res.json(pets);
  } catch (e) {
    next(e);
  }
});

router.post('/', protect, async (req, res, next) => {
  try {
    const id = await Pet.create(req.body);
    res.status(201).json(id);
  } catch (e) {
    next(e);
  }
});

router.post('/:id/like', protect, async (req, res, next) => {
  try {
    await Pet.like(Number(req.params.id), req.userId);
    res.sendStatus(201);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
