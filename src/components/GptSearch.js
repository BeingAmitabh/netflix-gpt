import React from 'react';
import GptSearchBar from './GptSearchBar';
import GptMovieSuggestion from './GptMovieSuggestion';
import { BG_URL } from '../utils/constant';

const GptSearch = () => {
    return (
        <div>
            <img
                className="absolute -z-10 "
                src={BG_URL}
                alt="Background"
            />
            <GptSearchBar />
            <GptMovieSuggestion />
        </div>
    );
};

export default GptSearch;
