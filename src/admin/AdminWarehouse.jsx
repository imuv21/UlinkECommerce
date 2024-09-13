import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuidv4 } from 'uuid';

const AdminWarehouse = () => {

    const orders = [
        {
            orderId: "ORD123456",
            createdAt: "2024-09-01T14:30:00Z",
            customer: "John Doe",
            priority: "High",
            total: "$150.00",
            paymentStatus: "Paid",
            items: 4,
            deliveryNumber: "DEL789012",
            orderStatus: "Shipped"
        },
        {
            orderId: "ORD123457",
            createdAt: "2024-09-02T09:15:00Z",
            customer: "Jane Smith",
            priority: "Medium",
            total: "$200.00",
            paymentStatus: "Pending",
            items: 8,
            deliveryNumber: "DEL789013",
            orderStatus: "Processing"
        },
        {
            orderId: "ORD123458",
            createdAt: "2024-09-03T11:45:00Z",
            customer: "Alice Johnson",
            priority: "Low",
            total: "$80.00",
            paymentStatus: "Paid",
            items: 6,
            deliveryNumber: "DEL789014",
            orderStatus: "Delivered"
        }
    ];

    const [counts, setCounts] = useState([0, 0, 0, 0]);
    const ends = [300, 350, 400, 450];
    const duration = 1000;
    const numberRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((entry) => setCounts(prev => prev.map((_, i) => entry.isIntersecting ? prev[i] : 0))),
            { threshold: 0.5 }
        );
        if (numberRef.current) observer.observe(numberRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const totalSteps = 100;
        const intervalTime = duration / totalSteps;
        const increments = ends.map(end => end / totalSteps);
        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep++;
            setCounts(prev => prev.map((count, i) => Math.min(count + increments[i], ends[i])));
            if (currentStep >= totalSteps) clearInterval(timer);
        }, intervalTime);

        return () => clearInterval(timer);
    }, [counts]);


    return (
        <Fragment>
            <Helmet>
                <title>Warehouse Management | Ulinkit Admin Dashboard - Efficient Inventory Control</title>
                <meta name="description" content="Manage inventory, track stock levels, and oversee warehouse operations with the Ulinkit Admin Dashboard. Ensure efficient control of stock movement, optimize storage, and streamline the fulfillment process for better operational efficiency." />
                <link rel="canonical" href="https://www.ulinkit.com/admin-dashboard/warehouse" />
            </Helmet>
            <div className='adminpage'>

                <div className='perfect-grid-admin' ref={numberRef}>
                    <div className="grid-item-admin">
                        <div className="orderdis">
                            <div className="heading3 fontGray">Total Product Items</div>
                            <div className="heading fontGrayLight">{Math.floor(counts[0])}</div>
                        </div>
                        <div className="orderdisicon">
                            <svg xmlns="http://www.w3.org/2000/svg" className='order-icon-svg' viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="M21.984 10c-.037-1.311-.161-2.147-.581-2.86c-.598-1.015-1.674-1.58-3.825-2.708l-2-1.05C13.822 2.461 12.944 2 12 2s-1.822.46-3.578 1.382l-2 1.05C4.271 5.56 3.195 6.125 2.597 7.14C2 8.154 2 9.417 2 11.942v.117c0 2.524 0 3.787.597 4.801c.598 1.015 1.674 1.58 3.825 2.709l2 1.049C10.178 21.539 11.056 22 12 22s1.822-.46 3.578-1.382l2-1.05c2.151-1.129 3.227-1.693 3.825-2.708c.42-.713.544-1.549.581-2.86M21 7.5l-4 2M12 12L3 7.5m9 4.5v9.5m0-9.5l4.5-2.25l.5-.25m0 0V13m0-3.5l-9.5-5"></path></svg>
                        </div>
                    </div>
                    <div className="grid-item-admin">
                        <div className="orderdis">
                            <div className="heading3 fontGray">In Stock Products</div>
                            <div className="heading fontGrayLight">{Math.floor(counts[1])}</div>
                        </div>
                        <div className="orderdisicon">
                            <svg xmlns="http://www.w3.org/2000/svg" className='order-icon-svg' viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="M19 10h-8m-6 0h2m-2 8h8m6 0h-2m2-4H5m14-8H5"></path></svg>
                        </div>
                    </div>
                    <div className="grid-item-admin">
                        <div className="orderdis">
                            <div className="heading3 fontGray">Out Of Stock Products</div>
                            <div className="heading fontGrayLight">{Math.floor(counts[2])}</div>
                        </div>
                        <div className="orderdisicon">
                            <svg xmlns="http://www.w3.org/2000/svg" className='order-icon-svg' viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"><path d="m14 12l-4 4m0-4l4 4M9 6V5a3 3 0 1 1 6 0v1"></path><path d="M20.224 12.526c-.586-3.121-.878-4.682-1.99-5.604C17.125 6 15.537 6 12.36 6h-.72c-3.176 0-4.764 0-5.875.922s-1.403 2.483-1.989 5.604c-.823 4.389-1.234 6.583-.034 8.029S7.174 22 11.639 22h.722c4.465 0 6.698 0 7.897-1.445c.696-.84.85-1.93.696-3.555"></path></g></svg>
                        </div>
                    </div>
                    <div className="grid-item-admin">
                        <div className="orderdis">
                            <div className="heading3 fontGray">Total Visited Customers</div>
                            <div className="heading fontGrayLight">{Math.floor(counts[3])}</div>
                        </div>
                        <div className="orderdisicon">
                            <svg xmlns="http://www.w3.org/2000/svg" className='order-icon-svg' viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="6" r="4"></circle><path stroke-linecap="round" d="M18 9c1.657 0 3-1.12 3-2.5S19.657 4 18 4M6 9C4.343 9 3 7.88 3 6.5S4.343 4 6 4m11.197 11c.51.588.803 1.271.803 2c0 2.21-2.686 4-6 4s-6-1.79-6-4s2.686-4 6-4q.511 0 1 .055M20 19c1.754-.385 3-1.359 3-2.5s-1.246-2.115-3-2.5M4 19c-1.754-.385-3-1.359-3-2.5s1.246-2.115 3-2.5"></path></g></svg>
                        </div>
                    </div>
                </div>

                <div className="admin-orders">
                    <div className="order-nav">
                        <div className="heading3 fontGray">All Warehouse List</div>
                        <select name="" id="">
                            <option value="">Select</option>
                            <option value="">This Month</option>
                            <option value="">This week</option>
                        </select>
                    </div>

                    <div className="admin-order-title order-title-padding">
                        <div className="order-title-box">
                            <div className="descrip2">Warehouse ID</div>
                        </div>
                        <div className="order-title-box">
                            <div className="descrip2">Warehouse Name</div>
                        </div>
                        <div className="order-title-box">
                            <div className="descrip2">Location</div>
                        </div>
                        <div className="order-title-box">
                            <div className="descrip2">Manager</div>
                        </div>
                        <div className="order-title-box">
                            <div className="descrip2">Stock Shipping</div>
                        </div>
                        <div className="order-title-box">
                            <div className="descrip2">Stock Available</div>
                        </div>
                        <div className="order-title-box second-last-box-title">
                            <div className="descrip2">Contact Number</div>
                        </div>
                        <div className="order-title-box">
                            <div className="descrip2">Warehouse Revenue</div>
                        </div>
                        <div className="order-title-box last-box-title">
                            <div className="descrip2">Action</div>
                        </div>
                    </div>

                    {orders && orders.map((order) => (
                        <div className="admin-order-title" key={uuidv4()}>
                            <div className="order-list-box">
                                <div className="descrip">{order.orderId}</div>
                            </div>
                            <div className="order-list-box">
                                <div className="descrip">{order.customer}</div>
                            </div>
                            <div className="order-list-box">
                                <div className="descrip">{order.priority}</div>
                            </div>
                            <div className="order-list-box">
                                <div className="descrip">{order.total}</div>
                            </div>
                            <div className="order-list-box">
                                <div className="descrip">{order.paymentStatus}</div>
                            </div>
                            <div className="order-list-box">
                                <div className="descrip">{order.items}</div>
                            </div>
                            <div className="order-list-box second-last-box-list">
                                <div className="descrip">{order.deliveryNumber}</div>
                            </div>
                            <div className="order-list-box">
                                <div className="descrip">{order.orderStatus}</div>
                            </div>
                            <div className="order-list-box last-box-list">
                                <div className='divshake1'><VisibilityIcon style={{ color: 'rgb(233, 218, 0)' }} /></div>
                                <div className='divshake2'><BorderColorIcon style={{ color: 'rgb(12, 233, 0)' }} /></div>
                                <div className='divshake3'><DeleteIcon style={{ color: 'rgb(250, 47, 47)' }} /></div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </Fragment>
    )
};

export default AdminWarehouse;