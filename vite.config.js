import { defineConfig } from 'vite';
import { readFile } from 'node:fs/promises';
export default defineConfig({
  base: process.env.SITE_BASE_PATH || '/',
  plugins: [{
    name:'serve-prerendered-pages',
    configurePreviewServer(server) {
      server.middlewares.use(async (req,res,next) => {
        const routes = { '/menu':'menu', '/menu/':'menu', '/contact':'contact', '/contact/':'contact' };
        const base = (process.env.SITE_BASE_PATH || '/').replace(/\/$/,'');
        const requestPath = req.url?.split('?')[0];
        const page = routes[base && requestPath?.startsWith(base) ? requestPath.slice(base.length) : requestPath];
        if(!page) return next();
        try {
          const html = await readFile(new URL(`./dist/${page}/index.html`,import.meta.url));
          res.setHeader('Content-Type','text/html; charset=utf-8');
          res.end(html);
        } catch(error) { next(error); }
      });
    }
  }]
});
