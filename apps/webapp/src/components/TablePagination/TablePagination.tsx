import React from "react";

type TablePaginationProps = {
  total: number;
  limit: number;
  handleNext: () => void;
  handlePrevious: () => void;
};

export default function TablePagination({
  total = 0,
  limit = 20,
  handleNext,
  handlePrevious,
}: TablePaginationProps) {
  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-4"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          <span className="font-medium">{limit}</span> of{" "}
          <span className="font-medium">{total}</span> results
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        <button
          className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
          onClick={handlePrevious}
        >
          Previous
        </button>
        <button
          className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </nav>
  );
}
