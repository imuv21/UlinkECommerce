import React, { Fragment, useState, useEffect } from 'react';
import '../Guidelines/Guidelines.css';
import { v4 as uuidv4 } from 'uuid';
import { Helmet } from 'react-helmet-async';
import SearchIcon from '@mui/icons-material/Search';

const FAQPage = () => {


  const [activeIndex, setActiveIndex] = useState(null);
  const toggleGuideAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };


  //search-bar
  const [queryFaq, setQueryFaq] = useState('');

  const itu = [
    {
      id: uuidv4(),
      title: 'Who We Are?',
      panel: (<div>
        <p className='heading2 headMargin'>We are MENA’s largest Business-to-Business eMarketplace. Shaping the B2B sector by building a digital ecosystem, beautifully designed and simple to use. </p>
        <p className='heading2 headMargin'>Through our technology, holistic ecosystem, financial solutions, and talented people, we are enabling cross-border trade between the Middle East and the world, supporting SMEs in their business growth, reinventing B2B procurement, and empowering entrepreneurs across the region</p>
      </div>),
    },
    {
      id: uuidv4(),
      title: 'Who is Ulinkit for?',
      panel: (<div>
        <p className='heading2 headMargin'>Title structure: ([Brand], [Model name], [model number], [other feature], [item type], [size], [color], [quantity]).</p>
        <p className='heading2 headMargin'>  Example: Graco (brand), Maxi (Model name), GTB538 (Model number), lightweight (other features) car seat (item type) - 1-12 years (size), navy blue (color). California Garden (brand) Canned, Ready To Eat (other features) Chickpeas (item type) 400g (size) Pack of 24 (quantity).</p>
        <p className='heading2 headMargin'>Provide a short, descriptive title that will help customers identify the key features. Keep the title less than 200 characters long.</p>
        <p className='heading2 headMargin'>Write numbers in the numerical form not the text form (“3” not “three”).</p>
        <p className='heading2 headMargin'>Separate your keywords and features with hyphens (-) or commas (,).</p>
        <p className='heading2 headMargin'>Always include brand name, model number, size, quantity and color when available.</p>
        <p className='heading2 headMargin'>Avoid “keyword stuffing”: i.e. adding unnecessary or unrelated keywords.</p>
        <p className='heading2 headMargin'>Do not use ALL CAPS, all titles should be in sentence case.</p>
        <p className='heading2 headMargin'>Do not include details about price, availability, company information, or warranty.</p>
        <p className='heading2 headMargin'>Titles should not contain special characters such as %, $,@,™,®.</p>
      </div>),
    },
    {
      id: uuidv4(),
      title: 'How can I contact you?',
      panel: (<div>
        <p className='heading2 headMargin'>This “free text” content should be in paragraph form with proper grammar.</p>
        <p className='heading2 headMargin'>US English spelling should be used. This should be “reader friendly” with a slight “sales approach” to engage the buyer. Maximum character limit is 1000 characters.</p>
        <p className='heading2 headMargin'>  Do not include any warranty information or advertising claims.</p>
        <p className='heading2 headMargin'>  Do not include special characters such as %, $,@,™,®. </p>
        <p className='heading2 headMargin'>   Upload your A+ content (if applicable).</p>
      </div>),
    },
    {
      id: uuidv4(),
      title: 'Where is Ulinkit based?',
      panel: (<div>
        <p className='heading2 headMargin'>Your product shouldn’t fill more than 85% of the image space or less than 70% of the full image.</p>
        <p className='heading2 headMargin'>Image file size should be between 100KB and 10MB.</p>
        <p className='heading2 headMargin'>Accepted Images file types are “png, jpeg, jpg, bmp”.</p>
        <p className='heading2 headMargin'>It is permitted to use lifestyle images as the main image for the following categories; Furniture, Beddings, Lights and Curtains, as long as they showcase the product clearly.</p>
      </div>),
    },
  ];
  const sou = [
    {
      id: uuidv4(),
      title: 'How do I register as a Seller on Ulinkit?',
      panel: (<div>
        <p className='heading2 headMargin'>Ulinkit.com is a platform that allows you to sell physical products only. Services and Subscriptions are not permitted to be sold on Ulinkit.</p>
        <p className='heading2 headMargin'>Ensure the product brand and item type is permitted to be sold online by UAE law. Alcohol and smoking products, drugs and medical products, and animals are not permitted on the platform.</p>
        <p className='heading2 headMargin'>Ensure the product details do not contain any graphic or sexual content and the language is professional.</p>
        <p className='heading2 headMargin'>The official language of the product details must be in English (mandatory) and Arabic (optional) only.</p>
        <p className='heading2 headMargin'>Ensure your that each listing contain one product only. Variants and accessories should be listed separately.</p>
        <p className='heading2 headMargin'>Ensure your product details are consistent and does not have conflicting information.</p>
      </div>),
    },
    {
      id: uuidv4(),
      title: 'How do I start selling on Ulinkit?',
      panel: (<div>
        <p className='heading2 headMargin'>The image should be readable for the buyers so they can see the functions and specifications of the product.</p>
        <p className='heading2 headMargin'>Only one product in the image with a mentioned color and size so the buyers aren’t confused with multiple products and colors. (If the product has multiple variants such as colors or sizes, each variant should be listed separately).</p>
        <p className='heading2 headMargin'>The image must match the title, key features and description and must not conflict with any of the product details (Example; Red T-shirt Image, whereas the title says blue).</p>
        <p className='heading2 headMargin'>The images must be a photograph and not an illustration.</p>
        <p className='heading2 headMargin'>The image must not contain watermarks, contact details, texts or illustrations.</p>
        <p className='heading2 headMargin'>The images cannot be graphic, inappropriate, unprofessional.</p>
        <p className='heading2 headMargin'>The Images must not contain live models (Lingerie, underwear, and sleep wear).</p>
      </div>),
    },
    {
      id: uuidv4(),
      title: 'What products can I sell on Ulinkit?',
      panel: (<div>
        <p className='heading2 headMargin'>Title should be clear enough to understand the details of the product.</p>
        <p className='heading2 headMargin'>Titles should contain the brand as the first word.</p>
        <p className='heading2 headMargin'>The phrase “Assorted colors” can be used if the image contains the manufacturer’s box or if the colors are mentioned in key features or description.</p>
        <p className='heading2 headMargin'>The title should not contain multiple variants and should not conflict with the product details and images.</p>
        <p className='heading2 headMargin'>The titles should not contain irrelevant keywords.</p>
        <p className='heading2 headMargin'>Titles should not contain typos and/or special characters.</p>
      </div>),
    },
    {
      id: uuidv4(),
      title: 'What is the benefit of being verified as a Seller?',
      panel: (<div>
        <p className='heading2 headMargin'>The key features should highlight the most important functions and features of the product. It’s your chance to mention all the selling points that will help the buyers with their buying decision.</p>
        <p className='heading2 headMargin'>Add a minimum 2, up to 6 key features per listing.</p>
        <p className='heading2 headMargin'>Product Usage.</p>
        <p className='heading2 headMargin'>Compatibility with other devices or products (if needed).</p>
        <p className='heading2 headMargin'>The key features should not contain promotional details or information about multiple variants and should not conflict with the other product details and images.</p>
        <p className='heading2 headMargin'>Key features should not contain typos and/or special characters.</p>
      </div>),
    },
  ];
  const spug = [
    {
      id: uuidv4(),
      title: 'How do I list or upload my products on Ulinkit.com?',
      panel: (<div>
        <p className='heading2 headMargin'>Ulinkit.com is a platform that allows you to sell physical products only. Services and Subscriptions are not permitted to be sold on Ulinkit.</p>
        <p className='heading2 headMargin'>Ensure the product brand and item type is permitted to be sold online by UAE law. Alcohol and smoking products, drugs and medical products, and animals are not permitted on the platform.</p>
        <p className='heading2 headMargin'>Ensure the product details do not contain any graphic or sexual content and the language is professional.</p>
        <p className='heading2 headMargin'>The official language of the product details must be in English (mandatory) and Arabic (optional) only.</p>
        <p className='heading2 headMargin'>Ensure your that each listing contain one product only. Variants and accessories should be listed separately.</p>
        <p className='heading2 headMargin'>Ensure your product details are consistent and does not have conflicting information.</p>
      </div>),
    },
    {
      id: uuidv4(),
      title: 'How do I update existing products?',
      panel: (<div>
        <p className='heading2 headMargin'>The image should be readable for the buyers so they can see the functions and specifications of the product.</p>
        <p className='heading2 headMargin'>Only one product in the image with a mentioned color and size so the buyers aren’t confused with multiple products and colors. (If the product has multiple variants such as colors or sizes, each variant should be listed separately).</p>
        <p className='heading2 headMargin'>The image must match the title, key features and description and must not conflict with any of the product details (Example; Red T-shirt Image, whereas the title says blue).</p>
        <p className='heading2 headMargin'>The images must be a photograph and not an illustration.</p>
        <p className='heading2 headMargin'>The image must not contain watermarks, contact details, texts or illustrations.</p>
        <p className='heading2 headMargin'>The images cannot be graphic, inappropriate, unprofessional.</p>
        <p className='heading2 headMargin'>The Images must not contain live models (Lingerie, underwear, and sleep wear).</p>
      </div>),
    },
    {
      id: uuidv4(),
      title: 'How do I upload images of my products?',
      panel: (<div>
        <p className='heading2 headMargin'>Title should be clear enough to understand the details of the product.</p>
        <p className='heading2 headMargin'>Titles should contain the brand as the first word.</p>
        <p className='heading2 headMargin'>The phrase “Assorted colors” can be used if the image contains the manufacturer’s box or if the colors are mentioned in key features or description.</p>
        <p className='heading2 headMargin'>The title should not contain multiple variants and should not conflict with the product details and images.</p>
        <p className='heading2 headMargin'>The titles should not contain irrelevant keywords.</p>
        <p className='heading2 headMargin'>Titles should not contain typos and/or special characters.</p>
      </div>),
    },
    {
      id: uuidv4(),
      title: 'How do I find the right category for my products?',
      panel: (<div>
        <p className='heading2 headMargin'>The key features should highlight the most important functions and features of the product. It’s your chance to mention all the selling points that will help the buyers with their buying decision.</p>
        <p className='heading2 headMargin'>Add a minimum 2, up to 6 key features per listing.</p>
        <p className='heading2 headMargin'>Product Usage.</p>
        <p className='heading2 headMargin'>Compatibility with other devices or products (if needed).</p>
        <p className='heading2 headMargin'>The key features should not contain promotional details or information about multiple variants and should not conflict with the other product details and images.</p>
        <p className='heading2 headMargin'>Key features should not contain typos and/or special characters.</p>
      </div>),
    },
  ];
  const am = [
    {
      id: uuidv4(),
      title: 'How do I reset my password?',
      panel: (<div>
        <p className='heading2 headMargin'>Ulinkit.com is a platform that allows you to sell physical products only. Services and Subscriptions are not permitted to be sold on Ulinkit.</p>
        <p className='heading2 headMargin'>Ensure the product brand and item type is permitted to be sold online by UAE law. Alcohol and smoking products, drugs and medical products, and animals are not permitted on the platform.</p>
        <p className='heading2 headMargin'>Ensure the product details do not contain any graphic or sexual content and the language is professional.</p>
        <p className='heading2 headMargin'>The official language of the product details must be in English (mandatory) and Arabic (optional) only.</p>
        <p className='heading2 headMargin'>Ensure your that each listing contain one product only. Variants and accessories should be listed separately.</p>
        <p className='heading2 headMargin'>Ensure your product details are consistent and does not have conflicting information.</p>
      </div>),
    },
    {
      id: uuidv4(),
      title: 'How do I report an IPR infringement?',
      panel: (<div>
        <p className='heading2 headMargin'>The image should be readable for the buyers so they can see the functions and specifications of the product.</p>
        <p className='heading2 headMargin'>Only one product in the image with a mentioned color and size so the buyers aren’t confused with multiple products and colors. (If the product has multiple variants such as colors or sizes, each variant should be listed separately).</p>
        <p className='heading2 headMargin'>The image must match the title, key features and description and must not conflict with any of the product details (Example; Red T-shirt Image, whereas the title says blue).</p>
        <p className='heading2 headMargin'>The images must be a photograph and not an illustration.</p>
        <p className='heading2 headMargin'>The image must not contain watermarks, contact details, texts or illustrations.</p>
        <p className='heading2 headMargin'>The images cannot be graphic, inappropriate, unprofessional.</p>
        <p className='heading2 headMargin'>The Images must not contain live models (Lingerie, underwear, and sleep wear).</p>
      </div>),
    },
    {
      id: uuidv4(),
      title: 'How secure is my information?',
      panel: (<div>
        <p className='heading2 headMargin'>Title should be clear enough to understand the details of the product.</p>
        <p className='heading2 headMargin'>Titles should contain the brand as the first word.</p>
        <p className='heading2 headMargin'>The phrase “Assorted colors” can be used if the image contains the manufacturer’s box or if the colors are mentioned in key features or description.</p>
        <p className='heading2 headMargin'>The title should not contain multiple variants and should not conflict with the product details and images.</p>
        <p className='heading2 headMargin'>The titles should not contain irrelevant keywords.</p>
        <p className='heading2 headMargin'>Titles should not contain typos and/or special characters.</p>
      </div>),
    },
    {
      id: uuidv4(),
      title: 'What is the allowed number of users per account?',
      panel: (<div>
        <p className='heading2 headMargin'>The key features should highlight the most important functions and features of the product. It’s your chance to mention all the selling points that will help the buyers with their buying decision.</p>
        <p className='heading2 headMargin'>Add a minimum 2, up to 6 key features per listing.</p>
        <p className='heading2 headMargin'>Product Usage.</p>
        <p className='heading2 headMargin'>Compatibility with other devices or products (if needed).</p>
        <p className='heading2 headMargin'>The key features should not contain promotional details or information about multiple variants and should not conflict with the other product details and images.</p>
        <p className='heading2 headMargin'>Key features should not contain typos and/or special characters.</p>
      </div>),
    },
  ];
  const bou = [
    {
      id: uuidv4(),
      title: 'How do I track my orders?',
      panel: (<div>
        <p className='heading2 headMargin'>Ulinkit.com is a platform that allows you to sell physical products only. Services and Subscriptions are not permitted to be sold on Ulinkit.</p>
        <p className='heading2 headMargin'>Ensure the product brand and item type is permitted to be sold online by UAE law. Alcohol and smoking products, drugs and medical products, and animals are not permitted on the platform.</p>
        <p className='heading2 headMargin'>Ensure the product details do not contain any graphic or sexual content and the language is professional.</p>
        <p className='heading2 headMargin'>The official language of the product details must be in English (mandatory) and Arabic (optional) only.</p>
        <p className='heading2 headMargin'>Ensure your that each listing contain one product only. Variants and accessories should be listed separately.</p>
        <p className='heading2 headMargin'>Ensure your product details are consistent and does not have conflicting information.</p>
      </div>),
    },
    {
      id: uuidv4(),
      title: 'How do returns and refunds work?',
      panel: (<div>
        <p className='heading2 headMargin'>The image should be readable for the buyers so they can see the functions and specifications of the product.</p>
        <p className='heading2 headMargin'>Only one product in the image with a mentioned color and size so the buyers aren’t confused with multiple products and colors. (If the product has multiple variants such as colors or sizes, each variant should be listed separately).</p>
        <p className='heading2 headMargin'>The image must match the title, key features and description and must not conflict with any of the product details (Example; Red T-shirt Image, whereas the title says blue).</p>
        <p className='heading2 headMargin'>The images must be a photograph and not an illustration.</p>
        <p className='heading2 headMargin'>The image must not contain watermarks, contact details, texts or illustrations.</p>
        <p className='heading2 headMargin'>The images cannot be graphic, inappropriate, unprofessional.</p>
        <p className='heading2 headMargin'>The Images must not contain live models (Lingerie, underwear, and sleep wear).</p>
      </div>),
    },
    {
      id: uuidv4(),
      title: 'What is the benefit of verifying my account as a Buyer?',
      panel: (<div>
        <p className='heading2 headMargin'>Title should be clear enough to understand the details of the product.</p>
        <p className='heading2 headMargin'>Titles should contain the brand as the first word.</p>
        <p className='heading2 headMargin'>The phrase “Assorted colors” can be used if the image contains the manufacturer’s box or if the colors are mentioned in key features or description.</p>
        <p className='heading2 headMargin'>The title should not contain multiple variants and should not conflict with the product details and images.</p>
        <p className='heading2 headMargin'>The titles should not contain irrelevant keywords.</p>
        <p className='heading2 headMargin'>Titles should not contain typos and/or special characters.</p>
      </div>),
    },
    {
      id: uuidv4(),
      title: 'How long will it take for my order to be delivered?',
      panel: (<div>
        <p className='heading2 headMargin'>The key features should highlight the most important functions and features of the product. It’s your chance to mention all the selling points that will help the buyers with their buying decision.</p>
        <p className='heading2 headMargin'>Add a minimum 2, up to 6 key features per listing.</p>
        <p className='heading2 headMargin'>Product Usage.</p>
        <p className='heading2 headMargin'>Compatibility with other devices or products (if needed).</p>
        <p className='heading2 headMargin'>The key features should not contain promotional details or information about multiple variants and should not conflict with the other product details and images.</p>
        <p className='heading2 headMargin'>Key features should not contain typos and/or special characters.</p>
      </div>),
    },
  ];
  const us = [
    {
      id: uuidv4(),
      title: 'What is Request For Quotation (RFQ)?',
      panel: (<div>
        <p className='heading2 headMargin'>Ulinkit.com is a platform that allows you to sell physical products only. Services and Subscriptions are not permitted to be sold on Ulinkit.</p>
        <p className='heading2 headMargin'>Ensure the product brand and item type is permitted to be sold online by UAE law. Alcohol and smoking products, drugs and medical products, and animals are not permitted on the platform.</p>
        <p className='heading2 headMargin'>Ensure the product details do not contain any graphic or sexual content and the language is professional.</p>
        <p className='heading2 headMargin'>The official language of the product details must be in English (mandatory) and Arabic (optional) only.</p>
        <p className='heading2 headMargin'>Ensure your that each listing contain one product only. Variants and accessories should be listed separately.</p>
        <p className='heading2 headMargin'>Ensure your product details are consistent and does not have conflicting information.</p>
      </div>),
    },
    {
      id: uuidv4(),
      title: 'What is Pre-owned: Buy & Sell?',
      panel: (<div>
        <p className='heading2 headMargin'>The image should be readable for the buyers so they can see the functions and specifications of the product.</p>
        <p className='heading2 headMargin'>Only one product in the image with a mentioned color and size so the buyers aren’t confused with multiple products and colors. (If the product has multiple variants such as colors or sizes, each variant should be listed separately).</p>
        <p className='heading2 headMargin'>The image must match the title, key features and description and must not conflict with any of the product details (Example; Red T-shirt Image, whereas the title says blue).</p>
        <p className='heading2 headMargin'>The images must be a photograph and not an illustration.</p>
        <p className='heading2 headMargin'>The image must not contain watermarks, contact details, texts or illustrations.</p>
        <p className='heading2 headMargin'>The images cannot be graphic, inappropriate, unprofessional.</p>
        <p className='heading2 headMargin'>The Images must not contain live models (Lingerie, underwear, and sleep wear).</p>
      </div>),
    }
  ];
  const ul = [
    {
      id: uuidv4(),
      title: 'How can I get a quote or estimate on shipping rates?',
      panel: (<div>
        <p className='heading2 headMargin'>Ulinkit.com is a platform that allows you to sell physical products only. Services and Subscriptions are not permitted to be sold on Ulinkit.</p>
        <p className='heading2 headMargin'>Ensure the product brand and item type is permitted to be sold online by UAE law. Alcohol and smoking products, drugs and medical products, and animals are not permitted on the platform.</p>
        <p className='heading2 headMargin'>Ensure the product details do not contain any graphic or sexual content and the language is professional.</p>
        <p className='heading2 headMargin'>The official language of the product details must be in English (mandatory) and Arabic (optional) only.</p>
        <p className='heading2 headMargin'>Ensure your that each listing contain one product only. Variants and accessories should be listed separately.</p>
        <p className='heading2 headMargin'>Ensure your product details are consistent and does not have conflicting information.</p>
      </div>),
    },
    {
      id: uuidv4(),
      title: 'How do I get insurance for my cargo and who should pay for it?',
      panel: (<div>
        <p className='heading2 headMargin'>The image should be readable for the buyers so they can see the functions and specifications of the product.</p>
        <p className='heading2 headMargin'>Only one product in the image with a mentioned color and size so the buyers aren’t confused with multiple products and colors. (If the product has multiple variants such as colors or sizes, each variant should be listed separately).</p>
        <p className='heading2 headMargin'>The image must match the title, key features and description and must not conflict with any of the product details (Example; Red T-shirt Image, whereas the title says blue).</p>
        <p className='heading2 headMargin'>The images must be a photograph and not an illustration.</p>
        <p className='heading2 headMargin'>The image must not contain watermarks, contact details, texts or illustrations.</p>
        <p className='heading2 headMargin'>The images cannot be graphic, inappropriate, unprofessional.</p>
        <p className='heading2 headMargin'>The Images must not contain live models (Lingerie, underwear, and sleep wear).</p>
      </div>),
    }
  ];

  const allItems = [...itu, ...sou, ...spug, ...am, ...bou, ...us, ...ul];
  const [filteredFaqs, setFilteredFaqs] = useState(allItems);

  useEffect(() => {
    if (queryFaq.trim()) {
      const regex = new RegExp(queryFaq.trim(), 'i');
      const filtered = allItems.filter(item => regex.test(item.title));
      setFilteredFaqs(filtered);
    } else {
      setFilteredFaqs(allItems);
    }
  }, [queryFaq]);

  const handleKeyPressFaq = (e) => {
    if (e.key === 'Enter') {
      handleSearchFaq();
    }
  };

  const handleSearchFaq = () => {
    if (queryFaq.trim()) {
      const regex = new RegExp(queryFaq.trim(), 'i');
      const filtered = allItems.filter(item => regex.test(item.title));
      setFilteredFaqs(filtered);
    } else {
      setFilteredFaqs(allItems);
    }
  };





  return (
    <Fragment>
      <Helmet>
        <title>FAQs - Ulinkit</title>
      </Helmet>
      <article className="guide-banner-cont">
        <img className='faqBanner' src="https://res.cloudinary.com/dey1tujp8/image/upload/v1719055436/pexels-mart-production-7709189_nhkyis.jpg" alt="banner" />
        <div className="responsive-text">
          <div className="flexcol" style={{ gap: '20px' }}>
            <h1 className="heading4">Help and Support</h1>
            <h2 className="heading4">How Can We Help You?</h2>
            <div className="search-faq">
              <input type='text' value={queryFaq} onChange={(e) => setQueryFaq(e.target.value)} onKeyPress={handleKeyPressFaq} placeholder='Search for your question...' />
              <span>
                <SearchIcon onClick={handleSearchFaq} />
              </span>
            </div>
          </div>
        </div>
      </article>


      {queryFaq ?
        (<div className="flexcol-start wh home">
          <div className="flexcol wh">
            {filteredFaqs.map((item, index) => (
              <Fragment key={uuidv4()}>
                <div className={`accordion-guide ${activeIndex === (index + 1) ? 'active' : ''}`} onClick={() => toggleGuideAccordion(index + 1)}>
                  <p className="heading3">{item.title}</p>
                </div>
                <div className="panel-guide" style={{ maxHeight: activeIndex === (index + 1) ? '800px' : '0' }}>
                  {item.panel}
                </div>
              </Fragment>
            ))}
          </div>
        </div>) : (

          <article className="flexcol-start wh home">
            <h1 className="heading5">1. Introduction to Ulinkit</h1>
            <div className="flexcol wh">
              {
                itu.map((item, index) => (
                  <Fragment key={uuidv4()}>
                    <div className={`accordion-guide ${activeIndex === (index + 1) ? 'active' : ''}`} onClick={() => toggleGuideAccordion(index + 1)}>
                      <p className="heading3">{item.title}</p>
                    </div>
                    <div className="panel-guide" style={{ maxHeight: activeIndex === (index + 1) ? '800px' : '0' }}>
                      {item.panel}
                    </div>
                  </Fragment>
                ))
              }
            </div>

            <h2 className="heading5">2. Selling on Ulinkit</h2>
            <div className="flexcol wh">
              {
                sou.map((item, index) => (
                  <Fragment key={uuidv4()}>
                    <div className={`accordion-guide ${activeIndex === (index + 5) ? 'active' : ''}`} onClick={() => toggleGuideAccordion(index + 5)}>
                      <p className="heading3">{item.title}</p>
                    </div>
                    <div className="panel-guide" style={{ maxHeight: activeIndex === (index + 5) ? '800px' : '0' }}>
                      {item.panel}
                    </div>
                  </Fragment>
                ))
              }
            </div>

            <h3 className="heading5">3. Seller Product Upload Guideline</h3>
            <div className="flexcol wh">
              {
                spug.map((item, index) => (
                  <Fragment key={uuidv4()}>
                    <div className={`accordion-guide ${activeIndex === (index + 9) ? 'active' : ''}`} onClick={() => toggleGuideAccordion(index + 9)}>
                      <p className="heading3">{item.title}</p>
                    </div>
                    <div className="panel-guide" style={{ maxHeight: activeIndex === (index + 9) ? '800px' : '0' }}>
                      {item.panel}
                    </div>
                  </Fragment>
                ))
              }
            </div>

            <h4 className="heading5">4. Account Management</h4>
            <div className="flexcol wh">
              {
                am.map((item, index) => (
                  <Fragment key={uuidv4()}>
                    <div className={`accordion-guide ${activeIndex === (index + 13) ? 'active' : ''}`} onClick={() => toggleGuideAccordion(index + 13)}>
                      <p className="heading3">{item.title}</p>
                    </div>
                    <div className="panel-guide" style={{ maxHeight: activeIndex === (index + 13) ? '800px' : '0' }}>
                      {item.panel}
                    </div>
                  </Fragment>
                ))
              }
            </div>

            <p className="heading5">5. Buying on Ulinkit</p>
            <div className="flexcol wh">
              {
                bou.map((item, index) => (
                  <Fragment key={uuidv4()}>
                    <div className={`accordion-guide ${activeIndex === (index + 17) ? 'active' : ''}`} onClick={() => toggleGuideAccordion(index + 17)}>
                      <p className="heading3">{item.title}</p>
                    </div>
                    <div className="panel-guide" style={{ maxHeight: activeIndex === (index + 17) ? '800px' : '0' }}>
                      {item.panel}
                    </div>
                  </Fragment>
                ))
              }
            </div>

            <p className="heading5">6. Ulinkit Services</p>
            <div className="flexcol wh">
              {
                us.map((item, index) => (
                  <Fragment key={uuidv4()}>
                    <div className={`accordion-guide ${activeIndex === (index + 21) ? 'active' : ''}`} onClick={() => toggleGuideAccordion(index + 21)}>
                      <p className="heading3">{item.title}</p>
                    </div>
                    <div className="panel-guide" style={{ maxHeight: activeIndex === (index + 21) ? '800px' : '0' }}>
                      {item.panel}
                    </div>
                  </Fragment>
                ))
              }
            </div>

            <p className="heading5">7. Ulinkit Logistics</p>
            <div className="flexcol wh">
              {
                ul.map((item, index) => (
                  <Fragment key={uuidv4()}>
                    <div className={`accordion-guide ${activeIndex === (index + 25) ? 'active' : ''}`} onClick={() => toggleGuideAccordion(index + 25)}>
                      <p className="heading3">{item.title}</p>
                    </div>
                    <div className="panel-guide" style={{ maxHeight: activeIndex === (index + 25) ? '800px' : '0' }}>
                      {item.panel}
                    </div>
                  </Fragment>
                ))
              }
            </div>


            <h5 className="heading2">Do you have questions about uploading your catalogue on Ulinkit? Or do you simply need a first-hand demonstration showing how to upload products?
              Join our free 1-hour webinar, where our experts will show you how to do it and start selling!
            </h5>
            <button className='btn box2 flex' style={{ width: 'fit-content', backgroundColor: 'var(--CodeOne)' }}><div className="heading2">Register Now</div></button>
          </article>
        )
      }

    </Fragment>
  )
}

export default FAQPage