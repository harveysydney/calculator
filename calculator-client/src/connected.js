import {connect} from 'react-redux';
import actionCreators from './actions';

export default function connected(component) {
  return connect((state, ownProps) => {
    return {
      ...ownProps,
      ...state,
      actionCreators
    };
  })(component);
};
