import React, { Fragment, useState } from 'react';
import banner from '../../assets/banner.jpg';
import './Guidelines.css';
import { v4 as uuidv4 } from 'uuid';
import { Helmet } from 'react-helmet-async';

const Guidelines = () => {


    const [activeIndex, setActiveIndex] = useState(null);
    const toggleGuideAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };


    const gpl = [
        {
            id: uuidv4(),
            title: 'a. General overview',
            panel: (<div>
                <li className='heading2 headMargin'>For all product content requests, contact content.support@ulink.com.</li>
                <li className='heading2 headMargin'>Avoid repetition in your content in order to ensure that your products rank higher when people do online searching.</li>
                <li className='heading2 headMargin'>Provide as many relevant details as possible to help the customer make the decision without further research about the product.</li>
            </div>),
        },
        {
            id: uuidv4(),
            title: 'b. Title structure',
            panel: (<div>
                <li className='heading2 headMargin'>Title structure: ([Brand], [Model name], [model number], [other feature], [item type], [size], [color], [quantity]).</li>
                <li className='heading2 headMargin'>  Example: Graco (brand), Maxi (Model name), GTB538 (Model number), lightweight (other features) car seat (item type) - 1-12 years (size), navy blue (color). California Garden (brand) Canned, Ready To Eat (other features) Chickpeas (item type) 400g (size) Pack of 24 (quantity).</li>
                <li className='heading2 headMargin'>Provide a short, descriptive title that will help customers identify the key features. Keep the title less than 200 characters long.</li>
                <li className='heading2 headMargin'>Write numbers in the numerical form not the text form (“3” not “three”).</li>
                <li className='heading2 headMargin'>Separate your keywords and features with hyphens (-) or commas (,).</li>
                <li className='heading2 headMargin'>Always include brand name, model number, size, quantity and color when available.</li>
                <li className='heading2 headMargin'>Avoid “keyword stuffing”: i.e. adding unnecessary or unrelated keywords.</li>
                <li className='heading2 headMargin'>Do not use ALL CAPS, all titles should be in sentence case.</li>
                <li className='heading2 headMargin'>Do not include details about price, availability, company information, or warranty.</li>
                <li className='heading2 headMargin'>Titles should not contain special characters such as %, $,@,™,®.</li>
            </div>),
        },
        {
            id: uuidv4(),
            title: 'c. Product description',
            panel: (<div>
                <li className='heading2 headMargin'>This “free text” content should be in paragraph form with proper grammar.</li>
                <li className='heading2 headMargin'>US English spelling should be used. This should be “reader friendly” with a slight “sales approach” to engage the buyer. Maximum character limit is 1000 characters.</li>
                <li className='heading2 headMargin'>Describe the product’s important features, including size and color information and compatibility.</li>
                <li className='heading2 headMargin'>Page content should be comprehensive and employ related terms/keywords (what keywords an average person would use when searching online for such a product).</li>
                <li className='heading2 headMargin'>Include the brand name, series and model number, even if these are already in the product title.</li>
                <li className='heading2 headMargin'>Use sentence case (only capitalize the first word of a sentence or proper nouns)</li>
                <li className='heading2 headMargin'>Use p to insert a paragraph break.</li>
                <li className='heading2 headMargin'>Do not use ALL CAPS, all titles should be in sentence case.</li>
                <li className='heading2 headMargin'>Do not include details about price, availability, company information, or warranty.</li>
                <li className='heading2 headMargin'>Titles should not contain special characters such as %, $,@,™,®.</li>
                <li className='heading2 headMargin'>If you pull this content from another site you should change at least 20% in order for search engines to recognize this as original content.</li>
                <li className='heading2 headMargin'> Do not include subjective or time-sensitive comments e.g. “2023 deal”.</li>
                <li className='heading2 headMargin'>  Do not include any web or email addresses.</li>
                <li className='heading2 headMargin'>  Do not include any warranty information or advertising claims.</li>
                <li className='heading2 headMargin'>  Do not include special characters such as %, $,@,™,®. </li>
                <li className='heading2 headMargin'>   Upload your A+ content (if applicable).</li>
            </div>),
        },
        {
            id: uuidv4(),
            title: 'd. Images',
            panel: (<div>
                <li className='heading2 headMargin'>Your product shouldn’t fill more than 85% of the image space or less than 70% of the full image.</li>
                <li className='heading2 headMargin'>Image file size should be between 100KB and 10MB.</li>
                <li className='heading2 headMargin'>Accepted Images file types are “png, jpeg, jpg, bmp”.</li>
                <li className='heading2 headMargin'>Transparent .png files are not supported, transparent parts will display black in listing.</li>
                <li className='heading2 headMargin'>sRGB and CMYK color space.</li>
                <li className='heading2 headMargin'>Minimum resolution 500 X 500 pixels, Maximum 1000 X 1000 pixels.</li>
                <li className='heading2 headMargin'>The accepted ratio or crop is a 11 square image.</li>
                <li className='heading2 headMargin'>The image must not be a graphic, rendering or illustration of the product.</li>
                <li className='heading2 headMargin'>The use of a logo or icon instead of an actual product image is not permitted.</li>
                <li className='heading2 headMargin'>Images must not contain elements or content that covers the product or confusing additional items.</li>
                <li className='heading2 headMargin'>Images must not contain copyright marks or watermarks.</li>
                <li className='heading2 headMargin'>Images must not contain borders.</li>
                <li className='heading2 headMargin'>Images must not be blurry or pixelated.</li>
                <li className='heading2 headMargin'>Show a single unit of the product.</li>
                <li className='heading2 headMargin'>Choose images that clearly and accurately represent the product.</li>
                <li className='heading2 headMargin'>Show the main product image against a white background.</li>
                <li className='heading2 headMargin'>The main image should show the main product only, not accessories or other items in the box.</li>
                <li className='heading2 headMargin'>Add up to 5 secondary images.</li>
                <li className='heading2 headMargin'>Do not include text, logos, watermarks, or price tags.</li>
                <li className='heading2 headMargin'>Do not include a background or border on the main image.</li>
                <li className='heading2 headMargin'>Do not show multiple images if the item is a multipack.</li>
                <li className='heading2 headMargin'>Do not show multiple views of the products in the main image.</li>
                <li className='heading2 headMargin'>Do not include images of compatible products in the main image. (e.g. if you’re selling phone cases, don’t picture them with phones)</li>
                <li className='heading2 headMargin'>Minimum number of pictures for an item in electronics is 3.</li>
                <li className='heading2 headMargin'>It is permitted to use lifestyle images as the main image for the following categories; Furniture, Beddings, Lights and Curtains, as long as they showcase the product clearly.</li>
            </div>),
        },
        {
            id: uuidv4(),
            title: 'e. Specifications',
            panel: (
                <div>
                    <li className='heading2 headMargin'>Follow the value instructions in the product template</li>
                    <li className='heading2 headMargin'>Key features: Add a minimum of 2, up to 6 Key features. Each key feature has a maximum character limit of 250 characters.</li>
                </div>
            ),
        },
    ]

    const pac = [
        {
            id: uuidv4(),
            title: 'a. General guidelines',
            panel: (<div>
                <li className='heading2 headMargin'>Tradeling.com is a platform that allows you to sell physical products only. Services and Subscriptions are not permitted to be sold on Tradeling.</li>
                <li className='heading2 headMargin'>Ensure the product brand and item type is permitted to be sold online by UAE law. Alcohol and smoking products, drugs and medical products, and animals are not permitted on the platform.</li>
                <li className='heading2 headMargin'>Ensure the product details do not contain any graphic or sexual content and the language is professional.</li>
                <li className='heading2 headMargin'>The official language of the product details must be in English (mandatory) and Arabic (optional) only.</li>
                <li className='heading2 headMargin'>Ensure your that each listing contain one product only. Variants and accessories should be listed separately.</li>
                <li className='heading2 headMargin'>Ensure your product details are consistent and does not have conflicting information.</li>
            </div>),
        },
        {
            id: uuidv4(),
            title: 'b. Imagery',
            panel: (<div>
                <li className='heading2 headMargin'>The image should be readable for the buyers so they can see the functions and specifications of the product.</li>
                <li className='heading2 headMargin'>Only one product in the image with a mentioned color and size so the buyers aren’t confused with multiple products and colors. (If the product has multiple variants such as colors or sizes, each variant should be listed separately).</li>
                <li className='heading2 headMargin'>The image must match the title, key features and description and must not conflict with any of the product details (Example; Red T-shirt Image, whereas the title says blue).</li>
                <li className='heading2 headMargin'>The images must be a photograph and not an illustration.</li>
                <li className='heading2 headMargin'>The image must not contain watermarks, contact details, texts or illustrations.</li>
                <li className='heading2 headMargin'>The images cannot be graphic, inappropriate, unprofessional.</li>
                <li className='heading2 headMargin'>The Images must not contain live models (Lingerie, underwear, and sleep wear).</li>
            </div>),
        },
        {
            id: uuidv4(),
            title: 'c. Title',
            panel: (<div>
                <li className='heading2 headMargin'>Title should be clear enough to understand the details of the product.</li>
                <li className='heading2 headMargin'>Titles should contain the brand as the first word.</li>
                <li className='heading2 headMargin'>The phrase “Assorted colors” can be used if the image contains the manufacturer’s box or if the colors are mentioned in key features or description.</li>
                <li className='heading2 headMargin'>The title should not contain multiple variants and should not conflict with the product details and images.</li>
                <li className='heading2 headMargin'>The titles should not contain irrelevant keywords.</li>
                <li className='heading2 headMargin'>Titles should not contain typos and/or special characters.</li>
            </div>),
        },
        {
            id: uuidv4(),
            title: 'd. Top Key features',
            panel: (<div>
                <li className='heading2 headMargin'>The key features should highlight the most important functions and features of the product. It’s your chance to mention all the selling points that will help the buyers with their buying decision.</li>
                <li className='heading2 headMargin'>Add a minimum 2, up to 6 key features per listing.</li>
                <li className='heading2 headMargin'>Product Usage.</li>
                <li className='heading2 headMargin'>Compatibility with other devices or products (if needed).</li>
                <li className='heading2 headMargin'>The key features should not contain promotional details or information about multiple variants and should not conflict with the other product details and images.</li>
                <li className='heading2 headMargin'>Key features should not contain typos and/or special characters.</li>
            </div>),
        },
        {
            id: uuidv4(),
            title: 'e. Keywords',
            panel: (<div>
                <li className='heading2 headMargin'>Using keywords that are strictly related to the product for better search experience. Use the words or phrases that the buyers would use to search for your products.</li>
                <li className='heading2 headMargin'> Use words and phrases but not sentences.</li>
                <li className='heading2 headMargin'> Add a minimum 2, up to 5 keywords per listing.</li>
            </div>),
        },
        {
            id: uuidv4(),
            title: 'd. High-quality description',
            panel: (<div>
                <li className='heading2 headMargin'>The story behind the product.</li>
                <li className='heading2 headMargin'>Detailed display of usage, functions, specifications ingredients, materials and compatibility.</li>
                <li className='heading2 headMargin'>The description should not contain promotional details or information about multiple variants and should not conflict with the other product details and images.</li>
            </div>),
        },

    ]




    return (
        <Fragment>
            <Helmet>
                <title>Guidelines for seller</title>
            </Helmet>
            <div className="guide-banner-cont">
                <img className='guideBanner' src={banner} alt="banner" />
                <div className="responsive-text">
                    <div className="flexcol" style={{ gap: '20px' }}>
                        <div className="heading4">Upload and update your product catalogue</div>
                        <div className="heading5 clrwhite">Step-by-step guide for sellers</div>
                    </div>
                </div>
            </div>

            <div className="flexcol-start wh home">
                <div className="heading5">1. Guidelines for product listing</div>
                <div className="flexcol wh">
                    {
                        gpl.map((item, index) => (
                            <Fragment>
                                <div className={`accordion-guide ${activeIndex === (index + 1) ? 'active' : ''}`} onClick={() => toggleGuideAccordion(index + 1)}>
                                    <div className="heading3">{item.title}</div>
                                </div>
                                <div className="panel-guide" style={{ maxHeight: activeIndex === (index + 1) ? '800px' : '0' }}>
                                    {item.panel}
                                </div>
                            </Fragment>
                        ))
                    }
                </div>

                <div className="heading5">2. Product approval criteria</div>
                <div className="flexcol wh">
                    {
                        pac.map((item, index) => (
                            <Fragment>
                                <div className={`accordion-guide ${activeIndex === (index + 6) ? 'active' : ''}`} onClick={() => toggleGuideAccordion(index + 6)}>
                                    <div className="heading3">{item.title}</div>
                                </div>
                                <div className="panel-guide" style={{ maxHeight: activeIndex === (index + 6) ? '800px' : '0' }}>
                                    {item.panel}
                                </div>
                            </Fragment>
                        ))
                    }
                </div>

                <div className="heading5">3. Attend the webinar on how to upload your products</div>
                <div className="heading2">Do you have questions about uploading your catalogue on Tradeling? Or do you simply need a first-hand demonstration showing how to upload products?
                    Join our free 1-hour webinar, where our experts will show you how to do it and start selling!
                </div>
                <button className='btn box2 flex' style={{ width: 'fit-content', backgroundColor: 'var(--CodeOne)' }}><div className="heading2">Register Now</div></button>

            </div>
        </Fragment>
    )
}

export default Guidelines