const express = require('express');
const Pet = require('../models/Pet.js');
const { protect } = require('../session');
const router = express.Router();

router.get('/', (req, res, next) => {

});

router.post('/', protect, (req, res, next) => {

});

router.post('/:id/like', protect, (req, res, next) => {

});

module.exports = router;
