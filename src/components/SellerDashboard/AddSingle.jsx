import React, { Fragment, useEffect, useState, useRef } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addSingleSchema } from '../Schemas/validationSchema';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../Redux/addProductSlice';
import { useNavigate } from 'react-router-dom';
import { supOptions, subOptions, miniSubOptions, microSubOptions } from '../Schemas/cate';
import { Helmet } from 'react-helmet-async';

const schema = yupResolver(addSingleSchema);

const AddSingle = () => {

    const user = useSelector((state) => state.auth.user);

    //drag and drop
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [images, setImages] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [fileInputValue, setFileInputValue] = useState('');

    const selectFiles = () => {
        document.getElementById('file-input').click();
    };

    // const onFileSelect = (event) => {
    //     const files = event.target.files;
    //     if (files.length === 0) return;
    //     const totalImages = images.length;
    //     const remainingSlots = 5 - totalImages;
    //     if (remainingSlots <= 0) {
    //         alert("You've already selected the maximum allowed images (5).");
    //         return;
    //     }
    //     for (let i = 0; i < Math.min(remainingSlots, files.length); i++) {
    //         const file = files[i];
    //         if (file.type.split('/')[0] === 'image') {
    //             const reader = new FileReader();
    //             reader.onload = (e) => {
    //                 setImages((prevImages) => [
    //                     ...prevImages,
    //                     {
    //                         name: file.name,
    //                         url: e.target.result,
    //                         size: file.size,
    //                     },
    //                 ]);
    //             };
    //             reader.readAsDataURL(file);
    //         }
    //     }
    //     setFileInputValue('');
    // };
    
    const onFileSelect = (event) => {
        const files = event.target.files;
        if (files.length === 0) return;
    
        const totalImages = images.length;
        const remainingSlots = 5 - totalImages;
    
        if (files.length > remainingSlots) {
            alert("You can only select a maximum of 5 images. The excess files will be ignored.");
            // Select only the first 5 files
            const selectedFiles = Array.from(files).slice(0, remainingSlots);
            setImages([...images, ...selectedFiles]);
        } else {
            setImages([...images, ...files]);
        }
    
        setFileInputValue(''); // Reset file input value
    };
    const deleteImage = (index) => {
        setImages((prevImages) => {
            return prevImages.filter((_, i) => i !== index);
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


    //select country form api
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


    //categoryyyyy
    const [selectedSupOption, setSelectedSupOption] = useState('');
    const [selectedSubOption, setSelectedSubOption] = useState('');
    const [selectedMiniSubOption, setSelectedMiniSubOption] = useState('');
    const [selectedMicroSubOption, setSelectedMicroSubOption] = useState('');
    const [isSecondSelectEnabled, setIsSecondSelectEnabled] = useState(false);
    const [isThirdSelectEnabled, setIsThirdSelectEnabled] = useState(false);
    const [isFourthSelectEnabled, setIsFourthSelectEnabled] = useState(false);
    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setIsSubmitEnabled(selectedSupOption && selectedSubOption && selectedMiniSubOption && selectedMicroSubOption);
    }, [selectedSupOption, selectedSubOption, selectedMiniSubOption, selectedMicroSubOption]);

    const handleSupOptionChange = (event) => {
        const selectedOption = event.target.value;
        setSelectedSupOption(selectedOption);
        setIsSecondSelectEnabled(true);
        setIsThirdSelectEnabled(false);
        setIsFourthSelectEnabled(false);
        setSelectedSubOption('');
        setSelectedMiniSubOption('');
        setSelectedMicroSubOption('');
    };
    const handleSubOptionChange = (event) => {
        const selectedOption = event.target.value;
        setSelectedSubOption(selectedOption);
        setIsThirdSelectEnabled(true);
        setIsFourthSelectEnabled(false);
        setSelectedMiniSubOption('');
        setSelectedMicroSubOption('');
    };
    const handleMiniSubOptionChange = (event) => {
        const selectedOption = event.target.value;
        setSelectedMiniSubOption(selectedOption);
        setIsFourthSelectEnabled(true);
        setSelectedMicroSubOption('');
    };
    const handleMicroSubOptionChange = (event) => {
        const selectedOption = event.target.value;
        setSelectedMicroSubOption(selectedOption);
    };
    const getMarginValue = () => {
        switch (selectedSupOption) {

            case "ConsumerElectronics":
                return 2.5;
            case "FashionAndAccessories":
                return 10;
            case "Automotive":
                return 5;
            case "FoodAndBeverages":
                return 2;
            case "BabyCenter":
                return 5;
            case "BeautyAndFragrances":
                return 2.5;
            case "HomeGardenAndFurniture":
                return 5;
            case "MachineryAndEquipment":
                return 5;
            case "OfficeAndStationery":
                return 3;
            case "PersonalCare":
                return 3;
            case "PetAndAnimalCare":
                return 5;
            case "SportsAndFitness":
                return 5;
            case "Toys":
                return 5;
            case "ToolsAndHomeImprovement":
                return 5;

            default:
                return 0;
        }
    };
    const commission = getMarginValue();
    const categoryPath = `${selectedSupOption}/${selectedSubOption}/${selectedMiniSubOption}/${selectedMicroSubOption}`;


    //form validation
    const { handleSubmit, control, formState: { errors } } = useForm({ resolver: schema });
    const onSubmit = async (data) => {
        try {
            const currentTime = new Date();
            const productImage = images.map(image => ({
                imageUrl: image.url,
                size: image.size || 0,
                name: image.name,
                uploadDate: currentTime.toLocaleString()
            }));
            const productData = {
                ...data,
                categoryPath,
            };
            const formData = new FormData();
            formData.append('productData', JSON.stringify(productData));
            // productImage.forEach((image, index) => {
            //     formData.append(`productImage${index + 1}`, JSON.stringify(image));
            // });
            for (let i = 0; i < images.length; i++) {
                formData.append("productImage", images[i]);
            }

            const response = await dispatch(addProduct(formData));
            if (response.type === 'product/addProduct/fulfilled') {
                alert('Product added successfully!');
            } else {
                console.log('Error in response:', response);
            }

        } catch (error) {
            console.log(error);
        }
    };

    const [singleFormData, setSingleFormData] = useState({});
    const handleChange = (e) => {
        setSingleFormData({ ...singleFormData, [e.target.name]: e.target.value });
    };


    //focus
    const scrollRef = useRef(null);
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.focus();
        }
    }, []);

    return (
        <div className='flexcol seller-home-cont' style={{ gap: '20px' }} tabIndex={0} ref={scrollRef} >
            <Helmet>
                <title>Add Single Product</title>
            </Helmet>
            <div className="heading">Add New Products</div>
            <div className="descrip2">Fill out the form below to add a new product to your product list</div>

            <form className="productlist2" onSubmit={handleSubmit(onSubmit)}>
                <div className="heading3">Basic information</div>

                <div className="flex-start wh" style={{ gap: '10px' }}>
                    <select onChange={handleSupOptionChange} className="box flex">
                        <option value="">Select category</option>
                        {supOptions.map((option, index) => (
                            <option key={index} value={option}>{option.length > 15 ? `${option.substring(0, 15)}...` : option}</option>
                        ))}
                    </select>
                    <select onChange={handleSubOptionChange} className="box flex">
                        <option value="">Select sub category</option>
                        {subOptions[selectedSupOption] && subOptions[selectedSupOption].map((option, index) => (
                            <option key={index} value={option}>{option.length > 15 ? `${option.substring(0, 15)}...` : option}</option>
                        ))}
                    </select>
                    <select onChange={handleMiniSubOptionChange} className="box flex">
                        <option value="">Select an option</option>
                        {miniSubOptions[selectedSubOption] && miniSubOptions[selectedSubOption].map((option, index) => (
                            <option key={index} value={option}>{option.length > 15 ? `${option.substring(0, 15)}...` : option}</option>
                        ))}
                    </select>
                    <select onChange={handleMicroSubOptionChange} className="box flex">
                        <option value="">Select sub option</option>
                        {microSubOptions[selectedMiniSubOption] && microSubOptions[selectedMiniSubOption].map((option, index) => (
                            <option key={index} value={option}>{option.length > 15 ? `${option.substring(0, 15)}...` : option}</option>
                        ))}
                    </select>
                </div>
                <div className="flex-start wh" style={{ gap: '10px' }}>
                    <div className="greenerror">{errorMessage ? errorMessage : isSubmitEnabled ? `Selected path: ${categoryPath}` : 'Please make all selections'}</div>
                    {selectedSupOption && (<div className='greenerror'>Margin value: {commission}%</div>)}
                </div>

                <Controller name="bulletPoints" control={control} defaultValue="" render={({ field }) => <input value={singleFormData.bulletPoints || ''} onChange={handleChange} className="box flex" placeholder='Enter bullet points (separated by slash "/")...' {...field} />} />
                {errors.bulletPoints && <div className='error'>{errors.bulletPoints?.message}</div>}

                <Controller name="productName" control={control} defaultValue="" render={({ field }) => <input value={singleFormData.productName || ''} onChange={handleChange} className="box flex" placeholder='Enter product name' {...field} />} />
                {errors.productName && <div className='error'>{errors.productName?.message}</div>}
                <Controller name="brandName" control={control} defaultValue="" render={({ field }) => <input value={singleFormData.brandName || ''} onChange={handleChange} className="box flex" placeholder='Enter brand name' {...field} />} />
                {errors.brandName && <div className='error'>{errors.brandName?.message}</div>}
                <Controller name="keyWords" control={control} defaultValue="" render={({ field }) => <input value={singleFormData.keyWords || ''} onChange={handleChange} className="box flex" placeholder="Enter keywords (separated by comma)..." {...field} />} />
                {errors.keyWords && <div className='error'>{errors.keyWords?.message}</div>}

                <div className="heading3">Variant information</div>
                <div className="flex-start wh" style={{ gap: '10px' }}>
                    <Controller name="variantColor" control={control} defaultValue="" render={({ field }) => <input value={singleFormData.variantColor || ''} onChange={handleChange} className="box flex" placeholder='Enter product color' {...field} />} />
                    <Controller name="variantSize" control={control} defaultValue="" render={({ field }) => <input value={singleFormData.variantSize || ''} onChange={handleChange} className="box flex" placeholder='Enter product size' {...field} />} />
                </div>

                <div className="heading3">Description</div>
                <Controller name="addInfo" control={control} defaultValue="" render={({ field }) => <textarea value={singleFormData.addInfo || ''} onChange={handleChange} className="box flex" rows={10} placeholder="Enter description..." {...field}></textarea>} />


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
                            style={{ display: 'none' }} 
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
                <Controller name="barcode" control={control} defaultValue="" render={({ field }) => (
                    <select className="box flex" value={singleFormData.barcode || ''} onChange={handleChange} {...field}>
                        <option value="">Select barcode type</option>
                        <option value="EAN">EAN</option>
                        <option value="GTIN">GTIN</option>
                        <option value="UPC">UPC</option>
                        <option value="ASIN">ASIN</option>
                        <option value="null">Product does not have barcode number</option>
                    </select>
                )}
                />
                {errors.barcode && <div className='error'>{errors.barcode.message}</div>}
                <Controller name="barcodeNum" control={control} defaultValue="" render={({ field }) => <input value={singleFormData.barcodeNum || ''} onChange={handleChange} type='text' className="box flex" placeholder='Enter barcode number' {...field} />} />
                {errors.barcodeNum && <div className='error'>{errors.barcodeNum?.message}</div>}
                <Controller name="sku" control={control} defaultValue="" render={({ field }) => <input value={singleFormData.sku || ''} onChange={handleChange} className="box flex" placeholder='Enter SKU' {...field} />} />
                {errors.sku && <div className='error'>{errors.sku?.message}</div>}


                <div className="heading3">Packaging</div>
                <Controller name="unitsPerCarton" control={control} defaultValue="" render={({ field }) => <input value={singleFormData.unitsPerCarton || ''} onChange={handleChange} className="box flex" placeholder='Enter units per carton' {...field} />} />
                {errors.unitsPerCarton && <div className='error'>{errors.unitsPerCarton?.message}</div>}
                <div className="flex wh" style={{ gap: '20px' }}>
                    <Controller name="size" control={control} defaultValue="" render={({ field }) => <input value={singleFormData.size || ''} onChange={handleChange} className="box flex" placeholder='Enter size' {...field} />} />
                    <Controller name="sizeUnit" control={control} defaultValue="" render={({ field }) => (
                        <select className="box flex" value={singleFormData.sizeUnit || ''} onChange={handleChange} {...field}>
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
                    <Controller name="avgLeadTime" control={control} defaultValue="" render={({ field }) => <input value={singleFormData.avgLeadTime || ''} onChange={handleChange} className="box flex" placeholder='Enter average lead time (days)' {...field} />} />
                    <Controller name="transportationMode" control={control} defaultValue="" render={({ field }) => (
                        <select className="box flex" value={singleFormData.transportationMode || ''} onChange={handleChange}  {...field}>
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
                            <div className='error'>{errors.avgLeadTime?.message}</div>
                        </div>
                        <div className="flex wh">
                            <div className='error'>{errors.transportationMode?.message}</div>
                        </div>
                    </div>
                }


                <div className="heading3">Carton dimensions & weight</div>
                <div className="heading2">Enter the dimensions and weight of the carton to help calculate shipping rate. These measurements are for the product's shipping container.</div>
                <div className="flex wh" style={{ gap: '20px' }}>
                    <Controller name="cartonWgt" control={control} defaultValue="" render={({ field }) => <input value={singleFormData.cartonWgt || ''} onChange={handleChange} type='number' className="box flex" placeholder='Enter carton weight' {...field} />} />
                    <Controller name="cartonWgtUnit" control={control} defaultValue="" render={({ field }) =>
                        <select className="box flex" value={singleFormData.cartonWgtUnit || ''} onChange={handleChange} {...field} >
                            <option value="">Select unit</option>
                            <option value="kg">KG</option>
                            <option value="g">G</option>
                            <option value="mg">MG</option>
                            <option value="lbs">LBS</option>
                        </select>
                    } />
                </div>
                <div className="flex wh" style={{ gap: '20px' }}>
                    <Controller name="cartonLgh" control={control} defaultValue="" render={({ field }) => <input value={singleFormData.cartonLgh || ''} onChange={handleChange} type='number' className="box flex" placeholder='Enter carton length' {...field} />} />
                    <Controller name="cartonLghUnit" control={control} defaultValue="" render={({ field }) =>
                        <select className="box flex" value={singleFormData.cartonLghUnit || ''} onChange={handleChange} {...field} >
                            <option value="">Select unit</option>
                            <option value="cm">CM</option>
                            <option value="m">M</option>
                            <option value="in">IN</option>
                        </select>
                    } />
                </div>
                <div className="flex wh" style={{ gap: '20px' }}>
                    <Controller name="cartonHgt" control={control} defaultValue="" render={({ field }) => <input value={singleFormData.cartonHgt || ''} onChange={handleChange} type='number' className="box flex" placeholder='Enter carton height' {...field} />} />
                    <Controller name="cartonHgtUnit" control={control} defaultValue="" render={({ field }) =>
                        <select className="box flex" value={singleFormData.cartonHgtUnit || ''} onChange={handleChange} {...field} >
                            <option value="">Select unit</option>
                            <option value="cm">CM</option>
                            <option value="m">M</option>
                            <option value="in">IN</option>
                        </select>
                    } />
                </div>
                <div className="flex wh" style={{ gap: '20px' }}>
                    <Controller name="cartonWdh" control={control} defaultValue="" render={({ field }) => <input value={singleFormData.cartonWdh || ''} onChange={handleChange} type='number' className="box flex" placeholder='Enter carton width' {...field} />} />
                    <Controller name="cartonWdhUnit" control={control} defaultValue="" render={({ field }) =>
                        <select className="box flex" value={singleFormData.cartonWdhUnit || ''} onChange={handleChange} {...field} >
                            <option value="">Select unit</option>
                            <option value="cm">CM</option>
                            <option value="m">M</option>
                            <option value="in">IN</option>
                        </select>
                    } />
                </div>
               



                <div className="heading3">Product dimensions & weight</div>
                <div className="heading2">These attributes provide information about the product's dimensions and weight.</div>
                <div className="flex wh" style={{ gap: '20px' }}>
                    <Controller name="productWgt" control={control} defaultValue="" render={({ field }) => <input value={singleFormData.productWgt || ''} onChange={handleChange} type='number' className="box flex" placeholder='Enter product weight' {...field} />} />
                    <Controller name="productWgtUnit" control={control} defaultValue="" render={({ field }) =>
                        <select className="box flex" value={singleFormData.productWgtUnit || ''} onChange={handleChange}  {...field} >
                            <option value="">Select unit</option>
                            <option value="kg">KG</option>
                            <option value="g">G</option>
                            <option value="mg">MG</option>
                            <option value="lbs">LBS</option>
                        </select>
                    } />
                </div>
                <div className="flex wh" style={{ gap: '20px' }}>
                    <Controller name="productLgh" control={control} defaultValue="" render={({ field }) => <input value={singleFormData.productLgh || ''} onChange={handleChange} type='number' className="box flex" placeholder='Enter product length' {...field} />} />
                    <Controller name="productHgt" control={control} defaultValue="" render={({ field }) => <input value={singleFormData.productHgt || ''} onChange={handleChange} type='number' className="box flex" placeholder='Enter product height' {...field} />} />
                </div>
                <div className="flex wh" style={{ gap: '20px' }}>
                    <Controller name="productWdh" control={control} defaultValue="" render={({ field }) => <input value={singleFormData.productWdh || ''} onChange={handleChange} type='number' className="box flex" placeholder='Enter product width' {...field} />} />
                    <Controller name="DimensionUnit" control={control} defaultValue="" render={({ field }) => (
                        <select className="box flex" value={singleFormData.DimensionUnit || ''} onChange={handleChange} {...field}>
                            <option value="">Dimension unit</option>
                            <option value="cm">CM</option>
                            <option value="m">M</option>
                            <option value="in">IN</option>
                        </select>
                    )}
                    />
                </div>


                <div className="heading3">Pricing</div>
                <Controller name="unitmeasure" control={control} defaultValue="" render={({ field }) => (
                    <select className="box flex" value={singleFormData.unitmeasure || ''} onChange={handleChange} {...field}>
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
                <Controller name="availableQuantity" control={control} defaultValue="" render={({ field }) => <input value={singleFormData.availableQuantity || ''} onChange={handleChange} className="box flex" placeholder='Enter available quantity' {...field} />} />
                {errors.availableQuantity && <div className='error'>{errors.availableQuantity?.message}</div>}
                <Controller name="minOrderQuant" control={control} defaultValue="" render={({ field }) => <input value={singleFormData.minOrderQuant || ''} onChange={handleChange} className="box flex" placeholder='Enter minimum order quantity' {...field} />} />
                {errors.minOrderQuant && <div className='error'>{errors.minOrderQuant?.message}</div>}

                <div className="heading3">Price list</div>
                <div className="flexcol wh">
                    <div className="pricelist">
                        <div className='pldiv bg-clr'><div className="heading3">Unit price</div></div>
                        <div className='pldiv bg-clr'><div className="heading3">Sale price</div></div>
                    </div>

                    <div className="pricelist">
                        <div className='pldiv'>
                            <div className="flex">
                                <div className="heading2">{user.currency}</div>
                                <Controller name="unitPrice" control={control} defaultValue="" render={({ field }) => <input value={singleFormData.unitPrice || ''} onChange={handleChange} placeholder='Enter unit price' {...field} />} />
                                {errors.unitPrice && <div className='error'>{errors.unitPrice?.message}</div>}
                            </div>
                        </div>
                        <div className='pldiv'>
                            <div className="flex">
                                <div className="heading2">{user.currency}</div>
                                <Controller name="sellPrice" control={control} defaultValue="" render={({ field }) => <input value={singleFormData.sellPrice || ''} onChange={handleChange} placeholder='Enter sale price' {...field} />} />
                                {errors.sellPrice && <div className='error'>{errors.sellPrice?.message}</div>}
                            </div>
                        </div>
                    </div>
                </div>


                <div className="heading3">Shipping details</div>
                <div className="flex wh" style={{ gap: '20px' }}>
                    <Controller name="readytoship" control={control} defaultValue="" render={({ field }) => (
                        <select className="box flex" value={singleFormData.readytoship || ''} onChange={handleChange} {...field}>
                            <option value="">Ready to ship?</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    )}
                    />
                    <Controller name="buynow" control={control} defaultValue="" render={({ field }) => (
                        <select className="box flex" value={singleFormData.buynow || ''} onChange={handleChange} {...field}>
                            <option value="">Can it be bought using checkout?</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    )}
                    />
                </div>

                <div className="flex wh" style={{ gap: '20px' }}>
                    <Controller name="availability" control={control} defaultValue="" render={({ field }) => (
                        <select className="box flex" value={singleFormData.availability || ''} onChange={handleChange} {...field}>
                            <option value="">Availability</option>
                            <option value="instock">In stock</option>
                            <option value="outofstock">Out of stock</option>
                        </select>
                    )}
                    />
                    <Controller name="PrivateLabel" control={control} defaultValue="" render={({ field }) => (
                        <select className="box flex" value={singleFormData.PrivateLabel || ''} onChange={handleChange} {...field}>
                            <option value="">Offer Private Label?</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    )}
                    />
                </div>

                <div className="flex wh" style={{ gap: '20px' }}>
                    <Controller name="origin" value={selectedOrigin} onChange={originSelectChange} control={control} defaultValue="" render={({ field }) => (
                        <select className="box flex" value={singleFormData.origin || ''} onChange={handleChange} {...field} >
                            <option value="">Country of Origin</option>
                            {countries.map((country) => (
                                <option key={uuidv4()} value={country}>{country}</option>
                            ))}
                        </select>
                    )}
                    />
                    <Controller name="StockLocation" value={selectedLocation} onChange={locationSelectChange} control={control} defaultValue="" render={({ field }) => (
                        <select className="box flex" value={singleFormData.StockLocation || ''} onChange={handleChange} {...field} >
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
                <Controller name="ean" control={control} defaultValue="" render={({ field }) => <input value={singleFormData.ean || ''} onChange={handleChange} className="box flex" placeholder='Enter EAN (European article number)' {...field} />} />
                <Controller name="dgrGoods" control={control} defaultValue="" render={({ field }) => (
                    <select className="box flex" value={singleFormData.dgrGoods || ''} onChange={handleChange} {...field}>
                        <option value="">Dangerous goods</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                )}
                />
                {errors.dgrGoods && <div className='error'>{errors.dgrGoods?.message}</div>}
                <Controller name="incoterm" control={control} defaultValue="" render={({ field }) =>
                    <select className="box flex" value={singleFormData.incoterm || ''} onChange={handleChange} {...field}>
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

                <Controller name="hsnCode" control={control} defaultValue="" render={({ field }) => <input value={singleFormData.hsnCode || ''} onChange={handleChange} className="box flex" placeholder='Enter HSN code' {...field} />} />

                <Controller name="temperature" control={control} defaultValue="" render={({ field }) => (
                    <select className="box flex" value={singleFormData.temperature || ''} onChange={handleChange}  {...field}>
                        <option value="">Storage temperature</option>
                        <option value="dry">Dry (min 28C, max NA)</option>
                        <option value="chilled">Chilled (min 2C, max 8C)</option>
                        <option value="frozen">Frozen (min -5C, max -5C)</option>
                        <option value="roomtemperature">Room temperature (min 15C, max 25C)</option>
                    </select>
                )}
                />

                <Controller name="imodelNum" control={control} defaultValue="" render={({ field }) => <input value={singleFormData.imodelNum || ''} onChange={handleChange} className="box flex" placeholder='Enter item model number' {...field} />} />

                <Controller name="colors" control={control} defaultValue="" render={({ field }) => (
                    <select className="box flex" value={singleFormData.colors || ''} onChange={handleChange}  {...field}>
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
                    <select className="box flex" value={singleFormData.gender || ''} onChange={handleChange}  {...field}>
                        <option value="">Select gender</option>
                        <option value="boys">Boys</option>
                        <option value="girls">Girls</option>
                        <option value="unisex">Unisex</option>
                    </select>
                )}
                />






                {selectedSupOption === "FoodAndBeverages" && (
                    <Controller name="shelflife" control={control} defaultValue="" render={({ field }) => <input value={singleFormData.shelflife || ''} onChange={handleChange} className="box flex" placeholder='Enter shelf life (days)' {...field} />} />
                )}
                {(selectedSupOption === "FoodAndBeverages" || selectedSupOption === "BeautyAndFragrances") && (
                    <Controller name="ingredients" control={control} defaultValue="" render={({ field }) => <input value={singleFormData.ingredients || ''} onChange={handleChange} className="box flex" placeholder='Enter ingredients' {...field} />} />
                )}
                {selectedSupOption === "Automotive" && (
                    <Controller name="packType" control={control} defaultValue="" render={({ field }) => <input value={singleFormData.packType || ''} onChange={handleChange} className="box flex" placeholder='Enter packaging type' {...field} />} />
                )}
                {(selectedSupOption === "BabyCenter" || selectedSupOption === "BeautyAndFragrances" || selectedSupOption === "OfficeAndStationery" || selectedSupOption === "ToolsAndHomeImprovement") && (
                    <Controller name="instructions" control={control} defaultValue="" render={({ field }) => <input value={singleFormData.instructions || ''} onChange={handleChange} className="box flex" placeholder='Enter instructions/safety warnings' {...field} />} />
                )}
                {
                    (selectedSupOption === "BabyCenter" || selectedSupOption === "FashionAndAccessories" || selectedSupOption === "HomeGardenAndFurniture" || selectedSupOption === "OfficeAndStationery" || selectedSupOption === "SportsAndFitness" || selectedSupOption === "ToolsAndHomeImprovement") && (
                        <Controller name="material" control={control} defaultValue="" render={({ field }) => <input value={singleFormData.material || ''} onChange={handleChange} className="box flex" placeholder='Enter material' {...field} />} />
                    )
                }
                {(selectedSupOption === "ConsumerElectronics" || selectedSupOption === "MachineryAndEquipment") && (
                    <div className="fragment">
                        <Controller name="portType" control={control} defaultValue="" render={({ field }) => <input value={singleFormData.portType || ''} onChange={handleChange} className="box flex" placeholder='Enter port type' {...field} />} />
                        <Controller name="connectvityType" control={control} defaultValue="" render={({ field }) => <input value={singleFormData.connectvityType || ''} onChange={handleChange} className="box flex" placeholder='Enter connectvity type' {...field} />} />
                        <Controller name="avgBatteryLife" control={control} defaultValue="" render={({ field }) => <input value={singleFormData.avgBatteryLife || ''} onChange={handleChange} className="box flex" type='number' placeholder='Enter average battery life (In hours)' {...field} />} />
                        <Controller name="compatibility" control={control} defaultValue="" render={({ field }) => <input value={singleFormData.compatibility || ''} onChange={handleChange} className="box flex" placeholder='Enter compatibility' {...field} />} />
                        <Controller name="memoryStorage" control={control} defaultValue="" render={({ field }) => <input value={singleFormData.memoryStorage || ''} onChange={handleChange} className="box flex" placeholder='Enter memory storage' {...field} />} />
                        <Controller name="version" control={control} defaultValue="" render={({ field }) => <input value={singleFormData.version || ''} onChange={handleChange} className="box flex" placeholder='Enter version' {...field} />} />
                        <Controller name="opSystem" control={control} defaultValue="" render={({ field }) => <input value={singleFormData.opSystem || ''} onChange={handleChange} className="box flex" placeholder='Enter operating system' {...field} />} />
                        <Controller name="screenSize" control={control} defaultValue="" render={({ field }) => <input value={singleFormData.screenSize || ''} onChange={handleChange} className="box flex" placeholder='Enter screen size' {...field} />} />
                        <Controller name="ram" control={control} defaultValue="" render={({ field }) => <input value={singleFormData.ram || ''} onChange={handleChange} className="box flex" placeholder='Enter RAM' {...field} />} />
                        <Controller name="specifications" control={control} defaultValue="" render={({ field }) => <input value={singleFormData.specifications || ''} onChange={handleChange} className="box flex" placeholder='Enter additional specifications' {...field} />} />
                    </div>
                )}
                {selectedSupOption === "FashionAndAccessories" && (
                    <div className="fragment">
                        <Controller name="lensType" control={control} defaultValue="" render={({ field }) => (
                            <select className="box flex" value={singleFormData.lensType || ''} onChange={handleChange}  {...field}>
                                <option value="">Select lens type</option>
                                <option value="polarized">Polarized</option>
                                <option value="nonPolarized">Non-polarized</option>
                            </select>
                        )}
                        />
                        <Controller name="fitSize" control={control} defaultValue="" render={({ field }) => (
                            <select className="box flex" value={singleFormData.fitSize || ''} onChange={handleChange}  {...field}>
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
                            <select className="box flex" value={singleFormData.form || ''} onChange={handleChange}  {...field}>
                                <option value="">Select form</option>
                                <option value="liquid">Liquid</option>
                                <option value="powder">Powder</option>
                                <option value="spray">Spray</option>
                                <option value="solid">Solid</option>
                            </select>
                        )}
                        />
                        <Controller name="skinType" control={control} defaultValue="" render={({ field }) => (
                            <select className="box flex" value={singleFormData.skinType || ''} onChange={handleChange}  {...field}>
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
                        <Controller name="voltage" control={control} defaultValue="" render={({ field }) => <input value={singleFormData.voltage || ''} onChange={handleChange} type='number' className="box flex" placeholder='Enter voltage (in volts)' {...field} />} />
                        <Controller name="power" control={control} defaultValue="" render={({ field }) => <input value={singleFormData.power || ''} onChange={handleChange} type='number' className="box flex" placeholder='Enter power (in kilowatts kW)' {...field} />} />
                        <Controller name="powerPlugType" control={control} defaultValue="" render={({ field }) => (
                            <select className="box flex" value={singleFormData.powerPlugType || ''} onChange={handleChange}  {...field}>
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
                            <select className="box flex" value={singleFormData.condition || ''} onChange={handleChange}  {...field}>
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
                    <Controller name="pattern" control={control} defaultValue="" render={({ field }) => <input value={singleFormData.pattern || ''} onChange={handleChange} className="box flex" placeholder='Enter pattern' {...field} />} />
                )}
                {selectedSupOption === "PetAndAnimalCare" && (
                    <div className="fragment">
                        <Controller name="flavor" control={control} defaultValue="" render={({ field }) => <input value={singleFormData.flavor || ''} onChange={handleChange} className="box flex" placeholder='Enter flavor' {...field} />} />
                        <Controller name="petSize" control={control} defaultValue="" render={({ field }) => (
                            <select className="box flex" value={singleFormData.petSize || ''} onChange={handleChange}  {...field}>
                                <option value="">Select pet size</option>
                                <option value="small">Small</option>
                                <option value="medium">Medium</option>
                                <option value="large">Large</option>
                                <option value="giant">Giant</option>
                            </select>
                        )}
                        />
                        <Controller name="ageRange" control={control} defaultValue="" render={({ field }) => (
                            <select className="box flex" value={singleFormData.ageRange || ''} onChange={handleChange}  {...field}>
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
                        <select className="box flex" value={singleFormData.powerSource || ''} onChange={handleChange}  {...field}>
                            <option value="">Select age range</option>
                            <option value="corded">Corded</option>
                            <option value="cordless">Cordless</option>
                            <option value="batteryManual">Battery/Manual</option>
                        </select>
                    )}
                    />
                )}


                <div className="flex wh" style={{ gap: '20px', justifyContent: 'start' }}>
                    <button className='btn box2 flex' style={{ width: 'fit-content', backgroundColor: 'var(--CodeTwo)' }}><div className="heading2">Save Draft</div></button>
                    <button className='btn box2 flex' onClick={uploadImages} disabled={!isSubmitEnabled} type='submit' style={{ width: 'fit-content', backgroundColor: 'var(--CodeOne)' }}><div className="heading2">Send for Review</div></button>
                </div>
            </form>
        </div>
    )
};

export default AddSingle