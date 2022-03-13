import { useState, useEffect } from 'react';
import { ethers, utils } from "ethers";
import Menu from "./Menu"
import abi from "./Contracts/CoinX.json";
import './App.css';

function App() {

  const contractAddress = '0xDB65503649ed756CBe00886D8D1340A26C7e072D';
  const contractABI = abi.abi;

  const [tokenName, setTokenName] = useState("coinx");
  const [tokenSymbol, setTokenSymbol] = useState("cnx");
  const [tokenTotalSupply, setTokenTotalSupply] = useState(0);
  const [isTokenOwner, setIsTokenOwner] = useState(false);
  const [tokenOwnerAddress, setTokenOwnerAddress] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);



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

  const getTokenInfo = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const tokenContract = new ethers.Contract(contractAddress, contractABI, signer);
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });

        let tokenName = await tokenContract.name();
        let tokenSymbol = await tokenContract.symbol();
        let tokenOwner = await tokenContract.owner();
        let tokenSupply = await tokenContract.totalSupply();
        tokenSupply = utils.formatEther(tokenSupply)

        console.log(tokenName, tokenSymbol, tokenOwner, tokenSupply)

        setTokenName(`${tokenName}`);
        setTokenSymbol(tokenSymbol);
        setTokenTotalSupply(tokenSupply);
        setTokenOwnerAddress(tokenOwner);

        if (account.toLowerCase() === tokenOwner.toLowerCase()) {
          setIsTokenOwner(true)
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTokenInfo()
  }, [])

  return (
    <div className="App">
      <div className='nav'>C<img src="/coin.png" alt='coin' className='coin' />inX</div>
      <div className='info'>
        <p><strong>Contract Address: </strong>{contractAddress}</p>
        <p><strong>Token Owner Address: </strong>{tokenOwnerAddress}</p>
        <p><strong>Your wallet Address: </strong>{walletAddress}</p>
        <p>
          <strong>Coin: </strong>{tokenName}
          <strong> Ticker: </strong>{tokenSymbol}
          <strong> Total Supply: </strong>{tokenTotalSupply}
        </p>
      </div>
      <div className='container'>
        {!walletAddress && <button className='btn-connect' onClick={connectWallet}>Connect wallet </button>}

        {/* if is a wallet */}
        {walletAddress && <Menu
          isTokenOwner={isTokenOwner}
          contractAddress={contractAddress}
          contractABI={contractABI}
          getTokenInfo={getTokenInfo}
        />}


      </div>
    </div>
  );
}

export default App;
