import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';

const ContactUs = () => {

    const whatsapp = () => {
        window.open('https://web.whatsapp.com/', '_blank', 'noopener,noreferrer');
    }

    const email = () => {
        window.open('https://www.gmail.com/', '_blank', 'noopener,noreferrer');
    }

    return (
        <Fragment>
            <Helmet>
                <title>Ulinkit - Your Global Marketplace for Products and Services</title>
                <meta name="description" content="Discover a world of products and services on Ulinkit. Shop from various categories, explore deals, and enjoy a seamless shopping experience." />
                <link rel="canonical" href="https://www.ulinkit.com/contact-us" />
            </Helmet>
            <section className='flexcol-start wh home'>
                <div className="contactus">
                    <h1 className="heading5">Contact Us</h1>
                    <h2 className='heading2'>Our support team is ready to help. Use one of these convenient ways to reach us.</h2>
                </div>
                <section className="contactusgrid">
                    <article className="contactusitem">
                        <QuestionAnswerIcon />
                        <h1 className="heading3">Chat with us</h1>
                        <p className='heading2'>Our Customer Care team is available on Whatsapp to answer any questions you might have.</p>
                        <p className="descrip2">Monday to Saturday from 9:00am - 6:00pm (GST), UTC +4.</p>
                        <button onClick={whatsapp}>Live Chat</button>
                    </article>
                    <article className="contactusitem">
                        <CallIcon />
                        <h1 className="heading3">Talk to us</h1>
                        <p className='heading2'>You can contact us through our phone number +91 87505 18844</p>
                        <p className="descrip2">Monday to Saturday from 9:00am - 6:00pm (GST), UTC +4.</p>
                        <button>Call Us</button>
                    </article>
                    <article className="contactusitem">
                        <EmailIcon />
                        <h1 className="heading3">General inquiries</h1>
                        <p className='heading2'>For any other queries, please get in touch with us via email.</p>
                        <p onClick={email} className="descrip2" style={{cursor: 'pointer'}}>support@ulinkit.com</p>
                    </article>
                </section>
            </section>
        </Fragment>
    )
}

export default ContactUs