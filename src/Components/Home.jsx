import React, { useEffect, useState } from 'react'
import Sidenav from './partials/Sidenav'
import Topnav from './partials/Topnav'
import Header from './partials/Header'
import axios from '../utils/Axios'
import HorizontalCards from './partials/HorizontalCards'
import Loading from './Loading'
import DropDown from './partials/DropDown'


function Home() {
  document.title = "MovieFlix | Homepage"

  const [wallpaper, setwallpaper] = useState(null)
  const [trending, settrending] = useState(null)
  const [popular, setpopular] = useState(null)
  const [movie, setmovie] = useState(null)
  const [show, setshow] = useState(null)
  const [discover, setdiscover] = useState(null)
  const [people, setpeople] = useState([])
  const [category, setcategory] = useState('all')

  const getHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let randomdata = data.results[(Math.random() * data.results.length).toFixed()]
      setwallpaper(randomdata)
    } catch (err) {
      console.log('Error:', err);
    }
  };

  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      settrending(data.results)
    } catch (err) {
      console.log('Error:', err);
    }
  };

  const getPopular = async () => {
    try {
      const { data } = await axios.get(`/movie/popular`);
      setpopular(data.results)
    } catch (err) {
      console.log('Error:', err);
    }
  };

  const getMovie = async () => {
    try {
      const { data } = await axios.get(`/movie/top_rated`);
      setmovie(data.results)
    } catch (err) {
      console.log('Error:', err);
    }
  };

  const getShow = async () => {
    try {
      const { data } = await axios.get(`/discover/tv`);
      setshow(data.results)
    } catch (err) {
      console.log('Error:', err);
    }
  };

  const getDiscover = async () => {
    try {
      const { data } = await axios.get(`/movie/upcoming`);
      setdiscover(data.results)
    } catch (err) {
      console.log('Error:', err);
    }
  };

  const getPeople = async () => {
    try {
      const { data } = await axios.get(`/person/popular`);
      setpeople(data.results);
    } catch (err) {
      console.error("Error:", err);
    }
  };



  useEffect(() => {
    getTrending();
    getPopular();
    getMovie();
    getShow();
    getDiscover();
    getPeople();
    !wallpaper && getHeaderWallpaper();

  }, [category])

  // ... (rest of Home component remains the same until the return statement)

  return (
    <>
      <Sidenav />
      <div className='w-full h-full overflow-auto overflow-x-hidden bg-black'>
        <Topnav />
        {wallpaper && <Header data={wallpaper} />}

        <div className="flex justify-between p-4 pb-0 pt-8">
          <h1 className="text-3xl font-bold text-white">🔥 Trending Now</h1>
          <DropDown
            title="Filter"
            options={["tv", "movie", "all"]}
            func={(e) => setcategory(e.target.value)}
          />
        </div>
        {trending && <HorizontalCards data={trending} type="trending" />}

        {popular && (
          <>
            <div className="flex justify-between p-4 pb-0 pt-8">
              <h1 className="text-3xl font-bold text-white">✨ Popular Now</h1>
            </div>
            <HorizontalCards data={popular} type="movie" />
          </>
        )}

        {movie && (
          <>
            <div className="flex justify-between p-4 pb-0 pt-8">
              <h1 className="text-3xl font-bold text-white">▶️ Top-Rated Movies</h1>
            </div>
            <HorizontalCards data={movie} type="movie" />
          </>
        )}

        {show && (
          <>
            <div className="flex justify-between p-4 pb-0 pt-8">
              <h1 className="text-3xl font-bold text-white">📺 Tv Shows</h1>
            </div>
            <HorizontalCards data={show} type="tv" />
          </>
        )}

        {discover && (
          <>
            <div className="flex justify-between p-4 pb-0 pt-8">
              <h1 className="text-3xl font-bold text-white">🔍 Discover Upcoming Movies</h1>
            </div>
            <HorizontalCards data={discover} type="movie" />
          </>
        )}

        {people && (
          <>
            <div className="flex justify-between p-4 pb-0 pt-8">
              <h1 className="text-3xl font-bold text-white">🔍 Discover People</h1>
            </div>
            <HorizontalCards data={people} type="people" isPeople={true} />
          </>
        )}
      </div>
    </>
  )
}

export default Home




