import React from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoIcon from '@mui/icons-material/Info';

const VideoTitle = ({ title, overview }) => {
    return (
        <div className='w-screen aspect-video pt-[20%] px-24 absolute text-white bg-gradient-to-r from-black via-transparent to-black'>
            <h1 className='text-6xl font-extrabold mb-4 drop-shadow-lg'>{title}</h1>
            <p className='text-lg py-6 w-1/3 leading-relaxed drop-shadow-md'>{overview}</p>
            <div className='flex space-x-4 mt-6'>
                <button className='flex items-center text-black bg-white p-4 px-10 text-lg rounded-lg hover:bg-opacity-90 shadow-lg transition-all  '>
                    <PlayArrowIcon className='mr-2' /> Play
                </button>
                <button className='flex items-center text-white bg-gray-700 p-4 px-10 text-lg rounded-lg bg-opacity-70 hover:bg-opacity-90 shadow-lg transition-all ease-in-out duration-300'>
                    <InfoIcon className='mr-2' /> More Info
                </button>
            </div>
        </div>
    );
}

export default VideoTitle;
