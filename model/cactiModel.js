import cacti from '../data/cacti.json';

import { v4 as uuidv4 } from 'uuid';
import { writeDataToFile } from '../utility.js';

export function findAll() {
  return new Promise((resolve, reject) => {
    // console.log(cacti);
    resolve(cacti);
  });
}

export function findCactusById(id) {
  return new Promise((resolve, reject) => {
    const cactus = cacti.find((c) => c.id === id);
    resolve(cactus);
  });
}

export function create(cactus) {
  return new Promise((resolve, reject) => {
    const newCactus = { id: uuidv4(), ...cactus };
    cacti.push(newCactus);
    writeDataToFile('./data/cacti.json', cacti);
    resolve(newCactus);
  });
}

export function update(id, cactus) {
  return new Promise((resolve, reject) => {
    const index = cacti.findIndex((c) => c.id === id);
    cacti[index] = { id, ...cactus };
    writeDataToFile('./data/cacti.json', cacti);
    resolve(cacti[index]);
  });
}

export function remove(id) {
  return new Promise((resolve, reject) => {
    cacti = cacti.filter((c) => c.id !== id);
    writeDataToFile('./data/cacti.json', cacti);
    resolve();
  });
}
