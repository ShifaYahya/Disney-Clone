import React, { useRef } from 'react'
import {useEffect, useState } from 'react'
import GlobalApi from '../services/GlobalApi'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2'
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original"
const screenWidth = window.innerWidth


const Slider = () => {
const [movieList, setMovieList] = useState([])

const elementRef = useRef();

useEffect(()=>{
    getTrendingMovies(); 
}, [])

const getTrendingMovies = ()=>{
    GlobalApi.getTrendingVideos.then( resp=>{
        console.log(resp.data.results)
        setMovieList(resp.data.results)
    })


}

const sliderRight = (element) =>{
    element.scrollLeft+= screenWidth- 110  // screenWidth minus the padding
}

const sliderLeft = (element) =>{
   element.scrollLeft-= screenWidth- 110  // screenWidth minus the padding
}


return (
    <div>
      <HiChevronLeft className='text-white hidden md:block absolute text-[30px] mx-8 mt-[150px] cursor-pointer' onClick={()=> sliderLeft(elementRef.current)}/>
      <HiChevronRight className='text-white hidden md:block absolute text-[30px] mx-8 mt-[150px] cursor-pointer right-0' onClick={()=> sliderRight(elementRef.current)}/>

      <div ref={elementRef} className='flex overflow-x-auto w-full px-16 py-4 scrollbar-hide scroll-smooth'>
  {movieList.map((item, index) => (
    <img
      src={IMAGE_BASE_URL + item.backdrop_path}
      className='min-w-full md:h-[310px] object-cover object-left-top mr-5 rounded-md hover:border-[4px] border-gray-400 transition-all duration-100 ease-in'
      key={index}
      alt={`Movie ${index}`}
    ></img>
  ))}
</div>
    </div>
  );
}

export default Slider