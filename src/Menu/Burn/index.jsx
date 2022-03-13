import React, { useState } from 'react'
import { ethers, utils } from 'ethers';

const Burn = ({ handleOpt, contractABI, contractAddress, getTokenInfo }) => {
    const [amount, setAmount] = useState(0)

    const burnTokens = async (event) => {
        event.preventDefault();
        try {
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const tokenContract = new ethers.Contract(contractAddress, contractABI, signer);
                const txn = await tokenContract.burn(utils.parseEther(amount));
                console.log("Burning tokens...");
                await txn.wait();
                console.log("Tokens burned...", txn.hash);
                getTokenInfo();
            } else {
                alert("Error, try again!")
            }
        } catch (error) {
            console.log(error);
            alert(error)
        }
    }

    return (
        <div className='containerMargin itemContainer'>
            <h2>BURN</h2>
            <input className='itemInput' placeholder='Amount to burn...' value={amount} onChange={val => setAmount(val.target.value)} />
            <div className='btnSpace'>
                <button className='itemBtn' onClick={() => handleOpt(null)}>Back</button>
                <button className='itemBtn' onClick={burnTokens}>Burn</button>
            </div>
        </div>
    )
}

export default Burn