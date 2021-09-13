import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import './App.css';

import { AuthProvider } from './context/auth';
import AuthRoute from './utilities/AuthRoute';
import { ThemeContext } from './context/theme';

import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Team from './pages/Team';
import Matrix from './pages/Matrix';
import ProjectPage from './pages/ProjectPage';
import Account from './pages/Account';
import ResponsiveContainer from './components/ResponsiveContainer';
import NotFound from './components/NotFound';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Header from './components/Header/Header';



function App() {
  const [{ themeName }] = useContext(ThemeContext)

  return (
    <AuthProvider>
      <Router>
      <div id='top' className={`${themeName} app`}>
      <Header />
      <ResponsiveContainer>
          <Switch>
            <Route exact path='/' component={Home}/>
            <AuthRoute exact path='/login' component={Login}/>
            <AuthRoute exact path='/signup' component={SignUp}/>
            <Route exact path='/team' component={Team}/>
            <Route exact path='/matrix' component={Matrix}/>
            <Route exact path='/contact' component={Contact}/>
            <Route exact path='/project/:projectId' component={ProjectPage}/>
            <Route exact path='/myaccount/:userId' component={Account}/>
            <Route exact path='*' component={NotFound} />
          </Switch>
        </ResponsiveContainer>
        <Footer />
      </div>
        
    </Router>
    </AuthProvider>
  );
}

export default App;
