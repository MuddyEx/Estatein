import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getApartments } from '../services/api.js';
import { FaBed, FaHome, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { IoLocation } from "react-icons/io5"; // Removed FaBath, kept others
import Stars from '../assets/Abstract Design.png'; // Adjust path as needed

function FeaturedProperties() {
  const [featured, setFeatured] = useState([]);
  const [current, setCurrent] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(window.innerWidth < 768 ? 1 : 3); // Dynamic items per page

  useEffect(() => {
    // Fetch featured apartments
    const fetchFeatured = async () => {
      try {
        const response = await getApartments({ featured: true, limit: 4 });
        setFeatured(response.data);
      } catch (error) {
        console.error('Error fetching featured properties:', error);
      }
    };
    fetchFeatured();

    // Update itemsPerPage on window resize
    const handleResize = () => {
      setItemsPerPage(window.innerWidth < 768 ? 1 : 3);
    };
    window.addEventListener('resize', handleResize);

    // Auto-slide every 5 seconds
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + itemsPerPage >= featured.length ? 0 : prev + itemsPerPage));
    }, 5000);

    // Cleanup
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [current, itemsPerPage, featured.length]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + itemsPerPage >= featured.length ? 0 : prev + itemsPerPage));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - itemsPerPage < 0 ? featured.length - itemsPerPage : prev - itemsPerPage));
  };

  // Truncate description to ~20 characters
  const truncateDescription = (desc) => {
    if (!desc) return 'No description available.';
    return desc.length > 20 ? `${desc.substring(0, 100)}...` : desc;
  };

  return (
    <section className="bg-black text-white py-12">
      <div className="px-4 mx-auto max-w-7xl">
        <div className="mb-4">
          <img src={Stars} className="w-auto" alt="Stars decoration" />
        </div>
        <h2 className="text-3xl font-semibold mb-6">Featured Properties</h2>
        <p className="mb-12 text-gray-400">
          Explore our handpicked selection of featured properties. Each listing offers a glimpse into exceptional homes and investments available through Estatein.
        </p>
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 overflow-hidden">
            {featured.length > 0 ? (
              featured.slice(current, current + itemsPerPage).map((apt) => (
                <div key={apt._id} className="bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg">
                  {apt.images[0] && (
                    <img src={apt.images[0]} alt={apt.title} className="w-full h-56 object-cover" />
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{apt.title}</h3>
                    <p className="text-sm text-gray-400 mb-4">
                      {truncateDescription(apt.description)}{' '}
                      <Link to={`/property/${apt._id}`} className="text-purple-500 cursor-pointer">
                        See More
                      </Link>
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-[#292929] text-sm px-3 py-1 rounded-lg flex items-center gap-2">
                        <IoLocation /> {apt.state}
                      </span>
                      <span className="bg-[#292929] text-sm px-3 py-1 rounded-lg flex items-center gap-2">
                        <FaBed /> {apt.totalRooms}-Bedroom
                      </span>
                      <span className="bg-[#292929] text-sm px-3 py-1 rounded-lg flex items-center gap-2">
                        <FaHome /> {apt.propertyType}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-sm text-gray-400">Price</span>
                        <span className="text-xl font-semibold block">₦{apt.pricePerDay.toLocaleString()}/day</span>
                      </div>
                      <Link
                        to={`/property/${apt._id}`}
                        className="bg-purple-600 px-4 py-2 rounded-lg text-white hover:bg-purple-700"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 col-span-full text-center">No featured properties available.</p>
            )}
          </div>
          <div className="flex justify-between items-center mt-6">
            <button onClick={prevSlide} className="bg-[#292929] p-3 rounded-full hover:bg-[#383838]">
              <FaArrowLeft />
            </button>
            <button onClick={nextSlide} className="bg-[#292929] p-3 rounded-full hover:bg-[#383838]">
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProperties;