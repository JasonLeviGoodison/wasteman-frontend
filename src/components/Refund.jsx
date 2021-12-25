import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { connectWallet, getCurrentWalletConnected, addWalletListener, refundMe } from "../alchemy/interact.js";
import { withSnackbar } from 'notistack';

const Refund = (props) => {
  // State variables

  const { enqueueSnackbar } = props;
  const [walletAddress, setWallet] = useState("");
  const [tokenId, setTokenId] = useState("");

  useEffect(async () => {
    const {address, status, variant} = await getCurrentWalletConnected();
    setWallet(address)
    enqueueSnackbar(status, { 
      variant
    })

    addWalletListener(setWallet, enqueueSnackbar); 
}, []);

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setWallet(walletResponse.address);
  };

  const onRefundPressed = async () => {
    const { status, success } = await refundMe(tokenId);
    enqueueSnackbar(status, { 
      variant: success === true ? 'success' : 'error'
    })
  };

  const onChange = (evt) => {
    evt.preventDefault();
    setTokenId(evt.target.value);
  }

  //the UI of our component
  return (
    <div className="Refund" style={{display: 'flex', flexDirection: "column"}}>
      {
        walletAddress == "" && <Button id="walletButton" onClick={connectWalletPressed}> <span>Connect Wallet</span> </Button>
      }
      {
        walletAddress != "" &&
        <div style={{display: "flex", justifyContent: 'center'}}>
          <div style={{display: "flex", justifyContent: 'center', flexDirection: 'column', marginRight: 10}}>
            <input placeholder="Token Id" onChange={onChange}></input>
            <Button style={{}} variant="primary" id="mintButton" onClick={onRefundPressed}>
              Refund this token
            </Button>

            <span>We created this function so people could feel safe investing in our project. <br/> If you use this function, your NFT will be burned and your money returned.<br/>
              It will also bar you from purchasing any more NFTs from this project. <br/>
              Please don't play with this function, if you do not own the token it will fail and you will still pay the gas fee.</span>
          </div>
        </div>
      }
    </div>
  );
}

export default withSnackbar(Refund);