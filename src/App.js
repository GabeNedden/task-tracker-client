import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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
import NotFound from './components/NotFound';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ResponsiveContainer>
          <Switch>
            <Route exact path='/' component={Home}/>
            <AuthRoute exact path='/login' component={Login}/>
            <AuthRoute exact path='/register' component={Register}/>
            <AuthRoute exact path='/matrix' component={Matrix}/>
            <Route exact path='/contact' component={Contact}/>
            <Route exact path='/project/:projectId' component={ProjectPage}/>
            <Route exact path='*' component={NotFound} />
          </Switch>
        </ResponsiveContainer>
        <Footer />
    </Router>
    </AuthProvider>
  );
}

export default App;
