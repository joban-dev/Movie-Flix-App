import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/Axios";
import noimage from '/picture.png'

function Topnav() {
  const [query, setQuery] = useState([]);
  const [searches, setSearches] = useState([]);

  const GetSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results);
    } catch (err) {
      console.log("Error is ", err);
    }
  };

  useEffect(() => {
    GetSearches();
  }, [query]);

  return (
    <div className="w-[85%] h-[10vh] relative flex mx-auto items-center my-4">
      <div className="relative w-[70%] mx-auto">
        <i className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl text-zinc-400 ri-search-line"></i>
        <input
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          className="w-full text-zinc-200 p-5 pl-12 pr-12 text-sm bg-transparent 
            border-2 border-zinc-600 rounded-full
            focus:outline-none focus:border-zinc-400 
            hover:border-zinc-500 transition-all duration-300"
          type="text"
          placeholder="Search anything"
        />
        {query.length > 0 && (
          <i
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 
              text-zinc-400 text-2xl ri-close-fill hover:text-zinc-200 
              transition-colors duration-200 cursor-pointer"
          ></i>
        )}
      </div>
      <div className="z-[100] absolute w-[70%] max-h-[50vh] bg-zinc-200 
        top-[120%] left-[50%] -translate-x-1/2 overflow-auto rounded-lg shadow-xl mt-2">
        {searches.map((item, index) => (
          <Link to={`/${item.media_type}/details/${item.id}`}
            key={index}
            className="hover:text-black hover:bg-zinc-300 duration-300 
              font-semibold text-zinc-600 w-[100%] p-10 flex justify-start 
              items-center border-b-2 border-zinc-100"
          >
            <img
              className="w-[10vh] h-[10vh] object-cover rounded mr-5 shadow-lg"
              src={item.backdrop_path || item.profile_path 
                ? `https://image.tmdb.org/t/p/original/${item.backdrop_path || item.profile_path}` 
                : noimage}
              alt=""
            />
            <span>
              {item.original_title ||
                item.title ||
                item.name ||
                item.original_name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Topnav;