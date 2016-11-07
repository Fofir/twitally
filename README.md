# Twitally

Twitter query tally display

## description

The application consists of an API and a client side application:

1. API - A single endpoint for a Serverless Lambda function which uses a GraphQL on top of a twitter API fetch to the  `GET search/tweets` endpoint.
2. Client - Simple react-redux application created with create-react-app. It asks for the tweets from the API endpoint, tallies them and displays them in a table.


### setup

`$ npm i && cd app && npm i && cd ..`

### development

`$ npm run dev`

### deployment

`$npm run deploy`