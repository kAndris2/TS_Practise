import React, {FC, useEffect, useState} from 'react';

interface Props {
    api: {
        key: string;
        url: string;
    }
    movieId: number;
}

interface Movie {
    title: string;
    poster_path: string;

}

const MovieDetails: React.FC<Props> = ({ api, movieId }) => {
    const [movie, setMovie] = useState<Movie>()
    const [isLoading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        function getMovie() {
            fetch(`${api.url}/movie/${movieId}?api_key=${api.key}&language=en-US&page=1`)
              .then(response => response.json())
              .then(response => {
                setLoading(false)
                setMovie(response.results)
              })
        }
        getMovie()
    }, [])

    if(!isLoading) {
        return (
            <div>
                <h1>Movie</h1>
            </div>
        )
    }
    else {
        return (
            <h1>Loading...</h1>
        )
    }
}

export default MovieDetails;