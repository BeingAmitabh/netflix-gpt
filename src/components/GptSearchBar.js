import React, { useRef } from 'react';
import lang from '../utils/languageConstant';
import { useSelector } from 'react-redux';

function GptSearchBar() {
    const langKey = useSelector(store => store.config.lang);
    const searchText = useRef(null);

    const handleGptSearchClick = () => {
        console.log(searchText.current.value);
    };

    return (
        <div className="w-full flex justify-center py-8">
            <form 
                className="w-full max-w-lg grid grid-cols-12 gap-4"
                onSubmit={(e) => e.preventDefault()}
            >
                <input
                    ref={searchText}
                    type="text"
                    className="col-span-9 p-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder={lang[langKey]?.gptSearchPlaceholder || "Search..."}
                />
                <button
                    className="col-span-3 bg-red-600 text-white font-semibold py-4 rounded-lg shadow-lg hover:bg-red-700 transition duration-300"
                    onClick={handleGptSearchClick}
                >
                    {lang[langKey]?.search || "Search"}
                </button>
            </form>
        </div>
    );
}

export default GptSearchBar;
