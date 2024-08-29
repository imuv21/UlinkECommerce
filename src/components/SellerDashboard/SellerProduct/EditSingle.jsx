
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addSingleSchema } from '../../Schemas/validationSchema';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { fetchEditProduct, deleteImage, uploadImage, updateProduct } from '../../../Redux/updateProductSlice';
import { toast } from 'react-hot-toast';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import ClearIcon from '@mui/icons-material/Clear';

const schema = yupResolver(addSingleSchema);
const EditSingle = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const { productId } = useParams();

    const [selectedSupOption, setSelectedSupOption] = useState("");


    //edit and validation
    const { handleSubmit, control, formState: { errors }, setValue } = useForm({
        resolver: schema,
    });
    const { fetchedImages } = useSelector((state) => state.editproducts);
    const productData = useSelector((state) => state.editproducts.productData);
    const loading = useSelector((state) => state.editproducts.loading);
    const error = useSelector((state) => state.editproducts.error);

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        dispatch(fetchEditProduct(productId));
    }, [dispatch, productId]);

    useEffect(() => {
        if (productData && productData.product) {
            const product = productData.product;
            setValue('bulletPoints', product.bulletPoints || '');
            setValue('productName', product.productName || '');
            setValue('brandName', product.brandName || '');
            setValue('keyWords', product.keyWords || '');
            setValue('variantColor', product.variantColor || '');
            setValue('variantSize', product.variantSize || '');
            setValue('addInfo', product.addInfo || '');
            setValue('barcode', product.barcode || '');
            setValue('barcodeNum', product.barcodeNum || '');
            setValue('sku', product.sku || '');
            setValue('unitsPerCarton', product.unitsPerCarton || '');
            setValue('size', product.size || '');
            setValue('sizeUnit', product.sizeUnit || '');
            setValue('avgLeadTime', product.avgLeadTime || '');
            setValue('transportationMode', product.transportationMode || '');

            setValue('cartonWgt', product.cartonWgt || '');
            setValue('cartonWgtUnit', product.cartonWgtUnit || '');
            setValue('cartonHgt', product.cartonHgt || '');
            setValue('cartonHgtUnit', product.cartonHgtUnit || '');
            setValue('cartonLgh', product.cartonLgh || '');
            setValue('cartonLghUnit', product.cartonLghUnit || '');
            setValue('cartonWdh', product.cartonWdh || '');
            setValue('cartonWdhUnit', product.cartonWdhUnit || '');

            setValue('productWgt', product.productWgt || '');
            setValue('productWgtUnit', product.productWgtUnit || '');
            setValue('productHgt', product.productHgt || '');
            setValue('productLgh', product.productLth || '');
            setValue('productWdh', product.productWdh || '');
            setValue('DimensionUnit', product.DimensionUnit || '');

            setValue('unitmeasure', product.unitmeasure || '');
            setValue('availableQuantity', product.availableQuantity || '');
            setValue('minOrderQuant', product.minOrderQuant || '');
            setValue('unitPrice', product.unitPrice || '');
            setValue('sellPrice', product.sellPrice || '');
            setValue('readyToShip', product.readyToShip || '');
            setValue('buynow', product.buynow || '');
            setValue('availability', product.availability || '');
            setValue('PrivateLabel', product.PrivateLabel || '');
            setValue('origin', product.origin || '');
            setValue('StockLocation', product.StockLocation || '');
            setValue('ean', product.ean || '');
            setValue('dgrGoods', product.dgrGoods || '');
            setValue('incoterm', product.incoterm || '');
            setValue('hsnCode', product.hsnCode || '');
            setValue('temperature', product.temperature || '');
            setValue('imodelNum', product.imodelNum || '');
            setValue('colors', product.colors || '');
            setValue('gender', product.gender || '');

            setValue('shelflife', product.shelflife || '');
            setValue('ingredients', product.ingredients || '');
            setValue('packType', product.packType || '');
            setValue('instructions', product.instructions || '');
            setValue('material', product.material || '');

            setValue('portType', product.portType || '');
            setValue('connectvityType', product.connectvityType || '');
            setValue('avgBatteryLife', product.avgBatteryLife || '');
            setValue('compatibility', product.compatibility || '');
            setValue('memoryStorage', product.memoryStorage || '');
            setValue('version', product.version || '');
            setValue('opSystem', product.opSystem || '');
            setValue('screenSize', product.screenSize || '');
            setValue('ram', product.ram || '');
            setValue('specifications', product.specifications || '');

            setValue('lensType', product.lensType || '');
            setValue('fitSize', product.fitSize || '');
            setValue('form', product.form || '');
            setValue('skinType', product.skinType || '');

            setValue('voltage', product.voltage || '');
            setValue('power', product.power || '');
            setValue('powerPlugType', product.powerPlugType || '');
            setValue('condition', product.condition || '');
            setValue('pattern', product.pattern || '');
            setValue('flavor', product.flavor || '');
            setValue('petSize', product.petSize || '');
            setValue('ageRange', product.ageRange || '');
            setValue('powerSource', product.powerSource || '');
        }
    }, [productData, setValue]);


    const onSubmit = async (data) => {
      
        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            await dispatch(updateProduct({ productId, productData: data })).unwrap();
          
            toast(<div className='toaster'> < VerifiedIcon /> {`Product updated successfully`}</div>, 
                { duration: 3000, position: 'top-center', style: { padding: '3px', color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        } catch (error) {
          
            toast(<div className='toaster'> < NewReleasesIcon /> {`Failed to update product`}</div>, 
                { duration: 3000, position: 'top-center', style: { padding: '3px', color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        } finally {
            setIsSubmitting(false);
            navigate('/seller-dashboard/product-list');
        }
    };

    const handleCancel = () => {
        navigate('/seller-dashboard/product-list');
    };


    //select country from api
    const [countries, setCountries] = useState([]);
    const [selectedOrigin, setSelectedOrigin] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json');
                const data = response.data;
                const uniqueCountries = [...new Set(data.map(city => city.country))];
                setCountries(uniqueCountries);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    const originSelectChange = (event) => {
        setSelectedOrigin(event.target.value);
    };
    const locationSelectChange = (event) => {
        setSelectedLocation(event.target.value);
    };


    //images selector
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    useEffect(() => {
        if (fetchedImages && fetchedImages.length > 0) {
            const uploadedImages = fetchedImages.map(img => ({
                src: img.imageUrl,
                isUploaded: true,
                imageId: img.imageId,
                name: img.name,
                priority: img.priority
            }));
            setImages(uploadedImages);
            setImagesPreview(uploadedImages);
        }
    }, [fetchedImages]);

    const onFileSelect = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const totalImages = images.length;
        if (totalImages >= 5) {
          
            toast(<div className='toaster'> < NewReleasesIcon /> {`You can only select a maximum of 5 images`}</div>, 
                { duration: 3000, position: 'top-center', style: { padding: '3px', color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
            return;
        }

        const newImage = { file, isUploaded: false };
        const newImagePreview = { src: URL.createObjectURL(file), isUploaded: false };

        setImages(prevImages => [...prevImages, newImage]);
        setImagesPreview(prevPreviews => [...prevPreviews, newImagePreview]);

        if (!productId) {
            toast(<div className='toaster'> < NewReleasesIcon /> {`Product ID is missing`}</div>, 
                { duration: 3000, position: 'top-center', style: { padding: '3px', color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
            return;
        }
        try {
            await dispatch(uploadImage({ productId, file }));
            toast(<div className='toaster'> < VerifiedIcon /> {`Image uploaded successfully`}</div>, 
                { duration: 3000, position: 'top-center', style: { padding: '3px', color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        } catch (error) {
          
            toast(<div className='toaster'> < NewReleasesIcon /> {`Error uploading image`}</div>, 
                { duration: 3000, position: 'top-center', style: { padding: '3px', color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        }
    };

    const onDeleteImage = async (imageId, index) => {
        const response = await dispatch(deleteImage(imageId));
        if (response.meta.requestStatus === 'fulfilled') {
            setImages(prevImages => {
                const newImages = [...prevImages];
                newImages.splice(index, 1);
                return newImages;
            });
            setImagesPreview(prevPreviews => {
                const newPreviews = [...prevPreviews];
                if (!newPreviews[index].isUploaded) {
                    URL.revokeObjectURL(newPreviews[index].src);
                }
                newPreviews.splice(index, 1);
                return newPreviews;
            });
            toast(<div className='toaster'> < VerifiedIcon /> {`Image deleted successfully`}</div>, 
                { duration: 3000, position: 'top-center', style: { padding: '3px', color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        } else {
            toast(<div className='toaster'> < NewReleasesIcon /> {`Error deleting image`}</div>, 
                { duration: 3000, position: 'top-center', style: { padding: '3px', color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        }
    };




    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }


    return (
        <div className='flexcol seller-home-cont' style={{ gap: '20px' }}  >
            <Helmet>
                <title>Edit The Product</title>
            </Helmet>
            <div className="heading">Edit Product</div>

            <form className="productlist2" onSubmit={handleSubmit(onSubmit)}>
                <p className="heading3">Basic information</p>
                <Controller name="bulletPoints" control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Enter bullet points (separated by full stop)...' {...field} />} />
                {errors.bulletPoints && <p className='error'>{errors.bulletPoints?.message}</p>}

                <Controller name="productName" control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Enter product name' {...field} />} />
                {errors.productName && <p className='error'>{errors.productName?.message}</p>}
                <Controller name="brandName" control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Enter brand name' {...field} />} />
                {errors.brandName && <p className='error'>{errors.brandName?.message}</p>}

                <Controller name="keyWords" control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder="Enter keywords (separated by comma)..." {...field} />} />
                {errors.keyWords && <p className='error'>{errors.keyWords?.message}</p>}



                <p className="heading3">Variant information</p>
                <div className="flex-start wh" style={{ gap: '10px' }}>
                    <Controller name="variantColor" control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Enter product color' {...field} />} />
                    <Controller name="variantSize" control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Enter product size' {...field} />} />
                </div>


                <p className="heading3">Description</p>
                <Controller name="addInfo" control={control} defaultValue="" render={({ field }) => <textarea className="box flex" rows={10} placeholder="Enter description..." {...field}></textarea>} />


                <p className="heading3">Images and videos</p>
                <p className="heading2">
                    Add images and videos of your product to engage customers.
                    Images should be square with minimum allowed dimensions to be 500x500 pixels.
                    Allowed file extensions are (png, bmp, jpeg, and jpg)
                    and allowed video extensions are (mp4, mpeg and webp).
                </p>


                <div className="edit-file-input-container">
                    <label htmlFor="edit-file-upload" className="edit-custom-file-upload">
                        Choose Files
                    </label>
                    <input type="file" id="edit-file-upload" onChange={(event) => onFileSelect(event, productId)} className="edit-file-input" />
                    <div className="flex" style={{ gap: '10px' }}>
                        {imagesPreview.map((image, index) => (
                            <div className='edit-img-card' key={index}>
                                <img className='edit-imgs' src={image.src} alt={`Preview ${index}`} />
                                <span className="edit-delete" onClick={() => onDeleteImage(image.imageId, index)}><ClearIcon /></span>
                            </div>
                        ))}
                    </div>
                </div>



                <p className="heading3">Product identifiers</p>
                <p className="heading2">Enter barcode type and number for improved search/visibility of your product.</p>
                <Controller name="barcode" control={control} defaultValue="" render={({ field }) => (
                    <select className="box flex" {...field}>
                        <option value="">Select barcode type</option>
                        <option value="EAN">EAN</option>
                        <option value="GTIN">GTIN</option>
                        <option value="UPC">UPC</option>
                        <option value="ASIN">ASIN</option>
                        <option value="null">Product does not have barcode number</option>
                    </select>
                )}
                />

                <Controller name="barcodeNum" control={control} defaultValue="" render={({ field }) => <input type='text' className="box flex" placeholder='Enter barcode number' {...field} />} />

                <Controller name="sku" control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Enter SKU' {...field} />} />
                {errors.sku && <p className='error'>{errors.sku?.message}</p>}


                <p className="heading3">Packaging</p>
                <Controller name="unitsPerCarton" control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Enter units per carton' {...field} />} />

                <div className="flex wh" style={{ gap: '20px' }}>
                    <Controller name="size" control={control} defaultValue="" render={({ field }) => <input className="box flex" type='number' placeholder='Enter size' {...field} />} />
                    <Controller name="sizeUnit" control={control} defaultValue="" render={({ field }) => (
                        <select className="box flex" {...field} >
                            <option value="">Select unit</option>
                            <option value="kg">KG</option>
                            <option value="lb">LB</option>
                            <option value="gr">GR</option>
                            <option value="lt">LT</option>
                            <option value="cl">CL</option>
                            <option value="ml">ML</option>
                            <option value="gal">Gal</option>
                            <option value="floz">Fl Oz</option>
                            <option value="carton">Carton</option>
                            <option value="packet">Packet</option>
                            <option value="box">Box</option>
                            <option value="pack">Pack</option>
                        </select>
                    )}
                    />
                </div>


                <div className="flex wh" style={{ gap: '20px' }}>
                    <Controller name="avgLeadTime" control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Enter average lead time (days)' {...field} />} />
                    <Controller name="transportationMode" control={control} defaultValue="" render={({ field }) => (
                        <select className="box flex"  {...field}>
                            <option value="">Transportation mode</option>
                            <option value="regular">Regular</option>
                            <option value="food-ambient">Food ambient</option>
                            <option value="food-chilled">Food chilled</option>
                            <option value="food-frozen">Food frozen</option>
                            <option value="NA">N/A</option>
                        </select>
                    )}
                    />
                </div>
                {(errors.avgLeadTime || errors.transportationMode) &&
                    <div className="flex wh">
                        <div className="flex wh">
                            <p className='error'>{errors.avgLeadTime?.message}</p>
                        </div>
                        <div className="flex wh">
                            <p className='error'>{errors.transportationMode?.message}</p>
                        </div>
                    </div>
                }

                <p className="heading3">Carton dimensions & weight</p>
                <p className="heading2">Enter the dimensions and weight of the carton to help calculate shipping rate. These measurements are for the product's shipping container.</p>
                <div className="flex wh" style={{ gap: '20px' }}>
                    <Controller name="cartonWgt" control={control} defaultValue="" render={({ field }) => <input className="box flex" type='number' placeholder='Enter carton weight' {...field} />} />
                    <Controller name="cartonWgtUnit" control={control} defaultValue="" render={({ field }) =>
                        <select className="box flex"  {...field} >
                            <option value="">Select unit</option>
                            <option value="kg">KG</option>
                            <option value="g">G</option>
                            <option value="mg">MG</option>
                            <option value="lbs">LBS</option>
                        </select>
                    } />
                </div>
                <div className="flex wh" style={{ gap: '20px' }}>
                    <Controller name="cartonLgh" control={control} defaultValue="" render={({ field }) => <input className="box flex" type='number' placeholder='Enter carton length' {...field} />} />
                    <Controller name="cartonLghUnit" control={control} defaultValue="" render={({ field }) =>
                        <select className="box flex"  {...field} >
                            <option value="">Select unit</option>
                            <option value="cm">CM</option>
                            <option value="m">M</option>
                            <option value="in">IN</option>
                        </select>
                    } />
                </div>
                <div className="flex wh" style={{ gap: '20px' }}>
                    <Controller name="cartonHgt" control={control} defaultValue="" render={({ field }) => <input className="box flex" type='number' placeholder='Enter carton height' {...field} />} />
                    <Controller name="cartonHgtUnit" control={control} defaultValue="" render={({ field }) =>
                        <select className="box flex" {...field} >
                            <option value="">Select unit</option>
                            <option value="cm">CM</option>
                            <option value="m">M</option>
                            <option value="in">IN</option>
                        </select>
                    } />
                </div>
                <div className="flex wh" style={{ gap: '20px' }}>
                    <Controller name="cartonWdh" control={control} defaultValue="" render={({ field }) => <input className="box flex" type='number' placeholder='Enter carton width' {...field} />} />
                    <Controller name="cartonWdhUnit" control={control} defaultValue="" render={({ field }) =>
                        <select className="box flex" {...field} >
                            <option value="">Select unit</option>
                            <option value="cm">CM</option>
                            <option value="m">M</option>
                            <option value="in">IN</option>
                        </select>
                    } />
                </div>


                <p className="heading3">Product dimensions & weight</p>
                <p className="heading2">These attributes provide information about the product's dimensions and weight.</p>
                <div className="flex wh" style={{ gap: '20px' }}>
                    <Controller name="productWgt" control={control} defaultValue="" render={({ field }) => <input className="box flex" type='number' placeholder='Enter product weight' {...field} />} />
                    <Controller name="productWgtUnit" control={control} defaultValue="" render={({ field }) =>
                        <select className="box flex"  {...field} >
                            <option value="">Select unit</option>
                            <option value="kg">KG</option>
                            <option value="g">G</option>
                            <option value="mg">MG</option>
                            <option value="lbs">LBS</option>
                        </select>
                    } />
                </div>
                <div className="flex wh" style={{ gap: '20px' }}>
                    <Controller name="productLgh" control={control} defaultValue="" render={({ field }) => <input className="box flex" type='number' placeholder='Enter product length' {...field} />} />
                    <Controller name="productHgt" control={control} defaultValue="" render={({ field }) => <input className="box flex" type='number' placeholder='Enter product height' {...field} />} />
                </div>
                <div className="flex wh" style={{ gap: '20px' }}>
                    <Controller name="productWdh" control={control} defaultValue="" render={({ field }) => <input className="box flex" type='number' placeholder='Enter product width' {...field} />} />
                    <Controller name="DimensionUnit" control={control} defaultValue="" render={({ field }) => (
                        <select className="box flex" {...field}>
                            <option value="">Dimension unit</option>
                            <option value="cm">CM</option>
                            <option value="m">M</option>
                            <option value="in">IN</option>
                        </select>
                    )}
                    />
                </div>



                <p className="heading3">Pricing</p>
                <Controller name="unitmeasure" control={control} defaultValue="" render={({ field }) => (
                    <select className="box flex" {...field}>
                        <option value="">Select unit of measure</option>
                        <option value="kg">KG</option>
                        <option value="lb">LB</option>
                        <option value="gr">GR</option>
                        <option value="lt">LT</option>
                        <option value="cl">CL</option>
                        <option value="ml">ML</option>
                        <option value="gal">Gal</option>
                        <option value="floz">Fl Oz</option>
                        <option value="carton">Carton</option>
                        <option value="packet">Packet</option>
                        <option value="box">Box</option>
                        <option value="pack">Pack</option>
                    </select>
                )}
                />


                <p className="heading3">Product inventory</p>
                <p className="heading2">Enter the available quantity of your product</p>
                <Controller name="availableQuantity" control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Enter available quantity' {...field} />} />
                {errors.availableQuantity && <p className='error'>{errors.availableQuantity?.message}</p>}
                <Controller name="minOrderQuant" control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Enter minimum order quantity' {...field} />} />
                {errors.minOrderQuant && <p className='error'>{errors.minOrderQuant?.message}</p>}


                <p className="heading3">Price list</p>
                <p className="heading2">Add pricing to your product. You can also create bulk pricing rules to offer price discounts based on quantity breaks.</p>

                <div className="flexcol wh">
                    <div className="pricelist">
                        <div className='pldiv bg-clr'><p className="heading3">Unit price</p></div>
                        <div className='pldiv bg-clr'><p className="heading3">Sale price (optional)</p></div>
                    </div>

                    <div className="pricelist">
                        <div className='pldiv'>
                            <div className="flex">
                                <p className="heading2">{user.currency}</p>
                                <Controller name="unitPrice" control={control} defaultValue="" render={({ field }) => <input placeholder='Enter unit price' {...field} />} />
                            </div>
                            {errors.unitPrice && <p className='error'>{errors.unitPrice?.message}</p>}
                        </div>
                        <div className='pldiv'>
                            <div className="flex">
                                <p className="heading2">{user.currency}</p>
                                <Controller name="sellPrice" control={control} defaultValue="" render={({ field }) => <input placeholder='Enter sale price' {...field} />} />
                                {errors.sellPrice && <p className='error'>{errors.sellPrice?.message}</p>}
                            </div>
                        </div>
                    </div>
                </div>



                <p className="heading3">Shipping details</p>
                <div className="flex wh" style={{ gap: '20px' }}>
                    <Controller name="readytoship" control={control} defaultValue="" render={({ field }) => (
                        <select className="box flex" {...field}>
                            <option value="">Ready to ship?</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    )}
                    />
                    <Controller name="buynow" control={control} defaultValue="" render={({ field }) => (
                        <select className="box flex" {...field}>
                            <option value="">Can it be bought using checkout?</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    )}
                    />
                </div>


                <div className="flex wh" style={{ gap: '20px' }}>
                    <Controller name="availability" control={control} defaultValue="" render={({ field }) => (
                        <select className="box flex"  {...field}>
                            <option value="">Availability</option>
                            <option value="instock">In stock</option>
                            <option value="outofstock">Out of stock</option>
                        </select>
                    )}
                    />
                    <Controller name="PrivateLabel" control={control} defaultValue="" render={({ field }) => (
                        <select className="box flex"  {...field}>
                            <option value="">Offer Private Label?</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    )}
                    />
                </div>

                <div className="flex wh" style={{ gap: '20px' }}>
                    <Controller name="origin" defaultValue="" value={selectedOrigin} onChange={originSelectChange} control={control} render={({ field }) => (
                        <select className="box flex"  {...field} >
                            <option value="">Country of Origin</option>
                            {countries.map((country) => (
                                <option key={uuidv4()} value={country}>{country}</option>
                            ))}
                        </select>
                    )}
                    />
                    <Controller name="StockLocation" defaultValue="" value={selectedLocation} onChange={locationSelectChange} control={control} render={({ field }) => (
                        <select className="box flex" {...field} >
                            <option value="">Stock Location</option>
                            {countries.map((country) => (
                                <option key={uuidv4()} value={country}>{country}</option>
                            ))}
                        </select>
                    )}
                    />
                </div>
                {(errors.origin || errors.StockLocation) &&
                    <div className="flex wh">
                        <div className="flex wh">
                            <p className='error'>{errors.origin?.message}</p>
                        </div>
                        <div className="flex wh">
                            <p className='error'>{errors.StockLocation?.message}</p>
                        </div>
                    </div>
                }

                <p className="heading3">Additional details</p>
                <Controller name="ean" control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Enter EAN (European article number)' {...field} />} />
                <Controller name="dgrGoods" control={control} defaultValue="" render={({ field }) => (
                    <select className="box flex" {...field}>
                        <option value="">Dangerous goods</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                )}
                />
                {errors.dgrGoods && <p className='error'>{errors.dgrGoods?.message}</p>}
                <Controller name="incoterm" control={control} defaultValue="" render={({ field }) =>
                    <select className="box flex" {...field}>
                        <option value="">Select incoterm</option>
                        <option value="free-carrier">Free carrier</option>
                        <option value="Carriage-paid-to">Carriage paid to</option>
                        <option value="Carriage-and-insurance-paid-to">Carriage and insurance paid to</option>
                        <option value="Delivered-at-place-unloaded">Delivered at place unloaded</option>
                        <option value="Delivered-at-place">Delivered at place</option>
                        <option value="Delivered-duty-paid">Delivered duty paid</option>
                        <option value="Free-alongside-ship">Free alongside ship</option>
                        <option value="Free-on-board">Free on board</option>
                        <option value="Cost-and-freight">Cost and freight</option>
                        <option value="Cost-insurance-and-freight">Cost insurance and freight</option>
                        <option value="ExWorks">ExWorks</option>
                    </select>
                } />
                <Controller name="hsnCode" control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Enter HSN code' {...field} />} />

                <Controller name="temperature" control={control} defaultValue="" render={({ field }) => (
                    <select className="box flex"  {...field}>
                        <option value="">Storage temperature</option>
                        <option value="dry">Dry (min 28C, max NA)</option>
                        <option value="chilled">Chilled (min 2C, max 8C)</option>
                        <option value="frozen">Frozen (min -5C, max -5C)</option>
                        <option value="roomtemperature">Room temperature (min 15C, max 25C)</option>
                    </select>
                )}
                />

                <Controller name="imodelNum" control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Enter item model number' {...field} />} />

                <Controller name="colors" control={control} defaultValue="" render={({ field }) => (
                    <select className="box flex"  {...field}>
                        <option value="">Select color</option>
                        <option value="red">Red</option>
                        <option value="orange">Orange</option>
                        <option value="yellow">Yellow</option>
                        <option value="green">Green</option>
                        <option value="blue">Blue</option>
                        <option value="purple">Purple</option>
                        <option value="pink">Pink</option>
                        <option value="silver">Silver</option>
                        <option value="gold">Gold</option>
                        <option value="black">Black</option>
                        <option value="white">White</option>
                        <option value="grey">Grey</option>
                        <option value="brown">Brown</option>
                    </select>
                )}
                />

                <Controller name="gender" control={control} defaultValue="" render={({ field }) => (
                    <select className="box flex"  {...field}>
                        <option value="">Select gender</option>
                        <option value="boys">Boys</option>
                        <option value="girls">Girls</option>
                        <option value="unisex">Unisex</option>
                    </select>
                )}
                />


                {selectedSupOption === "FoodAndBeverages" && (
                    <Controller name="shelflife" control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Enter shelf life (days)' {...field} />} />
                )}
                {(selectedSupOption === "FoodAndBeverages" || selectedSupOption === "BeautyAndFragrances") && (
                    <Controller name="ingredients" control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Enter ingredients' {...field} />} />
                )}
                {selectedSupOption === "Automotive" && (
                    <Controller name="packType" control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Enter packaging type' {...field} />} />
                )}
                {(selectedSupOption === "BabyCenter" || selectedSupOption === "BeautyAndFragrances" || selectedSupOption === "OfficeAndStationery" || selectedSupOption === "ToolsAndHomeImprovement") && (
                    <Controller name="instructions" control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Enter any safety warnings' {...field} />} />
                )}
                {(selectedSupOption === "BabyCenter" || selectedSupOption === "FashionAndAccessories" || selectedSupOption === "HomeGardenAndFurniture" || selectedSupOption === "OfficeAndStationery" || selectedSupOption === "SportsAndFitness" || selectedSupOption === "ToolsAndHomeImprovement") && (
                    <Controller name="material" control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Enter material' {...field} />} />
                )}
                {(selectedSupOption === "ConsumerElectronics" || selectedSupOption === "MachineryAndEquipment") && (
                    <div className="fragment">
                        <Controller name="portType" control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Enter port type' {...field} />} />
                        <Controller name="connectvityType" control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Enter connectvity type' {...field} />} />
                        <Controller name="avgBatteryLife" control={control} defaultValue="" render={({ field }) => <input className="box flex" type='number' placeholder='Enter average battery life (In hours)' {...field} />} />
                        <Controller name="compatibility" control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Enter compatibility' {...field} />} />
                        <Controller name="memoryStorage" control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Enter memory storage' {...field} />} />
                        <Controller name="version" control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Enter version' {...field} />} />
                        <Controller name="opSystem" control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Enter operating system' {...field} />} />
                        <Controller name="screenSize" control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Enter screen size' {...field} />} />
                        <Controller name="ram" control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Enter RAM' {...field} />} />
                        <Controller name="specifications" control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Enter additional specifications' {...field} />} />
                    </div>
                )}
                {selectedSupOption === "FashionAndAccessories" && (
                    <div className="fragment">
                        <Controller name="lensType" control={control} defaultValue="" render={({ field }) => (
                            <select className="box flex" {...field}>
                                <option value="">Select lens type</option>
                                <option value="polarized">Polarized</option>
                                <option value="nonPolarized">Non-polarized</option>
                            </select>
                        )}
                        />
                        <Controller name="fitSize" control={control} defaultValue="" render={({ field }) => (
                            <select className="box flex"  {...field}>
                                <option value="">Select size</option>
                                <option value="xl">XS</option>
                                <option value="s">S</option>
                                <option value="m">M</option>
                                <option value="l">L</option>
                                <option value="xl">XL</option>
                                <option value="2xl">2XL</option>
                                <option value="3xl">3XL</option>
                                <option value="4xl">4XL</option>
                                <option value="5xl">5XL</option>
                                <option value="oneSize">One size</option>
                            </select>
                        )}
                        />
                    </div>
                )}
                {(selectedSupOption === "BeautyAndFragrances" || selectedSupOption === "PersonalCare") && (
                    <div className="fragment">
                        <Controller name="form" control={control} defaultValue="" render={({ field }) => (
                            <select className="box flex"   {...field}>
                                <option value="">Select form</option>
                                <option value="liquid">Liquid</option>
                                <option value="powder">Powder</option>
                                <option value="spray">Spray</option>
                                <option value="solid">Solid</option>
                            </select>
                        )}
                        />
                        <Controller name="skinType" control={control} defaultValue="" render={({ field }) => (
                            <select className="box flex"  {...field}>
                                <option value="">Select skin type</option>
                                <option value="combination">Combination</option>
                                <option value="normal">Normal</option>
                                <option value="dry">Dry</option>
                                <option value="sensitive">Sensitive</option>
                                <option value="oily">Oily</option>
                                <option value="allSkinTypes">All skin types</option>
                            </select>
                        )}
                        />
                    </div>
                )}
                {(selectedSupOption === "HomeGardenAndFurniture" || selectedSupOption === "MachineryAndEquipment" || selectedSupOption === "SportsAndFitness" || selectedSupOption === "ToolsAndHomeImprovement" || selectedSupOption === "Toys") && (
                    <div className="fragment">
                        <Controller name="voltage" control={control} defaultValue="" render={({ field }) => <input type='number' className="box flex" placeholder='Enter voltage (in volts)' {...field} />} />
                        <Controller name="power" control={control} defaultValue="" render={({ field }) => <input type='number' className="box flex" placeholder='Enter power (in kilowatts kW)' {...field} />} />
                        <Controller name="powerPlugType" control={control} defaultValue="" render={({ field }) => (
                            <select className="box flex"  {...field}>
                                <option value="">Select power plug type</option>
                                <option value="a">Type A</option>
                                <option value="b">Type B</option>
                                <option value="c">Type C</option>
                                <option value="d">Type D</option>
                                <option value="e">Type E</option>
                                <option value="f">Type F</option>
                                <option value="g">Type G</option>
                                <option value="h">Type H</option>
                                <option value="i">Type I</option>
                                <option value="j">Type J</option>
                                <option value="k">Type K</option>
                                <option value="l">Type L</option>
                                <option value="m">Type M</option>
                                <option value="n">Type N</option>
                            </select>
                        )}
                        />
                    </div>
                )}
                {selectedSupOption === "MachineryAndEquipment" && (
                    <div className="fragment">
                        <Controller name="condition" control={control} defaultValue="" render={({ field }) => (
                            <select className="box flex"  {...field}>
                                <option value="">Select condition</option>
                                <option value="new">New</option>
                                <option value="used">Used</option>
                                <option value="refurbished">Refurbished</option>
                            </select>
                        )}
                        />
                    </div>
                )}
                {selectedSupOption === "OfficeAndStationery" && (
                    <Controller name="pattern" control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Enter pattern' {...field} />} />
                )}
                {selectedSupOption === "PetAndAnimalCare" && (
                    <div className="fragment">
                        <Controller name="flavor" control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Enter flavor' {...field} />} />
                        <Controller name="petSize" control={control} defaultValue="" render={({ field }) => (
                            <select className="box flex"  {...field}>
                                <option value="">Select pet size</option>
                                <option value="small">Small</option>
                                <option value="medium">Medium</option>
                                <option value="large">Large</option>
                                <option value="giant">Giant</option>
                            </select>
                        )}
                        />
                        <Controller name="ageRange" control={control} defaultValue="" render={({ field }) => (
                            <select className="box flex" {...field}>
                                <option value="">Select age range</option>
                                <option value="junior">Junior</option>
                                <option value="adult">Adult</option>
                                <option value="senior">Senior</option>
                                <option value="geriatric">Geriatric</option>
                            </select>
                        )}
                        />
                    </div>
                )}
                {selectedSupOption === "ToolsAndHomeImprovement" && (
                    <Controller name="powerSource" control={control} defaultValue="" render={({ field }) => (
                        <select className="box flex" {...field}>
                            <option value="">Select age range</option>
                            <option value="corded">Corded</option>
                            <option value="cordless">Cordless</option>
                            <option value="batteryManual">Battery/Manual</option>
                        </select>
                    )}
                    />
                )}


                <div className="flex wh" style={{ gap: '20px', justifyContent: 'start' }}>
                    <button className='btn box2 flex' type='button' onClick={handleCancel} style={{ width: 'fit-content', backgroundColor: 'var(--CodeTwo)' }}><p className="heading2">Cancel</p></button>
                    <button className='btn box2 flex' type='submit' style={{ width: 'fit-content', backgroundColor: 'var(--CodeOne)' }} disabled={isSubmitting}>
                        <p className="heading2">{isSubmitting ? 'Updating...' : 'Update'}</p>
                    </button>
                </div>
            </form>
        </div>
    )
};

export default EditSingle