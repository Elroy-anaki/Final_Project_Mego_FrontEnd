import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Star } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { notifyError, notifySuccess } from "../../../lib/Toasts";

function AddReviewMeal() {
  const [order, setOrder] = useState(null);
  const [ratings, setRatings] = useState({});
  const [comments, setComments] = useState({})
  const { orderId, guestEmail } = useParams();


  // Get the order
  const {mutate: getOrderByOrderId} = useMutation({
    mutationKey:['getOrderByUserId'],
    mutationFn: async (data) => await axios.get(`http://localhost:3000/orders/get-order-by-order-id?orderId=${orderId}&guestEmail=${guestEmail}`),
    onSuccess:(data) => {setOrder(data.data.data)},
    onError: (error) => console.log(error.response.data.msg)
  });

  useEffect(() => {
    getOrderByOrderId();
  }, []);

  const handleRating = (itemId, rating) => {
    setRatings((prev) => ({
      ...prev,
      [itemId]: rating,
    }));
  };
  const handelComments = (itemId, comment) => {
    setComments((prev) => ({
      ...prev,
      [itemId]: comment,
    }));
  };

  function setReviewsBySchema(){
    const addReviews = order?.table?.meals.map((item) => {
      return {
        user:{
          name: order?.user?.userName,
          userId: order?.user?.userId._id
        },
        mealId: item.meal._id,
        rating: ratings[item.meal._id],
        comment: comments[item.meal._id]
      };
    });
    return addReviews

  };


  const {mutate: addReviews } = useMutation({
    mutationKey:['addReviews'],
    mutationFn: async (data) => await axios.post(`http://localhost:3000/reviews/add-reviews`,data),
    onSuccess: (data) => {
      console.log(data);
      notifySuccess("Thanks for your comments")
    },
    onError:(error) => {
      console.log(error.response.data.msg);
      notifyError(error.response.data.msg)
    }
  });



  

  useEffect(() =>{console.log(order)}, [order])
  useEffect(() => {console.log(comments), [comments]})

  useEffect(() => {console.log(ratings)}, [ratings])
  return (
    <div className="max-w-4xl mx-auto mt-5 p-8 border rounded-lg shadow-lg bg-white">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
        Hello, {order?.user?.userName} <span className="text-amber-500">😀</span>
      </h2>
      <p className="text-lg text-center mb-8 text-gray-600">
        We hope you enjoyed our food. Please share your feedback below!
      </p>
  
      <div className="space-y-8">
        {order?.table?.meals.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            {/* Image */}
            <img
              src={item.meal.mealImage}
              alt={item.meal.mealName}
              className="w-32 h-32 rounded-lg object-cover border border-gray-200"
            />
  
            {/* Meal details */}
            <div className="flex-1 px-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {item.meal.mealName}
              </h3>
              <div className="flex gap-1 text-yellow-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-7 h-7 cursor-pointer transition-transform duration-200 hover:scale-110 ${
                      (ratings[item.meal._id] || 0) >= star
                        ? "fill-current"
                        : "fill-none stroke-current stroke-2"
                    }`}
                    onClick={() => {
                      handleRating(item.meal._id, star);
                    }}
                  />
                ))}
              </div>
              {ratings[item.meal._id] && (
                <p className="text-sm text-gray-500 mt-2">
                  Your rating: {ratings[item.meal._id]} stars
                </p>
              )}
            </div>
  
            {/* Comment input */}
            <div className="flex-none w-72">
              <input
                onChange={(e) => handelComments(item.meal._id, e.target.value)}
                type="text"
                placeholder="Enter a comment here..."
                className="w-full bg-gray-100 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
          </div>
        ))}
      </div>
  
      <div className="mt-8 flex justify-center">
        <Link
          
          onClick={() => {
            const reviews = setReviewsBySchema();
            addReviews(reviews)

          }}
          className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-transform duration-200 hover:scale-105"
        >
          Submit Reviews
        </Link>
      </div>
    </div>
  );
  
  
  
  
}

export default AddReviewMeal;
