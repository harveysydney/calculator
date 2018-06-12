const SHOW = 'pulp/errorPage/SHOW';
const HIDE = 'pulp/errorPage/HIDE';

export default function reducer(state = {
  display: false,
  status: null,
}, action) {
  if (action.type === SHOW) {
    return {...state, display: true, ...action.payload};
  } else if (action.type === HIDE) {
    return {...state, display: false, status: null};
  }
  return state;
}
