import React from 'react'

const Mint = ({ handleOpt }) => {
    return (
        <div className='containerMargin itemContainer'>
            <h2>MINT</h2>
            <input className='itemInput' placeholder='Amount to Mint...' />
            <div className='btnSpace'>
                <button className='itemBtn' onClick={() => handleOpt(null)}>Back</button>
                <button className='itemBtn'>Mint</button>
            </div>
        </div>
    )
}

export default Mint