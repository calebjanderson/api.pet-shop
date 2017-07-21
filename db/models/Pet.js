const db = require('../db');
const _ = require('lodash');

const getPetIdAndIncrement = async () => {
  const counters = await db.read('counters');
  const petId = counters.petId++;

  await db.write('counters', counters);

  return petId;
};

exports.findAll = async () => {
  return await db.read('pets');
};

exports.create = async pet => {
  const [pets, petId] = await Promise.all([
    db.read('pets'),
    getPetIdAndIncrement()
  ]);

  if (!pet.name || !pet.species || !pet.imageUrl) {
    throw new Error('Not a valid pet object');
  }

  pet.id = petId;
  pet.likes = [];
  pets.push(_.pick(pet, ['name', 'species', 'imageUrl', 'likes', 'id']));

  await db.write('pets', pets);

  return petId;
};

exports.like = async (id, userId) => {
  const pets = await db.read('pets');

  pets.forEach(pet => {
    if (pet.id === id) {
      pet.likes = _.union(pet.likes, [userId]);
    }
  });

  await db.write('pets', pets);
};
