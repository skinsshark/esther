import { NavLink, Switch, Route, Redirect } from 'react-router-dom';
import React, { Component } from 'react';

import Projects from './pages/Projects';
import Illustrations from './pages/Illustrations';
import About from './pages/About';
// import DoesNotExist from './pages/DoesNotExist';

import './App.css';

class App extends Component {
  render() {
    const activeStyle = {'color': '#00f'};
    return (
      <div className="app">
        <header>
          <h1>
            <NavLink to="/">
              esther lok yung cheung
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
