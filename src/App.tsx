import React, {useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css';
import Home from "./Home";
import Login from "./Components/Login/Login";
import Header from "./Components/Header/Header";
import CreatePost from "./Components/CreatePost/CreatePost";
import ViewPost from "./Components/ViewPost/ViewPost";

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
                  <Route exact path="/posts/create" component={CreatePost}/>
                  <Route path="/posts/:id"  component={ViewPost}/>
                </Switch>
              </div>
            </div>
        }
      </Router>
  )
}

export default App;
