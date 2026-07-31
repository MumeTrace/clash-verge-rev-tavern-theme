import { execFileSync } from 'node:child_process';
import { readFile, readdir } from 'node:fs/promises';
import { dirname, extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const publicCssFiles = [
  join(root, 'clash-verge-tavern-theme.css'),
  ...((await readdir(join(root, 'parts')))
    .filter((name) => name.endsWith('.css'))
    .map((name) => join(root, 'parts', name))),
];

const forbiddenCssPatterns = [
  ['dynamic MUI hash selector', /\.css-[a-zA-Z0-9_-]+/],
  ['global forced text color', /^\s*\*\s*\{[^}]*\bcolor\s*:/ms],
  ['global MuiBox background reset', /^\s*\.MuiBox-root\s*\{[^}]*background/ms],
  ['public image URL', /(?:https?:|data:)\/\/|data:image|\burl\s*\(/i],
];

for (const file of publicCssFiles) {
  const css = await readFile(file, 'utf8');
  for (const [label, pattern] of forbiddenCssPatterns) {
    if (pattern.test(css)) {
      throw new Error(`${relative(root, file)} contains forbidden ${label}.`);
    }
  }
}

const tracked = execFileSync('git', ['ls-files', '-z'], {
  cwd: root,
  encoding: 'utf8',
})
  .split('\0')
  .filter(Boolean);

const privateExtensions = new Set([
  '.avif', '.bmp', '.gif', '.heic', '.jpeg', '.jpg', '.png', '.tif', '.tiff', '.webp',
]);
const trackedImages = tracked.filter((path) => privateExtensions.has(extname(path).toLowerCase()));

if (trackedImages.length > 0) {
  throw new Error(`Private image files are tracked: ${trackedImages.join(', ')}`);
}

console.log(`Static policy checks passed for ${publicCssFiles.length} CSS files.`);
