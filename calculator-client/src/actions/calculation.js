import axios from 'axios';
import * as actionTypes from '../ActionTypes';

export function calculate(params) {
  return (dispatch) => {
    return axios.post(`/calculate/tax`, params)
      .then(({data}) => {
        dispatch({type: actionTypes.UPDATE_RESULT, calculationResult: data});
      })
  }
}

export function getHistory(email) {
  return (dispatch) => {
    return axios.get(`/calculate/history?email=${email}`)
      .then(({data}) => {
        dispatch({type: actionTypes.UPDATE_HISTORY, calculationHistory: data});
      })
  }
}

export function deleteHistory(selectedIDs) {
  return (dispatch) => {
    return axios.post(`/calculate/deletehistory`, selectedIDs)
      .then(({data}) => {
        dispatch({type: actionTypes.UPDATE_HISTORY, calculationHistory: data});
      })
  }
}