import React, {FC, useEffect, useState} from 'react';

interface Props {
    api: {
        key: string;
        url: string;
    }
    movieId: number;
    handleBackClick: () => void
}

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    homepage: string;
    tagline: string;
}

interface IState {
    key: number
}

const MovieDetails: React.FC<Props> = ({ api, movieId, handleBackClick }) => {
    const [mId, setMId]= useState<number>(movieId);
    const [movie, setMovie] = useState<Movie>({
        id: 0,
        title: "",
        poster_path: "",
        overview: "",
        homepage: "",
        tagline: ""
    })
    const [isLoading, setLoading] = useState<boolean>(true)

    async function test() {
        async function getMovie() {
            const response = await fetch(`${api.url}/movie/${mId}?api_key=${api.key}&language=en-US&page=1`)
            const jsonResponse = await response.json()
            setMovie(jsonResponse)
            setLoading(false)
        }

        await getMovie()
    }

    useEffect(() => {
        test()
        setMId(movieId)
    }, [movieId])

    function handleClick() {
        handleBackClick()
    }

    if(!isLoading) {
        return (
            <div>
                <a href={`${movie.homepage}`}>
                    <h1>{movie.title} ({movie.id})</h1>
                </a>
                <h4>{movie.tagline}</h4>
                <img alt={movie.title} 
                            src={`https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path}`} 
                />
                <p>{movie.overview}</p>

                <button onClick={handleClick}>{"<--Back"}</button>
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