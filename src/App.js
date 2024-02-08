import { useEffect, useRef, useState } from "react";
import StarRating from "./StarsRating";
const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
  
function Logo(){
  return (
    <div className="logo">
    <span role="img">🍿</span>
    <h1>usePopcorn</h1>
  </div>
  )
  }
  function SearchBox({query , setQuery}){ 
    const input = useRef(null);
    useEffect(function(){
      document.addEventListener("keydown" , callback)
      function callback(e){
        if(e.code === "Enter"){
          input.current.focus();
          setQuery("");
        }
        return()=> document.removeEventListener("keydown" , callback)
      }
    },[query])
    return(
    <input
    className="search"
    type="text"
    placeholder="Search movies..."
    value={query}
    ref={input}
    onChange={(e) => setQuery(e.target.value)}
  />)
  }
  function MoviesLength({movies}){
    return(
      <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
    )
  }
  function Movie({movie , handleSelection}){
    return(<li onClick={()=> handleSelection(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>)
  }
  function Summary({watched , avgImdbRating , avgUserRating , avgRuntime }){
    return( <div className="summary">
    <h2>Movies you watched</h2>
    <div>
      <p>
        <span>#️⃣</span>
        <span>{watched.length} movies</span>
      </p>
      <p>
        <span>⭐️</span>
        <span>{avgImdbRating.toFixed(2)}</span>
      </p>
      <p>
        <span>🌟</span>
        <span>{avgUserRating.toFixed(2)}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{avgRuntime} min</span>
      </p>
    </div>
  </div>)
  }
  function WatchedMovieList({watched , handlDelete}){
    return (<ul className="list">
    {watched.map((movie) => (
      <WatchedMovie movie={movie} key={movie.imdbID} onDelete = {handlDelete}/>
    ))}
  </ul>)
  }
  function WatchedMovie({movie , onDelete}){
    return  <li key={movie.imdbID}>
    <img src={movie.poster} alt={`${movie.title} poster`} />
    <h3>{movie.title}</h3>
    <div>
      <p>
        <span>⭐️</span>
        <span>{movie.imdbRating}</span>
      </p>
      <p>
        <span>🌟</span>
        <span>{movie.movieRating}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{movie.runtime} min</span>
      </p>
      <button className="btn-delete" onClick={()=>onDelete(movie.imdbID) }>X</button>
    </div>
  </li>
  }
  //MAIN
  function Main({children}){
    return(
      <main className="main">
       {children}
    </main>
    )
  
  }
  function Box({children}){
    const [isOpen, setIsOpen] = useState(true);
    return(
      <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  
    )
  }
  function MoviesList({movies , handleSelection}){
   return <ul className="list list-movies">
          {movies?.map((movie) => (
            <Movie handleSelection = {handleSelection} movie={movie} key={movie.imdbID}/>
          ))}
        </ul>
  }
  
  

  function NavBar({children}){
    return(
      <nav className="nav-bar">
        <Logo/>
        {children}
    </nav>

    )
  }

  const key = '72316469';
export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading , setIsLoading] = useState(false);
  const [error , setError] = useState("");
  const [selectId , setSelectId] = useState(null);
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.movieRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  function handleSelection(id){
    setSelectId((selectId)=>id === selectId ? null :id)
  }
  function handlDelete(id){
    setWatched(watched=>watched.filter(movie=> movie.imdbID !== id));
  }
  function closeMovieDetails(){
    setSelectId(null);
  }
  function handleAddWatchedMovie(movie){
    setWatched(watched=> [...watched , movie])
  }
  useEffect(function(){
    const controller = new  AbortController();
    async function fetchMovie(){
      try{
      setIsLoading(true);
      const res = await fetch(`http://www.omdbapi.com/?apikey=${key}&s=${query}`,{signal:controller.signal})
      if(!res.ok) throw new Error("sometihng in your ass....")
      const data = await res.json();
    if(data.Response=== "False") throw new Error("Movie not found")
      setMovies(data.Search);
  
    }
    
      catch(err){
        if(err.name !=="AbortError"){
          setError(err.message);
        }
      }finally{
        setIsLoading(false);
      }
      if(query.length < 3){
        setError("");
        setMovies([])
      }
      closeMovieDetails();
    }
    fetchMovie();
    return function(){
      controller.abort();
    };
  },[query])
  return (
    <>
       <NavBar>
        <SearchBox query={query} setQuery={setQuery}/>
        <MoviesLength movies={movies}/>
       </NavBar>
     <Main >
      <Box>
        {isLoading&& <Loader/>}
        {!isLoading && !error && <MoviesList handleSelection = {handleSelection} movies={movies}/>}
        {error && <ErrorBox errorMessage={error}/>}
      </Box>
      <Box>

      <Summary watched = {watched} avgImdbRating={avgImdbRating} avgRuntime={avgRuntime} avgUserRating={avgUserRating} />
      {selectId && <MovieDetails onClose = {closeMovieDetails} selectId={selectId} onWatch={handleAddWatchedMovie} watched ={watched}/>}
      < WatchedMovieList watched={watched} handlDelete = {handlDelete} / >
      </Box>
     </Main>
     </>
 
  );
}
function Loader(){
  return <p className="loader">loading...</p>
}

