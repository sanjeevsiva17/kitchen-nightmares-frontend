import React from 'react';
import './App.css';
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const Routes = () =>{
  return(
    <Switch>
      <Route path='/login'>
        <Login/>
      </Route>

      <Route path='/dashboard'>
        <Dashboard></Dashboard>
      </Route>

    </Switch>
  )
}

function App() {
  return (
    <div className="App">
    <Router>
      <Routes/>
    </Router>

    </div>
  );
}


export default App;


