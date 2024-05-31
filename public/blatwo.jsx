import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSellerProducts, deleteSellerProduct } from '../../Redux/sellerProductSlice';
import SearchIcon from '@mui/icons-material/Search';
import empty from '../../assets/empty.png';
import demo from '../../assets/demo.jpg';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import { Helmet } from 'react-helmet-async';

const ProductList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const { sellerProducts, loading, error } = useSelector((state) => state.sellerProducts);

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(20);

    useEffect(() => {
        dispatch(fetchSellerProducts({ page, size }));
    }, [dispatch, page, size]);

    const handleDelete = (productId) => {
        dispatch(deleteSellerProduct({ productId }))
            .then(() => {
                // Optional: You can show a success message or toast notification here
            })
            .catch(() => {
                // Optional: You can show an error message or toast notification here
            });
    };

    const productDetail = (productId) => {
        // Navigate to product detail page
        navigate(`/product/${productId}`);
    };

    const calculateCostPerUnit = (item) => {
        // Example calculation function
        return (item.sellPrice / item.unitPrice).toFixed(2);
    };

    const handleEdit = (index) => {
        // Handle edit functionality
        console.log('Edit product', index);
    };

    const handleAddAddress = (index) => {
        // Handle add address functionality
        console.log('Add address', index);
    };

    return (
        <div>
            {/* Your JSX content here */}
            {sellerProducts.map((item, index) => (
                <div className="searchBoxPro2" key={item.productId}>
                    <div><input type="checkbox" /></div>
                    <div>
                        {item.imageUrl && <img className='imgPro' src={item.imageUrl} alt={item.imageName} />}
                    </div>
                    <div className="heading2 download-btn" onClick={() => productDetail(item.productId)} style={{ whiteSpace: 'nowrap' }}>
                        {item.productName.length > 15 ? `${item.productName.substring(0, 15)}...` : item.productName}
                    </div>
                    <div className="heading2">
                        {item.category.length > 15 ? `${item.category.substring(0, 15)}...` : item.category}
                    </div>
                    <div className="heading2">
                        <div className="flex" style={{ gap: '5px' }}>
                            <span style={{ textDecoration: 'line-through', color: 'gray' }}>{user.currencySymbol}{item.unitPrice}</span>-<span style={{ fontWeight: 'bold' }}>{user.currencySymbol}{item.sellPrice}</span>
                        </div>
                    </div>
                    <div className="heading2"><span className='download-btn' onClick={() => handleAddAddress(index)}> {calculateCostPerUnit(item)}{user.currencySymbol} </span></div>
                    <div className="heading2" style={{ whiteSpace: 'nowrap' }}>
                        <div className="flexcol" style={{ gap: '2px' }}>
                            <span style={{ fontWeight: 'bold' }}>3</span>
                            <span style={{ fontSize: '12px' }}>MOQ is {item.minOrderQuant}</span>
                        </div>
                    </div>
                    <div className="heading2">{item.status}</div>
                    <div className="heading2" style={{ whiteSpace: 'nowrap' }}>{new Date(item.updatedDate).toLocaleString()}</div>
                    <div className="heading2">{item.visibility}</div>
                    <div className="heading2 flexcol">
                        <EditNoteIcon style={{ cursor: 'pointer' }} onClick={() => handleEdit(index)} />
                        <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => handleDelete(item.productId)} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
