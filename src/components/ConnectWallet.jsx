import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { connectWallet, getCurrentWalletConnected, mintNFTs, addWalletListener } from "../alchemy/interact.js";
import { withSnackbar } from 'notistack';

// props:
// walletAddress, setWalletAddress
const ConnectWallet = (props) => {
  //State variables
  const { enqueueSnackbar } = props;
  //const [walletAddress, setWallet] = useState("");
  const { walletAddress, setWalletAddress, callback } = props;
  const [status, setStatus] = useState("");

  useEffect(async () => {
    const {address, status, variant} = await getCurrentWalletConnected();
    setWalletAddress(address)
    setStatus(status);
    enqueueSnackbar(status, { 
      variant
    })

    addWalletListener(setWalletAddress, enqueueSnackbar); 

    if (address != null && address.length > 0) {
      console.log(address)
      callback();
    }
  }, []);

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWalletAddress(walletResponse.address);
  };

  return (
    <div className="Minter" style={{display: 'flex', flexDirection: "column"}}>
      {
        walletAddress == "" && <Button id="walletButton" style={{width: 'fit-content'}} onClick={connectWalletPressed}> <span>Connect Wallet</span> </Button>
      }
    </div>
  );
}

export default withSnackbar(ConnectWallet);