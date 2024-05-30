

{
    sellerProducts.map((item, index) => (
        <div className="searchBoxPro2" key={index}>
            <div><input type="checkbox" /></div>
            <div>
                {item.imageUrl && <img className='imgPro' src={item.imageUrl} alt={item.imageName} />}
            </div>
            <div className="heading2 download-btn" onClick={() => productDetail(index)} style={{ whiteSpace: 'nowrap' }}>
                {item.productName.length > 15 ? `${item.productName.substring(0, 15)}...` : item.productName}
            </div>
            <div className="heading2">
                {item.category.length > 15 ? `${item.category.substring(0, 15)}...` : item.category}
            </div>
            <div className="heading2">
                <div className="flex" style={{ gap: '5px' }}>
                    <span style={{ textDecoration: 'line-through', color: 'gray' }}>{item.unitPrice}₹</span>-<span style={{ fontWeight: 'bold' }}>{item.sellPrice}₹</span>
                </div>
            </div>
            <div className="heading2">
                <span className='download-btn' onClick={() => handleAddAddress(index)}> {calculateCostPerUnit(item)} </span>
            </div>
            <div className="heading2" style={{ whiteSpace: 'nowrap' }}>
                <div className="flexcol" style={{ gap: '2px' }}>
                    <span style={{ fontWeight: 'bold' }}>{item.availability === 'instock' ? item.availability : 'Out of stock'}</span>
                    <span style={{ fontSize: '12px' }}>MOQ is {item.minOrderQuant}</span>
                </div>
            </div>
            <div className="heading2">{item.status}</div>
            <div className="heading2" style={{ whiteSpace: 'nowrap' }}>{new Date(item.updatedDate).toLocaleString()}</div>
            <div className="heading2">{item.visibility}</div>
            <div className="heading2 flexcol">
                <EditNoteIcon style={{ cursor: 'pointer' }} onClick={() => handleEdit(index)} />
                <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => handleDelete(index)} />
            </div>
        </div>
    ))
}

function calculateCostPerUnit(item) {
    const unitPrice = parseFloat(item.unitPrice);
    const gst = parseFloat(item.gst);
    const commission = parseFloat(item.commision);
    return (unitPrice + (unitPrice * gst / 100) + (unitPrice * commission / 100)).toFixed(2) + '₹';
}
