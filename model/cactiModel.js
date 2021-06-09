let cacti = require('../data/cacti.json');

const { v4: uuidv4 } = require('uuid');
const { writeDataToFile } = require('../utility');

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(cacti);
  });
}

function findCactusById(id) {
  return new Promise((resolve, reject) => {
    const cactus = cacti.find((c) => c.id === id);
    resolve(cactus);
  });
}

function create(cactus) {
  return new Promise((resolve, reject) => {
    const newCactus = { id: uuidv4(), ...cactus };
    cacti.push(newCactus);
    writeDataToFile('./data/cacti.json', cacti);
    resolve(newCactus);
  });
}

function update(id, cactus) {
  return new Promise((resolve, reject) => {
    const index = cacti.findIndex((c) => c.id === id);
    cacti[index] = { id, ...cactus };
    writeDataToFile('./data/cacti.json', cacti);
    resolve(cacti[index]);
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    cacti = cacti.filter((c) => c.id !== id);
    writeDataToFile('./data/cacti.json', cacti);

    resolve();
  });
}

module.exports = {
  findAll,
  findCactusById,
  create,
  update,
  remove,
};
