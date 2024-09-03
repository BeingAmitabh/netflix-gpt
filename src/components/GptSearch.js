import React from 'react';
import GptSearchBar from './GptSearchBar';
import GptMovieSuggestion from './GptMovieSuggestion';
import { BG_URL } from '../utils/constant';

const GptSearch = () => {
    return (
        <>
            <div className="absolute inset-0 -z-10">
                <img
                    className="w-full h-full object-cover"
                    src={BG_URL}
                    alt="Background"
                />
            </div>
            <div className="relative min-h-screen flex flex-col justify-center items-center px-4">
                <GptSearchBar />
                <GptMovieSuggestion />
            </div>
        </>
    );
};

export default GptSearch;
