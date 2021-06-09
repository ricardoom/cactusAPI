const Cacti = require('../model/cactiModel');
const { getPostData } = require('../utility');
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

// @desc Create a cactus
// @route POST /api/cacti
async function createCactus(req, res) {
  try {
    const body = await getPostData(req);
    const { commonName, genus, subfamily, tribe, url } = JSON.parse(body);
    const cactus = {
      commonName,
      genus,
      subfamily,
      tribe,
      url,
    };

    const newCactus = await Cacti.create(cactus);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(newCactus));
  } catch (error) {
    console.error("post function didn't work, done fucked up");
  }
}

// @desc Update a cactus
// @route PUT /api/cacti/:id
async function updateCactus(req, res, id) {
  try {
    const cactus = await Cacti.findCactusById(id);
    if (!cactus) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Cactus done not done found' }));
    } else {
      const body = await getPostData(req);

      const { commonName, genus, subfamily, tribe, url } = JSON.parse(body);

      const cactusData = {
        commonName: commonName || cactus.commonName,
        genus: genus || cactus.genus,
        subfamily: subfamily || cactus.subfamily,
        tribe: tribe || cactus.tribe,
        url: url || cactus.url,
      };

      const updatedCactus = await Cacti.update(id, cactusData);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(updatedCactus));
    }
  } catch (error) {
    console.error("update function didn't work. damn, thats fucked up");
  }
}

// @desc Delete a cactus
// @route DELETe /api/cacti/:id
async function deleteCactus(req, res, id) {
  try {
    const cactus = await Cacti.findCactusById(id);
    if (!cactus) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'these are not the cactus you are looking for' }));
    } else {
      await Cacti.remove(id);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: `Cactus: ${id} had done be deleted cabron!` }));
    }
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  getCacti,
  getCactus,
  createCactus,
  updateCactus,
  deleteCactus,
};
