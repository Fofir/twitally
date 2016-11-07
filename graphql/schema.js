import { GraphQLSchema } from 'graphql';
import QueryType from './types/query';

export default new GraphQLSchema({
  query: QueryType
});
