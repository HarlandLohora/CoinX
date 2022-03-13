import React from 'react'

const Burn = ({ handleOpt }) => {
    return (
        <div className='containerMargin itemContainer'>
            <h2>BURN</h2>
            <input className='itemInput' placeholder='Amount to burn...' />
            <div className='btnSpace'>
                <button className='itemBtn' onClick={() => handleOpt(null)}>Back</button>
                <button className='itemBtn'>Burn</button>
            </div>
        </div>
    )
}

export default Burn