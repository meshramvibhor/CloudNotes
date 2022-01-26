import { useState } from 'react';
import './App.css';
import { NavBar } from './components/NavBar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';



function App() {
  
  
  return (
    <>
      <NoteState>
        <Router>
          <NavBar />
          <Alert message={"Welcome"} />
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>

            </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  )
}

export default App;
