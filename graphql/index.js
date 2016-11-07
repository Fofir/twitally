import { graphql } from 'graphql';
import Schema from './schema';

export default (query, variables) => {
  return graphql(Schema, query, null, {}, variables);
};
