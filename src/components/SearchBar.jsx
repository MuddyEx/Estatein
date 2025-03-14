import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getApartments } from '../services/api.js'; // Adjust path if needed

const SearchBar = () => {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [forStatus, setForStatus] = useState('');
  const navigate = useNavigate();

  const propertyTypes = [
    "Condors",
    "Houses",
    "Apartments",
    "Townhouses",
    "Villas",
    "Land",
  ];

  const priceRanges = [
    "$40,000 - $80,000",
    "$80,000 - $120,000",
    "$120,000 - $200,000",
    "$200,000 - $300,000",
    "$300,000+",
  ];

  const propertyStatus = ["Sell", "Rent", "Lease"];

  const handleSearch = async () => {
    // Parse price range into min and max
    let minPrice, maxPrice;
    if (priceRange) {
      const [min, max] = priceRange.replace(/[^0-9-]/g, '').split('-');
      minPrice = min;
      maxPrice = max || undefined; // Handle "$300,000+" case
    }

    // Construct query parameters
    const queryParams = new URLSearchParams();
    if (location) queryParams.append('location', location);
    if (propertyType) queryParams.append('propertyType', propertyType);
    if (minPrice) queryParams.append('minPrice', minPrice);
    if (maxPrice) queryParams.append('maxPrice', maxPrice);
    if (forStatus) queryParams.append('forStatus', forStatus.toLowerCase());

    try {
      // Optional: Fetch results here if you want to pass data directly
      const response = await getApartments({
        location,
        propertyType,
        minPrice,
        maxPrice,
        forStatus: forStatus.toLowerCase(),
      });
      console.log('Search results:', response.data); // Debug log

      // Navigate to search results page with query string
      navigate(`/search?${queryParams.toString()}`);
    } catch (error) {
      console.error('Error fetching search results:', error);
      navigate(`/search?${queryParams.toString()}`); // Navigate even if fetch fails
    }
  };

  return (
    <div className="min-h-fit">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-[#1A1A1A] rounded-xl shadow-lg p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-4 items-stretch">
            {/* Location Input */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-white mb-2">
                Location
              </label>
              <div className="relative">
                <i className="fas fa-map-marker-alt absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <Input
                  type="text"
                  placeholder="Enter location of the property"
                  className="pl-10 w-full h-12 border-gray-200 rounded-lg text-sm text-white"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>

            {/* Property Type Select */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-white mb-2">
                Property Type
              </label>
              <Select onValueChange={setPropertyType}>
                <SelectTrigger className="w-full h-12 text-white">
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  {propertyTypes.map((type) => (
                    <SelectItem key={type} value={type.toLowerCase()}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price Range Select */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-white mb-2">
                Price range
              </label>
              <Select onValueChange={setPriceRange}>
                <SelectTrigger className="w-full h-12 text-white">
                  <SelectValue placeholder="Select price range" />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map((range) => (
                    <SelectItem key={range} value={range.toLowerCase()}>
                      {range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* For Select */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-white mb-2">
                For
              </label>
              <Select onValueChange={setForStatus}>
                <SelectTrigger className="w-full h-12 text-white">
                  <SelectValue placeholder="Select purpose" />
                </SelectTrigger>
                <SelectContent>
                  {propertyStatus.map((status) => (
                    <SelectItem key={status} value={status.toLowerCase()}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <Button
                className="!rounded-button whitespace-nowrap cursor-pointer w-full md:w-auto h-12 px-8 bg-[#703BF7] hover:bg-purple-900 text-white font-medium"
                onClick={handleSearch}
              >
                SEARCH
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;