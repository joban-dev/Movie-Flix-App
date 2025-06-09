import React from 'react';
import { Link } from 'react-router-dom';

function Cards({ data , title }) {
    return (
        <div className='flex flex-wrap w-full h-auto'>
            {data.map((cards, index) => (
                <Link to={`/${cards.media_type || title}/details/${cards.id}`}
                    className='w-[35vh] mr-[3.5%] mb-[1%] mt-[2%] transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:bg-gray-800 rounded-lg'
                    key={index}
                >
                    <div className='relative bg-gray-900 rounded-lg shadow-md overflow-hidden'>
                        <img
                            className='h-[40vh] w-full  object-fill rounded-t-lg'
                            src={`https://image.tmdb.org/t/p/original/${cards.poster_path || cards.backdrop_path || cards.profile_path}`}
                            alt={cards.original_title || cards.title || cards.name || cards.original_name}
                        />
                        <h1 className='text-lg text-zinc-300 mt-1 font-semibold truncate px-3 py-2'>{cards.original_title || cards.title || cards.name || cards.original_name}</h1>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default Cards;
