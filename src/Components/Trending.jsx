import React, { useEffect, useState } from 'react'
import Topnav from './partials/Topnav'
import DropDown from './partials/DropDown'
import { useNavigate } from 'react-router-dom'
import axios from '../utils/Axios';
import Loading from './Loading'
import Cards from './partials/Cards';
import InfiniteScroll from 'react-infinite-scroll-component';


function Trending() {

  const navigate = useNavigate();

  const [Category, setCategory] = useState('all');
  const [duration, setduration] = useState('day');
  const [trending, settrending] = useState([]);
  const [page, setpage] = useState(1)
  const [hasmore, sethasmore] = useState(true)

  document.title = "MovieFlix | Trending " + Category.toUpperCase()

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${Category}/${duration}?page=${page}`)
      // settrending(data.results);
      if(data.results.length > 0){
        settrending((prev)=>[...prev, ...data.results]);
        setpage((prev)=> prev + 1 )
      }
      else{
        sethasmore(false)
      }
    }
    catch (err) {
      console.log("error is ", err)
    }
  }

    const refreshHandler = () => {
      if(trending.length == 0){
        GetTrending()
      }
      else{
        setpage(1)
        settrending([])
        GetTrending()
      }
    }

    useEffect(() => {

    refreshHandler();

  }, [Category, duration])
  


  return trending.length > 0 ? (
    <div className='px-[3%] w-screen h-screen bg-black'>
      <div className='w-full flex items-center justify-between'>
        <h1 className='text-2xl font-semibold text-zinc-400'>
          <i onClick={() => navigate(-1)} className='hover:text-[#6556CD] ri-arrow-left-line p-3'></i>
          Trending</h1>

        <div className='flex items-center w-[80%]'>

          <Topnav />

          <DropDown title="Category" options={["movie", "tv", "all"]} func={(e) => setCategory(e.target.value)} />
          <div className='w-[2%]'></div>
          <DropDown title="Duration" options={["week", "day"]} func={(e) => setduration(e.target.value)} />

        </div>
      </div>
      <div className='m-auto w-screen'>

        <InfiniteScroll
          dataLength={trending.length}
          next={GetTrending}
          hasMore={hasmore}
          loader={<h4>Loading...</h4>}
          >
          <Cards data={trending} title="tv" />
        </InfiniteScroll>

      </div>

    </div>
  ) : <Loading />
}

export default Trending



