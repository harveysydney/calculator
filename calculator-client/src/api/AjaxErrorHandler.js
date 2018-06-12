import $ from "jquery";
import { includes } from 'lodash';
import ReduxStore from '../ReduxStore';
import { showErrorPage } from "../actions/errorPage";

const ajaxErrorHandlerInitialise = () => {
  $(document).ajaxError((event, response) => {
    const {status, message} = response;
    if(includes([400,401,403], status) || message) { return; }

    ReduxStore.dispatch(showErrorPage({status}));
  });
};

export default ajaxErrorHandlerInitialise;
