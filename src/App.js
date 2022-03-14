import { useState } from 'react';
import './App.css';
import { NavBar } from './components/NavBar';
import Login from './components/Login'
import SignUp from './components/Signup'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';

function App() {  
  return (
    <>
      <NoteState>
        <Router>
          <NavBar />
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/login">
                <Login/>
              </Route>
              <Route exact path="/signup">
                <SignUp />
              </Route>
            </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  )
}

export default App;
