import React from "react";

type TablePaginationProps = {
  handleNext: () => void;
  handlePrevious: () => void;
};

export default function TablePagination({
  handleNext,
  handlePrevious,
}: TablePaginationProps) {
  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-4"
    >
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
