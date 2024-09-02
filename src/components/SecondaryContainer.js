import React from 'react';
import MovieList from './MovieList';
import { useSelector } from 'react-redux';
import MovieCard from './MovieCard';

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    <div className='bg-black'>
      <div className='-mt-52 relative pl-12 z-28'>
      <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
      <MovieList title={"Trending"} movies={movies.nowPlayingMovies} />
      <MovieList title={"Popular"} movies={movies.popularMovies} />
      <MovieList title={"Upcoming"} movies={movies.nowPlayingMovies} />
      <MovieList title={"Horror Movies"} movies={movies.nowPlayingMovies} />
      <MovieList title={"Bollywood"} movies={movies.nowPlayingMovies} />
      <MovieCard />
      </div>
    </div>
  );
};

export default SecondaryContainer;
