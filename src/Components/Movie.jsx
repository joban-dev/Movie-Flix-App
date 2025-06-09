import React, { useEffect, useState } from 'react'
import Topnav from './partials/Topnav'
import DropDown from './partials/DropDown'
import { useNavigate } from 'react-router-dom'
import axios from '../utils/Axios';
import Loading from './Loading'
import Cards from './partials/Cards';
import InfiniteScroll from 'react-infinite-scroll-component';

function Movie() {
    const navigate = useNavigate();

    const [Category, setCategory] = useState('now_playing');
    const [movie, setmovie] = useState([]);
    const [page, setpage] = useState(1)
    const [hasmore, sethasmore] = useState(true)
  
    document.title = "MovieFlix | movie " + Category.toUpperCase()
  
    const Getmovie = async () => {
      try {
        const { data } = await axios.get(`/movie/${Category}?page=${page}`)
        // setmovie(data.results);
        if(data.results.length > 0){
          setmovie((prev)=>[...prev, ...data.results]);
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
        if(movie.length == 0){
          Getmovie()
        }
        else{
          setpage(1)
          setmovie([])
          Getmovie()
        }
      }
  
      useEffect(() => {
  
      refreshHandler();
  
    }, [Category])

     
    return movie.length > 0 ? (
        <div className='px-[3%] w-screen h-screen bg-black'>
          <div className='w-full flex items-center justify-between'>
            <h1 className='text-2xl font-semibold text-zinc-400'>
              <i onClick={() => navigate(-1)} className='hover:text-[#6556CD] ri-arrow-left-line p-3'></i>
              movie <small className='ml-1 text-sm text-zinc-500'>({Category})  </small></h1>
    
            <div className='flex items-center w-[80%]'>
    
              <Topnav />
    
              <DropDown title="Category" options={["popular", "top_rated", "upcoming", "now_playing"]} func={(e) => setCategory(e.target.value)} />
              <div className='w-[2%]'></div>
    
            </div>
          </div>
          <div className='m-auto w-screen'>
    
            <InfiniteScroll
              dataLength={movie.length}
              next={Getmovie}
              hasMore={hasmore}
              loader={<h4>Loading...</h4>}
              >
              <Cards data={movie} title="movie" />
            </InfiniteScroll>
    
          </div>
    
        </div>
      ) : <Loading />

}

export default Movie