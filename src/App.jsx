import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import Trending from './Components/Trending'
import Popular from './Components/Popular'
import About from './Components/About'
import Contact from './Components/Contact'
import Movie from './Components/Movie'
import Shows from './Components/Shows'
import People from './Components/People'
import MovieDetails from './Components/MovieDetails'
import TvDetails from './Components/TvDetails'
import PersonDetails from './Components/PersonDetails'
import Trailer from './Components/partials/Trailer'
import NotFound from './Components/NotFound'

function App() {
  return (
    <div className='bg-[#1F1E24] w-full h-screen flex'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/trending' element={<Trending />} />
        <Route path='/popular' element={<Popular />} />

        <Route path='/movie' element={<Movie />} />
        <Route path='/movie/details/:id' element={<MovieDetails />}>
          <Route path='/movie/details/:id/trailer' element={<Trailer />} />
        </Route>

        <Route path='/tv' element={<Shows />} />
        <Route path='/tv/details/:id' element={<TvDetails />} />

        <Route path='/people' element={<People />} />
        <Route path='/people/details/:id' element={<PersonDetails />} />

        <Route path='/about' element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App

