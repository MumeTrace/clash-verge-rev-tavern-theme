import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const privateBuild = process.argv.includes('--private');
const partNames = [
  '00-variables.css',
  '01-background.css',
  '02-sidebar.css',
  '03-traffic-chibi.css',
  '04-titlebar-controls.css',
  '05-node-cards.css',
  '06-panels-overlays.css',
];

const header = `/*
 * Clash Verge Rev v2.5.2 - Warm Tavern Theme
 * Generated file: edit parts/*.css and run npm run build.
 * Selectors use stable application classes, MUI component classes, data attributes, and DOM structure.
 */\n\n`;

const sections = await Promise.all(
  partNames.map(async (name) => {
    const content = await readFile(join(root, 'parts', name), 'utf8');
    return `/* ===== ${name} ===== */\n${content.trimEnd()}`;
  }),
);

let output = `${header}${sections.join('\n\n')}\n`;
let outputName = 'clash-verge-tavern-theme.css';

if (privateBuild) {
  const configPath = join(root, 'theme.private.json');
  let config;

  try {
    config = JSON.parse(await readFile(configPath, 'utf8'));
  } catch (error) {
    throw new Error(
      `Cannot read theme.private.json. Copy theme.private.example.json first. ${error.message}`,
    );
  }

  const mappings = [
    ['mainImageUrl', '--tavern-main-image'],
    ['sidebarImageUrl', '--tavern-sidebar-image'],
    ['chibiImageUrl', '--tavern-chibi-image'],
  ];

  for (const [key, variable] of mappings) {
    const value = config[key];
    if (typeof value !== 'string' || value.trim() === '') {
      throw new Error(`${key} must be a non-empty string in theme.private.json.`);
    }

    const escaped = value.trim().replaceAll('\\', '\\\\').replaceAll('"', '\\"');
    output = output.replace(`${variable}: none;`, `${variable}: url("${escaped}");`);
  }

  outputName = 'clash-verge-tavern-theme.private.css';
}

const outputPath = join(root, outputName);
await writeFile(outputPath, output, 'utf8');
console.log(`Built ${outputPath}`);
