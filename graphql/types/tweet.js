import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

const TweetType = new GraphQLObjectType({
  name: 'tweet',
  fields: () => ({
    id: { type: GraphQLString },
    text: { type: GraphQLString },
  }),
});

export default TweetType;
