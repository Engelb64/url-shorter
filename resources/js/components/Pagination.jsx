import React from 'react';

const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
    return (
        <div className="pagination">
            {[...Array(totalPages).keys()].map(page => (
                <button
                    key={page}
                    className={`btn ${currentPage === page + 1 ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => handlePageChange(page + 1)}
                >
                    {page + 1}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
