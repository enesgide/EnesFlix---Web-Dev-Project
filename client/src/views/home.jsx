import MovieList from '../components/movieList.jsx'

function Home() {  
  return (    
      <div className="page-content"
        style={{
          paddingTop: '25px',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: '15px'
        }}
      >
          <MovieList heading="New Releases" category="New"/>
          <MovieList heading="Most Popular" category="Popular"/>
          <MovieList heading="Highest Rated" category="High Rated"/>
          <MovieList heading="Action Movies" category="Action"/>
          <MovieList heading="Horror Movies" category="Horror"/>
          <MovieList heading="Comedy Movies" category="Comedy"/>
          
      </div>
  );
}

export default Home;
