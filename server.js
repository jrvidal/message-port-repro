const express = require('express');

const app = express();

app.use((req, res, next) => {
  console.info(req.originalUrl, req.headers.host);
  next();
});

app.use((_, res, next) => {
  res.set('Cross-Origin-Embedder-Policy', 'require-corp');
  res.set('Cross-Origin-Resource-Policy', 'cross-origin');
  res.set('Cross-Origin-Opener-Policy', 'same-origin');
  res.set('Access-Control-Allow-Origin', '*');

  next();
});

app.use(express.static('public'));

app.listen(3300, '0.0.0.0', (err) => {
  if (err) throw err;

  console.log('Listening on 3300');
});
