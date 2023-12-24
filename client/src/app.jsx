import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'

import Header from './components/header.jsx'
import Home from './views/home.jsx'
import Login from './views/login.jsx'
import SignUp from './views/signup.jsx'
import NotFound from './views/notfound.jsx'


function App() {

  useEffect(() => {
    axios.get("http://localhost:3001/users/2")
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />

        <Switch>      
          <Route exact path="/"><Home /></Route>
          <Route exact path="/login"><Login /></Route>
          <Route exact path="/signup"><SignUp /></Route>
          <Route path="*"><NotFound /></Route>
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
