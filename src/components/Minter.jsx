import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { connectWallet, getCurrentWalletConnected, mintNFT, addWalletListener } from "../alchemy/interact.js";
import { withSnackbar } from 'notistack';

const Minter = (props) => {
  //State variables
  const { enqueueSnackbar } = props;
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [numToMint, setNumToMint] = useState(1);

  useEffect(async () => {
    const {address, status, variant} = await getCurrentWalletConnected();
    setWallet(address)
    setStatus(status);
    enqueueSnackbar(status, { 
      variant
    })

    addWalletListener(setWallet, enqueueSnackbar); 
}, []);

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const onMintPressed = async () => {
    // TODO: FIX THIS
    const { status, success } = await mintNFT(numToMint);
    setStatus(status);
    enqueueSnackbar(status, { 
      variant: success === true ? 'success' : 'error'
    })
  };

  const handleNumChange = (op) => {
    if (numToMint == 1 && op == '-') {
      return;
    }
    if (numToMint == 5 && op == '+') {
      return;
    }
    if (op == '+') setNumToMint(numToMint + 1)
    if (op == '-') setNumToMint(numToMint - 1)
  }

  //the UI of our component
  return (
    <div className="Minter" style={{display: 'flex', flexDirection: "column"}}>
      {
        walletAddress == "" && <Button id="walletButton" onClick={connectWalletPressed}> <span>Connect Wallet</span> </Button>
      }
      {
        walletAddress != "" &&
        <div style={{display: "flex", justifyContent: 'center'}}>
          <div style={{display: "flex", justifyContent: 'center', flexDirection: 'column', marginRight: 10}}>
            <Button style={{width: 100, height: 50}} variant="primary" id="mintButton" onClick={onMintPressed}>
              Mint <b>{numToMint}</b>
            </Button>
          </div>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <Button size="sm" variant="outline-primary" onClick={() => handleNumChange('+')}> <KeyboardArrowUpIcon/> </Button>
            <Button size="sm" variant="outline-primary" onClick={() => handleNumChange('-')} > <KeyboardArrowDownIcon/> </Button>
          </div>
        </div>
      }
    </div>
  );
}

export default withSnackbar(Minter);