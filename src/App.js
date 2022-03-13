import { useState, useEffect } from 'react';
import { ethers, utils } from "ethers";
import Menu from "./Menu"
// import abi from "./contracts/Bank.json";
import './App.css';

function App() {

  const contractAddress = 'YOUR_CONTRACT_ADDRESS';
  // const contractABI = abi.abi;

  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [inputValue, setInputValue] = useState({ walletAddress: "", transferAmount: "", burnAmount: "", mintAmount: "" });
  const [tokenName, setTokenName] = useState("coinx");
  const [tokenSymbol, setTokenSymbol] = useState("cnx");
  const [tokenTotalSupply, setTokenTotalSupply] = useState(0);
  const [isTokenOwner, setIsTokenOwner] = useState(false);
  const [tokenOwnerAddress, setTokenOwnerAddress] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);
  const [error, setError] = useState(null);



  const connectWallet = async () => {


    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
        setWalletAddress(accounts[0])
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="App">
      <div className='nav'>C<img src="/coin.png" alt='coin' className='coin' />inX</div>
      <div className='container'>
        {!walletAddress && <button className='btn-connect' onClick={connectWallet}>Connect wallet </button>}

        {/* if is a wallet */}

        {walletAddress && <Menu />}

      </div>
    </div>
  );
}

export default App;
