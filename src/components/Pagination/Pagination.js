import React from "react";
import ReactPaginate from "react-paginate";

import "./Pagination.css";

const Pagination = React.memo(({ pageCount, onPageChange, ...props }) => {
  return (
    <ReactPaginate
      {...props}
      previousLabel={"Previous"}
      nextLabel={"Next"}
      breakLabel={"..."}
      pageCount={pageCount}
      marginPagesDisplayed={1}
      pageRangeDisplayed={1}
      onPageChange={onPageChange}
      containerClassName={"pagination"}
      activeClassName={"active"}
    />
  );
});

export default Pagination;
