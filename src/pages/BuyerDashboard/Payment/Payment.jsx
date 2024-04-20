import React, { Fragment, useState } from 'react'
import './Payment.css'
import { LiaCcVisa } from "react-icons/lia";
import { RiMastercardFill } from "react-icons/ri";
import { SiAmericanexpress } from "react-icons/si";
import { RxCross2 } from "react-icons/rx";
import { LiaEditSolid } from "react-icons/lia";
import { AiOutlineDelete } from "react-icons/ai";
const Payment = () => {
    const [cardOption, setCardOption] = useState(false)
    const [cardDetail, setCardDetail] = useState(false)
    const [editCard, setEditCard] = useState(false)
    const [open, setOpen] = useState(false)
    const [cardData, setCardData] = useState({
        cardname: '',
        cardnumber: '',
        expdate: '',
    })
    const handleCardChange = (e) => {
        const { name, value } = e.target
        setCardData({
            ...cardData,
            [name]: value
        })
    }
    const handleEdit = () => {
        setEditCard(true)
    }
    const handleCancelEdit = () => {
        setEditCard(false)
        console.log(setEditCard(false))
    }
    const handleSaveCard = () => {
        setCardData(cardData)
        setEditCard(false)
    }
    const handleAddCard = (e) => {
        e.preventDefault()
        setCardOption(cardData)
        setCardDetail(true)
        setOpen(false)
    }
    const handleCardSubmit = (e) => {
        e.preventDefault()
    }
    const handleCrossEdit = () => {
        setEditCard(false)
    }
    const handleOpenCart = () => {
        setOpen(true)
    }
    const handleCross = () => {
        setOpen(false)
    }
    const handleCancel = () => {
        setOpen(false)
    }
    return (
        <Fragment>
            {/* Open card detail */}
            {open && (
                <div className='background-Changer'>
                    <div className='card-methode'>
                        <div className='card-infos-bank'>
                            <div className='card-title'>
                                <h3 className=" card-title-tittles">Add a Debit or Credit Card</h3>
                            </div>
                            <div className='card-title'>
                                <RxCross2 className='cross-icon' onClick={handleCross} />
                            </div>
                        </div>
                        <form onSubmit={handleCardSubmit}>
                            <div className='card-inputs-filed'>
                                <div className='card-inputs'>
                                    <label >Full name on card</label>
                                    <input type='text' name='cardname' className='card-input-value' placeholder='Full name on card' value={cardData.cardname} onChange={handleCardChange} />
                                </div>
                                <div className='card-inputses'>
                                    <label >Card number</label>
                                    <input type='number' name='cardnumber' className='card-input-value' placeholder='Card number' value={cardData.cardnumber} onChange={handleCardChange} />
                                </div>
                            </div>
                            <div className='card-inputs change-input-width'>
                                <label >Exipiry Date</label>
                                <input type='text' name='expdate' className='card-input-value' placeholder='MM/YY' value={cardData.expdate} onChange={handleCardChange} />
                            </div>
                            <div className='add-card-btn'>
                                <button className='add-bank-btn' onClick={handleCancel}>Cancel</button>
                                <button type='submit' className='add-bank-btns' onClick={handleAddCard}>Add Card</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {editCard && (
                <div className='background-Changer'>
                    <div className='card-methode'>
                        <div className='card-infos-bank'>
                            <div className='card-title'>
                                <h3 className=" card-title-tittles">Add a Debit or Credit Card</h3>
                            </div>
                            <div className='card-title'>
                                <RxCross2 className='cross-icon' onClick={handleCrossEdit} />
                            </div>
                        </div>
                        <form onSubmit={handleCardSubmit}>
                            <div className='card-inputs-filed'>
                                <div className='card-inputs'>
                                    <label >Full name on card</label>
                                    <input type='text' name='cardname' className='card-input-value' placeholder='Full name on card' value={cardData.cardname} onChange={handleCardChange} />
                                </div>
                                <div className='card-inputses'>
                                    <label >Card number</label>
                                    <input type='number' name='cardnumber' className='card-input-value' placeholder='Card number' value={cardData.cardnumber} onChange={handleCardChange} />
                                </div>
                            </div>
                            <div className='add-card-btn'>
                                <button className='add-bank-btn' onClick={handleCancelEdit}>Cancel</button>
                                <button type='submit' className='add-bank-btns' onClick={handleSaveCard}>Save Card</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <div className='mt positon'>
                <div className='userDashboard'>
                    <h1 className='user-titles pay-title heading-3'>Payment Management</h1>
                </div>
                <div className='more-rule'>
                    <p className='roles-text  pay-note'><span>Note:</span> The selected payment option will be set as your default method </p>
                </div>
                <div className='border-1 border-p'>
                    <div className='pay-options'>
                        <div className='note bank-detail top-bar '>
                            {/* <FaRegCircle className='warnings' /> */}
                            <input type='radio' />
                            <p className='paragraph-4'> Pay With Card</p>
                        </div>
                        <div className=' pay-option-item '>
                            <LiaCcVisa />
                            <RiMastercardFill />
                            <SiAmericanexpress />
                        </div>
                    </div>
                    {cardDetail && (
                        <div>
                            <div className='border-1  bor-1 box-container-border'>
                                <div className='card-table'>
                                    <div className='table-1'>Card Number</div>
                                    <div className='table-1'>Name on Card</div>
                                    <div className='table-1'>Expires</div>
                                    <div className='table-1'>Action</div>
                                </div>
                            </div>
                            <div className='border-1 bor-1'>
                                <div className='card-details-table'>
                                    <div className='table-1'>{cardData.cardnumber}</div>
                                    <div className='table-1'>{cardData.cardname}</div>
                                    <div className='table-1'>{cardData.expdate}</div>
                                    <div className='table-1'>
                                        <LiaEditSolid onClick={handleEdit} className='edit-icon' />
                                        <AiOutlineDelete className='delete-icon' />
                                    </div>
                                </div>
                            </div>
                            <div className='border-1 bor-1'>
                                <div className='card-details-table'>
                                    <div className='table-1'>{cardData.cardnumber}</div>
                                    <div className='table-1'>{cardData.cardname}</div>
                                    <div className='table-1'>{cardData.expdate}</div>
                                    <div className='table-1'>
                                        <LiaEditSolid onClick={handleEdit} className='edit-icon' />
                                        <AiOutlineDelete className='delete-icon' />
                                    </div>
                                </div>
                            </div>
                            <div className='border-1 bor-1'>
                                <div className='card-details-table'>
                                    <div className='table-1'>{cardData.cardnumber}</div>
                                    <div className='table-1'>{cardData.cardname}</div>
                                    <div className='table-1'>{cardData.expdate}</div>
                                    <div className='table-1'>
                                        <LiaEditSolid onClick={handleEdit} className='edit-icon' />
                                        <AiOutlineDelete className='delete-icon' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <>
                        <button className='create-btn  debit-card-button ' onClick={handleOpenCart}>ADD DEBIT CARD OR CREDIT CARD</button>
                    </>
                </div>
                <div className='border-1  border-top'>
                    <div className='bank-detail'>
                        <div className='note bank-detail '>
                            {/* <FaRegCircle className='warnings' /> */}
                            <input type='radio' />
                            <p className='paragraph-4'> Bank Transfer Default</p>
                        </div>
                        <div className='pay-note info-detail' >
                            <p className='info-details'>If you are choosing to pay by Bank Transfer to Tradeling, please ensure your funds are sent to Tradeling to allow sufficient time for your funds to reach Tradeling and for Tradeling to pay the Seller.</p>
                            <div className='data-display  bank-data-display'>
                                <div className='name-show bank-name-show'>
                                    <h4 className="orders-title">Account Name:</h4>
                                    <p>Blink Technologies FZCO</p>
                                </div>
                                <div className='name-show bank-name-show'>
                                    <h4 className="orders-title">IBAN: </h4>
                                    <p>
                                        AE750260001015656080004</p>
                                </div>
                                <div className='name-show bank-name-show'>
                                    <h4 className="orders-title">BANK NAME:  </h4>
                                    <p>
                                        Emirates NBD Bank (PJSC)</p>
                                </div>
                                <div className='name-show bank-name-show'>
                                    <h4 className="orders-title">SWIFT CODE:  </h4>
                                    <p>
                                        EBILAEAD</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='border-1 border-top bor-pad'>
                    <div className='note bank-detail '>
                        {/* <FaRegCircle className='warnings' /> */}
                        <input type='radio' />
                        <p className='paragraph-4'>Cash On Delivery</p>
                    </div>
                    <div className='pay-note info-detail  margin-bottom'>
                        <p className='info-details'>If you are choosing to pay by Bank Transfer to Tradeling, please ensure your funds are sent to Tradeling to allow sufficient time for your funds to reach Tradeling and for Tradeling to pay the Seller.</p>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default Payment