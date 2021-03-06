// const Cacti = require('../model/cactiModel');
import {
  findAll,
  findCactusById,
  create,
  update,
  remove,
} from '../model/cactiModel.js';

import { getPostData } from '../utility.js';

// @desc Gets all Products
// @route GET /api/cacti
export async function getCacti(req, res) {
  try {
    const cacti = await findAll();
    // res.header('Access-Control-Allow-Origin', 'http://localhost:1234');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(cacti));
    console.log(req);
  } catch (error) {
    console.error('getCacti done fucked up');
  }
}

// @desc Gets single cactus
// @route GET /api/cacti/:id
export async function getCactus(req, res, id) {
  try {
    const cactus = await findCactusById(id);
    if (!cactus) {
      // res.header('Access-Control-Allow-Origin', '*');
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          message: 'these are not the cactus you are looking for',
        })
      );
    } else {
      // res.header('Access-Control-Allow-Origin', '*');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(cactus));
    }
  } catch (error) {
    console.error('getCactus (cactiControl) done fucked up', error);
  }
}

// @desc Create a cactus
// @route POST /api/cacti
export async function createCactus(req, res) {
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

    const newCactus = await create(cactus);
    // res.header('Access-Control-Allow-Origin', '*');
    res.writeHead(201, { 'Content-Type': 'application/json' });

    return res.end(JSON.stringify(newCactus));
  } catch (error) {
    const errorMessage =
      'CreateCactus Post Function done did not work... done dazzled';
    console.error(errorMessage);
  }
}

// @desc Update a cactus
// @route PUT /api/cacti/:id
export async function updateCactus(req, res, id) {
  try {
    const cactus = await findCactusById(id);
    if (!cactus) {
      res.header('Access-Control-Allow-Origin', '*');
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

      const updatedCactus = await update(id, cactusData);

      res.header('Access-Control-Allow-Origin', '*');
      res.writeHead(200, { 'Content-Type': 'application/json' });

      return res.end(JSON.stringify(updatedCactus));
    }
  } catch (error) {
    console.error('updateCactus function did not work. damn, thats fucked up');
  }
}

// @desc Delete a cactus
// @route DELETe /api/cacti/:id
export async function deleteCactus(req, res, id) {
  try {
    const cactus = await findCactusById(id);
    if (!cactus) {
      res.header('Access-Control-Allow-Origin', '*');
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          message: 'these are not the cactus you are looking for',
        })
      );
    } else {
      await remove(id);
      res.header('Access-Control-Allow-Origin', '*');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({ message: `Cactus: ${id} had done be deleted cabron!` })
      );
    }
  } catch (error) {
    console.log(error);
  }
}

// export async function getLocation(req, res) {
//   if (!cactus) {
//   }
// }
