import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import store from './ReduxStore';
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import Routes from './Routes';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store={store}>
        <Routes/>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
