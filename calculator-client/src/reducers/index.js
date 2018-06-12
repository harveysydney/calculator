import {combineReducers} from 'redux';
import calculation from './calculation';
import errorPage from './errorPage';

export default combineReducers({
  errorPage,
  calculation,
});