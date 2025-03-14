import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { getApartmentById, getApartments } from "../services/api.js";
import Navbar from "@/components/Navbar.jsx";

const PropertyDetail = () => {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [similarProperties, setSimilarProperties] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const response = await getApartmentById(id);
        console.log("Fetched property:", response.data);
        console.log("Facilities data:", response.data.facilities); // Debug facilities
        setProperty(response.data);

        // Fetch a few other properties (not filtered by location)
        const similarResponse = await getApartments({ limit: 3 });
        console.log("Fetched other properties:", similarResponse.data);
        setSimilarProperties(similarResponse.data.filter((p) => p._id !== id));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load property details");
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  const handleBooking = () => {
    setShowBookingModal(true);
  };

  const handleReport = () => {
    setShowReportModal(true);
  };

  const handleInspection = () => {
    console.log("Inspection requested");
  };

  if (loading)
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  if (!property)
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        Property not found
      </div>
    );

  const propertyImages = property.images || [];
  const isFacilitiesArray = Array.isArray(property.facilities);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="max-w-[1440px] mx-auto px-4 md:px-6">
        {/* Breadcrumb */}
        <nav className="py-4 text-sm">
          <Link to="/properties" className="text-white hover:underline">
            Home
          </Link>
          <span className="text-white">
            {" "}
            / {property.location || "Unknown"} /{" "}
          </span>
          <span className="text-white">{property.title || "Unknown"}</span>
        </nav>

        {/* Image Slider */}
        <div className="relative mb-8">
          <Swiper
            modules={[Pagination, Navigation]}
            pagination={{ clickable: true }}
            navigation
            className="h-[600px] rounded-xl overflow-hidden"
          >
            {propertyImages.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image || "https://via.placeholder.com/300"}
                  alt="Property Image"
                  className="w-full h-full object-contain"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <Badge className="absolute top-4 left-4 bg-purple-900 text-white">
            {property.status || "SHORT LET"}
          </Badge>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          <div className="md:col-span-2">
            {/* Property Title & Price */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">
                {property.title || "No Title"}
              </h1>
              <p className="text-3xl text-purple-500 font-semibold">
                {property.pricePerDay
                  ? `₦ ${property.pricePerDay.toLocaleString()}/day`
                  : "Price Not Available"}
              </p>
            </div>
            {/* Property Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="flex items-center gap-2">
                <i className="fas fa-bed text-purple-500"></i>
                <span>{property.totalRooms || "N/A"} Bedrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-beer text-purple-500"></i>
                <span>
                  {property.partiesAllowed ? "Parties Allowed" : "No Parties"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-parking text-purple-500"></i>
                <span>
                  {property.parkingSpace ? "Parking Available" : "No Parking"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-map-marker-alt text-purple-500"></i>
                <span>{property.location || "N/A"}</span>
              </div>
            </div>
            {/* Tabs */}
            <Tabs defaultValue="overview" className="mb-8 ">
              <TabsList>
                <TabsTrigger value="overview">Description</TabsTrigger>
                <TabsTrigger value="address">Address</TabsTrigger>
                <TabsTrigger value="facilities">Facilities</TabsTrigger>
               
              </TabsList>
              <TabsContent value="overview" className="mt-6">
                <p className="text-gray-300 leading-relaxed">
                  {property.description || "No description available"}
                </p>
              </TabsContent>
              <TabsContent value="facilities" className="mt-6">
                {isFacilitiesArray && property.facilities.length > 0 ? (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {property.facilities.map((facility, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <i className="fas fa-check text-green-500"></i>
                        <span>{facility}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-300">No facilities available</p>
                )}
              </TabsContent>
              <TabsContent value="address" className="mt-6">
                <p className="text-gray-300 leading-relaxed">
                  {property.address || "Address not available"}
                </p>
              </TabsContent>
            </Tabs>
          </div>
          {/* Sidebar */}
          <div className="col-span-1">
            <Card className="p-6 mb-6">
              <div className="space-y-3">
                <Button
                  className="w-full !rounded-button bg-purple-700 hover:bg-purple-800 cursor-pointer"
                  onClick={handleBooking}
                >
                  <i className="fas fa-calendar-check mr-2"></i>
                  Book Apartment
                </Button>

                <Button
                  variant="outline "
                  className="w-full !rounded-button cursor-pointer"
                  onClick={handleInspection}
                >
                  <i className="fas fa-search mr-2"></i>
                  Request Live Inspection
                </Button>
                <Button
                  variant="destructive"
                  className="w-full !rounded-button"
                  onClick={handleReport}
                >
                  <i className="fas fa-flag mr-2"></i>
                  Report Apartment
                </Button>
              </div>

              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-gray-950 mb-2">
                  <i className="fas fa-info-circle mr-2"></i>
                  Book with confidence
                </p>
                <ul className="text-sm text-gray-950 space-y-2">
                  <li className="flex items-center">
                    <i className="fas fa-check-circle text-green-500 mr-2"></i>
                    24/7 Support
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check-circle text-green-500 mr-2"></i>
                    Verified Properties
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check-circle text-green-500 mr-2"></i>
                    Secure Payments
                  </li>
                </ul>
              </div>
            </Card>

            <Button
              variant="outline"
              className="w-full text-black mb-4 !rounded-button"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <i
                className={
                  isFavorite
                    ? "fas fa-heart text-red-500 mr-2"
                    : "far fa-heart mr-2"
                }
              ></i>
              {isFavorite ? "Saved" : "Save Property"}
            </Button>
          </div>
        </div>

        {/* Similar Properties */}
        <div className="py-8">
          <h2 className="text-2xl font-bold mb-6">Other Listed Properties</h2>
          <ScrollArea className="w-full whitespace-normal">
            <div className="flex gap-3">
              {similarProperties.map((similar, index) => (
                <Link key={index} to={`/property/${similar._id}`}>
                  <Card className="w-[400px] border-0 outline-0 bg-gray-900 py-0 cursor-pointer">
                    <img
                      src={
                        similar.images?.[0] || "https://via.placeholder.com/300"
                      }
                      alt={similar.title}
                      className="w-full h-[250px] object-cover rounded-t-lg"
                    />
                    <div className="p-4 text-white">
                      <h3 className="font-semibold">
                        {similar.title || "No Title"}
                      </h3>
                      <p className="text-purple-400 font-semibold">
                        {similar.pricePerDay
                          ? `₦${Number(
                              similar.pricePerDay
                            ).toLocaleString()}/day`
                          : "N/A"}
                      </p>
                      <p className="text-white">
                        {similar.location || "N/A"}
                      </p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>

            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
        {/* Booking Modal */}
        {showBookingModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Book Apartment</h2>
                  <Button
                    variant="ghost"
                    onClick={() => setShowBookingModal(false)}
                  >
                    <i className="fas fa-times"></i>
                  </Button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Check-in Date
                    </label>
                    <input
                      type="date"
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Duration (days)
                    </label>
                    <input
                      type="number"
                      min="1"
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Number of Occupants
                    </label>
                    <input
                      type="number"
                      min="1"
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <Button
                    className="w-full !rounded-button"
                    onClick={() => setShowBookingModal(false)}
                  >
                    Confirm Booking
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
        {/* Report Modal */}
        {showReportModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Report Property</h2>
                  <Button
                    variant="ghost"
                    onClick={() => setShowReportModal(false)}
                  >
                    <i className="fas fa-times"></i>
                  </Button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Reason for Report
                    </label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Incorrect Information</option>
                      <option>Suspicious Listing</option>
                      <option>Inappropriate Content</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Additional Details
                    </label>
                    <textarea
                      className="w-full p-2 border rounded-md h-32"
                      placeholder="Please provide more details about your report..."
                    ></textarea>
                  </div>
                  <Button
                    className="w-full !rounded-button"
                    onClick={() => setShowReportModal(false)}
                  >
                    Submit Report
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDetail;
