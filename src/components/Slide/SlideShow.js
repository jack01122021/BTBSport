import React from 'react'
import { useState } from 'react';
import {Button} from '@mui/material';

function PhotoSlide() {
  const slides = [
    {
      url: 'https://static.dezeen.com/uploads/2014/03/Adidas-Samba-Primeknit_dezeen_ss6.jpg',
    },
    {
      url: 'https://www.prodirectsport.com/-/media/article-content/soccer-en/buying-guide/tiers/what_are_boot_levels_header.jpg',
    },
    {
      url: 'https://2.bp.blogspot.com/-F4zHBhGQSd0/Wa1NHMkCfzI/AAAAAAABUpU/xR3z3meidnwHVTvnQozDpz6DSVe_7O-TACLcBGAs/s1600/adidas-next-generation-2017-18-goalkeeper-gloves-pack%2B%25281%2529.jpg',
    },

    {
      url: 'https://www.kreedon.com/wp-content/uploads/2022/06/wp3951148.jpg',
    },
    {
      url: 'https://i2-prod.mirror.co.uk/incoming/article8715037.ece/ALTERNATES/n615/Nike_Football_Heritage_Pack_native_1600.jpg',
    },
    {
      url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgeAZ90ixuIeBYkS6whncZEaVwZBe7SU1e5cN6RwbazwnX9xz9QzUEiBqvJ5L3viER8mQnnHyzEXpP0GnECJffY9Me2VqSTsvItnCZafCuaplAcwqnaYlfmlYfqPvEHob4fw3fD7-sg5MSJIgyEuM8rRmgik5p92ctGvuQ44RlJvUTBu80rQdPNso8HonM/s1000/adidas-x-crazyfast-11.jpg',
    },
    {
      url: 'https://www.marketplace.org/wp-content/uploads/2020/07/GettyImages-1248502207.jpg?fit=2880%2C1620',
    },
    {
      url: 'https://www.miamiherald.com/reviews/wp-content/uploads/2022/03/ping-pong-set-MH.jpg',
    },
    {
      url: 'https://www.lta.org.uk/491dd5/siteassets/news/2023/february/badminton-court.jpg?w=1200',
    },
    {
      url: 'https://cdn.shopify.com/s/files/1/0020/9407/1890/files/2_480x480.jpg?v=1559302854',
    },
    {
      url: '',
    },
    {
      url: '',
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };



  return (
    <div className='max-w-[1400px] h-[600px] w-full m-auto py-5 px-4 relative group'>
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className='w-full h-full rounded-2xl bg-center bg-cover duration-500'
      ></div>

      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 
      text-2xl rounded-full p-2 bg-white/20 text-white cursor-pointer'>
       <Button onClick={prevSlide} className='text-white'>BACK</Button>

      </div>

      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 
      text-2xl rounded-full p-2 bg-white/20 text-white cursor-pointer'>
       <Button onClick={nextSlide} className='text-white'>NEXT</Button>

      </div>


    
    </div>
  )
}

export default PhotoSlide
