import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Star } from "lucide-react";

function AddReviewMeal() {
  const [order, setOrder] = useState(null);
  const [ratings, setRatings] = useState({});
  const { userId } = useParams();

  async function addOrderByUserId() {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/orders/get-order-by-user-id/${userId}`,
        { withCredentials: true }
      );
      setOrder(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  const handleRating = (itemId, rating) => {
    setRatings((prev) => ({
      ...prev,
      [itemId]: rating,
    }));
  };

  const addReviews = order?.cart?.meals.map((item) => {
    return {
      userName: order?.cart?.userId?.userName,
      userId: order?.cart?.userId?._id,
      mealId: item.mealId._id,
      rating: ratings[item.mealId._id],
    };
  });

  async function addReview() {
    try {
      const { data } = await axios.post(
        `http://localhost:3000/reviews/add-reviews`,
        addReviews,
        {
          withCredentials: true,
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    addOrderByUserId();
  }, []);
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        hello: {order?.cart?.userId?.userName} <br /> Rate your meal
      </h2>

      <div className="space-y-6">
        {order?.cart?.meals.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
          >
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <img
                src={item.mealId.mealImage}
                alt={item.mealId.mealName}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div className="text-right">
                <h3 className="font-semibold text-lg mb-2">
                  {item.mealId.mealName}
                </h3>
                <div className="flex flex-row-reverse gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-6 h-6 cursor-pointer ${
                        (ratings[item.mealId._id] || 0) >= star
                          ? "fill-yellow-400 stroke-yellow-400"
                          : "stroke-gray-400"
                      }`}
                      onClick={() => handleRating(item.mealId._id, star)}
                    />
                  ))}
                </div>
                {ratings[item.mealId._id] && (
                  <p className="text-sm text-gray-600 mt-1">
                    Your rating: {ratings[item.mealId._id]} stars
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <Link
          to={"/"}
          onClick={addReview}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
        >
          Submit a review
        </Link>
      </div>
    </div>
  );
}

export default AddReviewMeal;
