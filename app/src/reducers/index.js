import { actionTypes } from '../actions';

const defaultState = {
  data: [],
  isLoading: false,
  q: '#bestesportsteam',
  resultType: 'recent',
};

const actionMap = {
  [actionTypes.TWEETS_FETCH_REQUEST]: (state) => ({ ...state, isLoading: true }),
  [actionTypes.TWEETS_FETCH_FAILURE]: (state) => ({ ...state, isLoading: false }),
  [actionTypes.TWEETS_FETCH_SUCCESS]: (state, action) => ({ ...state, isLoading: false, data: action.payload }),
};

export default function (state = defaultState, action) {
  if (actionMap[action.type]) {
    return actionMap[action.type](state, action);
  }

  return state;
}
