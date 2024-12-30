import React, { useContext } from 'react';
import { MapPin, Mail, Clock } from 'lucide-react';
import { RestaurantContex } from '../../../Contexts/RestaurantContex';

function ContactUs(){
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
                <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Contact Us</h2>
                <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
                    <div className="p-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-8">
                                <a
                                    href="https://maps.app.goo.gl/xcC1XJxMMUcM8rdB6"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block hover:bg-amber-50 rounded-lg p-4 transition-colors duration-200"
                                >
                                    <div className="flex items-center space-x-4">
                                        <MapPin className="h-6 w-6 text-amber-600" />
                                        <div>
                                            <h4 className="font-semibold text-gray-800">Address</h4>
                                            <p className="text-amber-600 hover:underline">{restaurant.restaurantAddress}</p>
                                        </div>
                                    </div>
                                </a>

                                <div className="hover:bg-amber-50 rounded-lg p-4 transition-colors duration-200">
                                    <div className="flex items-center space-x-4">
                                        <Mail className="h-6 w-6 text-amber-600" />
                                        <div>
                                            <h4 className="font-semibold text-gray-800">Email</h4>
                                            <a 
                                                href="mailto:msedetisrel@gmail.com" 
                                                className="text-amber-600 hover:underline"
                                            >
                                                msedetisrel@gmail.com
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="hover:bg-amber-50 rounded-lg p-4 transition-colors duration-200">
                                    <div className="flex items-center space-x-4">
                                        <Clock className="h-6 w-6 text-amber-600" />
                                        <div>
                                            <h4 className="font-semibold text-gray-800">Opening Hours</h4>
                                            <p className="text-gray-600">
                                                Sunday-Thursday: 17:00-23:00
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-center">
                                <div className="w-full h-80 rounded-xl overflow-hidden shadow-md">
                                    <img
                                        src="https://medias.timeout.co.il/www/uploads/2023/05/0673805b-b239-4132-9bcb-c7ec8497cfe7-600x600.jpg"
                                        alt="Restaurant Location"
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    
                </div>
            </section>
        </div>
    );
};

export default ContactUs;