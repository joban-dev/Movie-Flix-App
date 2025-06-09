import React, { useEffect, useState } from 'react'
import Topnav from './partials/Topnav'
import DropDown from './partials/DropDown'
import { useNavigate } from 'react-router-dom'
import axios from '../utils/Axios';
import Loading from './Loading'
import Cards from './partials/Cards';
import InfiniteScroll from 'react-infinite-scroll-component';

function Popular() {

    const navigate = useNavigate();

    const [Category, setCategory] = useState('movie');
    const [popular, setpopular] = useState([]);
    const [page, setpage] = useState(1)
    const [hasmore, sethasmore] = useState(true)
  
    document.title = "MovieFlix | Popular " + Category.toUpperCase()
  
    const GetPopular = async () => {
      try {
        const { data } = await axios.get(`/${Category}/popular?page=${page}`)
        // setpopular(data.results);
        if(data.results.length > 0){
          setpopular((prev)=>[...prev, ...data.results]);
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
        if(popular.length == 0){
          GetPopular()
        }
        else{
          setpage(1)
          setpopular([])
          GetPopular()
        }
      }
  
      useEffect(() => {
  
      refreshHandler();
  
    }, [Category])

 
    return popular.length > 0 ? (
        <div className='px-[3%] w-screen h-screen bg-black'>
          <div className='w-full flex items-center justify-between'>
            <h1 className='text-2xl font-semibold text-zinc-400'>
              <i onClick={() => navigate(-1)} className='hover:text-[#6556CD] ri-arrow-left-line p-3'></i>
              popular</h1>
    
            <div className='flex items-center w-[80%]'>
    
              <Topnav />
    
              <DropDown title="Category" options={["movie", "tv"]} func={(e) => setCategory(e.target.value)} />
              <div className='w-[2%]'></div>
    
            </div>
          </div>
          <div className='m-auto w-screen'>
    
            <InfiniteScroll
              dataLength={popular.length}
              next={GetPopular}
              hasMore={hasmore}
              loader={<h4>Loading...</h4>}
              >
              <Cards data={popular} title={Category} />
            </InfiniteScroll>
    
          </div>
    
        </div>
      ) : <Loading />
}

export default Popular

