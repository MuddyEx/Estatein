
import Stats from '../components/Stats';
import { Button } from '@/components/ui/button';
import heroImg from '../assets/hero-4.png';
import { Link } from 'react-router-dom'; 


export default function HeroSection() {
  

  return (
    <div className="bg- relative h-fit ">
     

      <section className="bg-] bg-opacity-30 py-10 sm:py-16 lg:py-12">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 gap-10 lg:grid-cols-2">
            <div>
              <p className="text-base font-semibold tracking-wider text-[#703BF7] uppercase">Discover Your New Home</p>
              <h1 className="mt-4 text-3xl font-bold text-white lg:mt-8 sm:text-5xl xl:text-7xl">Discover Your Dream Property with Estatein</h1>
              <p className="mt-4 text-base text-[#999999] lg:mt-8 sm:text-lg">Your journey to finding the perfect property begins here. Explore our listings to find the home that matches your dreams.</p>

              <Link to="/user/register"><Button className="bg-[#703BF7] text-white px-6 py-5 mt-8 rounded-full hover:bg-purple-600">
                Get Started
              </Button>
              </Link>

              <p className="mt-5 text-white">Already joined us? <Link to="/user/login" className="text-[#703BF7] hover:underline">Log in</Link></p>
              <Stats /> 
            </div>

            <div >
              <img
                className="w-full h-full bg-cover"
                src={heroImg}
                alt="Hero"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
