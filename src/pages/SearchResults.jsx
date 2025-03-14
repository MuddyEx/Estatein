import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { getApartments } from '../services/api.js';

function SearchResults() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await getApartments({
          location: queryParams.get('location'),
          propertyType: queryParams.get('propertyType'),
          minPrice: queryParams.get('minPrice'),
          maxPrice: queryParams.get('maxPrice'),
          availability: queryParams.get('availability'),
        });
        setResults(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setLoading(false);
      }
    };
    fetchResults();
  }, [location.search]);

  if (loading) return <div className="text-center py-20 text-gray-600">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Search Results</h1>
        {results.length === 0 ? (
          <p className="text-gray-600">No properties found matching your search.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((apt) => (
              <Link to={`/property/${apt._id}`} key={apt._id} className="bg-white rounded-lg shadow-sm border border-gray-200/60 hover:shadow-md transition-shadow">
                {apt.images[0] && (
                  <img src={apt.images[0]} alt={apt.title} className="w-full h-40 object-cover rounded-t-lg" />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">{apt.title}</h3>
                  <p className="text-gray-600 truncate">{apt.location}</p>
                  <p className="text-indigo-600 font-semibold">₦{apt.pricePerDay.toLocaleString()}/day</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResults;