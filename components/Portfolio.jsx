"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, ChevronRightCircle } from "lucide-react";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import {
  UserCircleIcon,
  ChartBarIcon,
  SquaresFourIcon,
  AirplaneIcon,
  ChatsIcon,
  RocketLaunchIcon,
  TrophyIcon,
} from "@phosphor-icons/react";

import PublicationsCarousel from "./PublicationsCarousel";
import Contact from "./Contact";

const TypedText = ({ strings, className = "" }) => {
  const [currentStringIndex, setCurrentStringIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100;
    const currentString = strings[currentStringIndex];

    const timer = setTimeout(() => {
      if (!isDeleting && currentText === currentString) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setCurrentStringIndex((prev) => (prev + 1) % strings.length);
      } else {
        setCurrentText((prev) =>
          isDeleting
            ? prev.slice(0, -1)
            : currentString.slice(0, prev.length + 1)
        );
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentStringIndex, strings]);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorTimer);
  }, []);

  return (
    <span className={className}>
      {currentText}
      <span
        className={`${
          showCursor ? "opacity-100" : "opacity-0"
        } transition-opacity`}
      >
        |
      </span>
    </span>
  );
};

const AwardsCarousel = ({ awards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef(null);

  // Auto-scroll functionality
  useEffect(() => {
    if (isAutoPlaying && awards.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === awards.length - 1 ? 0 : prevIndex + 1
        );
      }, 4000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, awards.length]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(currentIndex === 0 ? awards.length - 1 : currentIndex - 1);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(currentIndex === awards.length - 1 ? 0 : currentIndex + 1);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  return (
    <div className="relative maxw-6xl mx-auto">
      <div className="overflow-hidden rounded-xl bg-secondary text-primary shadow-lg">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {awards.map((item, index) => (
            <div key={index} className="w-full flex-shrink-0 px-16">
              <div className="flex gap-4 p-4 items-center ">
                
                <div className="w-80 h-80">
                  <img
                    src={item.image}
                    alt="award image"
                    className="w-full h-full rounded-lg"
                  />
                </div>

               
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <h2 className="font-semibold  text-2xl leading-tight mb-2 line-clamp-2">
                      {item.title}
                    </h2>

                    <h3 className="font-semibold  text-xl truncate mt-6">
                      {item.name}
                    </h3>

                    <p className="text-base leading-relaxed  mt-8 max-w-[40rem]">{item.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      {awards.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full border border-white shadow-lg z-10 transition-all duration-200 hover:scale-110"
          >
            <ChevronLeft size={16} className="text-white" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full  border border-white shadow-lg z-10 transition-all duration-200  hover:scale-110"
          >
            <ChevronRight size={16} className="text-white" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {awards.length > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {awards.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setIsAutoPlaying(false);
                setTimeout(() => setIsAutoPlaying(true), 5000);
              }}
              className={` rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? "bg-blue-500 scale-125 w-5 h-1"
                  : "bg-gray-300 hover:bg-gray-400 w-2 h-1"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const VisaCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef(null);

  const visaImages = [1, 2, 3, 4, 5, 6, 7, 8];

  // Auto-scroll functionality
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === visaImages.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000); // Change slide every 3 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, visaImages.length]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(
      currentIndex === 0 ? visaImages.length - 1 : currentIndex - 1
    );
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(
      currentIndex === visaImages.length - 1 ? 0 : currentIndex + 1
    );
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  return (
    <div className="relative w-[30%]">
      <div className="overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {visaImages.map((item, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 flex justify-center p-4 bg-black/4 items-center"
            >
              <Image
                src={`/images/visa/visa${item}.svg`}
                alt={`visa ${item}`}
                width={150}
                height={150}
                className="rounded-xl w-full"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        disabled={currentIndex === 0}
        className={`absolute left-2 top-2 p-2 rounded-full bg-white shadow-lg z-10 transition-all duration-200 ${
          currentIndex === 0
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-100 hover:scale-110"
        }`}
      >
        <ChevronLeft
          size={16}
          className={currentIndex === 0 ? "text-gray-400" : "text-gray-700"}
        />
      </button>

      <button
        onClick={goToNext}
        disabled={currentIndex === visaImages.length - 1}
        className={`absolute right-2 top-2 p-2 rounded-full bg-white shadow-lg z-10 transition-all duration-200 ${
          currentIndex === visaImages.length - 1
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-100 hover:scale-110"
        }`}
      >
        <ChevronRight
          size={16}
          className={
            currentIndex === visaImages.length - 1
              ? "text-gray-400"
              : "text-gray-700"
          }
        />
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-4 space-x-2">
        {visaImages.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              setIsAutoPlaying(false);
              setTimeout(() => setIsAutoPlaying(true), 5000);
            }}
            className={` rounded-full transition-all duration-200 ${
              index === currentIndex
                ? "bg-purple-new scale-125  w-5 h-1"
                : "bg-gray-300 hover:bg-gray-400 w-3 h-1"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const CarouselWrapper = ({ companies }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoScrolling, setIsAutoScrolling] = useState(true);

    // Auto-scroll functionality
    useEffect(() => {
      if (!isAutoScrolling) return;

      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === companies.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);

      return () => clearInterval(interval);
    }, [currentIndex, isAutoScrolling, companies.length]);

    const goToPrevious = () => {
      setIsAutoScrolling(false);
      setCurrentIndex(
        currentIndex === 0 ? companies.length - 1 : currentIndex - 1
      );
      setTimeout(() => setIsAutoScrolling(true), 10000);
    };

    const goToNext = () => {
      setIsAutoScrolling(false);
      setCurrentIndex(
        currentIndex === companies.length - 1 ? 0 : currentIndex + 1
      );
      setTimeout(() => setIsAutoScrolling(true), 10000);
    };

    const goToSlide = (index) => {
      setIsAutoScrolling(false);
      setCurrentIndex(index);
      setTimeout(() => setIsAutoScrolling(true), 10000);
    };

    return (
      <div className="relative">
        {/* Navigation Arrows */}
        <div className="flex justify-end gap-4 items-center mb-4">
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className={`p-2 rounded-full transition-all border ${
              currentIndex === 0
                ? "border-gray-700 text-primary/50 cursor-not-allowed opacity-50"
                : "border-primary text-primary hover:border-primary/80 hover:scale-105 transition-all duration-300 ease-in-out"
            }`}
          >
            <ChevronLeft size={16} />
          </button>

          <button
            onClick={goToNext}
            disabled={currentIndex === companies.length - 1}
            className={`p-2 rounded-full transition-all border ${
              currentIndex === companies.length - 1
                ? "border-gray-700 text-primary/50 cursor-not-allowed opacity-50"
                : "border-primary text-primary hover:border-primary/80 hover:scale-105 transition-all duration-300 ease-in-out"
            }`}
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Carousel Container */}
        <div className="overflow-hidden rounded-xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {companies.map((items, index) => {
              return (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="bg-primary p-4 rounded-xl text-secondary/80 flex justify-between gap-4 items-center">
                    <div className="w-[30%]">
                      <Image
                        src={items.logo}
                        alt={items.name}
                        width={40}
                        height={40}
                        className="w-[80%]"
                      />
                    </div>
                    <div className="w-[70%] font-medium">
                      <div className="flex justify-between mb-2">
                        <p>{items.role}</p>
                        <p className="font-semibold text-secondary">
                          {items.period}
                        </p>
                      </div>
                      <h2 className="font-bold text-2xl mb-4 text-secondary">
                        {items.name}
                      </h2>

                      <p>{items.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-4 space-x-2">
          {companies.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full transition-all ${
                index === currentIndex
                  ? "bg-primary scale-110 w-6 h-1 "
                  : " w-3 h-1  bg-gray-600 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    );
  };
  const CarouselWrapper2 = ({ mentorships }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoScrolling, setIsAutoScrolling] = useState(true);

    const cardsPerView = 3;
    // Calculate total number of slides/pages
    const totalSlides = Math.ceil(mentorships.length / cardsPerView);
    // Max page index (0-based)
    const maxIndex = Math.max(0, totalSlides - 1);

    // Auto-scroll functionality
    useEffect(() => {
      if (!isAutoScrolling) return;

      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex >= maxIndex ? 0 : prevIndex + 1
        );
      }, 5000);

      return () => clearInterval(interval);
    }, [currentIndex, isAutoScrolling, maxIndex]);

    const goToPrevious = () => {
      setIsAutoScrolling(false);
      setCurrentIndex(currentIndex === 0 ? maxIndex : currentIndex - 1);
      setTimeout(() => setIsAutoScrolling(true), 10000);
    };

    const goToNext = () => {
      setIsAutoScrolling(false);
      setCurrentIndex(currentIndex >= maxIndex ? 0 : currentIndex + 1);
      setTimeout(() => setIsAutoScrolling(true), 10000);
    };

    const goToSlide = (index) => {
      setIsAutoScrolling(false);
      setCurrentIndex(index);
      setTimeout(() => setIsAutoScrolling(true), 10000);
    };

    return (
      <div className="relative">
        {/* Navigation Arrows */}
        <div className="flex justify-end gap-4 items-center mb-4">
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className={`p-2 rounded-full transition-all border ${
              currentIndex === 0
                ? "border-gray-300 text-gray-400 cursor-not-allowed opacity-50"
                : "border-secondary text-secondary hover:border-secondary/80 hover:scale-105 transition-all duration-300 ease-in-out"
            }`}
          >
            <ChevronLeft size={16} />
          </button>

          <button
            onClick={goToNext}
            disabled={currentIndex >= maxIndex}
            className={`p-2 rounded-full transition-all border ${
              currentIndex >= maxIndex
                ? "border-gray-300 text-gray-400 cursor-not-allowed opacity-50"
                : "border-secondary text-secondary hover:border-secondary/80 hover:scale-105 transition-all duration-300 ease-in-out"
            }`}
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Carousel Container */}
        <div className="overflow-hidden rounded-xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {Array.from({ length: totalSlides }).map((_, pageIndex) => {
              const startIndex = pageIndex * cardsPerView;
              const endIndex = Math.min(
                startIndex + cardsPerView,
                mentorships.length
              );
              const pageItems = mentorships.slice(startIndex, endIndex);

              return (
                <div
                  key={pageIndex}
                  className="w-full flex-shrink-0 flex justify-between"
                >
                  {pageItems.map((items, itemIndex) => (
                    <div
                      key={startIndex + itemIndex}
                      className=" px-2 w-1/3 text-center"
                    >
                      <div className="bg-primary p-4 rounded-xl text-secondary/80 flex flex-col justify-center gap-4 items-center">
                        <div className="w-[60%] flex-shrink-0">
                          <Image
                            src={items.img}
                            alt={items.role}
                            width={40}
                            height={40}
                            className="w-20 h-20  flex-shrink-0"
                          />
                        </div>
                        <div className="">
                          <p>{items.role}</p>
                          <p className="items-center font-bold whitespace-nowrap">
                            {items.institution}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* Pagination Dots - Now Dynamic */}
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full transition-all ${
                index === currentIndex
                  ? "bg-secondary scale-110 w-6 h-1"
                  : "w-3 h-1 bg-gray-400 hover:bg-secondary/60"
              }`}
            />
          ))}
        </div>
      </div>
    );
  };

  const achievements = [
    {
      image: "/images/profile1.svg",
      label: "Travelled",
      value: "45+ Countries",
    },
    { image: "/images/profile2.svg", label: "Given", value: "100+ Lectures" },
    {
      image: "/images/profile3.svg",
      label: "Honored with",
      value: "80+ Awards",
    },
    {
      image: "/images/profile4.svg",
      label: "Invested in",
      value: "3 Start Ups",
    },
  ];

  const awards = [
    {
      image: "/images/awards1.svg",
    },
    { image: "/images/awards2.svg" },
    {
      image: "/images/awards3.svg",
    },
  ];
  const socials = [
    { href: "https://www.instagram.com/flyinggauti/", image: "/images/socials/instagram.svg" },
    { href: "https://topmate.io/lalit_gautam/", image: "/images/socials/Topmate.svg" },
    {
      href: "https://www.facebook.com/lalit.gautam.144/",
      image: "/images/socials/facebook.svg",
    },
    {
      href: "https://www.linkedin.com/in/lalit-gautam-61241a23/",
      image: "/images/socials/linkedin.svg",
    },
    {
      href: "https://twitter.com/indiangotham",
      image: "/images/socials/X.svg",
    },
    { href: "https://wa.link/c2yovp", image: "/images/socials/whatsapp.svg" },
  ];

  const companies = [
    {
      logo: "/images/logo.svg",
      name: "SenseGrass.com",
      role: "Founder & CEO",
      description:
        "Soil intelligence platform powered by AI Agronomist & IoT sensors to improve yield output with precision farming techniques.",
      period: "Since 2018",
    },
    {
      logo: "/images/handscart.png",
      name: "HandsCart.com",
      role: "Founder & CEO",
      description:
        "A social start-up built on blockchain technology to enable e-commerce for HandMade designer products.",
      period: "2016 - Acquired Exit 2018",
    },
    {
      logo: "/images/connect.png",
      name: "ConnectBorder.com",
      role: "Founding Member",
      description:
        "A non profit organisation with a mission to connect world for enabling global entrepreneurs expansion.",
      period: "Since 2019",
    },
  ];

  const mentorships = [
    {
      img: "/images/work/support1.png",
      role: "Mentor",
      institution: "Santa Clara University",
    },
    {
      img: "/images/work/support2.jpeg",
      role: "Startup Mentor",
      institution: "Singularity University",
    },
    {
      img: "/images/work/support3.png",
      role: "Solution Specialist",
      institution: "Solar Impulse Foundation",
    },
    {
      img: "/images/work/support4.jpeg",
      role: "Business Mentor",
      institution: "Bridge to Billions",
    },
    {
      img: "/images/work/support5.png",
      role: "Startup Mentor",
      institution: "StartUp Chile",
    },
    {
      img: "/images/work/support6.png",
      role: "StartUp Mentor",
      institution: "Global Enterprise Network",
    },
  ];

  const awardsdata = [
    {
      image: "/images/achievement3.svg",
      title: "Artificial intelligence & robotics",
      name: "Lalit Gautam",
      desc: "Combining sensors, drones, AI, and IoT to improve agricultural productivity and reduce its environmental impact.",
    },
    {
      image: "/images/achievement2.svg",
      title: "Forbes India 30 under 30",
      name: "Lalit Gautam",
      desc: "In 2017, Lalit founded sensegrass, a soil intelligence platform that helps companies and farmers reduce excessive nitrogen and fertilizers from the soil using a patented NPK sensor.",
    },
    {
      image: "/images/achievement1.svg",
      title: "Forbes 30 under 30 Europe 2020",
      name: "Lalit Gautam",
      desc: "Sensegrass raised over $3.7 million to date and its product is currently being used in 8 countries.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed top-4 right-4 z-50 lg:hidden bg-black/10 backdrop-blur-md p-2 rounded-lg"
      >
        {isMenuOpen ? (
          <X size={24} className="text-white" />
        ) : (
          <Menu size={24} className="text-white" />
        )}
      </button>

      {/* Mobile Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Navigation */}
      <nav
        className={`fixed right-0 top-0 h-full w-80 bg-white/95 backdrop-blur-md border-l border-black/10 shadow-lg transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 z-40`}
      >
        <div className="h-full flex flex-col py-8 mt-2">
          {/* Profile Header */}
          <div className=" ">
            <div className="w-full mt-4">
              <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center w-full p-2">
                <Image
                  src="/images/sidebarimage.svg"
                  alt="sidebar profile"
                  width={100}
                  height={100}
                  className="w-full rounded-xl"
                />
              </div>
            </div>
            <h1 className="text-2xl font-semibold text-black pt-8 px-8 pb-4 mt-8">
              Lalit{" "}
              <TypedText
                strings={["Gautam", "Gotham"]}
                className="font-normal"
              />
            </h1>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 space-y-0 mx-6  ">
            {[
              // { id: 'home', label: 'Home', icon: '🏠' },
              { id: "profile", label: "Profile", icon: UserCircleIcon },
              { id: "work", label: "Work", icon: ChartBarIcon },
              { id: "services", label: "Services", icon: SquaresFourIcon },
              { id: "life", label: "Life", icon: AirplaneIcon },
              { id: "contact", label: "Contact", icon: ChatsIcon },
              {
                id: "startup",
                label: "Startups & Visas",
                icon: RocketLaunchIcon,
              },
              { id: "achievements", label: "Achievements", icon: TrophyIcon },
            ].map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`group cursor-pointer w-it text-left px-4 py-3 rounded-lg transition-all font-medium duration-200 flex items-center gap-3 ${
                    activeSection === item.id
                      ? "bg-black/10 text-black"
                      : "text-gray-600 hover:text-purple-new"
                  }`}
                >
                  {" "}
                  <div className="w-[2] h-5 bg-purple-new rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></div>
                  <IconComponent
                    size={20}
                    className="group-hover:text-purple-new transition-all duration-500 ease-in-out"
                  />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Social Links */}
          <div className="flex gap-6  mx-auto">
            {socials.slice(0, 3).map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg flex items-center justify-center transition-colors"
              >
                <Image
                  src={social.image}
                  alt="social icon"
                  width={20}
                  height={20}
                  className="w-7 h-7 hover:scale-110 hover:rotate-6 transition-all duration-300 ease-in-out"
                />
              </a>
            ))}
          </div>

          <div className="flex gap-6  mx-auto mt-4">
            {socials.slice(3).map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg flex items-center justify-center transition-colors"
              >
                <Image
                  src={social.image}
                  alt="social icon"
                  width={20}
                  height={20}
                  className="w-7 h-7 hover:scale-110 hover:rotate-6 transition-all duration-300 ease-in-out"
                />
              </a>
            ))}
          </div>

          <small className="text-xs text-secondary/70 mt-5 mx-auto ">
            © 2020 Copyright owned by <span className="font-bold">Lalit</span>
          </small>
        </div>
      </nav>

      {/* Main Content */}
      <main className="lg:mr-80">
        {/* Home Section - Hero with Background Image */}
        <section
          id="home"
          className="min-h-screen flex items-center justify-center relative bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(/images/mainbanner.svg)",
            backgroundColor: "#000",
          }}
        >
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/30"></div>

          <div className="relative z-10 text-center px-8 text-white">
            <div className="text-4xl md:text-8xl font-semibold mb-8">
              <TypedText
                strings={["Hello", "Hola!", "नमस्ते", "你好", "Bonjour"]}
                className="text-white"
              />
            </div>
            <h1 className="text-2xl font-semibold mb-8 max-w-[33rem] mx-auto">
              I am Lalit Gautam Global Citizen with a Passion for Building
              Startups and Inspiring Change Worldwide.
              <br />
            </h1>
            <p className="text-lg text-[#E5E5E5] mb-8 max-w-[30rem] mx-auto leading-relaxed text-center">
              Join me on my journey of my life, entrepreneurship and mentorship.
            </p>
            <button
              onClick={() => scrollToSection("contact")}
              className="bg-[#4361EE] hover:opacity/90 px-8 py-2 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 flex gap-2 mx-auto items-center cursor-pointer"
            >
              Let's connect{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
              >
                <path
                  d="M7.39969 6.65853L15.8897 3.82853C19.6997 2.55853 21.7697 4.63853 20.5097 8.44853L17.6797 16.9385C15.7797 22.6485 12.6597 22.6485 10.7597 16.9385L9.91969 14.4185L7.39969 13.5785C1.68969 11.6785 1.68969 8.56853 7.39969 6.65853Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.1094 13.9884L13.6894 10.3984"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className="mt-16">
              <button
                onClick={() => scrollToSection("profile")}
                className="animate-bounce"
              >
                <ChevronDown
                  size={32}
                  className="text-white/60 cursor-pointer"
                />
              </button>
            </div>
          </div>
        </section>

        {/* Profile Section */}
        <section id="profile" className="min-h-screen py-4  bg-white">
          <div className="max-w-6xl">
            <div className="flex w-full justify-between">
              <Image
                src="/images/profile.svg"
                alt="profile image"
                width={100}
                height={400}
                className="w-[30%] h-full object-cover"
              />

              <div className="mb-20 flex  items-center mt-12   ">
                <div>
                  <h2 className="text-5xl font-bold mb-8  text-black ">
                    Profile
                  </h2>
                  <p className="text-lg text-secondary leading-relaxed mb-8 max-w-2xl">
                    Serial entrepreneur founded 4 awarded startup, One exit, and
                    Raised over 4.5 M USD. Recognised at Forbes 30 Under 30, MIT
                    35 Under 35. First-ever 6 startup visa recipients.
                  </p>

                  <div className="grid grid-cols-4 gap-6 border rounded-3xl p-8 ">
                    {achievements.map((achievement, index) => (
                      <div key={index} className=" text-center">
                        <Image
                          src={achievement.image}
                          alt={achievement.label}
                          width={20}
                          height={20}
                          className="mx-auto w-12 h-12"
                        />
                        <div className="text-base text-gray-600 mb-1 mt-2">
                          {achievement.label}
                        </div>
                        <div className="font-bold text-black">
                          {achievement.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12">
                    <h3 className="text-2xl font-bold mb-8 text-black text-center">
                      Awarded & Recognised at
                    </h3>
                    <div className="grid grid-cols-3 gap-6 border rounded-3xl p-8">
                      {awards.map((award, index) => (
                        <div key={index} className=" text-center">
                          <Image
                            src={award.image}
                            alt="image"
                            width={20}
                            height={20}
                            className="mx-auto w-36 h-36"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Work Section */}
        <section id="work" className="min-h-screen pt-10 px-8 ">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <div className="flex justify-between w-full gap-4">
                <div className="w-[60%]  bg-black rounded-xl text-primary p-4 ">
                  <h2 className="text-4xl font-bold ">Startups</h2>
                  <p className="mt-2 text-lg">
                    Startups drive innovation and fuel economic growth through
                    their relentless pursuit of new ideas and disruptive
                    solutions.
                  </p>

                  <div className="">
                    <CarouselWrapper companies={companies} />
                  </div>
                </div>
                <div className="w-[40%] bg-primary rounded-xl p-4 border border-black font-medium text-secondary/80">
                  <h2 className="text-secondary text-4xl font-bold text-center mb-2">
                    Advocating
                  </h2>
                  <p className="text-center">
                    Advocating is about voicing support and promoting change for
                    a cause or issue you believe in.
                  </p>

                  <div className="px-6 pt-4 pb-2  flex w-full gap-4 justify-between">
                    <Image
                      src="/images/work/work1.svg"
                      alt="image"
                      width={20}
                      height={20}
                      className="w-24"
                    />
                    <Image
                      src="/images/work/work2.svg"
                      alt="image"
                      width={20}
                      height={20}
                      className="w-24"
                    />
                    <Image
                      src="/images/work/work3.svg"
                      alt="image"
                      width={20}
                      height={20}
                      className="w-24"
                    />
                  </div>
                  <div className="px-12  flex w-full justify-around">
                    <Image
                      src="/images/work/work4.svg"
                      alt="image"
                      width={20}
                      height={20}
                      className="w-24"
                    />
                    <Image
                      src="/images/work/work5.svg"
                      alt="image"
                      width={20}
                      height={20}
                      className="w-24"
                    />
                  </div>

                  <p className="mt-4 text-secondary/90">
                    Advocating is the powerful act of speaking up, raising
                    awareness, and championing causes to bring about positive
                    change in society, whether it's for social justice,
                    environmental sustainability, or individual rights.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-20">
              <div className="flex justify-between w-full gap-4">
                <div className="w-[60%]  bg-primary rounded-xl text-secondary p-4 border border-black ">
                  <h2 className="text-4xl font-bold mb-2 text-black">
                    Supporting
                  </h2>
                  <p className="text-secondary/80 text-lg max-w-4xl mx-auto font-medium">
                    Helping fellow entrepreneurs for business global growth,
                    solution specialist & mentoring in startup fields of SDGs &
                    SaaSs.
                  </p>

                  <div className="">
                    <CarouselWrapper2 mentorships={mentorships} />
                  </div>
                </div>
                <div className="w-[40%] bg-secondary rounded-xl p-4  font-medium text-primary">
                  <h2 className=" text-4xl font-bold text-center mb-2">
                    Publications
                  </h2>
                  <p className="text-center max-w-[25rem] mx-auto">
                    Books are windows to new worlds, vessels of knowledge, and
                    portals to imagination, enriching our lives one page at a
                    time.
                  </p>
                  {/* make a carousel here "  */}

                  <PublicationsCarousel />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sevice Section */}
        <section id="services" className="min-h-screen py-10 px-8 ">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <div className="flex justify-between w-full gap-4">
                <div className="w-[60%]  bg-black rounded-xl text-primary p-4 min-h-[40vh] flex items-center">
                  <div>
                    <h2 className="text-4xl font-bold max-w-[15rem] ">
                      Startups and Founders
                    </h2>
                    <p className="mt-4 text-base">
                      Lalit is the Founder and CEO of Sensegrass. Sensegrass is
                      a moonshot Agri tech company solving the biggest issue of
                      soil fertility by predicting and eliminating the excess
                      fertilizers from the soil to help small-scale farmers grow
                      faster and healthy.
                    </p>
                  </div>
                </div>
                <div className="w-[40%] bg-primary rounded-xl p-4 border border-black font-medium text-secondary/80 flex items-center">
                  <div>
                    <h2 className="text-secondary text-4xl font-bold text-center mb-4 ">
                      Mentoring
                    </h2>
                    <p className="text-center">
                      Two times Forbes 30 Under 30 for Technology Manufacturing
                      for India and Europe, MIT 35 Under 35. Lalit has One exit
                      and founded 3 startups. Born and grew up in a small
                      village of Uttar Pradesh to the most awarded Agriculture
                      entrepreneurs in the world.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-20">
              <div className="flex justify-between w-full gap-4">
                <div className="w-[60%]  bg-primary rounded-xl text-secondary p-4 border border-black min-h-[40vh] flex items-center  ">
                  <div className="">
                    <h2 className="text-4xl font-bold mb-4 text-black">
                      Public speaking
                    </h2>
                    <p className="text-secondary/80 text-base max-w-4xl mx-auto font-medium">
                      Lalit is a public speaker as well and has spoken on
                      varieties of topics from Future of SDGs to Civic education
                      in the Arab world, unsustainable business model importance
                      in startups to Human IQ vs Future of AI, etc at various
                      platforms including UN HQ in Geneva. 
                    </p>
                  </div>
                </div>
                <div className="w-[40%] bg-secondary rounded-xl p-4  font-medium text-primary flex items-center">
                  <div>
                    <h2 className=" text-4xl font-bold text-center mb-4">
                      Moving abroad
                    </h2>
                    <p className="text-center max-w-[25rem] mx-auto">
                      In recent years, Lalit has primarily resided in Europe,
                      where he achieved a rare feat as the only Indian to secure
                      three European startup visas from France, Italy, and
                      Spain. More recently, he added to his accolades by
                      obtaining the Canadian Impact visa, showcasing his
                      remarkable entrepreneurial spirit and global ambition.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Life Section */}
        <section
          id="life"
          className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-white font-annie"
        >
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium mb-8 sm:mb-12 lg:mb-16 text-black font-aiguilette">
              Work <span className="text-purple-new">Smart,</span> Party{" "}
              <span className="text-purple-new">Smarter!</span>
            </h2>

            <div className="mt-8 px-8">
              <div className="max-w-5xl mx-auto">
                <div className="flex gap-4 items-end">
                  <div className="flex flex-col gap-4 items-start">
                    <p className="text-3xl">Craft, celebrate, repeat</p>
                    <Image
                      src="/images/life/life1.svg"
                      alt="image here"
                      width={100}
                      height={80}
                      className="w-full"
                    />
                  </div>
                  <div className="flex gap-1 items-end">
                    <Image
                      src="/images/life/life2.svg"
                      alt="image here"
                      width={80}
                      height={120}
                      className="w-full"
                    />
                    <p
                      style={{ writingMode: "vertical-rl" }}
                      className="text-3xl mb-2"
                    >
                      Smart grind, unwind
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start mt-6">
                  <div className="flex  gap-2 items-start">
                    <div className="flex flex-col gap-4 items-end">
                      <div className="flex gap-2 ">
                        <p
                          className="text-2xl  "
                          style={{ writingMode: "vertical-rl" }}
                        >
                          Productive, then play
                        </p>
                        <Image
                          src="/images/life/life3.svg"
                          alt="image here"
                          width={100}
                          height={80}
                          className="w-full max-h-64"
                        />
                      </div>

                      <div className="flex flex-col gap-4 items-start">
                        <Image
                          src="/images/life/life5.svg"
                          alt="image here"
                          width={100}
                          height={80}
                          className="w-full"
                        />

                        <p className="text-3xl">
                          Mindful work, festive leisure
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 items-start justify-start">
                    <Image
                      src="/images/life/life4.svg"
                      alt="image here"
                      width={80}
                      height={120}
                      className="w-full object-cover h-72 rounded-xl"
                    />

                    <Image
                      src="/images/life/life6.svg"
                      alt="image here"
                      width={80}
                      height={120}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="min-h-screen py-10 px-8 bg-gray-50">
          <Contact />
        </section>

        {/* Startups section */}

        <section
          id="startup"
          className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 mt-8 font-annie "
        >
          <div className="max-w-5xl mx-auto text-center">
            <div className="p-8  min-h-screen">
              {/* Header */}
              <h1 className="text-5xl font-bold text-center mb-12">
                Navigating Opportunities{" "}
                <span className="text-blue-500">Worldwide</span>
              </h1>

              <div className="mt-6">
                <div className="flex gap-4">
                  <div className="flex flex-col items-between justify-between gap-2">
                    <p className="text-3xl w-full text-end mt-8">
                      United Kingdom
                    </p>
                    <div className="flex gap-2">
                      <p
                        className="text-3xl"
                        style={{
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                        }}
                      >
                        United States Of America
                      </p>
                      <img
                        src="/images/visa/visa2.svg"
                        alt="visa image"
                        className="max-w-64 object-cover rounded-xl"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex  justify-between mr-6 items-end">
                      <img
                        src="/images/visa/visa1.svg"
                        alt="UK Visa"
                        className="max-w-[80%] object-cover rounded-xl h-56 "
                      />
                      <p className="text-3xl">France</p>
                    </div>

                    <div className="flex gap-2">
                      <img
                        src="/images/visa/visa3.svg"
                        alt=" Visa"
                        className="max-w-64  object-cover rounded-xl"
                      />
                      <img
                        src="/images/visa/visa4.svg"
                        alt=" Visa"
                        className="max-w-64  object-cover rounded"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-4">
                  <div className="flex flex-col gap-4 items-end">
                    <img
                      src="/images/visa/visa5.svg"
                      alt="visa image"
                      width={50}
                      height={50}
                      className="w-full object-cover"
                    />

                    <div className="flex justify-between w-full h-full">
                      <p className="text-3xl ml-2">Chile</p>
                      <div className="flex flex-col items-end justify-between">
                        <div className="flex items-end w-full ">
                          <p
                            className="text-3xl mb-4"
                            style={{
                              writingMode: "vertical-rl",
                              transform: "rotate(180deg)",
                            }}
                          >
                            Finland
                          </p>

                          <img
                            src="/images/visa/visa7.svg"
                            alt="visa image"
                            width={50}
                            height={50}
                            className="w-[90%] object-cover"
                          />
                        </div>
                        <p className="text-3xl mb-4">Canada</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-4 items-end">
                      <img
                        src="/images/visa/visa6.svg"
                        alt=" Visa"
                        className="max-w-full  object-cover rounded"
                      />
                      <p
                        className="text-3xl mb-4"
                        style={{ writingMode: "vertical-rl" }}
                      >
                        Italy
                      </p>
                    </div>
                    <img
                      src="/images/visa/visa8.svg"
                      alt=" Visa"
                      className="max-w-full  object-cover rounded"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Achivement section */}
        <section
          id="achievements"
          className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-gray-50"
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="font-bold text-3xl text-center mb-8">AWARDS</h2>

            {/* Awards Carousel */}
            <div className="bg-secondary p-4 mb-16 rounded-xl ">
              <AwardsCarousel awards={awardsdata} />
            </div>

            <h2 className="font-bold text-3xl text-center mb-8">
              Achievements
            </h2>

            {/* Achievements Section */}
            <div className="border rounded-xl p-4 flex gap-4 justify-between items-center">
              <div className="mb-6 w-[60%]">
                <h3 className="font-bold text-2xl mb-6">
                  Multiple Visa Holder
                </h3>
                <p className="font-medium">
                  Lalit Gautam's impressive accomplishment of maintaining
                  multiple visas concurrently showcases not only his extensive
                  global reach but also his adeptness at navigating various
                  cultural landscapes and international regulations.
                </p>
              </div>

             
              <VisaCarousel />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Portfolio;
