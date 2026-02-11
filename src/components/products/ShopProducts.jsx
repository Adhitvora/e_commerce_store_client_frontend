import React, { useEffect } from "react";
import { AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import Ratings from "../Ratings";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  add_to_card,
  messageClear,
  add_to_wishlist,
} from "../../store/reducers/cardReducer";

const ShopProducts = ({ styles, products }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { successMessage, errorMessage } = useSelector((state) => state.card);

  const add_card = (id) => {
    if (userInfo) {
      dispatch(
        add_to_card({
          userId: userInfo.id,
          quantity: 1,
          productId: id,
        }),
      );
    } else {
      navigate("/login");
    }
  };
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [errorMessage, successMessage]);

  const add_wishlist = (pro) => {
    dispatch(
      add_to_wishlist({
        userId: userInfo.id,
        productId: pro._id,
        name: pro.name,
        price: pro.price,
        image: pro.images[0],
        discount: pro.discount,
        rating: pro.rating,
        slug: pro.slug,
      }),
    );
  };

  return (
    <div
      className={`w-full grid ${styles === "grid" ? "grid-cols-3 md-lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1" : "grid-cols-1 md-lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1"} gap-3`}
    >
      {products.map((p, i) => (
        <div
          key={i}
          className={`bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group ${
            styles === "grid"
              ? "flex flex-col"
              : "flex md-lg:flex-col gap-4 p-3"
          }`}
        >
          {/* IMAGE */}
          <div
            className={`relative overflow-hidden ${
              styles === "grid" ? "aspect-[3/3]" : "w-[240px] aspect-square"
            }`}
          >
            <img
              src={p.images[0]}
              alt="product"
              className="w-full h-full object-cover object-top  transition-transform duration-500 group-hover:scale-105"
            />

            {/* Discount corner */}
            {p.discount > 0 && (
              <div className="absolute top-3 left-3 bg-[#F97316] text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                {p.discount}% OFF
              </div>
            )}
          </div>

          {/* CONTENT */}
          <div className={`p-4 flex flex-col justify-between flex-1`}>
            {/* CATEGORY */}
            <span className="text-[11px] uppercase tracking-wide text-[#7C3AED] font-semibold">
              {p.category}
            </span>

            {/* PRODUCT NAME */}
            <h3 className="text-[15px] font-semibold text-gray-800 leading-snug line-clamp-2 min-h-[40px] mt-1">
              {p.name}
            </h3>

            {/* BOTTOM SECTION */}
            <div className="flex justify-between items-end mt-4">
              {/* COL 1 → ADD TO CART */}
              <div className="w-[48%]">
                <button
                  onClick={() => add_card(p._id)}
                  className="w-full bg-gradient-to-r from-[#1E40AF] to-[#06B6D4] text-white py-2 rounded-xl text-[14px] font-medium hover:opacity-90 transition"
                >
                  Add to Cart
                </button>
              </div>

              {/* COL 2 → PRICE + SAVE + RATING */}
              <div className="w-[48%] text-right">
                <div className="text-[18px] font-bold text-[#1E40AF] flex flex-row justify-end gap-2 items-center">
                  ₹{p.price}
                  {p.discount > 0 && (
                    <p className="text-[12px] text-[#F97316] font-medium">
                      Save {p.discount}%
                    </p>
                  )}
                </div>
                <div className="flex justify-end mt-1">
                  <Ratings ratings={p.rating} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShopProducts;
