import React, { useRef, useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import { handleDrag } from '../scripts/moviesContainer.js'
import axios from 'axios'
import localMoviesData from '../../src/data/movies.json'

const MovieList = ({heading="Movies", category=null}) => {  

  // Retrieve movies from database
  const [movies, setMovies] = useState(null);

  // Backup function
  function formatMoviesData(moviesData, categoryName) {
    const filteredMovies = moviesData.movies.filter(movie =>
      movie.categories.includes(categoryName)
    );
  
    return filteredMovies.map((movie, index) => ({
      id: index,
      title: movie.title,
      poster: movie.poster,
      trailer: movie.trailer || ""
    }));
  }


  useEffect(() => {
    axios.get(`http://localhost:3001/movies/category/${ category }`)
    .then(res => {
      setMovies(res.data);
    })
    .catch(err => {      
      const backupMovies = formatMoviesData(localMoviesData, category);
      if (backupMovies.length > 0) setMovies(backupMovies);  
      else console.error(category + " category error:\n" + err);    
    })
  }, [category]);
  


  // Setup movies container dragger
  const sliderRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    if (!movies || !sliderRef.current) {
      return;
    }
  
    handleDrag(sliderRef, leftRef, rightRef);
  }, [movies, sliderRef, leftRef, rightRef]);

  
  return (   
    <div className="content">

        {/* Check if movies have loaded */}
        { movies && 
          <div>
            <p className="movie-title"
            style={{margin: '0 0 0 3%', fontFamily:'Montserrat', letterSpacing:'-0.02em', color: 'white'}}>
                { heading }
            </p>

            { /* Display row movies */ }
            <div className="movies-container">

                { /* Slider */ }
                <div className="slider" ref={ sliderRef }>
                    {movies.map((movie) => (
                    <div className="item" key={ movie.id }>
                      <Link to={`/movies/${ movie.id }`}>
                        <img width="100%" height="100%" src={`posters/${ movie.poster }`}  alt=""
                        style={{verticalAlign: 'bottom', borderRadius: '4px'}}/>    
                      </Link>                                
                    </div>
                    ))}                           
                </div>  

                { /* Left and right buttons */ }
                <button ref={ leftRef } className="row-btn" id="left-btn"
                style={{position: 'absolute', top: '50%', left: 0, transform: 'translateX(50%) translateY(-50%)'}}>
                  &lt;
                </button>  

                <button ref={ rightRef } className="row-btn" id="right-btn"
                style={{position: 'absolute', top: '50%', right: 0, transform: 'translateX(-50%) translateY(-50%)'}}>
                  &gt;
                </button>

            </div>
          </div>
        }        
    </div>
  );
}

export default MovieList;
