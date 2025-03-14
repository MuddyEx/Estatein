import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
const PropertyType = () => {
  return (
    <div className="min-h-fit max-w-[1440px] w-full mx-auto bg-black overflow-x-hidden">
     
      {/* Property Categories */}
      <div className="py-12 md:py-20 px-4 sm:px-6 md:px-12 lg:px-20 relative">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4">
          Browse by Property Type
        </h2>
        <p className="text-base md:text-lg text-gray-400 mb-8 md:mb-12">
          Discover your perfect space across our diverse property categories
        </p>

        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay, EffectFade]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            className="!overflow-visible"
          >
            {[
              {
                title: "Luxury Villas",
                count: "234 Properties",
                image:
                  "https://public.readdy.ai/ai/img_res/c1de4218bc5d09bf49ca3a9e7c3de5bf.jpg",
              },
              {
                title: "Modern Apartments",
                count: "532 Properties",
                image:
                  "https://public.readdy.ai/ai/img_res/ea153fd5027e4daa5c3a603241e6ddb3.jpg",
              },
              {
                title: "Penthouse Suites",
                count: "126 Properties",
                image:
                  "https://public.readdy.ai/ai/img_res/fd0485ecc4ebdc8b4cb3177643962367.jpg",
              },
              {
                title: "Commercial Spaces",
                count: "348 Properties",
                image:
                  "https://public.readdy.ai/ai/img_res/d60bddb258b5aaa10b9e36b0c1d4f034.jpg",
              },
            ].map((category, index) => (
              <SwiperSlide key={index}>
                <div className="group cursor-pointer relative rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
                  <div className="relative h-[300px] w-full overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">
                      {category.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-200">
                      {category.count}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button className="swiper-button-prev !w-12 !h-12 !bg-white !rounded-full !shadow-lg !text-gray-800 after:!text-xl hover:!bg-gray-50 transition-colors absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10">
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="swiper-button-next !w-12 !h-12 !bg-white !rounded-full !shadow-lg !text-gray-800 after:!text-xl hover:!bg-gray-50 transition-colors absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10">
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
export default PropertyType;
