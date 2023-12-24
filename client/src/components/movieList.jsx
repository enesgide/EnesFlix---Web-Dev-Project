import React, { useRef, useEffect, useState } from "react";
import useFetch from '../scripts/useFetch.js'
import { handleDrag } from '../scripts/moviesContainer.js'

const MovieList = ({heading="Movies", category=null}) => {  
  // Load pre-set movies from json db
  const { data: movies, isPending, error } = useFetch("http://localhost:8000/movies");


  // Filter row movies
  const [rowMovies, setRowMovies] = useState(null);

  useEffect(() => {
    if (!movies) return;

    const updateRowMovies = () => {
      const tempMovies = movies.filter(movie => movie.categories.includes(category));
      if (tempMovies.length > 0) setRowMovies(tempMovies);  
    }

    updateRowMovies();
  }, [movies, category]);


  // Setup movies container dragger
  const sliderRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    if (!rowMovies || !sliderRef.current) {
      return;
    }
  
    handleDrag(sliderRef, leftRef, rightRef);
  }, [rowMovies, sliderRef, leftRef, rightRef]);

  
  return (   
    <div className="content" style={{margin:'0', display: 'block'}}>
        {/* Check if movies are loading */}
        { isPending }

        {/* Check if movies errored */}
        { error && <h2 style={{color:'red'}}>{ error }</h2> }

        {/* Check if movies have loaded */}
        { rowMovies && 
          <div>
            <p style={{marginLeft: '3%', marginBottom: '0', fontFamily:'Montserrat', fontSize: '1.6rem', fontWeight: '600', letterSpacing:'-0.02em', color: 'white'}}>
                { heading }
            </p>
            { /* Display row movies */ }
            <div className="movies-container">
                <div className="slider" ref={ sliderRef }>
                    {rowMovies.map((movie) => (
                    <div className="item" key={ movie.id }>
                        <img width="100%" height="100%" href={`/movies/${ movie.id }`} src={`posters/${ movie.poster }`}  alt=""
                        style={{verticalAlign: 'bottom', borderRadius: '4px'}}/>            
                    </div>
                    ))}                           
                </div>  
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
