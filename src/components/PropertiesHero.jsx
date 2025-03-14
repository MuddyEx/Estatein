const PropertiesHero = () => {
  return (
    <div className="min-h-fit max-w-[1440px] w-full mx-auto">

      {/* Hero Section */}
      <div className="relative h-fit w-full overflow-hidden">

        {/* Background Image */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage:
              "url('https://public.readdy.ai/ai/img_res/b1ea540cfd6a7f44c4b958099c846c97.jpg')",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 mt-10 md:mb-6">
            Find Your Dream Property
          </h1>
          <p className="text-[1rem] md:text-xl text-gray-200 max-w-2xl mb-6 md:mb-10">
            Welcome to Estatein, where your dream property awaits in every corner of our beautiful world. Explore our curated selection of properties, each offering a unique story and a chance to redefine your life. With categories to suit every dreamer, your journey 
          </p>
        </div>
      </div>
    </div>
  );
};
export default PropertiesHero;
