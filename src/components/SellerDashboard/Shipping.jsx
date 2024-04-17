import React from 'react'

const Shipping = () => {
    return (
        <div className='flexcol seller-home-cont' style={{ gap: '20px' }}>
            <div className="heading">Shipping Preferences</div>

            <div className="productlist2" style={{ gap: '35px' }}>
                <div className="flexcol-start" style={{ gap: '10px' }}>
                    <div className="heading3">International Shipping</div>
                    <div className="descrip">Opt in and out of delivery methods you are willing to provide for orders purchased outside your country.</div>
                </div>
                <div className="flex" style={{ gap: '10px' }}>
                    <input type="checkbox" />
                    <div className="flexcol-start" style={{ gap: '10px' }}>
                        <div className="heading3">Ex works</div>
                        <div className="heading2">Ex works allows the buyer to collect their goods from your chosen location. It is our default delivery method that all sellers must agree to.</div>
                    </div>
                </div>
                <div className="flex" style={{ gap: '10px' }}>
                    <input type="checkbox" />
                    <div className="flexcol-start" style={{ gap: '10px' }}>
                        <div className="heading3">Free on board</div>
                        <div className="heading2">As the seller I am happy to pay for transportation of the goods to the port of shipment, plus loading costs.</div>
                    </div>
                </div>
                <div className="flex" style={{ gap: '10px' }}>
                    <input type="checkbox" />
                    <div className="flexcol-start" style={{ gap: '10px' }}>
                        <div className="heading3">Cost, Insurance and Freight</div>
                        <div className="heading2">I will arrange for the carriage of goods by sea to a port of destination and provide the buyer with the documents necessary to obtain them from the carrier.</div>
                    </div>
                </div>
                <div className="flex" style={{ gap: '10px' }}>
                    <input type="checkbox" />
                    <div className="flexcol-start" style={{ gap: '10px' }}>
                        <div className="heading3">Door-to-door delivery</div>
                        <div className="heading2">I will cover all the costs of transport (export fees, carriage, insurance, and destination port charges) and assume all risk until the goods are unloaded at the terminal.</div>
                    </div>
                </div>
            </div>

            <div className="productlist2" style={{ gap: '35px' }}>
                <div className="flexcol-start" style={{ gap: '10px' }}>
                    <div className="heading3">Domestic Shipping</div>
                    <div className="descrip">Opt in and out of delivery methods you are willing to provide for orders purchased in your country.</div>
                </div>
                <div className="flex-start" style={{ gap: '10px' }}>
                    <input type="checkbox" />
                    <div className="flexcol-start" style={{ gap: '35px' }}>
                        <div className="flexcol-start" style={{gap: '10px'}}>
                            <div className="heading3">Ulink logistics (Default)</div>
                            <div className="heading2">Ulink can collect the goods from a location of my choice.</div>
                        </div>
                        <div className="flexcol-start" style={{gap: '10px'}}>
                            <div className="descrip">Please select which address you would like Ulink to collect from:</div>
                            <select className='box flex' name="address" id="address">
                                <option value="">Select an address</option>
                                <option value="dfd">sdgd</option>
                            </select>
                        </div>
                        <div className="flexcol-start" style={{gap: '10px'}}>
                            <div className="heading2">Preferred time for collection</div>
                            <select className='box flex' name="shift" id="shift">
                                <option value="">Select a shift</option>
                                <option value="morning">Morning</option>
                                <option value="morning">Afternoon</option>
                                <option value="morning">Evening</option>
                            </select>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Shipping