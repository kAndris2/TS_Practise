import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import PopularMovies from './components/PopularMovies';
import MovieDetails from './components/MovieDetails';

interface IState {
  api: {
    key: string;
    url: string;
  }
}

function App() {

  const [api, setApi] = useState<IState["api"]>(
    {
      key: '178ec19740ff19a036965efd3dc443c4',
      url: 'https://api.themoviedb.org/3'
    }
  )

  const [movieId, setMovieId] = useState<number>()

  const handleMovieIdChange = (id: number): void => {
    setMovieId(id)
  }

  return (
    <div>

      <Router>
        <Switch>

          <Route exact path="/">
            <PopularMovies handleMovieIdChange={handleMovieIdChange}
                            api={api}         
            />
          </Route>

          <Route exact path={"/movie/:id"}>
          
          </Route>

        </Switch>
      </Router>

    </div>
  )
}

export default App;