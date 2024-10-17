import React, { Fragment, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { v4 as uuidv4 } from 'uuid';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PaymentsIcon from '@mui/icons-material/Payments';
import './Guidelines/Guidelines.css';


const PaymentMethod = () => {

    const [activeIndex, setActiveIndex] = useState(null);
    const toggleGuideAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqs = [
        {
            id: uuidv4(),
            title: 'What is an Installment payment method?',
            panel: (<div>
                <p className='heading2 headMargin'>An installment payment method is enabling you to pay your Tradeling.com purchase in installments. The minimum order value to qualify for an installment payment is 500 AED or more, subject to your bank’s terms and conditions. There might be processing fees and interest charges applicable for the installment period of your choice subject to your bank’s terms and conditions. Pay for orders on Tradeling.com in super easy monthly installments, as long as you have a credit card from any of these banks:</p>
                <p className='heading2 headMargin'>ENBD, ADCB, FAB, Dubai First, Mawarid Finance, RAK, Al Hilal, CBD, Emirates Islamic, Dubai Islamic Bank, Deem Finance LLC, Standard Chartered Bank, Ajman Bank, Arab Bank UAE</p>
            </div>),
        },
        {
            id: uuidv4(),
            title: 'Which banks are supported Installment?',
            panel: (<div>
                <p className='heading2 headMargin'>ENBD, ADCB, FAB, Dubai First, Mawarid Finance, RAK, Al Hilal, CBD, Emirates Islamic, Dubai Islamic Bank, Deem Finance LLC, Standard Chartered Bank, Ajman Bank, Arab Bank UAE</p>
            </div>),
        },
        {
            id: uuidv4(),
            title: 'Do I need to contact my bank?',
            panel: (<div>
                <p className='heading2 headMargin'>No, you do not need to contact your bank when requesting an instalment payment plan via Tradeling.com. Your bank will contact you, post your instalment payment request subject to their terms and conditions. </p>
            </div>),
        },
        {
            id: uuidv4(),
            title: 'Can I pay with prepaid cards, bank transfers & cash on delivery to get the installment payment plan?',
            panel: (<div>
                <p className='heading2 headMargin'>No, you cannot. The installment payment plan is only applicable for the credit card payment method.</p>
            </div>),
        },
        {
            id: uuidv4(),
            title: 'What if I return the item? Will I get a full refund?',
            panel: (<div>
                <p className='heading2 headMargin'>You will be refunded subject to our return and refund policy. <a href="/return-policy" className='hoverr'>Click here</a> to know more. </p>
            </div>),
        },
        {
            id: uuidv4(),
            title: 'What happens if I cancel the order I paid by an installment payment plan?',
            panel: (<div>
                <p className='heading2 headMargin'>If your products are eligible for a refund subject to our return and refund policy, we will be able to process your request. However, you need to contact your bank for installment-specific queries. </p>
            </div>),
        },
        {
            id: uuidv4(),
            title: 'How long will it take the bank to process my request?',
            panel: (<div>
                <p className='heading2 headMargin'>The banks will need about 7-9 working days to process your request, subject to your banks’ policies. The amount you have requested will first be taken from your credit card. once the installment payment has been approved your next statement will be altered to pay the amount in installments.</p>
            </div>),
        },
        {
            id: uuidv4(),
            title: 'Can I use discount coupons along with an Installment plan?',
            panel: (<div>
                <p className='heading2 headMargin'>Yes ,you can.</p>
            </div>),
        },
        {
            id: uuidv4(),
            title: 'Can I use installment payment on promotion and offer items?',
            panel: (<div>
                <p className='heading2 headMargin'>Installment payment can be used on all orders that meet the minimum order value of AED 500 or more, subject to your bank’s terms and conditions.</p>
            </div>),
        },
        {
            id: uuidv4(),
            title: 'Are there penalties if I dont pay my bank installments on time?',
            panel: (<div>
                <p className='heading2 headMargin'>Each bank has different terms and conditions, hence we will advise you to contact the bank directly.</p>
            </div>),
        },
        {
            id: uuidv4(),
            title: 'What is the interest rate and processing fees for installment payments?',
            panel: (<div>
                <p className='heading2 headMargin'>Please refer to your bank’s terms and conditions.</p>
            </div>),
        },
        {
            id: uuidv4(),
            title: 'What are the processing fees?',
            panel: (<div>
                <p className='heading2 headMargin'>Banks do charge a nominal fee but in some cases they may not. Please check with your bank and review their terms and conditions.</p>
            </div>),
        },
        {
            id: uuidv4(),
            title: 'Is the processing fee a one time fee or how often would I be charged?',
            panel: (<div>
                <p className='heading2 headMargin'>A processing fee is a one-time charge. Please check with your bank and review their terms and conditions. </p>
            </div>),
        },
        {
            id: uuidv4(),
            title: 'Are there any fees involved other than the processing fee and applicable interest?',
            panel: (<div>
                <p className='heading2 headMargin'>No, but please check with your bank and review their terms and conditions for more information. </p>
            </div>),
        },
        {
            id: uuidv4(),
            title: 'What happens if I cancel my credit card post installment plan activation?',
            panel: (<div>
                <p className='heading2 headMargin'>Please check with your bank and review their terms and conditions. </p>
            </div>),
        },
        {
            id: uuidv4(),
            title: 'What are the tenure options and the processing fees available for an installment payment plan on my credit card?',
            panel: (<div>
                <p className='heading2 headMargin'>Tenure options, as well as processing fees, vary depending on your bank. Please check with your bank and review their terms and conditions. </p>
            </div>),
        },
        {
            id: uuidv4(),
            title: 'How will I know if my purchase transaction has been transferred to an installment payment plan?',
            panel: (<div>
                <p className='heading2 headMargin'>We recommend that you read your bank’s terms and conditions but you can expect to receive confirmation of the installment plan of your bank </p>
            </div>),
        },
        {
            id: uuidv4(),
            title: 'Can I apply for more than one installment payment plan at the same time?',
            panel: (<div>
                <p className='heading2 headMargin'>Yes, you can apply for multiple installment payment plans (one per purchase) at the same but approval is subject to your bank’s terms and conditions. </p>
            </div>),
        },
        {
            id: uuidv4(),
            title: 'Terms and Conditions of Installments',
            panel: (<div>
                <p className='heading2 headMargin'>The following terms & conditions apply to any transactions made using Instalment as a payment option on Tradeling.com.

                    Tradeling allows Instalments payment method on all purchases on Tradeling.com meeting the minimum order value, using eligible credit cards. Your issuing bank facilitates the Instalment payment method.

                    If your bank rejects your request, the order will not be converted into an Instalment payment plan and you will be charged to your Credit Card. </p>
                <p className='heading2 headMargin'>Installments are not available on purchases made using Debit cards, Bank Transfers and Cash on Delivery payment methods. </p>
                <p className="heading2 headMargin">Installments are offered by the respective banks to the customer and Tradeling has no role to play in the approval, extension, pricing, modification, pre-closure, closure or any matter incidental thereto pertaining to offering of the Instalment, which is decided at the sole discretion of the bank. </p>
                <p className='heading2 headMargin'>Installments being offered by the banks to the customers is governed by the respective terms and conditions of each bank/issuer and the customer is advised to approach the bank/issuer in case of any complaint, dispute or inquiry about an Instalment transaction.Tradeling.com on a best effort basis displays representative Instalment related information (Instalment amount, Interest rate charged, Total amount payable) for the customer's purchase on its website as per the information shared with it by the respective banks on an "AS IS" basis. Banks/Issuers are the authoritative sources of this information and customers are advised to directly contact their bank/issuer for any further clarifications in this regard. For more information, we request you to review the terms and conditions of the respective banks offering such an Installment facility.
                </p>
            </div>),
        }
    ];


    return (
        <Fragment>
            <Helmet>
                <title>Ulinkit - Your Global Marketplace for Products and Services</title>
                <meta name="description" content="Discover a world of products and services on Ulinkit. Shop from various categories, explore deals, and enjoy a seamless shopping experience." />
                <link rel="canonical" href="https://www.ulinkit.com/payment-method" />
            </Helmet>
            <section className="sourceBanner" style={{ background: '#003953' }}>
                <article className="sourceText ">
                    <h1 className="heading4">Payment methods</h1>
                    <h2 className="heading" style={{ color: 'white' }}>A variety of options to suit your business needs</h2>
                </article>
                <div className="sourceImg">
                    <img src="https://res.cloudinary.com/dey1tujp8/image/upload/v1729157962/Ulinkit/pngwing.com_ivzgbk.png" alt="payment-method" />
                </div>
            </section>

            <div className='valuediv'>
                <h1 className="heading5" style={{ color: '#003953' }}>Payment method options</h1>

                <section className="valuegrid">
                    <article className="valuegriditem">
                        <div className="valueicon"><CreditCardIcon /></div>
                        <div className="vlauetext">
                            <h1 className="heading3">Credit & Debit Cards</h1>
                            <h2 className="heading2">Pay with bank card. Fast and secure.</h2>
                        </div>
                    </article>
                    <article className="valuegriditem">
                        <div className="valueicon"><LocalShippingIcon /></div>
                        <div className="vlauetext">
                            <h1 className="heading3">Cash on Delivery</h1>
                            <h2 className="heading2">Pay on delivery - available on a wide range products</h2>
                        </div>
                    </article>
                    <article className="valuegriditem">
                        <div className="valueicon"><AccountBalanceIcon /></div>
                        <div className="vlauetext">
                            <h1 className="heading3">Bank Transfer</h1>
                            <h2 className="heading2">Pay by bank transfer, direct from your accounts to ours.</h2>
                        </div>
                    </article>
                    <article className="valuegriditem">
                        <div className="valueicon"><PaymentsIcon /></div>
                        <div className="vlauetext">
                            <h1 className="heading3">Razorpay or Paypal</h1>
                            <h2 className="heading2">Both payment options are safe, secure, and private way to pay.</h2>
                        </div>
                    </article>
                </section>

                <div className="valueimages">
                    <img src="https://c8n.tradeling.com/img/plain/cms/rs:auto:1600::0/f:webp/q:90/Tamara_Divider_CLP_1232x180_Desktop_b4fe309d7c.png" alt="" />
                    <img src="https://c8n.tradeling.com/img/plain/cms/rs:auto:1600::0/f:webp/q:90/Credit_line_Divider_CLP_1232x250_Desktop_eb6a2c9b99.png" alt="" />
                    <img src="https://c8n.tradeling.com/img/plain/cms/rs:auto:1600::0/f:webp/q:90/Installments_Divider_CLP_1232x250_Desktop_Divider_CLP_1232x180_Desktop_bf5d529c43.png" alt="" />
                    <img src="https://c8n.tradeling.com/img/plain/cms/rs:auto:1600::0/f:webp/q:90/Credit_and_Debit_Cards_Divider_CLP_1232x180_Desktop_3a14cd716e.png" alt="" />
                    <img src="https://c8n.tradeling.com/img/plain/cms/rs:auto:1600::0/f:webp/q:90/Bank_Transfer_Divider_CLP_1232x180_Desktop_a4c6ab9c41.png" alt="" />
                    <img src="https://c8n.tradeling.com/img/plain/cms/rs:auto:1600::0/f:webp/q:90/Cash_on_delivery_Divider_CLP_1232x180_Desktop_1ae4aa18cf.png" alt="" />
                    <img src="https://c8n.tradeling.com/img/plain/cms/rs:auto:1600::0/f:webp/q:90/Apple_Pay_Divider_CLP_1232x180_Desktop_83a58a4057.png" alt="" />
                </div>
            </div>

            <div className='bankdiv'>
                <h1 className="heading5" style={{ color: '#003953' }}>Supported Banks for installments</h1>

                <section className='bankgrid'>
                    <article className='bankgriditem'>
                        <img src="https://m.economictimes.com/thumb/msid-110010096,width-1200,height-900,resizemode-4,imgsize-14062/esaf-small-finance-bank-q4-results-net-profit-plunges-57-yoy-to-rs-43-crore.jpg" alt="" />
                        <a href="#" target='_blank' className='hoverr'>Read T&Cs</a>
                    </article>
                    <article className='bankgriditem'>
                        <img src="https://m.economictimes.com/thumb/msid-110010096,width-1200,height-900,resizemode-4,imgsize-14062/esaf-small-finance-bank-q4-results-net-profit-plunges-57-yoy-to-rs-43-crore.jpg" alt="" />
                        <a href="#" target='_blank' className='hoverr'>Read T&Cs</a>
                    </article>
                    <article className='bankgriditem'>
                        <img src="https://m.economictimes.com/thumb/msid-110010096,width-1200,height-900,resizemode-4,imgsize-14062/esaf-small-finance-bank-q4-results-net-profit-plunges-57-yoy-to-rs-43-crore.jpg" alt="" />
                        <a href="#" target='_blank' className='hoverr'>Read T&Cs</a>
                    </article>
                    <article className='bankgriditem'>
                        <img src="https://m.economictimes.com/thumb/msid-110010096,width-1200,height-900,resizemode-4,imgsize-14062/esaf-small-finance-bank-q4-results-net-profit-plunges-57-yoy-to-rs-43-crore.jpg" alt="" />
                        <a href="#" target='_blank' className='hoverr'>Read T&Cs</a>
                    </article>
                    <article className='bankgriditem'>
                        <img src="https://m.economictimes.com/thumb/msid-110010096,width-1200,height-900,resizemode-4,imgsize-14062/esaf-small-finance-bank-q4-results-net-profit-plunges-57-yoy-to-rs-43-crore.jpg" alt="" />
                        <a href="#" target='_blank' className='hoverr'>Read T&Cs</a>
                    </article>
                    <article className='bankgriditem'>
                        <img src="https://m.economictimes.com/thumb/msid-110010096,width-1200,height-900,resizemode-4,imgsize-14062/esaf-small-finance-bank-q4-results-net-profit-plunges-57-yoy-to-rs-43-crore.jpg" alt="" />
                        <a href="#" target='_blank' className='hoverr'>Read T&Cs</a>
                    </article>
                    <article className='bankgriditem'>
                        <img src="https://m.economictimes.com/thumb/msid-110010096,width-1200,height-900,resizemode-4,imgsize-14062/esaf-small-finance-bank-q4-results-net-profit-plunges-57-yoy-to-rs-43-crore.jpg" alt="" />
                        <a href="#" target='_blank' className='hoverr'>Read T&Cs</a>
                    </article>
                    <article className='bankgriditem'>
                        <img src="https://m.economictimes.com/thumb/msid-110010096,width-1200,height-900,resizemode-4,imgsize-14062/esaf-small-finance-bank-q4-results-net-profit-plunges-57-yoy-to-rs-43-crore.jpg" alt="" />
                        <a href="#" target='_blank' className='hoverr'>Read T&Cs</a>
                    </article>
                    <article className='bankgriditem'>
                        <img src="https://m.economictimes.com/thumb/msid-110010096,width-1200,height-900,resizemode-4,imgsize-14062/esaf-small-finance-bank-q4-results-net-profit-plunges-57-yoy-to-rs-43-crore.jpg" alt="" />
                        <a href="#" target='_blank' className='hoverr'>Read T&Cs</a>
                    </article>
                    <article className='bankgriditem'>
                        <img src="https://m.economictimes.com/thumb/msid-110010096,width-1200,height-900,resizemode-4,imgsize-14062/esaf-small-finance-bank-q4-results-net-profit-plunges-57-yoy-to-rs-43-crore.jpg" alt="" />
                        <a href="#" target='_blank' className='hoverr'>Read T&Cs</a>
                    </article>
                </section>
            </div>

            <article className="bankdiv">
                <h1 className="heading5" style={{ color: '#003953' }}>Frequently asked questions</h1>
                <div className="flexcol wh">
                    {
                        faqs.map((item, index) => (
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
            </article>

        </Fragment>
    )
}

export default PaymentMethod