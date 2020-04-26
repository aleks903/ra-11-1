import React from 'react';
import './App.css';
// eslint-disable-next-line
import regeneratorRuntime from 'regenerator-runtime';
import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
// import ServiceAdd from './components/ServiceAdd.js';
import ServiceList from './components/ServiceList.js';
import ServiceChange from './components/ServiceChange.js';


export default function App() {
  // const urlEnv = process.env.REACT_APP_LOCAL_URL;

  return (
    <React.Fragment>
      <Router>
        {/* <ServiceAdd /> */}
        <Switch>
          <Route path="/services/:id" component={ServiceChange} />
          <Route path="/services" component={ServiceList} />
          <Redirect exact from="/" to="/services"/>
        </Switch>
      </Router>
    </React.Fragment>
  );
}
