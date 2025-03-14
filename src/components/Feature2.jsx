
import { motion } from 'framer-motion';
import AboutHero from '../assets/About-hero.png';
import Hero from '../assets/hero-4.png';
import Stats from '../components/Stats';
;
export default function Feature2() {
  return (
    <section className="py-10 bg-black sm:py-16 lg:py-24">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid items-stretch gap-y-10 md:grid-cols-2 md:gap-x-20">
          <div className="relative grid grid-cols-2 gap-6 mt-10 md:mt-0">
            <div className="overflow-hidden aspect-[3/4]">
              <motion.img 
                whileHover={{ scale: 1.1 }} 
                className="object-cover object-top origin-top w-full h-full" 
                src={Hero} 
                alt="" 
              />
            </div>

            <div className="relative">
              <div className="overflow-hidden aspect-[3/4]">
                <motion.img 
                  whileHover={{ scale: 1.1 }} 
                  className="object-cover w-full h-full" 
                  src= {AboutHero } 
                  alt="" 
                />
              </div>

              
            </div>

            
          </div>

          <div className="flex flex-col items-start xl:px-16">
            <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">Our Journey.</h2>
            <p className="mt-4 text-base leading-relaxed text-gray-400">Our story is one of continuous growth and evolution. We started as a small team with big dreams, determined to create a real estate platform that transcended the ordinary. Over the years, we have expanded our reach, forged valuable partnerships, and gained the trust of countless clients.</p>

            <motion.a 
              whileHover={{ scale: 1.1 }} 
              href="#" 
              className="inline-flex items-center justify-center px-5 py-4 mt-8 text-base font-semibold text-white transition-all duration-200 rounded-md bg-gradient-to-r from-purple-800 to-purple-900">
              Get started now
              <svg className="w-5 h-5 ml-8 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </motion.a>
          </div>
        </div>
        <Stats />
          
      </div>
    </section>
  );
}
