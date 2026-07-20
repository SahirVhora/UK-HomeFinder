import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const appUrl = new URL('../index.html', import.meta.url);

test('GitHub Pages sold-price search is disabled without an explicit HTTPS backend', async () => {
  const source = await readFile(appUrl, 'utf8');

  assert.match(source, /<meta name="price-api-base" content="">/);
  assert.match(source, /const PRICE_API_BASE\s*=\s*document\.querySelector\(['"]meta\[name="price-api-base"\]['"]\)/);
  assert.match(source, /if\(!isConfiguredPriceApi\(\)\)\{\s*showPricePaidFallback\(\);\s*return;/);
  assert.doesNotMatch(source, /localhost:8080/);
});
