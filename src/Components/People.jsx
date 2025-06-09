import React, { useEffect, useState } from 'react'
import Topnav from './partials/Topnav'
import { useNavigate } from 'react-router-dom'
import axios from '../utils/Axios';
import Loading from './Loading'
import Cards from './partials/Cards';
import InfiniteScroll from 'react-infinite-scroll-component';

function People() {
    const navigate = useNavigate();

    const [Category, setCategory] = useState('popular');
    const [people, setpeople] = useState([]);
    const [page, setpage] = useState(1)
    const [hasmore, sethasmore] = useState(true)
  
    document.title = "MovieFlix | People " + Category.toUpperCase()
  
    const Getpeople = async () => {
      try {
        const { data } = await axios.get(`/person/${Category}?page=${page}`)
        // setpeople(data.results);
        if(data.results.length > 0){
          setpeople((prev)=>[...prev, ...data.results]);
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
        if(people.length == 0){
          Getpeople()
        }
        else{
          setpage(1)
          setpeople([])
          Getpeople()
        }
      }
  
      useEffect(() => {
  
      refreshHandler();
  
    }, [Category])


    return people.length > 0 ? (
        <div className='px-[3%] w-screen h-screen bg-black'>
          <div className='w-full flex items-center justify-between'>
            <h1 className='text-2xl font-semibold text-zinc-400'>
              <i onClick={() => navigate(-1)} className='hover:text-[#6556CD] ri-arrow-left-line p-3'></i>
              people</h1>
    
            <div className='flex items-center w-[80%]'>
    
              <Topnav />
    
            </div>
          </div>
          <div className='m-auto w-screen'>
    
            <InfiniteScroll
              dataLength={people.length}
              next={Getpeople}
              hasMore={hasmore}
              loader={<h4>Loading...</h4>}
              >
              <Cards data={people} title="people" />
            </InfiniteScroll>
    
          </div>
    
        </div>
      ) : <Loading />
}

export default People