import React, { Component } from 'react';
import { NavLink, Switch, Route, Redirect } from 'react-router-dom';

import About from './pages/About';
import Illustrations from './pages/Illustrations';
import Sketchbook from './pages/Sketchbook';
import Proj from './pages/Proj';
import Projects from './pages/Projects';
import Photography from './pages/Photography';
import './App.css';

require('intersection-observer'); //polyfill

class App extends Component {
  render() {
    const activeStyle = {'color': '#56c292'}; //sync with .colorDef
    return (
      <div className="app">
        <header>
          <h1>
            <NavLink to="/">
              esther cheung
            </NavLink>
          </h1>
          <ul>
            <li>
              <NavLink to="/" exact={true} activeStyle={activeStyle}>
                projects
              </NavLink>
            </li>
            <li>
              <NavLink to="/illustrations" activeStyle={activeStyle}>
                illustrations
              </NavLink>
            </li>
            <li>
              <NavLink to="/sketchbook" activeStyle={activeStyle}>
                sketchbook
              </NavLink>
            </li>
            <li>
              <NavLink to="/photography" activeStyle={activeStyle}>
                photography
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" activeStyle={activeStyle}>
                about
              </NavLink>
            </li>
          </ul>
        </header>

        <main>
          <Switch>
            <Route exact={true} path="/" component={Projects} />
            <Route exact={true} path="/illustrations" component={Illustrations} />
            <Route exact={true} path="/sketchbook" component={Sketchbook} />
            <Route exact={true} path="/about" component={About} />
            <Route exact={true} path="/photography" component={Photography} />
            <Route exact={true} path="/p/:projectName" component={Proj} />
            <Redirect from='*' to='/' />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
