import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { AuthProvider } from './context/auth';
import AuthRoute from './utilities/AuthRoute';


import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Matrix from './pages/Matrix';
import ProjectPage from './pages/ProjectPage';

function App() {
  return (
    <AuthProvider>
      <Router>
      <Container>
        <MenuBar />
        <Route exact path='/' component={Home}/>
        <AuthRoute exact path='/login' component={Login}/>
        <AuthRoute exact path='/register' component={Register}/>
        <AuthRoute exact path='/matrix' component={Matrix}/>
        <Route exact path='/project/:projectId' component={ProjectPage}/>
      </Container>
    </Router>
    </AuthProvider>
  );
}

export default App;
