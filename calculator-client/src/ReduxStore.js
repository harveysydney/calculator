import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import history from './history';
import { routerMiddleware } from 'react-router-redux';

const routing = routerMiddleware(history);

export default createStore(reducers,
  composeWithDevTools(
    applyMiddleware(logger, thunk, routing)
  )
);
