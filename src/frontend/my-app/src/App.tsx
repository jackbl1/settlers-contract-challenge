import {ethers} from 'ethers';
import React, {useEffect, useState} from 'react';
import './App.css';
import abi from './utils/Counter.json';

function App() {
  const [currentAccount, setCurrentAccount] = useState('');
  const [count, setCount] = useState(-1);
  const contractAddress = '0xa9d89d4263d44d93af1ee0ed67a970a3338b9c81';
  const contractABI = abi.abi;

  const checkIfWalletIsConnected = async () => {
    try {
      const {ethereum} = window;
      const accounts = await ethereum.request({method: 'eth_accounts'});

      if (accounts.length !== 0) {
        const account = accounts[0];
        setCurrentAccount(account);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      const {ethereum} = window;
      const accounts = await ethereum.request({method: 'eth_requestAccounts'});
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const increment = async () => {
    try {
      const {ethereum} = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const counterContract = new ethers.Contract(contractAddress, contractABI, signer);

        let incrementTxn = await counterContract.incrementCounter();
        await incrementTxn.wait();
        const updatedCount = await counterContract.getCount();
        setCount(updatedCount.toNumber());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCounterValue = async () => {
    try {
      const {ethereum} = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const counterContract = new ethers.Contract(contractAddress, contractABI, signer);

        const updatedCount = await counterContract.getCount();
        setCount(updatedCount.toNumber());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="App">
      <p>Counter Contract</p>
      {!currentAccount && (
        <button className="connect-wallet-button" onClick={connectWallet}>
          Connect Wallet
        </button>
      )}
      {currentAccount && (
        <button className="increment-button" onClick={getCounterValue}>
          get counter value
        </button>
      )}
      {currentAccount && (
        <button className="increment-button" onClick={increment}>
          increment count
        </button>
      )}
      <p>
        {count === -1 && 'counter is not yet read'}
        {count !== -1 && 'The count is ' + count}
      </p>
    </div>
  );
}

export default App;
