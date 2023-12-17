import React, { useState, useEffect } from 'react';

const Pagination = ({ currentPage, totalItems, onPageChange,setItemsPerPage,itemsPerPage, onItemsPerPageChange }) => {
  const [pageRange, setPageRange] = useState([]);
  const [currentPageInput, setCurrentPageInput] = useState(currentPage);

  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };


  useEffect(() => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const newPageRange = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        newPageRange.push(i);
      }
    } else {
      if (currentPage <= 3) {
        newPageRange.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        newPageRange.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        newPageRange.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    setPageRange(newPageRange);
  }, [currentPage, totalItems, itemsPerPage]);




const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === '0') {
      setItemsPerPage(0);
      onPageChange(1); 
      onItemsPerPageChange(0); 
    } else {
      const newItemsPerPage = Math.max(parseInt(value, 10), 10);
      setItemsPerPage(newItemsPerPage);
      onPageChange(1);
    }
  };

  const handleInputBlur = () => {
    if (currentPageInput >= 1 && currentPageInput <= Math.ceil(totalItems / itemsPerPage)) {
      onPageChange(currentPageInput);
    } else {
      setCurrentPageInput(currentPage);
    }
  };

  return (
    <div className="flex items-center justify-between my-4">
      <div className="flex items-center justify-between gap-10">
        <label className=''>
          <span className='font-bold pr-2'> Showing</span> 
          <input
            type="number"
            min="1"
            value={itemsPerPage}
            className='w-7 focus:border-blue-500 border-2'
            onChange={handleInputChange}
            
          />
          <span className='font-bold pl-1'>entries</span>
        </label>
        <div className='pr-3'>
          Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} to{' '}
          {Math.min(currentPage * itemsPerPage, totalItems)} out of {totalItems} entries
        </div>
      </div>

      <div className="flex items-center gap-x-2">
        <button
          className="px-3 py-1 border rounded cursor-pointer"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {pageRange.map((page, index) => (
          <span
            key={index}
            className={`px-3 py-1 border rounded cursor-pointer ${
              page === '...' ? 'text-gray-500' : currentPage === page ? 'bg-blue-500 text-white' : ''
            }`}
            onClick={() => (typeof page === 'number' ? onPageChange(page) : null)}
          >
            {page}
          </span>
        ))}

        <button
          className="px-3 py-1 border rounded cursor-pointer"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;



