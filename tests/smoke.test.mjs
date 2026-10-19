import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const fail = (msg) => {
  console.error(`FAIL ${msg}`);
  process.exitCode = 1;
};
const ok = (msg) => console.log(`OK ${msg}`);

const requiredFiles = [
  'index.html',
  'src/main.js',
  'src/styles.css',
  'package.json',
  'vite.config.js',
  'public/assets/diarypic.png',
  'public/assets/1778536504558493.mp4',
  'public/assets/rntllogo.svg'
];

for (const file of requiredFiles) {
  const path = resolve(root, file);
  existsSync(path) ? ok(file) : fail(`missing ${file}`);
}

const index = readFileSync(resolve(root, 'index.html'), 'utf8');
for (const id of ['hero', 'about', 'experience', 'vending', 'gallery', 'contact', 'sound-toggle', 'main-nav', 'dissect-modal']) {
  index.includes(`id="${id}"`) ? ok(`#${id}`) : fail(`missing #${id}`);
}

index.includes('chhabragranth22@gmail.com') ? ok('contact email') : fail('missing contact email');

const vite = readFileSync(resolve(root, 'vite.config.js'), 'utf8');
vite.includes('.monkeycode-ai.live') ? ok('allowedHosts') : fail('missing allowedHosts');

const assets = readdirSync(resolve(root, 'public/assets'));
assets.length >= 90 ? ok(`${assets.length} assets`) : fail(`only ${assets.length} assets`);

if (process.exitCode) {
  console.error('smoke tests failed');
} else {
  console.log('smoke tests passed');
}
