import React, { useState } from 'react'
import "./index.css"
import Transfer from "./Transfer"
import Burn from "./Burn"
import Mint from './Mint'

const Menu = (props) => {
    const { isTokenOwner } = props
    const [opt, setOpt] = useState(null)

    const handleOpt = (option) => {
        setOpt(option)
    }

    return (
        <div className='items'>
            {!opt && (
                <>
                    <div className='containerMargin item' onClick={() => handleOpt('transfer')}>TRANSFER TOKENS</div>
                    {
                        isTokenOwner && (<>
                            <div className='containerMargin item' onClick={() => handleOpt('burn')}>BURN TOKENS</div>
                            <div className='containerMargin item' onClick={() => handleOpt('mint')}>MINT TOKENS</div>
                        </>)
                    }
                </>
            )}
            {opt === "transfer" && <Transfer handleOpt={handleOpt} {...props} />}
            {opt === "mint" && <Mint handleOpt={handleOpt} {...props} />}
            {opt === "burn" && <Burn handleOpt={handleOpt} {...props} />}
        </div>
    )
}

export default Menu