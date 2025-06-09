import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function HorizontalCards({ data = [], isPeople = false, type }) {
  if (!data.length) {
    return <p className="text-white text-center p-5">No results found.</p>;
  }

  const getMediaType = (item) => {
    if (isPeople) return "people"; 
    return item.media_type || type || "movie";
  };

  return (
    <div className="w-full p-5">
      <motion.div
        className="w-full flex gap-5 overflow-x-auto scrollbar-hide p-3"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {data.map((d) => {
          const mediaType = getMediaType(d);
          const imagePath = isPeople ? d.profile_path : (d.backdrop_path || d.poster_path);

          return (
            <Link
              to={`/${mediaType}/details/${d.id}`} // This will now generate /people/details/:id for people
              key={d.id}
              className="min-w-[25%] bg-zinc-900 rounded-lg overflow-hidden shadow-lg relative cursor-pointer border border-gray-800"
            >
              <motion.div
                whileHover={{ scale: 1.08, boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)" }}
                transition={{ duration: 0.3 }}
              >
                <img
                  className="w-full h-62 object-cover"
                  src={imagePath ? `https://image.tmdb.org/t/p/original${imagePath}` : "/images/404.gif"}
                  alt={d.title || d.name || "No Image"}
                  onError={(e) => (e.target.src = "/images/404.gif")}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 text-white p-4">
                  <h1 className="font-semibold line-clamp-1">
                    {d.title || d.name || "Unknown"}
                  </h1>
                  {!isPeople && d.overview && (
                    <p className="text-sm text-gray-300 line-clamp-2">
                      {d.overview.slice(0, 80)}...
                      <span className="text-blue-400 cursor-pointer hover:underline"> more</span>
                    </p>
                  )}
                </div>
              </motion.div>
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
}

export default HorizontalCards;