import Trust from '../assets/Trust.png';
import Excellence from '../assets/Excellence.png'
import Client from '../assets/Client.png'
import Hero from '../assets/Hero-img.png';
export default function Feature3() {
    const features = [
      {
        icon: < img src={Trust} className="w-10 h-10" />,
        title: "Trust",
        description: "Trust is the cornerstone of every successful real estate transaction.",
        
      },
      {
        icon: < img src={Excellence} className="w-10 h-10" />,
        title: "Excellence",
        description: "We set the bar high for ourselves. From the properties we list to the services we provide.",
      },
      {
        icon: < img src={Client} className="w-10 h-10" />,
        title: "Client-Centric",
        description: "Your dreams and needs are at the center of our universe. We listen, understand.",
        color: "text-red-500"
      },
      {
        icon: < img src={Trust} className="w-10 h-10" />,
        title: "Our Commitment",
        description: "We are dedicated to providing you with the highest level of service, professionalism.v",
      },
    ];
  
    return (
      <section className="py-10 bg-black sm:py-16 lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center">
            
  
            <h2 className=" text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Our Values
            </h2>

            <p className="mt-6 text-sm font-semibold tracking-widest text-gray-400 ">
            Our story is one of continuous growth and evolution. We started as a small team with big dreams, determined to create a real estate platform that transcended the ordinary.
            </p>
          </div>
  
          <div className="grid items-center grid-cols-1 mt-12 gap-y-10 lg:grid-cols-5 sm:mt-20 gap-x-4">
            <div className="space-y-8 lg:pr-16 xl:pr-24 lg:col-span-2 lg:space-y-12">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  {feature.icon}
                  <div className="ml-5">
                    <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                    <p className="mt-3 text-base text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
  
            <div className="lg:col-span-3">
              <img
                className="w-full rounded-lg shadow-xl"
                src={Hero}
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    );
  }