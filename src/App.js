import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { AuthProvider } from './context/auth';
import AuthRoute from './utilities/AuthRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Matrix from './pages/Matrix';
import ProjectPage from './pages/ProjectPage';
import ResponsiveContainer from './components/ResponsiveContainer';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ResponsiveContainer>
          <Route exact path='/' component={Home}/>
          <AuthRoute exact path='/login' component={Login}/>
          <AuthRoute exact path='/register' component={Register}/>
          <AuthRoute exact path='/matrix' component={Matrix}/>
          <Route exact path='/project/:projectId' component={ProjectPage}/>
        </ResponsiveContainer>
    </Router>
    </AuthProvider>
  );
}

export default App;
