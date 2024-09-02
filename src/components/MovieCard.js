import React from 'react'
import { IMG_CDN_URL } from '../utils/constant'
function MovieCard({ posterPath }) {
    return (
        <div className='w-40 pr-4'>
            < img src={posterPath ? IMG_CDN_URL + posterPath :  'placeholder_image_url'}
                alt='Movie poster'
            />
        </div>
    ) 
}

export default MovieCard
