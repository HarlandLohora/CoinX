import React, { useState } from 'react'
import "./index.css"
import Transfer from "./Transfer"
import Burn from "./Burn"
import Mint from './Mint'

const Menu = () => {
    const [opt, setOpt] = useState(null)

    const handleOpt = (option) => {
        setOpt(option)
    }

    return (
        <div className='items'>
            {!opt && (
                <>
                    <div className='containerMargin item' onClick={() => handleOpt('transfer')}>TRANSFER TOKENS</div>
                    <div className='containerMargin item' onClick={() => handleOpt('burn')}>BURN TOKENS</div>
                    <div className='containerMargin item' onClick={() => handleOpt('mint')}>MINT TOKENS</div>
                </>
            )}
            {opt === "transfer" && <Transfer handleOpt={handleOpt} />}
            {opt === "mint" && <Mint handleOpt={handleOpt} />}
            {opt === "burn" && <Burn handleOpt={handleOpt} />}
        </div>
    )
}

export default Menu