import React, { useEffect } from 'react';
import { API_key } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { addNowPlayingMovies } from '../utils/movieSlice';

const useNowPlayingMovies = () => {
    const dispatch = useDispatch();

    const getNowPlayingMovie = async () => {
        try{
            const data = await fetch(`https://api.themoviedb.org/3/movie/now_playing?page=1`, API_key);
        const json = await data.json();
        dispatch(addNowPlayingMovies(json.results));

    }catch(error){
        console.error("Failed to fetch now playing movies:", error);
        
    }
};
    useEffect(() => {
        getNowPlayingMovie();
    }, []);
};
export default useNowPlayingMovies;