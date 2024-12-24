import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Star } from "lucide-react";

function AddReviewMeal() {
  const [order, setOrder] = useState(null);
  const [ratings, setRatings] = useState({});
  const { userId } = useParams();

  async function getOrderByuser() {
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

  // const addReviews = order?.table?.meals.map((item) => {
  //   return {
  //     userName: order?.table?.user?.userName,
  //     user: order?.table?.user?.userId,
  //     meal: item.meal._id,
  //     rating: ratings[item.meal._id],
  //   };
  // });

  async function addReview() {
    const addReviews = order?.table?.meals.map((item) => {
      return {
        userName: order?.user?.userName,
        user: order?.user?.userId,
        meal: item.meal._id,
        rating: ratings[item.meal._id],
      };
    });
    alert("FF")
    console.log(addReviews)
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
    getOrderByuser();
  }, []);

  useEffect(() => {console.log(ratings)}, [ratings])
  return (
    <div className="max-w-2xl mx-auto mt-5 p-11 border-2 border-amber-600 rounded-2xl bg-gray-200 ">
      <h2 className="text-3xl font-bold mb-6 text-center text-black">
        Hello, {order?.table?.user?.userName} 😀
      </h2>
      <p className="text-lg text-center mb-5 text-black">We hope you enjoyed our food.</p>

      <div className="space-y-6">
        {order?.table?.meals.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
          >
            <div className="flex items-center justify-between ">
              <img
                src={item.meal.mealImage}
                alt={item.meal.mealName}
                className="w-28 h-28 rounded-lg object-cover"
              />
              <div className="text-center ml-10 ">
                <h3 className="font-semibold text-lg mb-2 text-black">
                  {item.meal.mealName}
                </h3>
                <div className="flex flex-row-reverse gap-1 text-center text-black">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-6 h-6 cursor-pointer ${
                        (ratings[item.meal._id] || 0) >= star
                          ? "fill-yellow-400 stroke-yellow-400"
                          : "stroke-gray-400"
                      }`}
                      onClick={() => {handleRating(item.meal._id, star)}}
                    />
                  ))}
                </div>
                {ratings[item.meal._id] && (
                  <p className="text-sm text-gray-600 mt-1">
                    Your rating: {ratings[item.meal._id]} stars
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
          Submit  reviews
        </Link>
      </div>
    </div>
  );
}

export default AddReviewMeal;
