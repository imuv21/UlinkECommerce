import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExchangeRates } from '../../Redux/currencySlice';
import { fetchPaymentDetails } from '../../Redux/paymentMethods';
import { fetchAddresses } from '../../Redux/addressSlice';
import { setSelectedAddress } from '../../Redux/selectedAddress';
import { setSelectedPaymentMethod } from '../../Redux/selectedPaymentMethod';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import currencySymbols from '../../components/Schemas/currencySymbols';

import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import SailingIcon from '@mui/icons-material/Sailing';
import PaymentIcon from '@mui/icons-material/Payment';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import NewReleasesIcon from '@mui/icons-material/NewReleases';

const RAZORPAY_API_KEY = import.meta.env.VITE_RAZORPAY_API_KEY;

const Checkout = () => {

  const dispatch = useDispatch();
  const { totalSellPrice, totalSellGstPrice, currency, currencySymbol } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const selectedCurrency = useSelector(state => state.currency.selectedCurrency);
  const exchangeRates = useSelector(state => state.currency.exchangeRates);
  const subTotal = totalSellPrice + totalSellGstPrice;

  useEffect(() => {
    dispatch(fetchExchangeRates());
  }, [dispatch]);

  const convertPrice = (price, fromCurrency) => {
    const rate = exchangeRates[selectedCurrency];
    if (!rate) return price;
    const priceInUSD = price / exchangeRates[fromCurrency];
    return (priceInUSD * rate).toFixed(2);
  };
  const [subCurrentPage, setsubCurrentPage] = useState(1);
  const handleSubPageChange = (subPageNumber) => {
    setsubCurrentPage(subPageNumber);
  };



  //addresss
  const addresses = useSelector(state => state.address.addresses);
  const selectedAddress = useSelector(state => state.selectedAddress.address);
  const [selectedBillingAddress, setSelectedBillingAddress] = useState(null);
  const shippingAddresses = addresses.filter(address => address.isLocationChecked);
  const selectedShippingAddress = selectedAddress && selectedAddress.isLocationChecked ? selectedAddress : shippingAddresses.find(addr => addr.isDefaultChecked) || shippingAddresses[0];

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  useEffect(() => {
    if (addresses.length > 0 && !selectedAddress) {
      const defaultAddress = addresses.find(addr => addr.isDefaultChecked);
      dispatch(setSelectedAddress(defaultAddress || addresses[0]));
    }
  }, [addresses, selectedAddress, dispatch]);

  useEffect(() => {
    if (selectedShippingAddress && (selectedShippingAddress.isBillingChecked && selectedShippingAddress.isLocationChecked)) {
      setSelectedBillingAddress(null);
    }
  }, [selectedShippingAddress]);

  const handleAddressChange = (address) => {
    dispatch(setSelectedAddress(address));
  };

  const handleAddressShippingChange = (event) => {
    const address = shippingAddresses.find(addr => addr.address === event.target.value);
    handleAddressChange(address);
  };

  const handleAddressBillingChange = (event) => {
    const address = addresses.find(addr => addr.address === event.target.value);
    setSelectedBillingAddress(address);
  };



  //cards 
  const { bankDetails, upiDetails, cardDetails, loading, error } = useSelector((state) => state.paymentMethods);
  const selectedPaymentMethod = useSelector((state) => state.selectedPaymentMethod.paymentMethod);
  const [selectedCard, setSelectedCard] = useState({});
  const [selectedBank, setSelectedBank] = useState({});
  const [selectedUpi, setSelectedUpi] = useState({});

  useEffect(() => {
    dispatch(fetchPaymentDetails());
  }, [dispatch]);

  useEffect(() => {
    if (selectedPaymentMethod) {
      switch (selectedPaymentMethod.type) {
        case 'card':
          setSelectedCard(selectedPaymentMethod.data);
          break;
        case 'bank':
          setSelectedBank(selectedPaymentMethod.data);
          break;
        case 'upi':
          setSelectedUpi(selectedPaymentMethod.data);
          break;
        default:
          break;
      }
    }
  }, [selectedPaymentMethod]);

  const handleCardChange = (event) => {
    const selectedCardData = cardDetails.find(
      (card) => card.fullname === event.target.value
    );
    setSelectedCard(selectedCardData || {});
    dispatch(setSelectedPaymentMethod({ type: 'card', data: selectedCardData || {} }));
  };

  const cardSubmit = () => {
    alert("Card Submitted");
  }

  const netbankingSubmit = () => {
    alert("Netbanking Submitted");
  }

  const upiSubmit = () => {
    alert("Upi Submitted");
  }

  const handleBankChange = (event) => {
    const selectedBankData = bankDetails.find(
      (bank) => bank.accHolderName === event.target.value
    );
    setSelectedBank(selectedBankData || {});
    dispatch(setSelectedPaymentMethod({ type: 'bank', data: selectedBankData || {} }));
  };

  const handleUpiChange = (event) => {
    const selectedUpiData = upiDetails.find(
      (upis) => upis.upi === event.target.value
    );
    setSelectedUpi(selectedUpiData || {});
    dispatch(setSelectedPaymentMethod({ type: 'upi', data: selectedUpiData || {} }));
  };

  const scrollRef = useRef(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.focus();
    }
  }, []);


  //razorpay
  const [selectedPaymentOption, setSelectedPaymentOption] = useState('card');

  const razorpayHandler = async () => {
    try {
      if (!selectedShippingAddress || !selectedShippingAddress.id) {
        throw new Error("Shipping address or address ID is undefined");
      }
      const addressId = selectedShippingAddress.id;
      if (isNaN(Number(addressId))) {
        throw new Error("Invalid address ID format. It should be a numeric value.");
      }
      if (!currency) {
        throw new Error("Currency is undefined");
      }

      const response = await axios.post(`https://api.ulinkit.com/api/place-order?currency=${encodeURIComponent(currency)}&address=${encodeURIComponent(addressId)}&gateway=RAZORPAY`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const order = response.data.data;

      const options = {
        key: RAZORPAY_API_KEY,
        // amount: order.amount,
        // currency: order.currency,
        name: `${user.firstname} ${user.lastname}`,
        description: "Test Transaction",
        image: "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
        order_id: order.orderId,
        handler: handleRazorpayCallback,

        prefill: {
          name: `${user.firstname} ${user.lastname}`,
          email: user.email,
          contact: user.number
        },
        notes: {
          address: selectedShippingAddress
        },
        theme: {
          color: "#00aaff"
        },
        modal: {
          escape: false,
          ondismiss: () => {
            toast(<div className='toaster'> < NewReleasesIcon /> Payment failed</div>, { duration: 3000, position: 'top-center', style: { padding: '3px', color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
          }
        }
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error('Error in razorpay gateway', error);
    }
  };
  const handleRazorpayCallback = async (response) => {
    console.log(response);
    try {
      await axios.post('https://api.ulinkit.com/api/payment/callback', {
        paymentId: response.razorpay_payment_id,
        orderId: response.razorpay_order_id,
        signature: response.razorpay_signature
      }, {
        params: {
          gateway: 'RAZORPAY'
        }
      });
      setPaymentStatus('success');
    } catch (error) {
      console.error('Error handling Razorpay callback', error);
      setPaymentStatus('error');
    }
  };

  const paypalHandler = async () => {
    try {

      if (!selectedShippingAddress || !selectedShippingAddress.id) {
        throw new Error("Shipping address or address ID is undefined");
      }
      const addressId = selectedShippingAddress.id;
      if (isNaN(Number(addressId))) {
        throw new Error("Invalid address ID format. It should be a numeric value.");
      }
      if (!currency) {
        throw new Error("Currency is undefined");
      }

      const responsePaypal = await axios.post(`https://api.ulinkit.com/api/place-order?currency=${encodeURIComponent(currency)}&address=${encodeURIComponent(addressId)}&gateway=PAYPAL`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (responsePaypal && responsePaypal.data) {
        console.log("Full Response Data:", responsePaypal.data);
        let link = responsePaypal.data.data.url;
        console.log("Link:", link);
        if (link) {
          window.open(link, '_self');
        } else {
          console.error("No approval URL returned");
        }
      } else {
        console.error("No data returned from API");
      }
    } catch (error) {
      console.error("Payment Error: ", error.response ? error.response.data : error.message);
    }
  };

  const handlePaymentClick = () => {
    const PaymentAmount = subTotal;
    const PaymentCurrency = currency;

    if (selectedPaymentOption === 'paypal') {
      paypalHandler(PaymentAmount, PaymentCurrency);
    } else if (selectedPaymentOption === 'razorpay') {
      razorpayHandler(PaymentAmount, PaymentCurrency);
    } else if (selectedPaymentOption === 'card') {
      cardSubmit();
    } else if (selectedPaymentOption === 'netbanking') {
      netbankingSubmit();
    } else if (selectedPaymentOption === 'upi') {
      upiSubmit();
    } else {
      razorpayHandler(PaymentAmount, PaymentCurrency);
    }
  };


  //private data 
  const maskText = (text) => {
    if (text.length <= 4) {
      return text;
    }
    const maskedLength = text.length - 4;
    const maskedPart = '*'.repeat(maskedLength);
    const visiblePart = text.slice(-4);
    return maskedPart + visiblePart;
  };



  return (
    <div className="flexcol wh cart_page">
      <Helmet>
        <title>Checkout | Ulinkit - Complete Your Purchase Securely</title>
        <meta name="description" content="Finalize your purchase on Ulinkit with our secure checkout process. Review your order, enter payment details, and confirm shipping information for a smooth transaction." />
        <link rel="canonical" href="https://www.ulinkit.com/checkout" />
      </Helmet>
      <article className="flex wh">
        <h1 className="heading wh">Checkout</h1>
      </article>


      <div className="cart_cont wh">

        <article className="cartcol_one" tabIndex={0} ref={scrollRef}>
          <section className="webdiv checkout">

            <h1 className="heading wh">Your addresses</h1>
            <h2 className="heading3 wh">Shipping address</h2>

            <select className='coupon' value={selectedShippingAddress?.address || ''} onChange={handleAddressShippingChange} disabled={selectedShippingAddress && selectedBillingAddress}>
              <option value=''>Select shipping address</option>
              {shippingAddresses.map((address, index) => (
                <option key={index} value={address.address}>
                  {address.address}
                </option>
              ))}
            </select>
            {selectedShippingAddress && (
              <div className="flexcol-start wh" style={{ gap: '2px' }}>
                <div className="flex" style={{ gap: '20px' }}>
                  <div className="heading3">{selectedShippingAddress.address}</div>
                  {selectedShippingAddress.isLocationChecked && <div className='descrip warning-btn'>Shipping</div>}
                  {selectedShippingAddress.isBillingChecked && <div className='descrip warning-btn2'>Billing</div>}
                </div>
                <div className="flex" style={{ gap: '10px' }}>
                  <p className='descrip2'>{selectedShippingAddress.selectedOrigin}</p>
                  <p className='descrip2'>{selectedShippingAddress.city}</p>
                  <p className='descrip2'>{selectedShippingAddress.area}</p>
                  <p className='descrip2'>{selectedShippingAddress.street}</p>
                  <p className='descrip2'>{selectedShippingAddress.office}</p>
                  <p className='descrip2'>Pobox: {selectedShippingAddress.pobox}</p>
                  <p className='descrip2'>Post code: {selectedShippingAddress.postCode}</p>
                </div>
                <div className="flex" style={{ gap: '20px' }}>
                  <div className='flex'><LocalPhoneIcon style={{ height: '15px', width: '15px' }} />&nbsp;&nbsp;{selectedShippingAddress.phoneNumber}</div>
                  <div className='flex'><LocalAirportIcon style={{ height: '15px', width: '15px' }} />&nbsp;&nbsp;{selectedShippingAddress.airport}</div>
                  <div className='flex'><SailingIcon style={{ height: '15px', width: '15px' }} />&nbsp;&nbsp;{selectedShippingAddress.seaport}</div>
                </div>
              </div>
            )}

            {selectedShippingAddress && !(selectedShippingAddress.isBillingChecked && selectedShippingAddress.isLocationChecked) && (
              <>
                <h3 className="heading3 wh">Billing address</h3>
                <select className='coupon' id="billingAddressSelect" value={selectedBillingAddress?.address || ''} onChange={handleAddressBillingChange} disabled={!selectedShippingAddress || selectedBillingAddress}>
                  <option value=''>Select billing address</option>
                  {addresses.filter(address => address.isBillingChecked).map((address, index) => (
                    <option key={index} value={address.address}>
                      {address.address}
                    </option>
                  ))}
                </select>
              </>
            )}
            {selectedBillingAddress && (
              <div className="flexcol-start wh" style={{ gap: '2px' }}>
                <div className="flex" style={{ gap: '20px' }}>
                  <div className="heading3">{selectedBillingAddress.address}</div>
                  {selectedBillingAddress.isBillingChecked && <div className='descrip warning-btn2'>Billing</div>}
                </div>
                <div className="flex" style={{ gap: '10px' }}>
                  <p className='descrip2'>{selectedBillingAddress.selectedOrigin}</p>
                  <p className='descrip2'>{selectedBillingAddress.city}</p>
                  <p className='descrip2'>{selectedBillingAddress.area}</p>
                  <p className='descrip2'>{selectedBillingAddress.street}</p>
                  <p className='descrip2'>{selectedBillingAddress.office}</p>
                  <p className='descrip2'>Pobox: {selectedBillingAddress.pobox}</p>
                  <p className='descrip2'>Post code: {selectedBillingAddress.postCode}</p>
                </div>
                <div className="flex" style={{ gap: '20px' }}>
                  <div className='flex'><LocalPhoneIcon style={{ height: '15px', width: '15px' }} />&nbsp;&nbsp;{selectedBillingAddress.phoneNumber}</div>
                  <div className='flex'><LocalAirportIcon style={{ height: '15px', width: '15px' }} />&nbsp;&nbsp;{selectedBillingAddress.airport}</div>
                  <div className='flex'><SailingIcon style={{ height: '15px', width: '15px' }} />&nbsp;&nbsp;{selectedBillingAddress.seaport}</div>
                </div>
              </div>
            )}

          </section>

          <section className="checkout webdiv">
            <h1 className="heading wh">Choose a payment method</h1>
            <div className="flex-start wh" style={{ gap: '20px' }}>
              <button onClick={() => { handleSubPageChange(1); setSelectedPaymentOption('card') }} className={subCurrentPage === 1 ? 'payment-active payment-btn' : 'payment-btn'}><div className="heading2">Card</div></button>
              <button onClick={() => { handleSubPageChange(2); setSelectedPaymentOption('netbanking') }} className={subCurrentPage === 2 ? 'payment-active payment-btn' : 'payment-btn'}><div className="heading2">Net banking</div></button>
              <button onClick={() => { handleSubPageChange(3); setSelectedPaymentOption('upi') }} className={subCurrentPage === 3 ? 'payment-active payment-btn' : 'payment-btn'}><div className="heading2">UPI</div></button>
              <button onClick={() => handleSubPageChange(4)} className={subCurrentPage === 4 ? 'payment-active payment-btn' : 'payment-btn'}><div className="heading2">Other Gateways</div></button>
            </div>
          </section>

          {subCurrentPage === 1 && (
            <section className="checkout webdiv">
              <h1 className="heading3 wh">Card Details</h1>
              {/* <select className='coupon' value={selectedCard.fullname || ''} onChange={handleCardChange}>
                <option value=''>Select a card</option>
                {cardDetails.map((card, index) => (
                  <option key={index} value={card.fullname}>
                    {card.fullname}
                  </option>
                ))}
              </select>
              {selectedCard?.fullname && (
                <div className='flex-start wh' style={{ gap: '20px' }}>
                  <CreditCardIcon style={{ width: '17px', color: 'gray' }} />
                  <p className='descrip2'>{selectedCard.fullname}</p>
                  <div className="descrip2">{maskText(selectedCard.cardNumber)}</div>
                  <div className="descrip2">{selectedCard.expiryDate}</div>
                </div>
              )} */}
              <form className='netbanking'>
                <input className='box flex' type="text" placeholder='Enter cardholder name' autoComplete='off' />
                <input className='box flex' type="text" placeholder='Enter card number' autoComplete='off' />
                <input className='box flex' type="text" placeholder='Enter expiry date' autoComplete='off' />
                <input className='box flex' type="password" placeholder='Enter CVV' autoComplete='off' />
              </form>
            </section>
          )}

          {subCurrentPage === 2 && (
            <section className="checkout webdiv">
              <h1 className="heading3 wh">Bank Account Details</h1>
              {/* <select className='coupon' value={selectedBank.accHolderName || ''} onChange={handleBankChange}>
                <option value=''>Select an account</option>
                {bankDetails.map((bank, index) => (
                  <option key={index} value={bank.accHolderName}>
                    {bank.accHolderName}
                  </option>
                ))}
              </select>
              {selectedBank?.accHolderName && (
                <div className='flex-start wh' style={{ gap: '20px' }} >
                  <AccountBalanceIcon style={{ width: '17px', color: 'gray' }} />
                  <p className='descrip2'>{selectedBank.accHolderName}</p>
                  <div className="descrip2">{maskText(selectedBank.accNo)}</div>
                  <div className="descrip2">{selectedBank.bankName}</div>
                  <div className="descrip2">{selectedBank.bankLocation}</div>
                  <div className="descrip2">{selectedBank.ifsc}</div>
                  <div className="descrip2">{selectedBank.swiftBIC}</div>
                  <div className="descrip2">{selectedBank.iban}</div>
                </div>
              )} */}
              <form className='netbanking'>
                <select className='box flex' id='bankSelection' name='bankSelection'>
                  <option value=''>Select your bank</option>
                  <option value='bank1'>Bank 1</option>
                  <option value='bank2'>Bank 2</option>
                </select>
                <input className='box flex' type='text' placeholder='Enter account number' name='accountNumber' autoComplete='off' />
                <input className='box flex' type='text' placeholder='Enter account holder name' name='accountHolderName' autoComplete='off' />
                <input className='box flex' type='text' placeholder='Enter user ID/customer ID' name='userID' autoComplete='off' />
                <input className='box flex' type='password' placeholder='Enter transaction password' name='transactionPassword' autoComplete='off' />
              </form>
            </section>
          )}

          {subCurrentPage === 3 && (
            <section className="checkout webdiv">
              <h1 className="heading3 wh">UPI Detail</h1>
              {/* <select className='coupon' value={selectedUpi.upi || ''} onChange={handleUpiChange}>
                <option value=''>Select a UPI</option>
                {upiDetails.map((upis, index) => (
                  <option key={index} value={upis.upi}>
                    {upis.upi}
                  </option>
                ))}
              </select>
              {selectedUpi?.upi && (
                <div className='flex-start wh' style={{ gap: '20px' }} >
                  <img src='https://res.cloudinary.com/dey1tujp8/image/upload/v1718266152/upi-id.1024x1024_xm8kjf.png' style={{ width: '17px', color: 'gray' }} alt='upi' />
                  <p className='descrip2'>{selectedUpi.upi}</p>
                </div>
              )} */}
              <form className='netbanking'>
                <input className='box flex' type='text' placeholder='Enter UPI ID' name='upiId' autoComplete='off' />
              </form>
            </section>
          )}

          {subCurrentPage === 4 && (
            <section className="checkout webdiv">
              <h1 className="heading3 wh">Other Gateways</h1>
              <div className="payop-box">
                <div className={`payment-option ${selectedPaymentOption === 'razorpay' ? 'selected' : ''}`} onClick={() => setSelectedPaymentOption('razorpay')}>
                  <img src="https://res.cloudinary.com/dey1tujp8/image/upload/v1720262856/pngwing.com_pcirhd.png" alt="Razorpay" />
                </div>
                <div className={`payment-option ${selectedPaymentOption === 'paypal' ? 'selected' : ''}`} onClick={() => setSelectedPaymentOption('paypal')}>
                  <img src="https://res.cloudinary.com/dey1tujp8/image/upload/v1720262856/pngwing.com_1_mjjcxi.png" alt="Paypal" />
                </div>
              </div>
            </section>
          )}
        </article>

        <div className="cartcol_two">
          <article className="sel-box" style={{ gap: '10px' }}>
            <div className="flex wh bbottom" style={{ padding: '10px 0px' }}>
              <h1 className="heading3">Order Summary</h1>
            </div>
            <div className="flex wh" style={{ padding: '10px 0px', gap: '10px' }}>
              <input type="text" placeholder='Enter coupon code' className='coupon' /> <button className='btn couponbtn flex'>Apply</button>
            </div>
            <div className="flexcol wh" style={{ gap: '10px' }}>
              <div className="flex wh" style={{ justifyContent: 'space-between' }}>
                <div className="heading2">Total Price</div>
                <div className="heading2">{currencySymbol} {Number(totalSellPrice).toFixed(2)} {currency}</div>
              </div>
              <div className="flex wh" style={{ justifyContent: 'space-between' }}>
                <div className="heading2">Shipping</div>
                <div className="heading2">Null</div>
              </div>
              <div className="flex wh" style={{ justifyContent: 'space-between' }}>
                <div className="heading2">Total Tax</div>
                <div className="heading2">{currencySymbol} {Number(totalSellGstPrice).toFixed(2)} {currency}</div>
              </div>
            </div>
            <div className="flex wh topbottom" style={{ justifyContent: 'space-between', padding: '10px 0px' }}>
              <div className="heading2"><span>Subtotal</span></div>
              <div className="heading2"><span>{currencySymbol} {Number(subTotal).toFixed(2)} {currency}</span></div>
            </div>

            <div className={`flexcol wh topbottom`} style={{ gap: '10px' }}>
              <button className='btn addtocart flex' onClick={handlePaymentClick}><PaymentIcon style={{ width: '17px' }} /><div className="heading2">Make payment</div></button>
            </div>
          </article>
        </div>

      </div>
    </div>
  )
}

export default Checkout