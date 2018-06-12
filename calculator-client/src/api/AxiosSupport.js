import axios from 'axios';
import {includes} from 'lodash';
import {showErrorPage} from "../actions/errorPage";
import ReduxStore from '../ReduxStore';

const axiosErrorHandlerInitialise = () => {
  axios.interceptors.response.use(null, (error) => {
    const {response: {status}} = error;
    if(!includes([400,401,403], status)) {
      ReduxStore.dispatch(showErrorPage({status}));
    }
    return Promise.reject(error);
  });
};

export default axiosErrorHandlerInitialise;
