import { readFile } from 'node:fs/promises';

import { chromium } from 'playwright';

const icons = [
  { source: 'public/pwa-192.svg', output: 'public/pwa-192.png', size: 192 },
  { source: 'public/pwa-512.svg', output: 'public/pwa-512.png', size: 512 },
];

const browser = await chromium.launch({ headless: true });
try {
  for (const icon of icons) {
    const page = await browser.newPage({ viewport: { width: icon.size, height: icon.size } });
    const svg = await readFile(icon.source, 'utf8');
    await page.setContent(
      `<style>html,body{margin:0;width:100%;height:100%;overflow:hidden}svg{display:block;width:100%;height:100%}</style>${svg}`,
    );
    await page.screenshot({ path: icon.output, omitBackground: true });
    await page.close();
  }
} finally {
  await browser.close();
}

console.log('Rendered 192px and 512px PWA PNG icons.');
