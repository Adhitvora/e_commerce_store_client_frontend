import React, { useEffect } from "react";
import { AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Ratings from "../Ratings";
import {
  add_to_card,
  messageClear,
  add_to_wishlist,
} from "../../store/reducers/cardReducer";

const FeatureProducts = ({ products }) => {
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
    <div className="w-full flex flex-wrap mx-auto">
      <div className="w-full">
        <div className="text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold relative pb-[45px]">
          <h2>Featured Sarees Collection</h2>
          <div className="w-[100px] h-[4px] bg-[#7fad39] mt-4"></div>
        </div>
      </div>
      <div className="w-full grid grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
        {products.map((p, i) => (
          <div
            key={i}
            className="relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 group border border-gray-100 hover:-translate-y-2"
          >
            {/* TOP COLOR STRIP (Logo Gradient Inspired) */}
            <div className="h-1 w-full bg-gradient-to-r from-[#1E40AF] via-[#EC4899] to-[#F97316]" />

            {/* IMAGE SECTION */}
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-pink-50 to-orange-50 p-3">
              {p.discount ? (
                <div className="absolute top-3 left-3 bg-[#F97316] text-white text-xs font-semibold px-3 py-1 rounded-full shadow animate-pulse">
                  {p.discount}% OFF
                </div>
              ) : null}

              <img
                className="w-full aspect-[4/5] object-cover object-top rounded-xl transition-all duration-500 group-hover:scale-105"
                src={p.images[0]}
                alt="product"
              />

              {/* ICONS */}
              <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <button
                  onClick={() => add_wishlist(p)}
                  className="w-9 h-9 bg-white rounded-full shadow flex items-center justify-center hover:bg-[#EC4899] hover:text-white transition-all"
                >
                  <AiFillHeart size={16} />
                </button>

                <Link
                  to={`/product/details/${p.slug}`}
                  className="w-9 h-9 bg-white rounded-full shadow flex items-center justify-center hover:bg-[#06B6D4] hover:text-white transition-all"
                >
                  <FaEye size={15} />
                </Link>

                <button
                  onClick={() => add_card(p._id)}
                  className="w-9 h-9 bg-white rounded-full shadow flex items-center justify-center hover:bg-[#1E40AF] hover:text-white transition-all"
                >
                  <AiOutlineShoppingCart size={16} />
                </button>
              </div>
            </div>

            {/* CONTENT SECTION */}
            <div className="p-4 space-y-2">
              {/* CATEGORY SUBHEADING */}
              <div className="text-[12px] font-semibold uppercase tracking-wide text-[#7C3AED]">
                {p.category}
              </div>

              {/* PRODUCT NAME */}
              <h3 className="text-[16px] font-semibold text-gray-800 leading-snug line-clamp-2 min-h-[44px] group-hover:text-[#1E40AF] transition-colors">
                {p.name}
              </h3>

              {/* DESCRIPTION 2–3 LINE CLAMP */}
              <p className="text-[13px] text-gray-500 line-clamp-2 min-h-[38px]">
                {p.description
                  ? p.description.replace(/(<([^>]+)>)/gi, "").slice(0, 90)
                  : ""}
              </p>

              {/* PRICE + RATING */}
              <div className="flex justify-between items-center pt-2">
                <div className="flex items-center gap-2 justify-between">
                  <span className="text-[18px] font-bold text-[#1E40AF]">
                    ₹{p.price}
                  </span>

                  {p.discount > 0 && (
                    <span className="text-[12px] text-[#F97316] font-semibold">
                      Save {p.discount}%
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <Ratings ratings={p.rating} />
                </div>
              </div>

              {/* CTA BUTTON */}
              <button
                onClick={() => add_card(p._id)}
                className="w-full mt-3 py-2 rounded-xl text-white font-medium text-[14px] bg-gradient-to-r from-[#1E40AF] via-[#EC4899] to-[#F97316] hover:opacity-90 transition-all duration-300"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureProducts;