function ErrorBox({errorMessage}){
  return <p className="error"> ⛔ {errorMessage} </p>
}

function MovieDetails({selectId , onClose , onWatch , watched}){
const [selectedMovie , setSelectedMovie] = useState({});
const [movieRating , setMovieRating] = useState(0);
const [isLoading  , setLoading] = useState(false);
const isWatched = watched.map(movie=>movie.imdbID).includes(selectId);
const watchedUserRating = watched.find(movie=>movie.imdbID=== selectId)?.movieRating
const  {Title :title 
  , Year :year 
  , Rated : rated
   , Released :released
    , Runtime :runtime 
    , Poster :poster 
    , imdbRating ,
     Plot :plot
       ,Actors :actors , 
       Director:director ,
   Genre :genre } = selectedMovie
   function handleAdd(){
    const newMovie = {
      imdbID : selectId,
      title,
      year,
      poster,
      imdbRating :Number(imdbRating),
      runtime :Number(runtime.split(" ").at(0)),
      movieRating
    }
    onWatch(newMovie);
    onClose();
   }
   useEffect(function(){
   function escape(e){
  if(e.code === "Escape"){
    onClose();
  }
   }
   document.addEventListener("keydown" , escape); 
   return function(){
   document.removeEventListener("keydown" , escape);
   }
   },[onClose])
useEffect(function(){
  async function movieDetals(){
    setLoading(true)
    const res = await fetch(`http://www.omdbapi.com/?apikey=${key}&i=${selectId}`);
    const data = await res.json();
    setSelectedMovie(data);
    setLoading(false);
  }
  movieDetals();
},[selectId]
)
useEffect(function(){
  if(!title)return ;
document.title = `Movie |${title} `
return function(){
  document.title = "Use PopCorn"
}
},[title])
return (
  <>
  {isLoading && <Loader/>}
<div className="details">
  <header>
  <button className="btn-back" onClick={onClose}>&larr;</button>
  <img src={poster} alt={`poster of ${selectedMovie}`} />
  <div className="details-overview">
  <h2>{title}</h2>
  <p>{released} &bull;{runtime}</p>
  <p>{genre}</p>
  <p><span>⭐️</span>{imdbRating} IMDb rating</p>
  </div>
  </header> 
  <section>
    <div className="rating"> 
    {!isWatched?<>
      <StarRating onSetRating = {setMovieRating} maxRating={10}size={24}/>
      {movieRating> 0 &&<button className="btn-add"
    onClick={handleAdd}>+ Add Movie to List</button>}
  <p> <em>{plot}</em></p>
  <p><span>starring {actors} </span></p>
  <p><span>directed by {director}</span></p>
    </>:<p>you already rating this movie : {watchedUserRating}⭐</p> }
  </div>
  </section>
</div>
</>
)
}
