import React, { useState } from 'react'
import { ethers, utils } from "ethers"

const Mint = ({ handleOpt, contractABI, contractAddress, getTokenInfo }) => {

    const [amount, setAmount] = useState(0)

    const mintTokens = async (event) => {
        event.preventDefault();
        try {
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const tokenContract = new ethers.Contract(contractAddress, contractABI, signer);

                let tokenOwner = await tokenContract.owner();
                const txn = await tokenContract.mint(tokenOwner, utils.parseEther(amount));
                console.log("Minting tokens...");
                await txn.wait();
                console.log("Tokens minted...", txn.hash);
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
            <h2>MINT</h2>
            <input className='itemInput' placeholder='Amount to Mint...' value={amount} onChange={value => setAmount(value.target.value)} />
            <div className='btnSpace'>
                <button className='itemBtn' onClick={() => handleOpt(null)}>Back</button>
                <button className='itemBtn' onClick={mintTokens}>Mint</button>
            </div>
        </div>
    )
}

export default Mint