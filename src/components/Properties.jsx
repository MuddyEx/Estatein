import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { getApartments } from '../services/api.js';
import { Link } from 'react-router-dom';
import { FaBed, FaHome,  } from 'react-icons/fa';
import { IoLocation } from "react-icons/io5";

const Properties = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const propertiesPerPage = 20;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await getApartments({ limit: propertiesPerPage });
        console.log('Fetched properties:', response.data); // Debug log
        setProperties(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const totalPages = Math.ceil(properties.length / propertiesPerPage);
  const paginatedProperties = properties.slice(
    (currentPage - 1) * propertiesPerPage,
    currentPage * propertiesPerPage
  );

  const handleViewDetails = (id) => {
    console.log('Navigating to property:', id); // Debug log
    navigate(`/property/${id}`);
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-100 p-8 text-center">Loading properties...</div>;
  }

   // Truncate description to ~20 characters
   const truncateDescription = (desc) => {
    if (!desc) return 'No description available.';
    return desc.length > 20 ? `${desc.substring(0, 100)}...` : desc;
  };


  return (
    <div className="min-h-fit bg-black p-8">
      <div className="max-w-[1440px] mx-auto">
        <div className="block">
          {/* <h1 className="text-3xl text-white pb-4 font-bold">Discover a World of Possibilities</h1>
          <p className="mb-12 text-gray-300">
            Explore our handpicked selection of featured properties. Each listing offers a glimpse into exceptional homes and investments available through Estatein.
          </p> */}
        </div>

        {/* Desktop View */}
        <div className="hidden lg:grid grid-cols-4 gap-4">
          {paginatedProperties.map((property) => (
            <Card
              key={property._id}
              className="overflow-hidden bg-[#1a1a1a] p-0 border-0 shadow-sm shadow-gray-800  text-white"
            >
              <div className="relative h-50">
                <img
                  src={property.images[0] || "https://via.placeholder.com/300"}
                  alt={property.title}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                <p className="text-sm text-gray-400 mb-4">
                  {truncateDescription(property.description)}{" "}
                  <Link
                    to={`/property/${property._id}`}
                    className="text-purple-400 cursor-pointer"
                  >
                    See More
                  </Link>
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-[#292929] text-sm px-3 py-1 rounded-lg flex items-center gap-2">
                  <div className='text-white'>
                    <IoLocation />
                  </div>
                     {property.state}
                  </span>
                  <span className="bg-[#292929] text-sm px-3 py-1 rounded-lg flex items-center gap-2">
                   <div className='text-white'>
                    <FaBed />
                   </div>
                     {property.totalRooms}-Bedroom
                  </span>
                  <span className="bg-[#292929] text-sm px-3 py-1 rounded-lg flex items-center gap-2">
                    <div className='text-white'>
                    <FaHome /> 
                    </div>
                    
                    {property.propertyType}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-gray-400 text-sm">Price</span>
                    <p className="text-lg text-purple-600 font-semibold">
                      ₦{property.pricePerDay.toLocaleString()}/day
                    </p>
                  </div>
                  <Button
                    className="!rounded-button bg-purple-600 hover:bg-purple-700"
                    onClick={() => handleViewDetails(property._id)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Mobile View with Swiper */}
        <div className="lg:hidden">
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation
            autoplay={{ delay: 3000 }}
            className="w-full"
          >
            {properties.map((property) => (
              <SwiperSlide key={property._id}>
                <Card className="overflow-hidden bg-gray-900 text-white">
                  <div className="relative h-64">
                    <img
                      src={
                        property.images[0] || "https://via.placeholder.com/300"
                      }
                      alt={property.title}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">
                      {property.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-4">
                      {truncateDescription(property.description)}{" "}
                      <Link
                        to={`/property/${property._id}`}
                        className="text-purple-500 cursor-pointer"
                      >
                        See More
                      </Link>
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-[#292929] text-sm px-3 py-1 rounded-lg flex items-center gap-2">
                        <IoLocation /> {property.state}
                      </span>
                      <span className="bg-[#292929] text-sm px-3 py-1 rounded-lg flex items-center gap-2">
                        <FaBed /> {property.totalRooms}-Bedroom
                      </span>
                      <span className="bg-[#292929] text-sm px-3 py-1 rounded-lg flex items-center gap-2">
                        <FaHome /> {property.propertyType}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-gray-400 text-sm">Price</span>
                        <p className="text-lg font-semibold">
                          ₦{property.pricePerDay.toLocaleString()}/day
                        </p>
                      </div>
                      <Button
                        className="!rounded-button bg-purple-600 hover:bg-purple-700"
                        onClick={() => handleViewDetails(property._id)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop Pagination */}
        <div className="hidden lg:flex justify-center mt-8 gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <Button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`!rounded-button ${
                currentPage === index + 1
                  ? "bg-purple-600 hover:bg-purple-700"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Properties;