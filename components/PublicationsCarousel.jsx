"use client"

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PublicationsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const publications = [
    {
      image: "/images/work/book1.jpg",
      title: "How to win the hardest Marathon"
    },
    {
      image: "/images/work/book2.jpg", 
      title: "Right Or Left"
    }
  ];

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? prevIndex : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === publications.length - 1 ? prevIndex : prevIndex + 1
    );
  };

  return (
    <div className="relative flex items-center justify-center mt-4 min-h-[12rem]">
      {/* Left Chevron */}
      <button
        onClick={goToPrevious}
        disabled={currentIndex === 0}
        className={`absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full border-2 z-10 ${
          currentIndex === 0 
            ? 'border-gray-400 text-gray-400 cursor-not-allowed' 
            : 'border-white text-white hover:bg-white hover:text-black'
        } transition-colors`}
      >
        <ChevronLeft size={16} />
      </button>

      {/* Publication Content */}
      <div className="flex flex-col items-center">
        <div className="w-48 h-48 overflow-hidden rounded-lg bg-gray-200">
          <img
            src={publications[currentIndex].image}
            alt={publications[currentIndex].title}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="mt-2 text-center font-medium ">
          {publications[currentIndex].title}
        </h3>
      </div>

      {/* Right Chevron */}
      <button
        onClick={goToNext}
        disabled={currentIndex === publications.length - 1}
        className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full border-2 z-10 ${
          currentIndex === publications.length - 1 
            ? 'border-gray-400 text-gray-400 cursor-not-allowed' 
            : 'border-white text-white hover:bg-white hover:text-black'
        } transition-colors`}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default PublicationsCarousel;