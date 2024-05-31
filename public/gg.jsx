import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './productSlice'; // Adjust the import path accordingly

const Pagination = () => {
    const dispatch = useDispatch();
    const { currentPage, totalPages, pageSize } = useSelector((state) => state.products);

    const [page, setPage] = useState(currentPage);
    const [size, setSize] = useState(pageSize || 10); // default page size to 10 if not provided

    useEffect(() => {
        dispatch(fetchProducts({ page, size }));
    }, [dispatch, page, size]);

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setPage(newPage);
        }
    };

    const handlePageSizeChange = (e) => {
        setSize(Number(e.target.value));
        setPage(0); 
    };

    return (
        <div>
            {/* Page Size Selector */}
            <div>
                <label htmlFor="pageSize">Page Size: </label>
                <select id="pageSize" value={size} onChange={handlePageSizeChange}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                </select>
            </div>

            {/* Pagination Controls */}
            <div className="flex" style={{ gap: '10px' }}>
                <button className='btn box' style={{ width: '100px' }} onClick={() => handlePageChange(0)} disabled={page === 0}>
                    First Page
                </button>
                <button className='btn box' style={{ width: '100px' }} onClick={() => handlePageChange(page - 1)} disabled={page === 0}>
                    Previous
                </button>

                {/* Page Number Buttons */}
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        className={`btn box ${index === page ? 'active' : ''}`}
                        style={{ width: '50px' }}
                        onClick={() => handlePageChange(index)}
                    >
                        {index + 1}
                    </button>
                ))}

                <button className='btn box' style={{ width: '100px' }} onClick={() => handlePageChange(page + 1)} disabled={page === totalPages - 1}>
                    Next
                </button>
                <button className='btn box' style={{ width: '100px' }} onClick={() => handlePageChange(totalPages - 1)} disabled={page === totalPages - 1}>
                    Last Page
                </button>
            </div>
        </div>
    );
};

export default Pagination;
