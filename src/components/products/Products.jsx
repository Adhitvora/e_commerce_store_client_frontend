import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FiChevronLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import { convert } from "html-to-text";

const Products = ({ title, products }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const ButtonGroup = ({ next, previous }) => {
    return (
      <div className="flex justify-between items-center">
        <div className="text-lg font-bold text-slate-600">{title}</div>
        <div className="flex justify-center items-center gap-3 text-slate-600">
          <button
            onClick={() => previous()}
            className="w-[30px] h-[30px] flex justify-center items-center bg-slate-300 border border-slate-200"
          >
            <span>
              <FiChevronLeft />
            </span>
          </button>
          <button
            onClick={() => next()}
            className="w-[30px] h-[30px] flex justify-center items-center bg-slate-300 border border-slate-200"
          >
            <span>
              <FiChevronLeft />
            </span>
          </button>
        </div>
      </div>
    );
  };
  return (
    <div className="flex gap-8 flex-col-reverse">
      <Carousel
        autoPlay={false}
        infinite={false}
        arrows={false}
        responsive={responsive}
        transitionDuration={500}
        renderButtonGroupOutside={true}
        customButtonGroup={<ButtonGroup />}
      >
        {products.map((p, i) => {
          return (
            <div key={i} className="flex flex-col justify-start gap-2 ">
              {p.map((pl, j) => (
                <Link
                  key={j}
                  to={`/product/details/${pl?.slug}`}
                  className="flex items-center gap-4 p-3 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group"
                >
                  {/* Image */}
                  <div className="w-[85px] h-[85px] rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                      src={pl.images[0]}
                      alt="product"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center text-gray-700 w-full">
                    <h2 className="text-[14px] font-medium line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {pl.name}
                    </h2>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[15px] font-bold text-blue-600">
                        ₹{pl.price}
                      </span>

                      {pl.discount > 0 && (
                        <span className="text-[12px] text-red-500 font-medium">
                          {pl.discount}% OFF
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Products;
