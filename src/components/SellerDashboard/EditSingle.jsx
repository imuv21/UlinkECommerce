import React, { Fragment, useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addSingleSchema } from '../Schemas/validationSchema';
import { useParams, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';


const schema = yupResolver(addSingleSchema);

const EditSingle = () => {

    //edit and validation
    const { index } = useParams();
    const navigate = useNavigate();
    const { handleSubmit, control, formState: { errors }, setValue } = useForm({
        resolver: schema,
    });
    const [singleFormData, setSingleFormData] = useState({});
    const [images, setImages] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [fileInputValue, setFileInputValue] = useState('');
    const [selectedSupOption, setSelectedSupOption] = useState("");
    const [marketingValue, setMarketingValue] = useState("");
    const [categoryPath, setCategoryPath] = useState("");

    useEffect(() => {
        const savedSingleFormData = JSON.parse(localStorage.getItem('singleFormData'));
        if (savedSingleFormData && savedSingleFormData[index]) {
            setSingleFormData(savedSingleFormData[index]);

            setValue('productName', savedSingleFormData[index].productName);
            setValue('bulletPoints', savedSingleFormData[index].bulletPoints);
            setValue('brandName', savedSingleFormData[index].brandName);
            setValue('keyFeatures', savedSingleFormData[index].keyFeatures);
            setValue('keyWords', savedSingleFormData[index].keyWords);
            setValue('ean', savedSingleFormData[index].ean);

            setValue('variantColor', savedSingleFormData[index].variantColor);
            setValue('variantSize', savedSingleFormData[index].variantSize);
            setValue('dgrGoods', savedSingleFormData[index].dgrGoods);

            setValue('barcode', savedSingleFormData[index].barcode);
            setValue('barcodeNum', savedSingleFormData[index].barcodeNum);
            setValue('unitmeasure', savedSingleFormData[index].unitmeasure);
            setValue('sku', savedSingleFormData[index].sku);

            setValue('cartonWgt', savedSingleFormData[index].cartonWgt);
            setValue('cartonWgtUnit', savedSingleFormData[index].cartonWgtUnit);
            setValue('cartonWdh', savedSingleFormData[index].cartonWdh);
            setValue('cartonWdhUnit', savedSingleFormData[index].cartonWdhUnit);
            setValue('cartonLgh', savedSingleFormData[index].cartonLgh);
            setValue('cartonLghUnit', savedSingleFormData[index].cartonLghUnit);
            setValue('cartonHgt', savedSingleFormData[index].cartonHgt);
            setValue('cartonHgtUnit', savedSingleFormData[index].cartonHgtUnit);

            setValue('availableQuantity', savedSingleFormData[index].availableQuantity);
            setValue('unitsPerCarton', savedSingleFormData[index].unitsPerCarton);
            setValue('size', savedSingleFormData[index].size);
            setValue('sizeUnit', savedSingleFormData[index].sizeUnit);
            setValue('avgLeadTime', savedSingleFormData[index].avgLeadTime);
            setValue('TransportationMode', savedSingleFormData[index].TransportationMode);
            setValue('DimensionUnit', savedSingleFormData[index].DimensionUnit);

            setValue('productWgt', savedSingleFormData[index].productWgt);
            setValue('productWgtUnit', savedSingleFormData[index].productWgtUnit);
            setValue('productWdh', savedSingleFormData[index].productWdh);
            setValue('productLgh', savedSingleFormData[index].productLgh);
            setValue('productHgt', savedSingleFormData[index].productHgt);

            setValue('readytoship', savedSingleFormData[index].readytoship);
            setValue('buynow', savedSingleFormData[index].buynow);
            setValue('incoterm', savedSingleFormData[index].incoterm);
            setValue('addInfo', savedSingleFormData[index].addInfo);

            setValue('temperature', savedSingleFormData[index].temperature);
            setValue('StockLocation', savedSingleFormData[index].StockLocation);
            setValue('Availability', savedSingleFormData[index].Availability);
            setValue('PrivateLabel', savedSingleFormData[index].PrivateLabel);
            setValue('origin', savedSingleFormData[index].origin);

            setValue('hsnCode', savedSingleFormData[index].hsnCode);
            setValue('salePrice', savedSingleFormData[index].salePrice);
            setValue('unitPrice', savedSingleFormData[index].unitPrice);
            setValue('minOrderQuant', savedSingleFormData[index].minOrderQuant);

            setValue('shelflife', savedSingleFormData[index].shelflife);

            setMarketingValue(savedSingleFormData[index].marketingValue);
            setCategoryPath(savedSingleFormData[index].categoryPath);
            setSelectedSupOption(savedSingleFormData[index].selectedSupOption);

            setImages(savedSingleFormData[index].images || []);
        }
    }, [index, setValue, setImages]);
    const onSubmit = (data) => {
        const currentTime = new Date();
        data.time = currentTime.toLocaleString();
        const imageUrls = images.map(image => {
            const imageSize = image.size || 0;
            return {
                url: image.url,
                name: image.name,
                size: imageSize,
                uploadDate: currentTime.toLocaleString()
            };
        });
        data.images = imageUrls;
        const updatedSingleFormData = JSON.parse(localStorage.getItem('singleFormData'));
        if (updatedSingleFormData && updatedSingleFormData[index]) {
            const updatedSingleData = { ...data, images, selectedSupOption, marketingValue, categoryPath };
            updatedSingleFormData[index] = updatedSingleData;
            localStorage.setItem('singleFormData', JSON.stringify(updatedSingleFormData));
            navigate('/seller-dash', { state: { updatedSingleData } });
        }
        console.log(data);
    };
    const handleCancel = () => {
        navigate('/seller-dash');
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



    //drag and drop
    const selectFiles = () => {
        document.getElementById('file-input').click();
    };


    // const onFileSelect = (event) => {
    //     const files = event.target.files;
    //     if (files.length === 0) return;
    //     for (let i = 0; i < files.length; i++) {
    //         const file = files[i]; 
    //         if (file) {
    //             if (file.type.split('/')[0] === 'image') {
                    
    //                 const reader = new FileReader();
    //                 reader.onload = (e) => {
    //                     setImages((prevImages) => [
    //                         ...prevImages,
    //                         {
    //                             name: file.name, 
    //                             url: e.target.result,
    //                             size: file.size,
    //                         },
    //                     ]);
    //                 };
    //                 reader.readAsDataURL(file);
    //             }
    //         }
    //     }
    //     setFileInputValue(''); 
    // };




    const onFileSelect = (event) => {
        const files = event.target.files;
        if (files.length === 0) return;
        const totalImages = images.length;
        const remainingSlots = 5 - totalImages;
        if (remainingSlots <= 0) {
            alert("You've already selected the maximum allowed images (5).");
            return;
        }
        for (let i = 0; i < Math.min(remainingSlots, files.length); i++) {
            const file = files[i];
            if (file.type.split('/')[0] === 'image') {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setImages((prevImages) => [
                        ...prevImages,
                        {
                            name: file.name,
                            url: e.target.result,
                            size: file.size,
                        },
                    ]);
                };
                reader.readAsDataURL(file);
            }
        }
        setFileInputValue('');
    };
    








    const deleteImage = (index) => {
        setImages((prevImages) => {
            if (index >= 0 && index < prevImages.length) {
                const newImages = [...prevImages];
                newImages.splice(index, 1);
                return newImages;
            }
            return prevImages;
        });
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
        onFileSelect({ target: { files } });
    };
    const uploadImages = () => {
        console.log("images: ", images);
    };


    return (
        <div className='flexcol seller-home-cont' style={{ gap: '20px' }}  >
            <Helmet>
                <title>Edit The Product</title>
            </Helmet>
            <div className="heading">Edit Product</div>

            <form className="productlist2" onSubmit={handleSubmit(onSubmit)}>
                <div className="heading3">Basic information</div>
                <Controller name="bulletPoints" control={control} defaultValue={singleFormData.bulletPoints || ''} render={({ field }) => <input className="box flex" placeholder='Enter bullet points (separated by full stop)...' {...field} />} />
                {errors.bulletPoints && <div className='error'>{errors.bulletPoints?.message}</div>}

                <Controller name="productName" control={control} defaultValue={singleFormData.productName || ''} render={({ field }) => <input className="box flex" placeholder='Enter product name' {...field} />} />
                {errors.productName && <div className='error'>{errors.productName?.message}</div>}
                <Controller name="brandName" control={control} defaultValue={singleFormData.brandName || ''} render={({ field }) => <input className="box flex" placeholder='Enter brand name' {...field} />} />
                {errors.brandName && <div className='error'>{errors.brandName?.message}</div>}
                <Controller name="keyFeatures" control={control} defaultValue={singleFormData.keyFeatures || ''} render={({ field }) => <input className="box flex" placeholder='Enter key features' {...field} />} />
                {errors.keyFeatures && <div className='error'>{errors.keyFeatures?.message}</div>}
                <Controller name="keyWords" control={control} defaultValue={singleFormData.keyWords || ''} render={({ field }) => <input className="box flex" placeholder="Enter keywords (separated by comma)..." {...field} />} />
                {errors.keyWords && <div className='error'>{errors.keyWords?.message}</div>}



                <div className="heading3">Variant information</div>
                <div className="flex-start wh" style={{ gap: '10px' }}>
                    <Controller name="variantColor" control={control} defaultValue={singleFormData.variantColor || ''} render={({ field }) => <input className="box flex" placeholder='Enter product color' {...field} />} />
                    <Controller name="variantSize" control={control} defaultValue={singleFormData.variantSize || ''} render={({ field }) => <input className="box flex" placeholder='Enter product size' {...field} />} />
                </div>


                <div className="heading3">Description</div>
                <Controller name="addInfo" control={control} defaultValue={singleFormData.addInfo || ''} render={({ field }) => <textarea className="box flex" rows={10} placeholder="Enter description..." {...field}></textarea>} />


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
                        {images.map((imgs, index) => (
                            <div className="image-dd" key={index}>
                                <span className="delete-dd" onClick={() => deleteImage(index)}>&times;</span>
                                <img src={imgs.url} alt={imgs.name} />
                            </div>
                        ))}
                    </div>
                </div>



                <div className="heading3">Product identifiers</div>
                <div className="heading2">Enter barcode type and number for improved search/visibility of your product.</div>
                <Controller name="barcode" control={control} defaultValue={singleFormData.barcode || ''} render={({ field }) => (
                    <select className="box flex" {...field}>
                        <option value="">Select barcode type</option>
                        <option value="EAN">EAN</option>
                        <option value="GTIN">GTIN</option>
                        <option value="UPC">UPC</option>
                        <option value="null">Product does not have barcode number</option>
                    </select>
                )}
                />
                {errors.barcode && <div className='error'>{errors.barcode.message}</div>}
                <Controller name="barcodeNum" control={control} defaultValue={singleFormData.barcodeNum || ''} render={({ field }) => <input type='number' className="box flex" placeholder='Enter barcode number' {...field} />} />
                {errors.barcodeNum && <div className='error'>{errors.barcodeNum?.message}</div>}
                <Controller name="sku" control={control} defaultValue={singleFormData.sku || ''} render={({ field }) => <input className="box flex" placeholder='Enter SKU' {...field} />} />
                {errors.sku && <div className='error'>{errors.sku?.message}</div>}


                <div className="heading3">Packaging</div>
                <Controller name="unitsPerCarton" control={control} defaultValue={singleFormData.unitsPerCarton || ''} render={({ field }) => <input className="box flex" placeholder='Enter units per carton' {...field} />} />
                {errors.unitsPerCarton && <div className='error'>{errors.unitsPerCarton?.message}</div>}

                <div className="flex wh" style={{ gap: '20px' }}>
                    <Controller name="size" control={control} defaultValue={singleFormData.size || ''} render={({ field }) => <input className="box flex" placeholder='Enter size' {...field} />} />
                    <Controller name="sizeUnit" control={control} defaultValue={singleFormData.sizeUnit || ''} render={({ field }) => (
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
                {(errors.size || errors.sizeUnit) &&
                    <div className="flex wh">
                        <div className="flex wh">
                            <div className='error'>{errors.size?.message}</div>
                        </div>
                        <div className="flex wh" style={{ justifyContent: 'space-around' }}>
                            <div className='error'>{errors.sizeUnit?.message}</div>
                        </div>
                    </div>
                }

                <div className="flex wh" style={{ gap: '20px' }}>
                    <Controller name="avgLeadTime" control={control} defaultValue={singleFormData.avgLeadTime || ''} render={({ field }) => <input className="box flex" placeholder='Enter average lead time (days)' {...field} />} />
                    <Controller name="TransportationMode" control={control} defaultValue={singleFormData.TransportationMode || ''} render={({ field }) => (
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
                {(errors.avgLeadTime || errors.TransportationMode) &&
                    <div className="flex wh">
                        <div className="flex wh">
                            <div className='error'>{errors.avgLeadTime?.message}</div>
                        </div>
                        <div className="flex wh">
                            <div className='error'>{errors.TransportationMode?.message}</div>
                        </div>
                    </div>
                }


                <div className="heading3">Carton dimensions & weight</div>
                <div className="heading2">Enter the dimensions and weight of the carton to help calculate shipping rate. These measurements are for the product's shipping container.</div>
                <div className="flex wh" style={{ gap: '20px' }}>
                    <Controller name="cartonWgt" control={control} defaultValue={singleFormData.cartonWgt || ''} render={({ field }) => <input className="box flex" placeholder='Enter carton weight' {...field} />} />
                    <Controller name="cartonWgtUnit" control={control} defaultValue={singleFormData.cartonWgtUnit || ''} render={({ field }) =>
                        <select className="box flex"  {...field} >
                            <option value="">Select unit</option>
                            <option value="kg">KG</option>
                            <option value="g">G</option>
                            <option value="mg">MG</option>
                            <option value="lbs">LBS</option>
                        </select>
                    } />
                </div>
                {(errors.cartonWgt || errors.cartonWgtUnit) &&
                    <div className="flex wh">
                        <div className="flex wh">
                            <div className='error'>{errors.cartonWgt?.message}</div>
                        </div>
                        <div className="flex wh">
                            <div className='error'>{errors.cartonWgtUnit?.message}</div>
                        </div>
                    </div>
                }
                <div className="flex wh" style={{ gap: '20px' }}>
                    <Controller name="cartonLgh" control={control} defaultValue={singleFormData.cartonLgh || ''} render={({ field }) => <input className="box flex" placeholder='Enter carton length' {...field} />} />
                    <Controller name="cartonLghUnit" control={control} defaultValue={singleFormData.cartonLghUnit || ''} render={({ field }) =>
                        <select className="box flex"  {...field} >
                            <option value="">Select unit</option>
                            <option value="cm">CM</option>
                            <option value="m">M</option>
                            <option value="in">IN</option>
                        </select>
                    } />
                </div>
                {(errors.cartonLgh || errors.cartonLghUnit) &&
                    <div className="flex wh">
                        <div className="flex wh">
                            <div className='error'>{errors.cartonLgh?.message}</div>
                        </div>
                        <div className="flex wh">
                            <div className='error'>{errors.cartonLghUnit?.message}</div>
                        </div>
                    </div>
                }
                <div className="flex wh" style={{ gap: '20px' }}>
                    <Controller name="cartonHgt" control={control} defaultValue={singleFormData.cartonHgt || ''} render={({ field }) => <input className="box flex" placeholder='Enter carton height' {...field} />} />
                    <Controller name="cartonHgtUnit" control={control} defaultValue={singleFormData.cartonHgtUnit || ''} render={({ field }) =>
                        <select className="box flex" {...field} >
                            <option value="">Select unit</option>
                            <option value="cm">CM</option>
                            <option value="m">M</option>
                            <option value="in">IN</option>
                        </select>
                    } />
                </div>
                {(errors.cartonHgt || errors.cartonHgtUnit) &&
                    <div className="flex wh">
                        <div className="flex wh">
                            <div className='error'>{errors.cartonHgt?.message}</div>
                        </div>
                        <div className="flex wh">
                            <div className='error'>{errors.cartonHgtUnit?.message}</div>
                        </div>
                    </div>
                }
                <div className="flex wh" style={{ gap: '20px' }}>
                    <Controller name="cartonWdh" control={control} defaultValue={singleFormData.cartonWdh || ''} render={({ field }) => <input className="box flex" placeholder='Enter carton width' {...field} />} />
                    <Controller name="cartonWdhUnit" control={control} defaultValue={singleFormData.cartonWdhUnit || ''} render={({ field }) =>
                        <select className="box flex" {...field} >
                            <option value="">Select unit</option>
                            <option value="cm">CM</option>
                            <option value="m">M</option>
                            <option value="in">IN</option>
                        </select>
                    } />
                </div>
                {(errors.cartonWdh || errors.cartonWdhUnit) &&
                    <div className="flex wh">
                        <div className="flex wh">
                            <div className='error'>{errors.cartonWdh?.message}</div>
                        </div>
                        <div className="flex wh">
                            <div className='error'>{errors.cartonWdhUnit?.message}</div>
                        </div>
                    </div>
                }

                <div className="heading3">Product dimensions & weight</div>
                <div className="heading2">These attributes provide information about the product's dimensions and weight.</div>
                <div className="flex wh" style={{ gap: '20px' }}>
                    <Controller name="productWgt" control={control} defaultValue={singleFormData.productWgt || ''} render={({ field }) => <input className="box flex" placeholder='Enter product weight' {...field} />} />
                    <Controller name="productWgtUnit" control={control} defaultValue={singleFormData.productWgtUnit || ''} render={({ field }) =>
                        <select className="box flex"  {...field} >
                            <option value="">Select unit</option>
                            <option value="kg">KG</option>
                            <option value="g">G</option>
                            <option value="mg">MG</option>
                            <option value="lbs">LBS</option>
                        </select>
                    } />
                </div>
                {(errors.productWgt || errors.productWgtUnit) &&
                    <div className="flex wh">
                        <div className="flex wh">
                            <div className='error'>{errors.productWgt?.message}</div>
                        </div>
                        <div className="flex wh">
                            <div className='error'>{errors.productWgtUnit?.message}</div>
                        </div>
                    </div>
                }
                <div className="flex wh" style={{ gap: '20px' }}>
                    <Controller name="productLgh" control={control} defaultValue={singleFormData.productLgh || ''} render={({ field }) => <input className="box flex" placeholder='Enter product length' {...field} />} />
                    <Controller name="productHgt" control={control} defaultValue={singleFormData.productHgt || ''} render={({ field }) => <input className="box flex" placeholder='Enter product height' {...field} />} />
                </div>
                {(errors.productLgh || errors.productHgt) &&
                    <div className="flex wh">
                        <div className="flex wh">
                            <div className='error'>{errors.productLgh?.message}</div>
                        </div>
                        <div className="flex wh">
                            <div className='error'>{errors.productHgt?.message}</div>
                        </div>
                    </div>
                }
                <div className="flex wh" style={{ gap: '20px' }}>
                    <Controller name="productWdh" control={control} defaultValue={singleFormData.productWdh || ''} render={({ field }) => <input className="box flex" placeholder='Enter product width' {...field} />} />
                    <Controller name="DimensionUnit" control={control} defaultValue={singleFormData.DimensionUnit || ''} render={({ field }) => (
                        <select className="box flex" {...field}>
                            <option value="">Dimension unit</option>
                            <option value="cm">CM</option>
                            <option value="m">M</option>
                            <option value="in">IN</option>
                        </select>
                    )}
                    />
                </div>
                {(errors.productWdh || errors.DimensionUnit) &&
                    <div className="flex wh">
                        <div className="flex wh">
                            <div className='error'>{errors.productWdh?.message}</div>
                        </div>
                        <div className="flex wh">
                            <div className='error'>{errors.DimensionUnit?.message}</div>
                        </div>
                    </div>
                }


                <div className="heading3">Pricing</div>
                <Controller name="unitmeasure" control={control} defaultValue={singleFormData.unitmeasure || ''} render={({ field }) => (
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
                {errors.unitmeasure && <div className='error'>{errors.unitmeasure?.message}</div>}


                <div className="heading3">Product inventory</div>
                <div className="heading2">Enter the available quantity of your product</div>
                <Controller name="availableQuantity" control={control} defaultValue={singleFormData.availableQuantity || ''} render={({ field }) => <input className="box flex" placeholder='Enter available quantity' {...field} />} />
                {errors.availableQuantity && <div className='error'>{errors.availableQuantity?.message}</div>}
                <Controller name="minOrderQuant" control={control} defaultValue={singleFormData.minOrderQuant || ''} render={({ field }) => <input className="box flex" placeholder='Enter minimum order quantity' {...field} />} />
                {errors.minOrderQuant && <div className='error'>{errors.minOrderQuant?.message}</div>}


                <div className="heading3">Price list</div>
                <div className="heading2">Add pricing to your product. You can also create bulk pricing rules to offer price discounts based on quantity breaks.</div>

                <div className="flexcol wh">
                    <div className="pricelist">
                        <div className='pldiv bg-clr'><div className="heading3">Unit price</div></div>
                        <div className='pldiv bg-clr'><div className="heading3">Sale price (optional)</div></div>
                    </div>

                    <div className="pricelist">
                        <div className='pldiv'>
                            <div className="flex">
                                <div className="heading2">AED</div>
                                <Controller name="unitPrice" control={control} defaultValue={singleFormData.unitPrice || ''} render={({ field }) => <input placeholder='Enter unit price' {...field} />} />
                            </div>
                            {errors.unitPrice && <div className='error'>{errors.unitPrice?.message}</div>}
                        </div>
                        <div className='pldiv'>
                            <div className="flex">
                                <div className="heading2">AED</div>
                                <Controller name="salePrice" control={control} defaultValue={singleFormData.salePrice || ''} render={({ field }) => <input placeholder='Enter sale price' {...field} />} />
                                {errors.salePrice && <div className='error'>{errors.salePrice?.message}</div>}
                            </div>
                        </div>
                    </div>
                </div>



                <div className="heading3">Shipping details</div>
                <div className="flex wh" style={{ gap: '20px' }}>
                    <Controller name="readytoship" control={control} defaultValue={singleFormData.readytoship || ''} render={({ field }) => (
                        <select className="box flex" {...field}>
                            <option value="">Ready to ship?</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    )}
                    />
                    <Controller name="buynow" control={control} defaultValue={singleFormData.buynow || ''} render={({ field }) => (
                        <select className="box flex" {...field}>
                            <option value="">Can it be bought using checkout?</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    )}
                    />
                </div>


                <div className="flex wh" style={{ gap: '20px' }}>
                    <Controller name="Availability" control={control} defaultValue={singleFormData.Availability || ''} render={({ field }) => (
                        <select className="box flex"  {...field}>
                            <option value="">Availability</option>
                            <option value="instock">In stock</option>
                            <option value="outofstock">Out of stock</option>
                        </select>
                    )}
                    />
                    <Controller name="PrivateLabel" control={control} defaultValue={singleFormData.PrivateLabel || ''} render={({ field }) => (
                        <select className="box flex"  {...field}>
                            <option value="">Offer Private Label?</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    )}
                    />
                </div>

                <div className="flex wh" style={{ gap: '20px' }}>
                    <Controller name="origin" defaultValue={singleFormData.origin || ''} value={selectedOrigin} onChange={originSelectChange} control={control} render={({ field }) => (
                        <select className="box flex"  {...field} >
                            <option value="">Country of Origin</option>
                            {countries.map((country) => (
                                <option key={uuidv4()} value={country}>{country}</option>
                            ))}
                        </select>
                    )}
                    />
                    <Controller name="StockLocation" defaultValue={singleFormData.StockLocation || ''} value={selectedLocation} onChange={locationSelectChange} control={control} render={({ field }) => (
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
                            <div className='error'>{errors.origin?.message}</div>
                        </div>
                        <div className="flex wh">
                            <div className='error'>{errors.StockLocation?.message}</div>
                        </div>
                    </div>
                }

                <div className="heading3">Additional details</div>
                <Controller name="ean" control={control} defaultValue={singleFormData.ean || ''} render={({ field }) => <input className="box flex" placeholder='Enter EAN (European article number)' {...field} />} />
                <Controller name="dgrGoods" control={control} defaultValue={singleFormData.dgrGoods || ''} render={({ field }) => (
                    <select className="box flex" {...field}>
                        <option value="">Dangerous goods</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                )}
                />
                {errors.dgrGoods && <div className='error'>{errors.dgrGoods?.message}</div>}
                <Controller name="incoterm" control={control} defaultValue={singleFormData.incoterm || ''} render={({ field }) =>
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
                <Controller name="hsnCode" control={control} defaultValue={singleFormData.hsnCode || ''} render={({ field }) => <input className="box flex" placeholder='Enter HSN code' {...field} />} />

                <Controller name="temperature" control={control} defaultValue={singleFormData.temperature || ''} render={({ field }) => (
                    <select className="box flex"  {...field}>
                        <option value="">Storage temperature</option>
                        <option value="dry">Dry (min 28C, max NA)</option>
                        <option value="chilled">Chilled (min 2C, max 8C)</option>
                        <option value="frozen">Frozen (min -5C, max -5C)</option>
                        <option value="roomtemperature">Room temperature (min 15C, max 25C)</option>
                    </select>
                )}
                />
                {errors.temperature && <div className='error'>{errors.temperature?.message}</div>}


                {selectedSupOption === "FoodAndBeverages" && (
                    <Controller name="shelflife" control={control} defaultValue={singleFormData.shelflife || ''} render={({ field }) => <input className="box flex" placeholder='Enter shelf life (days)' {...field} />} />
                )}
                <div className="flex wh" style={{ gap: '20px', justifyContent: 'start' }}>
                    <button className='btn box2 flex' onClick={handleCancel} style={{ width: 'fit-content', backgroundColor: 'var(--CodeTwo)' }}><div className="heading2">Cancel</div></button>
                    <button className='btn box2 flex' onClick={uploadImages} type='submit' style={{ width: 'fit-content', backgroundColor: 'var(--CodeOne)' }}><div className="heading2">Update</div></button>
                </div>
            </form>
        </div>
    )
};

export default EditSingle