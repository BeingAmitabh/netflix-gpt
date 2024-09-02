import React, { useEffect } from 'react';
import { API_key } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { addPopularMovies } from '../utils/movieSlice';

const usePopularMovies = () => {
    const dispatch = useDispatch();

    const getPopularMovies = async () => {
        try {
            const data = await fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`, API_key);
            const json = await data.json();
            dispatch(addPopularMovies(json.results));

        } catch (error) {
            console.error("Failed to fetch now playing movies:", error);

        }
    };
    useEffect(() => {
        getPopularMovies();
    }, []);
};
export default usePopularMovies;