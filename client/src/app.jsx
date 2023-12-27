import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Header from './components/header.jsx'
import Home from './views/home.jsx'
import Login from './views/login.jsx'
import SignUp from './views/signup.jsx'
import NotFound from './views/notfound.jsx'
import Movie from './views/movie.jsx'


function App() {

  return (
    <Router>
      <div className="App">
        <Header />

        <Switch>      
          <Route exact path="/"><Home /></Route>
          <Route exact path="/login"><Login /></Route>
          <Route exact path="/signup"><SignUp /></Route>
          <Route path="/movies/:id"><Movie /></Route>
          <Route path="*"><NotFound /></Route>
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
