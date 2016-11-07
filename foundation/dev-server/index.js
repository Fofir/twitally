import express from 'express';
import bodyParser from 'body-parser';
import graphQLHandler from '../../graphql';

const APP_PORT = 3001;
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(new Date(), req.method, req.url);
  next();
});

app.post('/api/graphql', (req, res) => {
  graphQLHandler(req.body.query, req.body.variables)
    .then(result => {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify(result, null, 2));
    })
    .catch(err => res.end(err));
});

app.listen(APP_PORT, (err) => {
  if (err) console.log(err);
  console.log(`App is now running on http://localhost:${APP_PORT}`);
});
