import React, { useEffect } from 'react';
import './App.scss';
import { ethers } from 'ethers';
import { getBalance } from 'web3/lib/commonjs/eth.exports';

function App() {
  // const [provider, setProvider] = React.useState<any>(null);


  const handleClick = () => {
    const provider = new ethers.JsonRpcProvider(`https://sepolia.infura.io/v3/${process.env.REACT_APP_INFURA_API_KEY}`)
    // setProvider(() => provider);

    if (provider) {
      provider.getBlockNumber().then((blockNumber: any) => {
        console.log(blockNumber);
      })

    }
  }
  const getBalance = () => {
    const SepolicaProvider = new ethers.JsonRpcProvider(`https://sepolia.infura.io/v3/${process.env.REACT_APP_INFURA_API_KEY}`)
    if (SepolicaProvider) {
      SepolicaProvider.getBalance('0x3cf68DFF33B68fB2CF6b1607cA030f635d6A1392').then((balance: any) => {
        console.log(balance);
      }).catch((err: any) => {
        console.log(err);
      }
      )
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <p>Learn React</p>
        <p>{process.env.REACT_APP_INFURA_API_KEY}</p>
        <button type='button' onClick={handleClick}>check block number</button>
        <button type='button' onClick={getBalance}>getBalance</button>
      </header>
    </div>
  );
}

export default App;
