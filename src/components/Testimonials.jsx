import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import Wade from '../assets/WadeP.png';
import Emelie from '../assets/Emelie.png';
import John from '../assets/john.png';
import Stars from '../assets/Abstract Design.png';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Wade Warren',
      location: 'USA, California',
      review: 'Our experience with Estatein was outstanding. Their team’s dedication and professionalism made finding our dream home a breeze. Highly recommended!',
      rating: 5,
      image:  Wade,
      title: 'Exceptional Service!'
    },
    {
      name: 'Emelie Thomson',
      location: 'USA, Florida',
      review: 'Estatein provided us with top-notch service. They helped us sell our property quickly and at a great price. We couldn’t be happier with the results.',
      rating: 3,
      image: Emelie,
      title: 'Efficient and Reliable'
    },
    {
      name: 'John Mans',
      location: 'USA, Nevada',
      review: 'The Estatein team guided us through the entire buying process. Their knowledge and commitment to our needs were impressive.',
      rating: 4,
      image: John,
      title: 'Trusted Advisors'
    },
   
  ];

  const [current, setCurrent] = useState(0);
  const itemsPerPage = window.innerWidth < 768 ? 1 : 3;

  const nextSlide = () => {
    setCurrent((prev) => (prev + itemsPerPage >= testimonials.length ? 0 : prev + itemsPerPage));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - itemsPerPage < 0 ? testimonials.length - itemsPerPage : prev - itemsPerPage));
  };

  return (
    <section className="bg-black text-white py-12">
      <div className="px-4 mx-auto max-w-7xl">
        <div className="mb-4">
            <img src={Stars} className='w-auto'  alt="" />
        </div>
        <h2 className="text-3xl font-semibold mb-6">What Our Clients Say</h2>
        <p className="mb-12 text-gray-400">Read the success stories and heartfelt testimonials from our valued clients. Discover why they chose Estatein for their real estate needs.</p>
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 overflow-hidden">
            {testimonials.slice(current, current + itemsPerPage).map((testimonial, index) => (
              <div key={index} className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-500 text-lg">⭐</span>
                  ))}
                </div>
                <h3 className="text-lg font-semibold mb-2">{testimonial.title}</h3>
                <p className="text-sm text-gray-400 mb-4">{testimonial.review}</p>
                <div className="flex items-center gap-3">
                  <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full" />
                  <div>
                    <span className="font-semibold">{testimonial.name}</span>
                    <p className="text-gray-400 text-sm">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-6">
            <button onClick={prevSlide} className="bg-[#292929] p-3 rounded-full"><ArrowLeft /></button>
            <button onClick={nextSlide} className="bg-[#292929] p-3 rounded-full"><ArrowRight /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
