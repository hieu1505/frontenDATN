import React from 'react'


function Pagination({ totalPage, currentPage, onClick }) {
   
    const renderPageNumbers = () => {
        const pageNumbers = [];
    
        const maxVisiblePages = 5; // Số lượng nút phân trang tối đa được hiển thị
        const halfVisiblePages = Math.floor(maxVisiblePages / 2);
        let startPage = currentPage - halfVisiblePages;
        let endPage = currentPage + halfVisiblePages;
    
        if (startPage <= 0) {
          startPage = 0;
          endPage = Math.min(maxVisiblePages, totalPage-1);
        }
    
        if (endPage > totalPage) {
          endPage = totalPage;
          startPage = Math.max(0, totalPage - maxVisiblePages);
        }
    
        for (let i = startPage; i <= endPage; i++) {
          pageNumbers.push(
            <li
              key={i}
              className={currentPage === i   ? 'relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-9500 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white '
              : 'relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-400 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white'}
              onClick={() => onClick(i)}
            >
              {i}
            </li>
          );
        }
    
        return pageNumbers;
      };
    return (
        <nav className="flex flex-row">
            <ul className="list-style-none flex me-7">
            {renderPageNumbers()}
            </ul>
        </nav>
    )
}

export default Pagination