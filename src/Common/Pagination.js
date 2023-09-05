import React from "react";

const Pagination = ({ postsPerPage, totalPosts, currentPage, paginate }) => {
  
  const pageNumbers = [];

  for (let i = 0; i < Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i+1);
  }
  
 
 

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? "active" : ""}`}
          >
            <a  className="page-link" onClick={() => paginate(number)}>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
