import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const products = require('./mockData.json');

export const fetchProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 500);
  });
}
