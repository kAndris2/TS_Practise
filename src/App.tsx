import React, {useState, useEffect} from 'react';
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

function getMovieIdFomUrl(): number {
    let path = window.location.href;
    let id = String(path).split("/")[4];
    return parseInt(id);
}

function App() {

  const [api, setApi] = useState<IState["api"]>(
    {
      key: '178ec19740ff19a036965efd3dc443c4',
      url: 'https://api.themoviedb.org/3'
    }
  )

  /*
  const [movieId, setMovieId] = useState<number>(0)

  const handleMovieIdChange = (id: number): void => {
    setMovieId(id)
    console.log(`id: ${id}`)
  }
  */

  function handleBackClick() {
    window.location.replace("/")
  }

  return (
    <div>

      <Router>
        <Switch>

          <Route exact path="/">
            <PopularMovies api={api} />
          </Route>

          <Route exact path={`/movie/:id`}>
            <MovieDetails api={api} 
                          movieId={getMovieIdFomUrl()} 
                          handleBackClick={handleBackClick}
            />
          </Route>

        </Switch>
      </Router>

    </div>
  )
}

export default App;