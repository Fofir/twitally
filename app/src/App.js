import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Tweets from './containers/Tweets';

const App = () => (
  <Provider store={store}>
    <Tweets />
  </Provider>
);

export default App;
