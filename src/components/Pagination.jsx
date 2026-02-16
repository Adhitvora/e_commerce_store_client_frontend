import React from "react";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";

const Pagination = ({ pageNumber, setPageNumber, totalItem, parPage, perPage }) => {
  const pageLimit = Number(parPage) || Number(perPage) || 1;
  const totalPage = Math.ceil(totalItem / pageLimit);

  if (totalPage <= 1) {
    return null;
  }

  const maxVisible = 5;
  let startPage = Math.max(1, pageNumber - 2);
  let endPage = Math.min(totalPage, startPage + maxVisible - 1);

  if (endPage - startPage < maxVisible - 1) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i += 1) {
    pages.push(i);
  }

  return (
    <ul className="flex flex-wrap items-center justify-center gap-2">
      {pageNumber > 1 && (
        <li>
          <button
            onClick={() => setPageNumber(pageNumber - 1)}
            className="flex h-[36px] w-[36px] items-center justify-center rounded-full border border-[#f3d8c9] bg-white text-[13px] text-slate-700 transition-colors hover:border-[#f8c9ad] hover:bg-[#fff3ea]"
          >
            <BsChevronDoubleLeft />
          </button>
        </li>
      )}

      {pages.map((page) => (
        <li key={page}>
          <button
            onClick={() => setPageNumber(page)}
            className={`h-[36px] min-w-[36px] rounded-full border px-3 text-sm font-semibold transition-colors ${
              pageNumber === page
                ? "border-[#f97316] bg-[#f97316] text-white shadow-[0_8px_18px_rgba(249,115,22,0.25)]"
                : "border-[#f3d8c9] bg-white text-slate-700 hover:border-[#f8c9ad] hover:bg-[#fff3ea]"
            }`}
          >
            {page}
          </button>
        </li>
      ))}

      {pageNumber < totalPage && (
        <li>
          <button
            onClick={() => setPageNumber(pageNumber + 1)}
            className="flex h-[36px] w-[36px] items-center justify-center rounded-full border border-[#f3d8c9] bg-white text-[13px] text-slate-700 transition-colors hover:border-[#f8c9ad] hover:bg-[#fff3ea]"
          >
            <BsChevronDoubleRight />
          </button>
        </li>
      )}
    </ul>
  );
};

export default Pagination;
