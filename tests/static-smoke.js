const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const requiredFiles = [
  'index.html',
  'home-intelligence-pro.html',
  'area-intelligence.html',
  'mortgage-watch.html',
  'decision-engine.html',
  'buyer-pack-pro.html',
  'docs/uk-home-intelligence-pro.md',
  'data/rate_history.csv',
  'data/last_rate.json',
];

function read(file) {
  const fullPath = path.join(root, file);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Missing required file: ${file}`);
  }
  return fs.readFileSync(fullPath, 'utf8');
}

function assertIncludes(file, text, expected) {
  if (!text.includes(expected)) {
    throw new Error(`${file} does not include expected text: ${expected}`);
  }
}

for (const file of requiredFiles) {
  read(file);
}

const shell = read('home-intelligence-pro.html');
[
  './index.html',
  './area-intelligence.html',
  './mortgage-watch.html',
  './decision-engine.html',
  './buyer-pack-pro.html',
].forEach(link => assertIncludes('home-intelligence-pro.html', shell, link));

const area = read('area-intelligence.html');
assertIncludes('area-intelligence.html', area, 'areaIntel');
assertIncludes('area-intelligence.html', area, 'api.postcodes.io');
assertIncludes('area-intelligence.html', area, 'data.police.uk');
assertIncludes('area-intelligence.html', area, 'nomisweb.co.uk');

const mortgage = read('mortgage-watch.html');
assertIncludes('mortgage-watch.html', mortgage, 'data/rate_history.csv');
assertIncludes('mortgage-watch.html', mortgage, 'lockSignal');

const buyerPack = read('buyer-pack-pro.html');
assertIncludes('buyer-pack-pro.html', buyerPack, 'uk-home-hub');
assertIncludes('buyer-pack-pro.html', buyerPack, 'Download Markdown');

const csv = read('data/rate_history.csv').trim().split(/\r?\n/);
if (csv.length < 2) {
  throw new Error('data/rate_history.csv must contain a header and at least one row');
}
assertIncludes('data/rate_history.csv header', csv[0], 'best_rate');

JSON.parse(read('data/last_rate.json'));

console.log('Static smoke checks passed.');
