import { test } from 'node:test';
import assert from 'node:assert/strict';
import { withSiteBase, sitePath } from '../src/paths.js';
test('Deployment prefix covers internal links and every responsive image candidate', () => {
  const result = withSiteBase('<a href="/menu">Menu</a><img src="/assets/a.webp" srcset="/assets/a-640.avif 640w, /assets/a.avif 960w"><a href="https://example.com">External</a>');
  assert.ok(result.includes(`href="${sitePath('/menu')}"`));
  assert.ok(result.includes(`${sitePath('/assets/a-640.avif')} 640w, ${sitePath('/assets/a.avif')} 960w`));
  assert.ok(result.includes('href="https://example.com"'));
});
