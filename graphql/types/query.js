import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
} from 'graphql';
import TweetType from './tweet';
import getTweets from '../resolvers';

/**
 * This is the type that will be the root of our query,
 * and the entry point into our schema.
 */
const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    // node: nodeField,
    // Add your own root fields here,
    tweets: {
      args: {
        q: { type: GraphQLString },
        resultType: { type: GraphQLString },
      },
      type: new GraphQLList(TweetType),
      resolve: (_, args) => getTweets(args),
    },
  }),
});

export default QueryType;
