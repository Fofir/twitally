'use strict'; // eslint-disable-line strict

const handle = require('./graphql/index').default;

module.exports.graphql = (event, context, callback) => {
  const body = JSON.parse(event.body);
  handle(body.query, body.variables).then((response) => {
    callback(null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(response),
    });
  })
  .catch((error) => callback(error));
};
