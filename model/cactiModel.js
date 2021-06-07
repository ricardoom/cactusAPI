const cacti = require('../data/cacti.json');

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
module.exports = {
  findAll,
  findCactusById,
};
