import { ChevronRightCircle, Star } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import Image from 'next/image';
import ContactModal from './ContactModal'; 

const testimonials=[
  {
    "id": 1,
    "name": "Sarah Johnson",
    "message": "Lalit's strategic guidance helped us secure $2M in Series A funding. His insights on scaling were invaluable to our startup journey.",
    "rating": 5
  },
  {
    "id": 2,
    "name": "Michael Chen",
    "message": "The internationalization strategy session was a game-changer. We successfully expanded to 3 new markets within 6 months.",
    "rating": 5
  },
  {
    "id": 3,
    "name": "Priya Sharma",
    "message": "Lalit's mentoring helped me navigate the startup visa process smoothly. His expertise in immigration matters is exceptional.",
    "rating": 5
  },
  {
    "id": 4,
    "name": "David Rodriguez",
    "message": "Outstanding investment analysis and market insights. Lalit's expertise helped us make informed decisions for our portfolio.",
    "rating": 4
  },
  {
    "id": 5,
    "name": "Emily Thompson",
    "message": "The public speaking coaching transformed my presentation skills. Highly recommend for any entrepreneur looking to improve their pitch.",
    "rating": 5
  },
  {
    "id": 6,
    "name": "Raj Patel",
    "message": "Lalit's scaling strategies helped us grow from 10 to 100 employees in just 18 months. Incredible mentorship and practical advice.",
    "rating": 5
  },
  {
    "id": 7,
    "name": "Lisa Wang",
    "message": "The exponential tech insights opened our eyes to new possibilities. Lalit's forward-thinking approach is truly remarkable.",
    "rating": 4
  },
  {
    "id": 8,
    "name": "James Wilson",
    "message": "Fundraising seemed impossible until I had a session with Lalit. His guidance led to a successful $500K seed round.",
    "rating": 5
  },
  {
    "id": 9,
    "name": "Anita Kumar",
    "message": "The startup mentoring sessions were incredibly valuable. Lalit's experience and insights helped avoid costly mistakes.",
    "rating": 5
  },
  {
    "id": 10,
    "name": "Robert Taylor",
    "message": "Strategic planning session exceeded expectations. Lalit's analytical approach and practical solutions are top-notch.",
    "rating": 4
  }
]

