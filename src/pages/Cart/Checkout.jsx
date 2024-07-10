import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExchangeRates } from '../../Redux/currencySlice';
import currencySymbols from '../../components/Schemas/currencySymbols';
import { fetchAddresses } from '../../Redux/addressSlice';
import { setSelectedAddress } from '../../Redux/selectedAddress';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import SailingIcon from '@mui/icons-material/Sailing';
import PaymentIcon from '@mui/icons-material/Payment';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { Helmet } from 'react-helmet-async';
import { image } from '@cloudinary/url-gen/qualifiers/source';
import axios from 'axios';
const RAZORPAY_API_KEY = import.meta.env.VITE_RAZORPAY_API_KEY;

const Checkout = () => {

  const dispatch = useDispatch();
  const { totalSellPrice, totalUnitGstPrice, currency } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);
  const selectedCurrency = useSelector(state => state.currency.selectedCurrency);
  const exchangeRates = useSelector(state => state.currency.exchangeRates);

  const [paymentClicked, setPaymentClicked] = useState(false);
  const handlePaymentClick = () => {
    setPaymentClicked(prevState => !prevState);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (paymentClicked) {
        setPaymentClicked(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [paymentClicked]);

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
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const retrieveCards = () => {
    const storedCards = localStorage.getItem('cards');
    if (storedCards) {
      setCards(JSON.parse(storedCards));
    }
  };
  useEffect(() => {
    retrieveCards();
  }, []);
  const handleCardChange = (event) => {
    const selectedCardData = cards.find(
      (card) => card.fullName === event.target.value
    );
    setSelectedCard(selectedCardData);
  };


  //banks 
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState({});
  const retrieveBanks = () => {
    const storedBanks = localStorage.getItem('banks');
    if (storedBanks) {
      setBanks(JSON.parse(storedBanks));
    }
  };
  useEffect(() => {
    retrieveBanks();
  }, []);
  const handleBankChange = (event) => {
    const selectedBankData = banks.find(
      (bank) => bank.accountHolderName === event.target.value
    );
    setSelectedBank(selectedBankData);
  };


  //upis 
  const [upis, setUpis] = useState([]);
  const [selectedUpi, setSelectedUpi] = useState({});
  const retrieveUpis = () => {
    const storedUpis = localStorage.getItem('upis');
    if (storedUpis) {
      setUpis(JSON.parse(storedUpis));
    }
  };
  useEffect(() => {
    retrieveUpis();
  }, []);
  const handleUpiChange = (event) => {
    const selectedUpiData = upis.find(
      (upis) => upis.upi === event.target.value
    );
    setSelectedUpi(selectedUpiData);
  };


  const scrollRef = useRef(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.focus();
    }
  }, []);


  // payment methods 
  const checkoutHandler = async (amount, currency) => {
    console.log(amount, currency);

    try {
      const response = await axios.post('https://api.ulinkit.com/api/payment/test/get-transaction', { amount, currency });
      const order = response.data;

      const options = {
        key: RAZORPAY_API_KEY,
        amount: order.amount,
        currency: order.currency,
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
          address: selectedShippingAddress || selectedBillingAddress
        },
        theme: {
          color: "#00aaff"
        }
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error('Error in checkoutHandler', error);
    }
  };
  const handleRazorpayCallback = async (response) => {
    console.log(response);
    try {
      await axios.post('https://api.ulinkit.com/api/payment/test/callback', {
        paymentId: response.razorpay_payment_id,
        orderId: response.razorpay_order_id,
        signature: response.razorpay_signature,
        gateway: 'RAZORPAY'
      });
      setPaymentStatus('success');
    } catch (error) {
      console.error('Error handling Razorpay callback', error);
      setPaymentStatus('error');
    }
  };

  const totalOrder = totalSellPrice + totalUnitGstPrice;

  return (
    <div className="flexcol wh cart_page">
      <Helmet>
        <title>Checkout</title>
      </Helmet>
      <div className="flex wh">
        <div className="heading wh">Checkout</div>
      </div>
      <div className="cart_cont wh">
        <div className="cartcol_one" tabIndex={0} ref={scrollRef}>
          <div className="webdiv checkout">
            <div className="heading wh">Your addresses</div>

            <div className="heading3 wh">Shipping address</div>
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
                  <div className='descrip2'>{selectedShippingAddress.selectedOrigin}</div>
                  <div className='descrip2'>{selectedShippingAddress.city}</div>
                  <div className='descrip2'>{selectedShippingAddress.area}</div>
                  <div className='descrip2'>{selectedShippingAddress.street}</div>
                  <div className='descrip2'>{selectedShippingAddress.office}</div>
                  <div className='descrip2'>Pobox: {selectedShippingAddress.pobox}</div>
                  <div className='descrip2'>Post code: {selectedShippingAddress.postCode}</div>
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
                <div className="heading3 wh">Billing address</div>
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
                  <div className='descrip2'>{selectedBillingAddress.selectedOrigin}</div>
                  <div className='descrip2'>{selectedBillingAddress.city}</div>
                  <div className='descrip2'>{selectedBillingAddress.area}</div>
                  <div className='descrip2'>{selectedBillingAddress.street}</div>
                  <div className='descrip2'>{selectedBillingAddress.office}</div>
                  <div className='descrip2'>Pobox: {selectedBillingAddress.pobox}</div>
                  <div className='descrip2'>Post code: {selectedBillingAddress.postCode}</div>
                </div>
                <div className="flex" style={{ gap: '20px' }}>
                  <div className='flex'><LocalPhoneIcon style={{ height: '15px', width: '15px' }} />&nbsp;&nbsp;{selectedBillingAddress.phoneNumber}</div>
                  <div className='flex'><LocalAirportIcon style={{ height: '15px', width: '15px' }} />&nbsp;&nbsp;{selectedBillingAddress.airport}</div>
                  <div className='flex'><SailingIcon style={{ height: '15px', width: '15px' }} />&nbsp;&nbsp;{selectedBillingAddress.seaport}</div>
                </div>
              </div>
            )}

          </div>

          <div className="checkout webdiv">
            <div className="heading wh">Choose a payment method</div>
            <div className="flex-start wh" style={{ gap: '20px' }}>
              <button onClick={() => handleSubPageChange(1)} className={subCurrentPage === 1 ? 'payment-active payment-btn' : 'payment-btn'}><div className="heading2">Card</div></button>
              <button onClick={() => handleSubPageChange(2)} className={subCurrentPage === 2 ? 'payment-active payment-btn' : 'payment-btn'}><div className="heading2">Net banking</div></button>
              <button onClick={() => handleSubPageChange(3)} className={subCurrentPage === 3 ? 'payment-active payment-btn' : 'payment-btn'}><div className="heading2">UPI</div></button>
              <button onClick={() => handleSubPageChange(4)} className={subCurrentPage === 4 ? 'payment-active payment-btn' : 'payment-btn'}><div className="heading2">Other Gateways</div></button>
            </div>
          </div>

          {subCurrentPage === 1 && (
            <div className="checkout webdiv">
              <div className="heading3 wh">Cards</div>
              <select className='coupon' value={selectedCard.address} onChange={handleCardChange}>
                <option value=''>Select a card</option>
                {cards.map((card, index) => (
                  <option key={index} value={card.fullName}>
                    {card.fullName}
                  </option>
                ))}
              </select>
              {selectedCard.fullName && (
                <div className='flex-start wh' style={{ gap: '20px' }}>
                  <CreditCardIcon style={{ width: '17px', color: 'gray' }} />
                  <div className='descrip2'>{selectedCard.fullName}</div>
                  <div className="descrip2">{selectedCard.cardNumber}</div>
                  <div className="descrip2">{selectedCard.expiryDate}</div>
                </div>
              )}
            </div>
          )}

          {subCurrentPage === 2 && (
            <div className="checkout webdiv">
              <div className="heading3 wh">Bank accounts</div>
              <select className='coupon' value={selectedBank.address} onChange={handleBankChange}>
                <option value=''>Select an account</option>
                {banks.map((bank, index) => (
                  <option key={index} value={bank.accountHolderName}>
                    {bank.accountHolderName}
                  </option>
                ))}
              </select>
              {selectedBank.accountHolderName && (
                <div className='flex-start wh' style={{ gap: '20px' }} >
                  <AccountBalanceIcon style={{ width: '17px', color: 'gray' }} />
                  <div className='descrip2'>{selectedBank.accountHolderName}</div>
                  <div className="descrip2">{selectedBank.accountNumber}</div>
                  <div className="descrip2">{selectedBank.bankName}</div>

                  <div className="descrip2">{selectedBank.branchName}</div>
                  <div className="descrip2">{selectedBank.ifscCode}</div>
                  <div className="descrip2">{selectedBank.swiftCode}</div>
                </div>
              )}
            </div>
          )}

          {subCurrentPage === 3 && (
            <div className="checkout webdiv">
              <div className="heading3 wh">UPIs</div>
              <select className='coupon' value={selectedUpi.address} onChange={handleUpiChange}>
                <option value=''>Select a UPI</option>
                {upis.map((upis, index) => (
                  <option key={index} value={upis.upi}>
                    {upis.upi}
                  </option>
                ))}
              </select>
              {selectedUpi.upi && (
                <div className='flex-start wh' style={{ gap: '20px' }} >
                  <img src='https://res.cloudinary.com/dey1tujp8/image/upload/v1718266152/upi-id.1024x1024_xm8kjf.png' style={{ width: '17px', color: 'gray' }} alt='upi' />
                  <div className='descrip2'>{selectedUpi.upi}</div>
                </div>
              )}
            </div>
          )}
{/* 
          {subCurrentPage === 4 && (
            <div className="checkout webdiv">
              <div className="heading3 wh">Other Gateways</div>
              <div className="flexcol wh">
                <div className="payment-option" onClick={() => checkoutHandler(convertPrice(totalSellPrice, currency), selectedCurrency)}>
                  <div className="heading2">Pay with</div>
                  <img src="https://res.cloudinary.com/dey1tujp8/image/upload/v1720262856/pngwing.com_pcirhd.png" alt="Razorpay" />
                </div>
                <div className="payment-option">
                  <div className="heading2">Pay with</div>
                  <img src="https://res.cloudinary.com/dey1tujp8/image/upload/v1720262856/pngwing.com_1_mjjcxi.png" alt="Paypal" />
                </div>
              </div>
            </div>
          )} */}

        </div>
        <div className="cartcol_two">
          <div className="sel-box" style={{ gap: '10px' }}>
            <div className="flex wh bbottom" style={{ padding: '10px 0px' }}>
              <div className="heading3">Order Summary</div>
            </div>
            <div className="flex wh" style={{ padding: '10px 0px', gap: '10px' }}>
              <input type="text" placeholder='Enter coupon code' className='coupon' /> <button className='btn couponbtn flex'>Apply</button>
            </div>
            <div className="flexcol wh" style={{ gap: '10px' }}>
              <div className="flex wh" style={{ justifyContent: 'space-between' }}>
                <div className="heading2">Total Price</div>
                <div className="heading2">{currencySymbols[selectedCurrency]} {convertPrice(totalSellPrice, currency)} {selectedCurrency}</div>
              </div>
              <div className="flex wh" style={{ justifyContent: 'space-between' }}>
                <div className="heading2">Shipping</div>
                <div className="heading2">Null</div>
              </div>
              <div className="flex wh" style={{ justifyContent: 'space-between' }}>
                <div className="heading2">Total Tax</div>
                <div className="heading2">{currencySymbols[selectedCurrency]} {convertPrice(totalUnitGstPrice, currency)} {selectedCurrency}</div>
              </div>
            </div>
            <div className="flex wh topbottom" style={{ justifyContent: 'space-between', padding: '10px 0px' }}>
              <div className="heading2"><span>Subtotal</span></div>
              <div className="heading2"><span>{currencySymbols[selectedCurrency]} {convertPrice(totalOrder, currency)} {selectedCurrency}</span></div>
            </div>

            <div className={`flexcol wh topbottom payment-gatway ${paymentClicked ? 'clicked' : ''}`} onClick={handlePaymentClick} style={{ gap: '10px' }}>
              <button className='btn addtocart flex'><PaymentIcon style={{ width: '17px' }} /><div className="heading2">Make payment</div></button>
              {paymentClicked && (
                <div className="payment-popup-card payment-popup">
                  <div className='payment-popupbox'>
                    <div className="heading">Choose a payment method</div>
                    <div className="flexcol wh">
                      <div className="payment-option" onClick={() => checkoutHandler(convertPrice(totalSellPrice, currency), selectedCurrency)}>
                        <div className="heading2">Pay with</div>
                        <img src="https://res.cloudinary.com/dey1tujp8/image/upload/v1720262856/pngwing.com_pcirhd.png" alt="Razorpay" />
                      </div>
                      <div className="payment-option">
                        <div className="heading2">Pay with</div>
                        <img src="https://res.cloudinary.com/dey1tujp8/image/upload/v1720262856/pngwing.com_1_mjjcxi.png" alt="Paypal" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout