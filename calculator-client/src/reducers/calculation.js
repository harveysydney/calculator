import * as ActionType from '../ActionTypes';

const initialState = {
  calculationResult: [],
  calculationHistory: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionType.UPDATE_RESULT:
      return {
        ...state,
        ...{calculationResult: action.calculationResult}
      };
    case ActionType.UPDATE_HISTORY:
      return {
        ...state,
        ...{calculationHistory: action.calculationHistory}
      };
    default:
      return state;
  }
}