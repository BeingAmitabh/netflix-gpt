import { addTrailerVideo } from '../utils/movieSlice';
import React, { useEffect } from 'react';
import { API_key } from '../utils/constant';
import { useDispatch } from 'react-redux';
const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();
    const getMovieVideos = async () => {
        try {
            const data = await fetch('https://api.themoviedb.org/3/movie/533535/videos?language=en-US', API_key)
            const json = await data.json();
            const filterData = json.results.filter((video) => video.type === "Trailer");
            const trailer = filterData.length ? filterData[0] : json.results[0];
            dispatch(addTrailerVideo(trailer));
        } catch (error) {
            console.error("Failed to fetch movie videos:", error);
        }
    };
    useEffect(() => {
        getMovieVideos();
    }, [movieId]);
}
export default useMovieTrailer;