import React, { useState } from 'react'
import './ViewDetail.css'
import logo from '../../../../assets/logo.png'
import { SlPrinter } from "react-icons/sl";
import { Helmet } from 'react-helmet-async';

const ViewDetail = () => {
  const [invoices, setInvoices] = useState(false)
  const handleOrderCancel = (e) => {
    e.preventDefault()
    window.history.back('./orderpage')
  }
  const handleInvoice = (e) => {
    e.preventDefault()
    setInvoices(true)
  }
  const handleCross = (e) => {
    e.preventDefault()
    setInvoices(false)
  }
  //  print the page
  const handlePrinter = () => {
    window.print()
  }
  return (
    <>
      <Helmet>
        <title>Order Details | Ulinkit - View Your Order Information</title>
        <meta name="description" content="View detailed information about your order on Ulinkit. Check order status, items purchased, shipping details, and more to stay updated on your order." />
        <link rel="canonical" href="https://www.ulinkit.com/view-detail" />
      </Helmet>
      {invoices && (
        <div className='background-Changer'>
          <div className='card-methodes'>
            <div className='card-infos-bank'>
              <div className='card-title'>
                <img className='logo-main-img' src={logo} alt='logo'/>
              </div>
              <div className='card-title'>
                <SlPrinter className='cross-icon ' onClick={handlePrinter} />
              </div>
            </div>
            <div>
              <p className='dis'>Ship To:</p>
              <p className='dis paragraph-6 p-1'>Vipin Kumar</p>
              <p className='dis paragraph-6 p-1 pt'>Village chunhal near Verma</p>
              <p className='dis paragraph-6 p-1 pt'>Jhaniara, chunahal, hamirpur, Himachal Pradesh, 177001</p>
            </div>
            <div className='dashed'>
            </div>
            <div>
              <p className='dis paragraph-6 p-1'> Order Id: 54544451154454448</p>
              <p className='dis  pt '>Thank you for buying from Ulinkit.com</p>
            </div>
            <div className='invoice-border'>
              <div className='invoice-flex dis '>
                <div >
                  <p className='paragraph-4 mr-left'> Delivery Address:</p>
                  <p className='mt-top'> Vipin Kumar</p>
                  <p className='mt-top'> Village chunhal near Verma </p>
                  <p className='mt-top'>Jhaniara, chunahal, hamirpur, Himachal Pradesh, 177001</p>

                </div>
                <div >
                  <p>Order Date:</p>
                  <p className='mt-top'>Shipping Services:</p>
                  <p className='mt-top'>Buyer Name:</p>
                  <p className='mt-top'>Seller Name:</p>
                </div>
                <div >
                  <p>Thursday, Apr, 18, 2024</p>
                  <p className='mt-top'>Standard</p>
                  <p className='mt-top'>Vipin Kumar</p>
                  <p className='mt-top'>Ulink.com Outsourcing Pvt Ltd.</p>
                </div>
              </div>
            </div>
            <div className='table-data mt-top'>
              <table>
                <tbody>
                  <tr>
                    <th className='paragraph-4'>Quantity</th>
                    <th className='paragraph-4'>Product Detail</th>
                    <th className='paragraph-4'>Unit Price</th>
                    <th className='paragraph-4'>Order Total</th>
                  </tr>
                  <tr>
                    <td >1</td>
                    <td >Pusht Organic Pulses - Chana Dal, 1Kg,<br></br>
                      <span className='mr-left'>SKU:</span> POCDW1KG_N <br></br>
                      <span className='mr-left'>ASIN:</span> 5445446454 <br></br>
                      <span className='mr-left'>CONDITION:</span> New <br></br>
                      <span className='mr-left'>Order Item ID:</span>  37472045082922 <br></br>
                    </td>
                    <td>$215</td>
                    <td>
                      <div className='invoice-flex'>
                        <div className='border-bottom'>
                          <p className='bold'>Item Subtotal</p>
                          <p className='mt-top bold'>Tax</p>
                          <p className='mt-top bold'>Item Total</p>
                        </div>
                        <div>
                          <p className='bold'> $215</p>
                          <p className='mt-top bold'> $0.54</p>
                          <p className='mt-top bold'> $215.00</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='mt-top flex-ends'>
              <p className='bold'>Grand Total: $215.00</p>
            </div>
            <div className=' mt-top-2 sharing-info'>
              <p className='mt-top'> <b>Thanks for buying on Ulinkit.com Marketplace.</b> To provide feedback for the seller please visit <a href=''>http://localhost:5173/</a> To
                contact the seller, go to Your Orders in Your Account. Click the seller's name under the appropriate product. Then, in the
                "Further Information" section, click "Contact the Seller."</p>
            </div>
            <div className='dashed mt-top-2'>
            </div>
            <div className='mt-top-2 flex '>
              <p className='paragraph-4 font'>Ulinkit.com Declaration Letter
                To Whomsoever It May Concern</p>
            </div>
            <div className='table-data mt-top-2'>
              <p className='dis'> I, Vipin Kumar , have placed the order for</p>
              <table>
                <tr>
                  <th className='paragraph-4'>Quantity</th>
                  <th className='paragraph-4'>Product Detail</th>
                </tr>
                <tr>
                  <td >1</td>
                  <td >Pusht Organic Pulses - Chana Dal, 1Kg,<br></br>
                    <span className='mr-left'>SKU:</span> POCDW1KG_N <br></br>
                    <span className='mr-left'>ASIN:</span> 5445446454 <br></br>
                    <span className='mr-left'>CONDITION:</span> New <br></br>
                    <span className='mr-left'>Order Item ID:</span>  37472045082922 <br></br>
                  </td>
                </tr>
              </table>
            </div>
            <div><p className='dis paragraph-6 p-1'> Order Id: 54544451154454448</p></div>
            <div>
              <p className='dis  '>Vipin Kumar</p>
              <p className='dis   pt'>Village chunhal near Verma</p>
              <p className='dis   pt'>Jhaniara, chunahal, hamirpur, Himachal Pradesh, 177001</p>
              <p className='dis'>I hereby confirm that said above goods are being purchased for my internal or personal purpose and not for re-sale. I further
                understand and agree to Amazons Terms and Conditions of Sale available at <a href=''>http://localhost:5173/</a>  or upon request.</p>
            </div>
            <div className='add-card-btn'>
              <button className='add-bank-btns' onClick={handleCross}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      <div className='mt '>
        <div className='flex-space-beetwen position'>
          <div className='message-titles-heading1 flex mr-left'>
            <h1 className='user-title  heading-2  title-opacity '>Order <span>ULINK56565641</span></h1>
            <p className=' ml-left   quotes'>Cancelled</p>
          </div>
          <div className='message-titles-heading1 flex    '>
            <button className='create-btn btn-change dounload-invoice-btn ' onClick={handleInvoice}>DOWNLOAD INVOICES</button>
          </div>
        </div>
        <div className='order-statuses bor-1 '>
          <div className='first-dis '>
            <p className='dis '>Created Date</p>
            <p className='dis'>Payment Method</p>
            <p className='dis'>Payment Status</p>
          </div>
          <div className='second-dis'>
            <p className='dis'>Total Order</p>
          </div>
        </div>
        <div className='order-statuses bor-1 '>
          <div className='first-dis '>
            <p className='dise '>13/04/2004</p>
            <p className='dise'>*************4554</p>
            <p className='dise'>Pending</p>
          </div>
          <div className='second-dis'>
            <p className='dise'>AED 545</p>
          </div>
        </div>
        <div className='shipping-id'>
          <h3 className=''>T240413181360S1</h3>
        </div>
        <div className='order-statuses bor-1  '>
          <div className='first-dis '>
            <p className='dis '>Estimate Delivery</p>
            <p className='dis'>Shipment Method</p>
            <p className='dis'>Shipment Cost</p>
            <p className='dis'>Status</p>
          </div>
          <div className='second-dis'>
            <p className='dis'>Subtotal</p>
          </div>
        </div>
        <div className='order-statuses bor-1 '>
          <div className='first-dis '>
            <p className='dise '>03/07/2001</p>
            <p className='dise'>EXW- Ex-Work</p>
            <p className='dise'>AED 54564</p>
            <p className='dise'> Payment Cancelled</p>
          </div>
          <div className='second-dis'>
            <p className='dise'>AED 0</p>
          </div>
        </div>
        <div className='list-item order-statuses bor-1'>
          <div className='item-list'>
            <p className='dis'>Product</p>
          </div>
          <div className='item-list'>
            <div className='item-list-1'>
              <p className='dis'>Quantity</p>
              <p className='dis'>Item Price</p>
              <p className='dis'>Item Status</p>
              <p className='dis'>SKU</p>
            </div>
          </div>
          <div className='item-list'>
            <p className='dis'>Total</p>
          </div>
        </div>
        <div className='list-item  order-statuses bor-1 list-item-status'>
          <div className='item-lists'>
            <img className='rfq-image' src='https://images-na.ssl-images-amazon.com/images/I/71WGsXRgQrL._AC_UL232_SR232,232_.jpg' alt='product-ima' />
            <p className='p-width '>2024 Mobile Phones A14 pro max 6.8Inches 16GB+1TB phone 4G Smartphone Unlock Android Blue,16g x5</p>
          </div>
          <div className='item-list'>
            <div className='item-list-1 mr-right'>
              <p className='dis'>1</p>
              <p className='dis'>AED 545</p>
              <p className='dis'>Pending</p>
              <p className='dis'>MJT_41C6478C91_5</p>
            </div>
          </div>
          <div className='item-list'>
            <p className='dis'> AED 5444</p>
          </div>
        </div>
        <div className='total-order order-statuses bor-1'>
          <div className='total-orders'>
            <div className='total'>
              <p className='paragraph-6'>Subtotal</p>
              <p className='paragraph-6'>AED 0</p>
            </div>
            <div className='total'>
              <p className='paragraph-6'>Shipping</p>
              <p className='paragraph-6'>Free</p>
            </div>
            <div className='total'>
              <p className='paragraph-6'>VAT </p>
              <p className='paragraph-6'>AED 0</p>
            </div>
            <div className='total'>
              <p className='paragraph-6  p-1'> Order Total  </p>
              <p className='paragraph-6  p-1'>AED 0</p>
            </div>
          </div>
        </div>
        <div className='ShipBill order-statuses bor-1 '>
          <div className='shippingAddress '>
            <h3 className=''>Shipping Address</h3>
            <p className=' mr-top'>My Address 1</p>
            <p className='mr-top'>8884, 87, agra, 687784, Agra, India</p>
            <p className='mr-top'> +97157787848487</p>
          </div>
          <div className='BillingAddress'>
            <h3 className=''>Billing Address</h3>
            <p className=' mr-top'>My Address 1</p>
            <p className='mr-top'>8884, 87, agra, 687784, Agra, India</p>
            <p className='mr-top'> +97157787848487</p>
          </div>
        </div>
        <div className='order-statuses bor-1 mr-top'>
          <div className='shippingAddress shippingAddresses'>
            <h3 className=''>Timeline</h3>
            <div className='d-flex table'>
              <div className='d-flex  '>
                <p className=''>User</p>
                <p className='dis'>Action</p>
              </div>
              <p>Date</p>
            </div>
            <div className='d-flex table'>
              <div className='d-flex'>
                <p>Buyer</p>
                <p className='dis '>Order initiated</p>
              </div>
              <p>13 Apr 2024</p>
            </div>
            <div className='d-flex table'>
              <div className='d-flex'>
                <p>System</p>
                <p className='dis paragraph-4 product-info-p'>"2024 Mobile Phones A14 pro max 6.8Inches 16GB+1TB phone 4G Smartphone Unlock Android Blue,16g" status changed to<br></br> Canceled
                  because This order was cancelled as the payment was not shipment T240413181360S1</p>
              </div>
              <p>14 Apr 2024</p>
            </div>
            <div className='d-flex'>
              <div className='d-flex'>
                <p>System</p>
                <p className='dis '>Order Status Changed Canceled</p>
              </div>
              <p>14 Apr 2024</p>
            </div>
          </div>
        </div>
        <div className=' add-card-btn subcanc  right'>
          <button type='submit' className='add-bank-btns cancel' onClick={handleOrderCancel}> CANCEL</button>
        </div>
      </div>
    </>
  )
}
export default ViewDetail