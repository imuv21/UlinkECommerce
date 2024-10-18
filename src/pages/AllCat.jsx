import React, { Fragment, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { supOptions, subOptions, miniSubOptions } from '../components/Schemas/cate';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import PrintIcon from '@mui/icons-material/Print';
import ChairIcon from '@mui/icons-material/Chair';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import ToysIcon from '@mui/icons-material/Toys';
import ImagesearchRollerIcon from '@mui/icons-material/ImagesearchRoller';
import Face3Icon from '@mui/icons-material/Face3';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PetsIcon from '@mui/icons-material/Pets';
import EngineeringIcon from '@mui/icons-material/Engineering';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';



const AllCat = () => {

    const navigate = useNavigate();

    const categoryIcons = {
        ConsumerElectronics: <DevicesOtherIcon />,
        FashionAndAccessories: <CheckroomIcon />,
        Automotive: <LocalShippingIcon />,
        FoodAndBeverages: <FastfoodIcon />,
        BabyCenter: <ChildCareIcon />,
        BeautyAndFragrances: <Face3Icon />,
        HomeGardenAndFurniture: <ChairIcon />,
        MachineryAndEquipment: <EngineeringIcon />,
        OfficeAndStationery: <PrintIcon />,
        PersonalCare: <SelfImprovementIcon />,
        PetAndAnimalCare: <PetsIcon />,
        SportsAndFitness: <FitnessCenterIcon />,
        Toys: <ToysIcon />,
        ToolsAndHomeImprovement: <ImagesearchRollerIcon />,
    };

    const [activeIndex, setActiveIndex] = useState(0);
    const [activeSubIndex, setActiveSubIndex] = useState(null);

    const togglePanel = (index) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const toggleSubPanel = (subIndex) => {
        setActiveSubIndex((prevSubIndex) => (prevSubIndex === subIndex ? null : subIndex));
    };

    const goToSearchPage = (supOption, subOption = '', miniSubOption = '') => {
        navigate('/search-results', {
            state: { supOption, subOption, miniSubOption }
        });
    };

    const convertPascalToReadable = (text) => {
        return text.replace(/([A-Z])/g, ' $1').trim();
    };



    return (
        <Fragment>
            <Helmet>
                <title>Ulinkit - Your Global Marketplace for Products and Services</title>
                <meta name="description" content="Discover a world of products and services on Ulinkit. Shop from various categories, explore deals, and enjoy a seamless shopping experience." />
                <link rel="canonical" href="https://www.ulinkit.com/all-categories" />
            </Helmet>

            <div className="allcatcont">
                <div className="allcat">
                    <div className="catcoldiv">
                        <h1 className="heading" style={{ color: '#003953' }}>All Categories</h1>
                        <section className="catcollist">
                            {supOptions.map((category, index) => (
                                <article className={`indilist ${activeIndex === index ? 'nowActive' : ''}`} onClick={() => togglePanel(index)} key={index}>
                                    {categoryIcons[category]} <h1 className='heading2'>{convertPascalToReadable(category)}</h1>
                                </article>
                            ))}
                        </section>
                    </div>
                </div>

                <div className="suballcatcont">
                    <div className="catcoldiv">
                        {activeIndex !== null && (
                            <Fragment>
                                <h1 className="heading3" style={{ color: '#003953' }}>{supOptions[activeIndex]}</h1>
                                <div className="allcat-accordion">
                                    {subOptions[supOptions[activeIndex]].map((subCategory, subIndex) => (
                                        <section key={subIndex}>
                                            <article className="allcat-accordion-header" onClick={() => toggleSubPanel(subIndex)}>
                                                <h1 className='heading2'>{convertPascalToReadable(subCategory)}</h1>
                                                <span>{activeSubIndex === subIndex ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</span>
                                            </article>
                                            <article className={`allcat-accordion-content ${activeSubIndex === subIndex ? 'open' : ''}`}>
                                                <div className="allcat-accordion-flex">
                                                    {miniSubOptions[subCategory]?.map((miniSub, miniIndex) => (
                                                        <div className="allcat-accordion-flex-item" onClick={() => goToSearchPage(supOptions[activeIndex], subCategory, miniSub)} key={miniIndex}>
                                                            <img src="https://cms.cloudinary.vpsvc.com/images/c_scale,dpr_auto,f_auto,q_auto:best,t_productPageHeroGalleryTransformation_v2,w_auto/legacy_dam/en-us/S001497840/marquee-product-boxes-002?cb=5426a13c75e9bb8fa8ada104467427ff1ef504af" alt={miniSub} />
                                                            <p className="descrip2">{convertPascalToReadable(miniSub)}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </article>
                                        </section>
                                    ))}
                                </div>
                            </Fragment>
                        )}
                    </div>
                </div>
            </div>
        </Fragment>
    );
};


// const AllCat = () => {

//     const [activeIndex, setActiveIndex] = useState(null);

//     const togglePanel = (index) => {
//         setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
//     };

//     return (
//         <Fragment>
//             <Helmet>
//                 <title>Ulinkit - Your Global Marketplace for Products and Services</title>
//                 <meta name="description" content="Discover a world of products and services on Ulinkit. Shop from various categories, explore deals, and enjoy a seamless shopping experience." />
//                 <link rel="canonical" href="https://www.ulinkit.com/all-categories" />
//             </Helmet>


//             <div className="allcatcont">
//                 <div className="allcat">
//                     <div className="catcoldiv">
//                         <h1 className="heading" style={{ color: '#003953' }}>All Categories</h1>
//                         <section className="catcollist">
//                             <article className="indilist nowActive"><DevicesOtherIcon /> <h1 className='heading2'>Consumer Electronics</h1></article>
//                             <article className="indilist"><CheckroomIcon /> <h1 className='heading2'>Fashion And Accessories</h1></article>
//                             <article className="indilist"><LocalShippingIcon /> <h1 className='heading2'>Automotive</h1></article>
//                             <article className="indilist"><FastfoodIcon /> <h1 className='heading2'>Food And Beverages</h1></article>
//                             <article className="indilist"><ChildCareIcon /> <h1 className='heading2'>Baby Center</h1></article>
//                             <article className="indilist"><Face3Icon /> <h1 className='heading2'>Beauty And Fragrances</h1></article>
//                             <article className="indilist"><ChairIcon /> <h1 className='heading2'>Home Garden And Furniture</h1></article>
//                             <article className="indilist"><EngineeringIcon /> <h1 className='heading2'>Machinery And Equipment</h1></article>
//                             <article className="indilist"><PrintIcon /> <h1 className='heading2'>Office And Stationery</h1></article>
//                             <article className="indilist"><SelfImprovementIcon /> <h1 className='heading2'>Personal Care</h1></article>
//                             <article className="indilist"><PetsIcon /> <h1 className='heading2'>Pet And Animal Care</h1></article>
//                             <article className="indilist"><FitnessCenterIcon /> <h1 className='heading2'>Sports And Fitness</h1></article>
//                             <article className="indilist"><ToysIcon /> <h1 className='heading2'>Toys</h1></article>
//                             <article className="indilist"><ImagesearchRollerIcon /> <h1 className='heading2'>Tools And Home Improvement</h1></article>
//                         </section>
//                     </div>
//                 </div>
//                 <div className="suballcatcont">
//                     <div className="catcoldiv">
//                         <h1 className="heading3" style={{ color: '#003953' }}>Consumer Electronics</h1>

//                         <div className="allcat-accordion">
//                             {[1, 2, 3].map((index) => (
//                                 <section key={index}>
//                                     <article className="allcat-accordion-header" onClick={() => togglePanel(index)}>
//                                         <h1 className='heading2'>Audio And Studio</h1>
//                                         <span>{activeIndex === index ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</span>
//                                     </article>
//                                     <article className={`allcat-accordion-content ${activeIndex === index ? 'open' : ''}`}>
//                                         <div className="allcat-accordion-flex">
//                                             <div className="allcat-accordion-flex-item">
//                                                 <img src="https://cms.cloudinary.vpsvc.com/images/c_scale,dpr_auto,f_auto,q_auto:best,t_productPageHeroGalleryTransformation_v2,w_auto/legacy_dam/en-us/S001497840/marquee-product-boxes-002?cb=5426a13c75e9bb8fa8ada104467427ff1ef504af" alt="product" />
//                                                 <p className="descrip2">Amplifiers And Speakers</p>
//                                             </div>
//                                             <div className="allcat-accordion-flex-item">
//                                                 <img src="https://cms.cloudinary.vpsvc.com/images/c_scale,dpr_auto,f_auto,q_auto:best,t_productPageHeroGalleryTransformation_v2,w_auto/legacy_dam/en-us/S001497840/marquee-product-boxes-002?cb=5426a13c75e9bb8fa8ada104467427ff1ef504af" alt="product" />
//                                                 <p className="descrip2">Audio And Video Accessories</p>
//                                             </div>
//                                             <div className="allcat-accordion-flex-item">
//                                                 <img src="https://cms.cloudinary.vpsvc.com/images/c_scale,dpr_auto,f_auto,q_auto:best,t_productPageHeroGalleryTransformation_v2,w_auto/legacy_dam/en-us/S001497840/marquee-product-boxes-002?cb=5426a13c75e9bb8fa8ada104467427ff1ef504af" alt="product" />
//                                                 <p className="descrip2">Headphones And Headsets</p>
//                                             </div>
//                                             <div className="allcat-accordion-flex-item">
//                                                 <img src="https://cms.cloudinary.vpsvc.com/images/c_scale,dpr_auto,f_auto,q_auto:best,t_productPageHeroGalleryTransformation_v2,w_auto/legacy_dam/en-us/S001497840/marquee-product-boxes-002?cb=5426a13c75e9bb8fa8ada104467427ff1ef504af" alt="product" />
//                                                 <p className="descrip2">Media Players</p>
//                                             </div>
//                                             <div className="allcat-accordion-flex-item">
//                                                 <img src="https://cms.cloudinary.vpsvc.com/images/c_scale,dpr_auto,f_auto,q_auto:best,t_productPageHeroGalleryTransformation_v2,w_auto/legacy_dam/en-us/S001497840/marquee-product-boxes-002?cb=5426a13c75e9bb8fa8ada104467427ff1ef504af" alt="product" />
//                                                 <p className="descrip2">Radio</p>
//                                             </div>
//                                             <div className="allcat-accordion-flex-item">
//                                                 <img src="https://cms.cloudinary.vpsvc.com/images/c_scale,dpr_auto,f_auto,q_auto:best,t_productPageHeroGalleryTransformation_v2,w_auto/legacy_dam/en-us/S001497840/marquee-product-boxes-002?cb=5426a13c75e9bb8fa8ada104467427ff1ef504af" alt="product" />
//                                                 <p className="descrip2">Recording And Studio Equipment</p>
//                                             </div>
//                                         </div>
//                                     </article>
//                                 </section>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </Fragment>
//     )
// }

export default AllCat