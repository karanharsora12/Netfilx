import React, { useEffect, useState } from 'react'
import axios from './Axios'
import './css/Row.scss'
import YouTube from 'react-youtube'

const base_url = 'https://image.tmdb.org/t/p/original/'

export default function Row(props) {
    const [movies, setMovies] = useState([])
    const [trailerUrl, setTrailerUrl] = useState('');

    useEffect(() => {
        async function fetchData() {
            const requests = await axios.get(props.fetchUrl);
            setMovies(requests.data.results)
            return requests;
        }
        fetchData();
    },[props.fetchUrl])
    
    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
           autoplay : 1, 
        }
    }

    // const handleClick =(movie)=>{
    //     if (trailerUrl) {
    //         setTrailerUrl("")
    //     }
    //     else {
    //         movieTrailer
    //     }
    // }

    return (
    <div className='row'>
            <h2>{props.title}</h2>
            <div className="row__posters"> 
                {
                    movies.map(movie => (
                        <img
                            key={movie.id}
                            className={`row__poster ${props.isLargeRow && "row__posterLarge"}`} src={`${base_url}${props.isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                            alt={movie.name} />
                    ))
                }
            </div>
            {trailerUrl && <YouTube
                videoId={trailerUrl}
                opts={opts}
            />}
    </div>
  )
}
