import React from 'react'

const Transfer = ({ handleOpt }) => {
    return (
        <div className='containerMargin itemContainer'>
            <h2>TRANSFER</h2>
            <input className='itemInput' placeholder='Wallet address' />
            <input className='itemInput' placeholder='Amount to transfer...' />
            <div className='btnSpace'>
                <button className='itemBtn' onClick={() => handleOpt(null)}>Back</button>
                <button className='itemBtn'>Transfer</button>
            </div>
        </div>
    )
}

export default Transfer