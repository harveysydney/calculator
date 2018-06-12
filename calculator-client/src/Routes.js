import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Layout from './Layout';
import Home from './components/Home';
import connected from './connected';
import NotFoundPage from './components/NotFoundPage';

class Routes extends React.Component {

  render() {
    return (
      <Router basename="/#">
        <div>
          <Layout>
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route path='/home' component={Home}/>
              <Route component={NotFoundPage}/>
            </Switch>
          </Layout>
        </div>
      </Router>
    )
  }
}


export default connected(Routes);