const ContactCard = ({ item, index, onBookClick }) => {
  return (
    <div
      key={index}
      className="p-4 border border-purple-new rounded-3xl h-40 w-full flex items-center"
    >
      <div className="w-full h-full flex flex-col justify-between">
        <p className="bg-secondary text-primary py-2 rounded-3xl text-center max-w-[6rem]">
          {item.title}
        </p>

        <div className="flex justify-between items-center ">
          <p className=" text-secondary p-2 text-xl font-semibold">
            {item.callType}
          </p>
          <button 
            onClick={onBookClick}
            className="bg-purple-new text-primary p-2 rounded-3xl w-[7rem] flex gap-2 items-center justify-center hover:scale-95 cursor-pointer transition-all duration-500 ease-in-out group"
          >
            Book{" "}
            <span className="group-hover:translate-x-3 transition-all duration-500 ease-in-out">
              <ChevronRightCircle size={16} className="text-primary" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex-shrink-0 w-80 mx-4 flex flex-col justify-center">
     
      <p className="text-gray-700 text-sm mb-4 leading-relaxed">
        "{testimonial.message}"
      </p>

      <div className="flex  items-center justify-between">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-purple-new rounded-full flex items-center justify-center text-white font-semibold text-sm">
          {testimonial.name.charAt(0)}
        </div>
        <div className="ml-3 flex justify-between items-center">
          <p className="font-semibold text-gray-900 text-sm">{testimonial.name}</p>
        </div>
      </div>
       <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={`${
              i < testimonial.rating
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      </div>
    </div>
  );
};

export default function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const services = [
    "Strategy",
    "Fund Raising",
    "Scaling",
    "Internationalization",
    "Exponential Tech",
    "Immigration",
    "Startup Visa",
    "Public Speaking",
    "Investment Analyst",
    "Scaling",
    "Startup Mentoring",
  ];

  const info = [
    {
      title: "Mini call",
      callType: "Discovery call",
    },
    {
      title: "1:1 Call",
      callType: "30 mins video call",
    },
    {
      title: "1:1 call",
      callType: "60 mins video call",
    },
  ];

  const scrollRef = useRef(null);

  const handleBookClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const testimonialWidth = 320; 
    const totalWidth = testimonialWidth * testimonials.length;
    
    let scrollPosition = 0;
    const scrollSpeed = 1; 

    const scroll = () => {
      scrollPosition += scrollSpeed;
      if (scrollPosition >= totalWidth) {
        scrollPosition = 0;
      }
      
      if (scrollContainer) {
        scrollContainer.scrollLeft = scrollPosition;
      }
    };

   
    const intervalId = setInterval(scroll, 16); 

 
    const handleMouseEnter = () => clearInterval(intervalId);
    const handleMouseLeave = () => {
      const newIntervalId = setInterval(scroll, 16);
      return newIntervalId;
    };

    let currentIntervalId = intervalId;

    if (scrollContainer) {
      scrollContainer.addEventListener('mouseenter', () => {
        clearInterval(currentIntervalId);
      });
      
      scrollContainer.addEventListener('mouseleave', () => {
        currentIntervalId = setInterval(scroll, 16);
      });
    }

    return () => {
      clearInterval(intervalId);
      clearInterval(currentIntervalId);
    };
  }, []);

  
  const tripleTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="w-full text-center">
        <h2 className="font-bold text-4xl text-center">Talks about</h2>
        <h3 className="text-base mb-8 text-[#5A5A5A] ">Reach out to me for</h3>
      </div>
      <div className="grid lg:grid-cols-1 gap-12">
        <div>
          <div className="flex flex-wrap gap-3 mb-12 max-w-4xl mx-auto items-center justify-center ">
            {services.map((service, index) => (
              <span
                key={index}
                className="bg-[#858585] border border-gray-200 px-4 py-2 rounded-lg text-sm hover:bg-[#858585]/90 transition-colors cursor-default text-primary"
              >
                {service}
              </span>
            ))}
          </div>

          <h3 className="text-xl font-bold mb-6 text-black text-center">
            Schedule a call with me by clicking the button below!
          </h3>

          <div className="flex justify-between gap-6 max-w-4xl mx-auto">
            {info.slice(0, 2).map((item, index) => {
              return <ContactCard key={index} item={item} onBookClick={handleBookClick} />;
            })}
          </div>
          <div className="flex justify-between gap-6 max-w-4xl mx-auto mt-8">
            {info.slice(2).map((item, index) => {
              return <ContactCard key={index} item={item} onBookClick={handleBookClick} />;
            })}

            <div className="relative w-full bg-secondary rounded-3xl">
              <Image src="/images/contact.svg" alt="contact Image" width={60} height={30} className="w-full object-cover rounded-2xl z-40"/>

              <div className="absolute text-primary top-1/2 -translate-y-[50%] px-6">
                <h2 className="max-w-[14rem] mb-2">"The only way to do great work 
                is to love what you do."</h2>
                <p>-Lalit Gautam</p>
              </div>
            </div>
          </div>
        </div>
      </div>

     
      <div className="mt-16 w-full mx-auto">
        <h2 className="font-bold text-4xl text-center mb-12">Feedback</h2>
        
        <div className="relative overflow-hidden">
          <div 
            ref={scrollRef}
            className="flex overflow-x-hidden"
            style={{ scrollBehavior: 'auto' }}
          >
            {tripleTestimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={`${testimonial.id}-${Math.floor(index / testimonials.length)}-${index % testimonials.length}`} 
                testimonial={testimonial} 
              />
            ))}
          </div>
        </div>
      </div>

      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}