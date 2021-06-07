const Cacti = require('../model/cactiModel');

// @desc Gets all Products
// @route GET /api/cacti
async function getCacti(req, res) {
  try {
    const cacti = await Cacti.findAll();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(cacti));
  } catch (error) {
    console.error('done fucked up');
  }
}

// @desc Gets single cactus
// @route GET /api/cacti/:id
async function getCactus(req, res, id) {
  try {
    const cactus = await Cacti.findCactusById(id);
    if (!cactus) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'these are not the cactus you are looking for' }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(cactus));
    }
  } catch (error) {
    console.error('done fucked up');
  }
}

module.exports = {
  getCacti,
  getCactus,
};
