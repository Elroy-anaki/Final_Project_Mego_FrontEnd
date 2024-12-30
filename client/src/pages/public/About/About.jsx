import React, { useContext } from 'react';
import { RestaurantContex } from '../../../Contexts/RestaurantContex';

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
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
      <section>
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6">About Us</h2>
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-center justify-center">
                <div className="w-full h-80 rounded-xl overflow-hidden shadow-md">
                  <img
                    src="https://medias.timeout.co.il/www/uploads/2023/05/0673805b-b239-4132-9bcb-c7ec8497cfe7-600x600.jpg"
                    alt={restaurant.restaurantName}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              <div className="space-y-6 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-amber-600">
                  {restaurant.restaurantName}
                </h3>
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    Welcome to <span className="font-semibold text-amber-600">{restaurant.restaurantName}</span>, 
                    where technology meets culinary excellence. Our restaurant combines innovative cooking 
                    techniques with authentic flavors, offering a unique dining experience to our guests.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Our skilled team is committed to serving you the most delicious dishes using fresh, 
                    quality ingredients. We believe every meal is an opportunity to create sweet memories.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border-t border-gray-100 p-6 text-center">
            <p className="text-gray-600 font-medium italic">
              "Creating unforgettable dining experiences, one plate at a time"
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;