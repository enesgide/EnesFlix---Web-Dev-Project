import { useParams } from 'react-router-dom'

const Movie = () => {

    const params = useParams();

    const id = params.id;
    
    return (
        <div style={{color: 'white'}}>
            <h1>Movie id { id }</h1>
            <div>
            </div>
        </div>
    );
}

export default Movie;