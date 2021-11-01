import React, {useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css';
import Home from "./Home";
import Login from "./Components/Login/Login";
import Header from "./Components/Header/Header";

function App() {
  const [jwt, setJwt] = useState(localStorage.getItem("jwt") == null ? "" : localStorage.getItem("jwt"))

  return (
      <Router>
        {jwt === "" ? <Login setJwt={setJwt}/>
            : <div>
              <Route path="/" render={props => <Header setJwt={setJwt} {...props} />}/>
              <div>
                <Switch>
                  <Route exact path="/" component={Home}/>
                </Switch>
              </div>
            </div>
        }
      </Router>
  )
}

export default App;
