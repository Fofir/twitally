import axios from 'axios';

export const actionTypes = {
  TWEETS_FETCH_REQUEST: 'TWEETS_FETCH_REQUEST',
  TWEETS_FETCH_SUCCESS: 'TWEETS_FETCH_SUCCESS',
  TWEETS_FETCH_FAILURE: 'TWEETS_FETCH_FAILURE',
};

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export function fetchTweets(q, resultType) {
  return dispatch => {
    dispatch({ type: actionTypes.TWEETS_FETCH_REQUEST });


    const url = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_GRAPHQL_URL : '/api/graphql';

    const config = {
      method: 'post',
      url,
      data: {
        query: 'query getTweets($q:String, $resultType: String){ tweets(q:$q, resultType: $resultType) {text} }',
        variables: { q: encodeURIComponent(q), resultType }
      },
      headers,
    };

    axios(config)
    .then(({ data }) => {
      dispatch({ type: actionTypes.TWEETS_FETCH_SUCCESS, payload: data.data.tweets });
    },
    () => {
      dispatch({ type: actionTypes.TWEETS_FETCH_FAILURE });
    });
  };
}

export default {
  fetchTweets,
};
