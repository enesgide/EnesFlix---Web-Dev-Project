import React, { useRef, useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import useFetch from '../scripts/useFetch.js'
import { handleDrag } from '../scripts/moviesContainer.js'
import axios from 'axios'

const MovieList = ({heading="Movies", category=null}) => {  

  // Retrieve movies from database
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/movies/category/${ category }`)
    .then(res => {
      setMovies(res.data);
    })
    .catch(err => {
      console.error(category + " category error:\n" + err);
    })
  }, []);
  


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
    <div className="content" style={{margin:'0', display: 'block'}}>

        {/* Check if movies have loaded */}
        { movies && 
          <div>
            <p style={{marginLeft: '3%', marginBottom: '0', fontFamily:'Montserrat', fontSize: '1.6rem', fontWeight: '600', letterSpacing:'-0.02em', color: 'white'}}>
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
