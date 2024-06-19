import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { fetchEditProduct } from './updateProductSlice';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Helmet from 'react-helmet';

const EditProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { productId } = useParams();
    const user = useSelector((state) => state.auth.user);

    const [selectedSupOption, setSelectedSupOption] = useState("");
    const { handleSubmit, control, formState: { errors }, setValue } = useForm();

    const { fetchedImages, productData, loading, error } = useSelector((state) => state.editproducts);

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
        if (fetchedImages) {
            setFetchedImages(fetchedImages);
        }
    }, [productData, fetchedImages, setValue]);

    const onSubmit = async (data) => {
        // Handle form submission
        console.log(data);
    };

    const handleCancel = () => {
        navigate('/seller-dashboard/product-list');
    };

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

    const [images, setImages] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [fileInputValue, setFileInputValue] = useState('');

    const selectFiles = () => {
        document.getElementById('file-input').click();
    };

    const onFileSelect = (event) => {
        const files = event.target.files;
        if (files.length === 0) return;

        const totalImages = images.length + fetchedImages.length;
        const remainingSlots = 5 - totalImages;

        if (files.length > remainingSlots) {
            alert("You can only select a maximum of 5 images. The excess files will be ignored.");
            const selectedFiles = Array.from(files).slice(0, remainingSlots);
            setImages([...images, ...selectedFiles]);
        } else {
            setImages([...images, ...files]);
        }
        setFileInputValue('');
    };

    const deleteImage = (index, fromFetched = false) => {
        if (fromFetched) {
            setFetchedImages((prevImages) => {
                if (index >= 0 && index < prevImages.length) {
                    const newImages = [...prevImages];
                    newImages.splice(index, 1);
                    return newImages;
                }
                return prevImages;
            });
        } else {
            setImages((prevImages) => {
                if (index >= 0 && index < prevImages.length) {
                    const newImages = [...prevImages];
                    newImages.splice(index, 1);
                    return newImages;
                }
                return prevImages;
            });
        }
    };

    const onDragOver = (event) => {
        event.preventDefault();
        setIsDragging(true);
        event.dataTransfer.dropEffect = "copy";
    };

    const onDragLeave = (event) => {
        event.preventDefault();
        setIsDragging(false);
    };

    const onDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);
        const files = event.dataTransfer.files;
        if (files.length === 0) return;

        const totalImages = images.length + fetchedImages.length;
        const remainingSlots = 5 - totalImages;

        if (files.length > remainingSlots) {
            alert("You can only select a maximum of 5 images. The excess files will be ignored.");
            const selectedFiles = Array.from(files).slice(0, remainingSlots);
            setImages([...images, ...selectedFiles]);
        } else {
            setImages([...images, ...files]);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='flexcol seller-home-cont' style={{ gap: '20px' }}>
            <Helmet>
                <title>Edit The Product</title>
            </Helmet>
            <div className="heading">Edit Product</div>

            <form className="productlist2" onSubmit={handleSubmit(onSubmit)}>
                <div className="heading3">Basic information</div>
                <Controller name="bulletPoints" control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Enter bullet points (separated by full stop)...' {...field} />} />
                {errors.bulletPoints && <div className='error'>{errors.bulletPoints?.message}</div>}

                <Controller name="productName" control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Enter product name' {...field} />} />
                {errors.productName && <div className='error'>{errors.productName?.message}</div>}
                <Controller name="brandName" control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Enter brand name' {...field} />} />
                {errors.brandName && <div className='error'>{errors.brandName?.message}</div>}

                <Controller name="keyWords" control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder="Enter keywords (separated by comma)..." {...field} />} />
                {errors.keyWords && <div className='error'>{errors.keyWords?.message}</div>}

                <div className="heading3">Variant information</div>
                <div className="flex-start wh" style={{ gap: '10px' }}>
                    <Controller name="variantColor" control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Enter product color' {...field} />} />
                    <Controller name="variantSize" control={control} defaultValue="" render={({ field }) => <input className="box flex" placeholder='Enter product size' {...field} />} />
                </div>

                <div className="heading3">Description</div>
                <Controller name="addInfo" control={control} defaultValue="" render={({ field }) => <textarea className="box flex" rows={10} placeholder="Enter description..." {...field}></textarea>} />

                <div className="heading3">Images and videos</div>
                <div className="heading2">
                    Add images and videos of your product to engage customers.
                    Images should be square with minimum allowed dimensions to be 500x500 pixels.
                    Allowed file extensions are (png, bmp, jpeg, and jpg)
                    and allowed video extensions are (mp4, mpeg and webp).
                </div>

                <div className="card-dd">
                    <div className="drag-area-dd" onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
                        {isDragging ? (
                            <span className="select-dd">Drop images here</span>
                        ) : (
                            <Fragment>
                                Drag & Drop image here or {" "}
                                <span className="select-dd" role="button" onClick={selectFiles}>
                                    {images.length > 0 ? 'Change' : 'Select'} Images
                                </span>
                            </Fragment>
                        )}
                        <input
                            id="file-input"
                            type="file"
                            className='file-dd'
                            multiple
                            onChange={onFileSelect}
                            value={fileInputValue}
                            style={{ display: 'none' }} // hide input
                        />
                    </div>
                    <div className="container-dd">
                        {images.map((image, index) => (
                            <div className="image-dd" key={index}>
                                <span className="delete-dd" onClick={() => deleteImage(index)}>&times;</span>
                                <img src={URL.createObjectURL(image)} alt={`Selected ${index}`} />
                            </div>
                        ))}
                        {fetchedImages.map((image, index) => (
                            <div className="image-dd" key={index}>
                                <span className="delete-dd" onClick={() => deleteImage(index, true)}>&times;</span>
                                <img src={image.imageUrl} alt={image.name} />
                            </div>
                        ))}
                    </div>
                </div>

                <button type="submit" className="submit-btn">Save Changes</button>
                <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default EditProduct;
