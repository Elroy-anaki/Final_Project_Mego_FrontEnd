import React, { useContext } from 'react';
import { RestaurantContex } from '../../../context/RestaurantContex';

function About() {
  const { restaurant } = useContext(RestaurantContex);

  if (!restaurant) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="w-10/12 h-full mx-auto p-6 space-y-8">
      <section>
        <h2 className="text-5xl font-extrabold text-white text-center mb-6">About Us</h2>
        <div className="bg-gray-700 rounded-lg shadow-2xl overflow-hidden border-2 border-gray-500">
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-st justify-center">
                <div className="w-full h-80 rounded-xl overflow-hidden shadow-md">
                  <img
                    src={restaurant.restaurantImage}
                    alt={restaurant.restaurantName}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              <div className="space-y-6 flex flex-col justify-center">
                <h3 className="text-3xl font-bold text-center text-amber-600">
                  {restaurant.restaurantName}
                </h3>
                <div className="space-y-4">
                  <p className="text-gray-100 leading-relaxed text-lg">
                    Welcome to <span className="font-semibold text-amber-600">{restaurant.restaurantName}</span>, 
                    where technology meets culinary excellence. Our restaurant combines innovative cooking 
                    techniques with authentic flavors, offering a unique dining experience to our guests.
                  </p>
                  <p className="text-gray-100 text-lg leading-relaxed">
                    Our skilled team is committed to serving you the most delicious dishes using fresh, 
                    quality ingredients. We believe every meal is an opportunity to create sweet memories.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-600 border-t border-gray-100 p-6 text-center">
            <p className="text-gray-100 text-xl font-medium italic">
              "Creating unforgettable dining experiences, one plate at a time"
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;