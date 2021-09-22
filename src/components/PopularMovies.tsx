import React, {FC, useState, useEffect, MouseEvent, MouseEventHandler} from 'react';

interface Props {
    api: {
        key: string;
        url: string;
    }
    //handleMovieIdChange: (id: number) => void
}

interface Movie {
    id: number;
    title: string;
    poster_path: string;
}

const PopularMovies: React.FC<Props> = ({api}) => {
    const [isLoading, setLoading] = useState<boolean>(true)
    const [movies, setMovies] = useState<Movie[]>()

    useEffect(() => {
        function getPopularMovies() {
            fetch(`${api.url}/movie/popular?api_key=${api.key}&language=en-US&page=1`)
              .then(response => response.json())
              .then(response => {
                  setMovies(response.results.map(toMovie))
                  setLoading(false)
              })
        }

        function toMovie(response: any): Movie {
            return {
                id: response.id,
                title: response.title,
                poster_path: response.poster_path
            }
        }

        getPopularMovies()
    }, [])

    /*
    function handleClick(id: number): undefined {
        console.log(); 
        handleMovieIdChange(id);
        return undefined
    }
    */

    if(!isLoading) {
        return (
            <div>
                {movies?.map((movie: Movie) =>
                    <a href={`/movie/${movie.id}`} >
                        <img alt={movie.title} 
                            src={`https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path}`} 
                        />
                    </a>
                )}
            </div>
        )
    }
    else {
        return (
            <h1>Loading...</h1>
        )
    }
}

export default PopularMovies;