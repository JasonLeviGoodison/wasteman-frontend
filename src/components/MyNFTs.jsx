import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import MiamiAfterDark  from  "./contracts/MiamiAfterDark.json";
import { connectWallet, getCurrentWalletConnected, addWalletListener, refundMe } from "../alchemy/interact.js";
import Web3 from 'web3';
import Profile from './Profile';
require("dotenv").config();


const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;

const MyNFTs = (props) => {
  var provider = alchemyKey;
  var web3Provider = new Web3.providers.HttpProvider(provider);
  const web3 = new Web3(web3Provider);
  const contractAddr = '0x70F3F21a0405bAB234AF7Bcbf2B33237E126B594';

  const contract = new web3.eth.Contract(MiamiAfterDark.abi, contractAddr);

  const [walletAddress, setWallet] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [myNFTs, setMyNFTs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (walletAddress != "") {
      getNFTs().then((nfts) => {
        setLoading(false);
        setMyNFTs(nfts)
      })
    }
  }, [walletAddress])

  useEffect(async () => {
    const {address, status, variant} = await getCurrentWalletConnected();
    setWallet(address)
    //setStatus(status);
    // enqueueSnackbar(status, { 
    //   variant
    // })

    addWalletListener(setWallet, () => {}); 
}, []);

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setWallet(walletResponse.address);
  };

  const getNFTs = async () => {
    var index = 0;
    var allNfts = [];

    while(1) {
      try {
        const result = await contract.methods.tokenOfOwnerByIndex(walletAddress, index).call();
        console.log(result)
        allNfts.push(result);
        index += 1
      }
      catch (e) {
        console.log(e)
        console.log("Got all owned pieces");
        break;
      }
    }

    return allNfts;
  };

  return (
    <div className="Refund" style={{display: 'flex', flexDirection: "column"}}>
      {
        walletAddress == "" && <Button id="walletButton" onClick={connectWalletPressed}> <span>Connect Wallet</span> </Button>
      }
      {
        walletAddress != "" &&
        <>
          { 
          loading ?
            "Loading" :
            <div style={{display: "flex", justifyContent: 'center'}}>
              <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                {myNFTs.length > 0 && myNFTs.map((entry, index) => {
                  return <Profile entry={entry} index={index}/>
                })}
              </div>
            </div>
          }
        </>
      }
    </div>
  );
}

export default MyNFTs;