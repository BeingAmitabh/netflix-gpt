import React from 'react'
import lang from "../utils/languageConstant"
import { useSelector } from 'react-redux';
function GptSearchBar() {
    const langKey = useSelector(store => store.config.lang);

    return (
        <div className='pt-[10%] flex justify-center'>
                     <form className='w-1/2 bg-black grid grid-cols-12'>
                <input 
                    type="text" 
                    className="p-4 m-4 col-span-9" 
                    placeholder={lang[langKey]?.gptSearchPlaceholder || "Search..."}
                />
                <button className='py-2 px-4 col-span-3 m-4 rounded-lg text-white bg-red-700'>
                    {lang[langKey]?.search || "Search"} 
                </button>
            </form>
        </div>
    )
}
export default GptSearchBar;