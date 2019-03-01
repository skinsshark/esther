import React, { Component } from 'react';
import { NavLink, Switch, Route, Redirect } from 'react-router-dom';

import About from './pages/About';
import Illustrations from './pages/Illustrations';
import Proj from './pages/Proj';
import Projects from './pages/Projects';
import './App.css';

require('intersection-observer'); //polyfill

class App extends Component {
  render() {
    const activeStyle = {'color': '#00f'}; //sync with .colorDef
    return (
      <div className="app">
        <header>
          <h1>
            <NavLink to="/">
              esther 樂 容 cheung
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
            <Route exact={true} path="/about" component={About} />
            <Route exact={true} path="/p/:projectName" component={Proj} />
            <Redirect from='*' to='/' />
          </Switch>
        </main>

        <footer>
          website by <a href="https://linkedin.com/in/zhengsharon" target="_blank" rel='noreferrer noopener'>sharon zheng</a>
        </footer>
      </div>
    );
  }
}

export default App;
