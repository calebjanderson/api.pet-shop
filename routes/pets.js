const express = require('express');
const Pet = require('../models/Pet.js');
const _ = require('lodash');
const { protect } = require('../session');
const router = express.Router();

router.get('/', (req, res, next) => {
  Pet.find({})

  .then(pets => {
    res.json(pets.map((pet) => _.pick(pet, ['id', 'name', 'species', 'likes', 'imageUrl'])));
  })

  .catch(err => {
    next(err);
  });
});

router.post('/', protect, (req, res, next) => {
  const newPet = _.pick(req.body, ['name', 'species', 'imageUrl']);

  Pet.create(newPet)

  .then(() => {
    res.sendStatus(201);
  })

  .catch(err => {
    next(err);
  });
});

router.post('/:id/like', protect, (req, res, next) => {

  Pet.findOneAndUpdate({ id: req.params.id }, { $addToSet: { likes: req.userId }})

  .then(pet => {
    res.sendStatus(201);
  })

  .catch(err => {
    next(err);
  });
});

module.exports = router;
