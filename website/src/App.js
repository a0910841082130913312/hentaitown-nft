import React, { useState, useEffect, useCallback } from 'react';
import HentaiNFT from './HentaiNFT.json';
import { ethers, utils, Contract } from 'ethers';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, LinearProgress } from '@material-ui/core';

const wethInterface = new utils.Interface(HentaiNFT.abi);
const wethContractAddress = '0xB21af314c5a5D64F7D84B3d9Fc5A379cd7Dd7510';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  }
}));

const App = () => {
  const classes = useStyles();
  const [contract, setContract] = useState(null);
  const [minting, setMinting] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [mintNum, setMintNum] = useState(0);

  const initDapp = useCallback(async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner(0);
      const instance = new Contract(wethContractAddress, wethInterface, signer);
      const networkId = await window.ethereum.request({
        method: 'net_version',
      });

      if (networkId !== '1') {
        setShowMsg(true);
      }

      setContract(instance);
      setMintNum(await instance.mintedSoFar());
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('chainChanged', (networkId) => {
        if (parseInt(networkId) === 1) {
          setShowMsg(false);
          initDapp();
        } else {
          setShowMsg(true);
          initDapp();
        }
      });
    }
  }, [initDapp]);

  useEffect(() => {
    initDapp();
  }, [initDapp]);

  const mint = async (quantity = 1) => {
    setMinting(true);
    try {
      const cost = utils.formatUnits(await contract.publicPrice(), 'wei');
      const value = utils.formatUnits(utils.parseUnits((Number(cost) * quantity).toString(), 'wei'), 'wei');
      console.log(value);
      const txResponse = await contract.mint(quantity, {value: value, gasLimit: 250000});
      const txReceipt = await txResponse.wait();
      console.log(txReceipt);
      setMinting(false);
    } catch (error) {
      console.log(error);
      setMinting(false);
    }
  };

  return (
    <div className='App'>
      <Container>
        <div>
          <h2>WELCOME ♂ TO ♀ HENTAITOWN</h2>
          <p>No roadmap.<br/>No utility.<br/>Only PURE PLEASURE awaits.</p>
          <p><img src="movie.gif" alt="animation of many ahegao faces in sequence" /></p>
          <p>Mint cost: 0.045 ETH<br/>Total supply: 450<br/>Minted so far: {mintNum.toString()}</p>
          {!showMsg && (
            <form>
              <Button variant='outlined' color='primary' disabled={minting} className={classes.button} onClick={() => mint(1)}>Mint 1</Button>
              <Button variant='outlined' color='primary' disabled={minting} className={classes.button} onClick={() => mint(5)}>Mint 5</Button>
              <Button variant='outlined' color='primary' disabled={minting} className={classes.button} onClick={() => mint(10)}>Mint 10</Button>
              {minting && <LinearProgress />}
            </form>
            )}
          {showMsg && (<h3>Switch to Ethereum mainnet to mint.</h3>)}
          <p>
            <a href="https://twitter.com/hentaitown_nft">Twitter</a><br/>
            <a href="https://etherscan.io/address/0xB21af314c5a5D64F7D84B3d9Fc5A379cd7Dd7510">Contract</a><br/>
            <a href="https://opensea.io/collection/hentaitown-nft">OpenSea</a><br/>
            <a href="https://discord.gg/psnMuqvf73">Discord</a>
          </p>
        </div>
      </Container>
    </div>
  );
};

export default App;
