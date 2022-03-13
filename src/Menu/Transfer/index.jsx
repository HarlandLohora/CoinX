import React, { useState } from 'react'
import { ethers, utils } from 'ethers';

const Transfer = ({ handleOpt, contractABI, contractAddress }) => {

    const [to, setTo] = useState('')
    const [amount, setAmount] = useState('')

    const transferToken = async (event) => {
        event.preventDefault();
        try {
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const tokenContract = new ethers.Contract(contractAddress, contractABI, signer);
                console.log(to, amount)
                console.log(tokenContract)
                const txn = await tokenContract.transfer(to, utils.parseEther(amount));
                console.log("Transfering tokens...");
                await txn.wait();
                console.log("Tokens Transfered", txn.hash);
                alert("Tokens Transfered", txn.hash)
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
            <h2>TRANSFER</h2>
            <input className='itemInput' placeholder='Wallet address' value={to} onChange={(value) => setTo(value.target.value)} />
            <input className='itemInput' placeholder='Amount to transfer...' value={amount} onChange={(value) => setAmount(value.target.value)} />
            <div className='btnSpace'>
                <button className='itemBtn' onClick={() => handleOpt(null)}>Back</button>
                <button className='itemBtn' onClick={transferToken}>Transfer</button>
            </div>
        </div>
    )
}

export default Transfer