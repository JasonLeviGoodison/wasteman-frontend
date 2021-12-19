import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { connectWallet, getCurrentWalletConnected, mintNFTs } from "../alchemy/interact.js";

const Minter = (props) => {
  //State variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [numToMint, setNumToMint] = useState(1);

  useEffect(async () => {
    const {address, status} = await getCurrentWalletConnected();
    setWallet(address)
    setStatus(status);

    addWalletListener(); 
}, []);

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const onMintPressed = async () => {
    const { status } = await mintNFTs(numToMint);
    setStatus(status);
  };

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

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
        walletAddress == "" && <button id="walletButton" onClick={connectWalletPressed}>
        {
          walletAddress.length > 0 ? (
            "Connected: " +
            String(walletAddress).substring(0, 6) +
            "..." +
            String(walletAddress).substring(38)
          ) : (
            <span>Connect Wallet</span>
          )
        }
      </button>
      }
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
      
      {/* <p id="status">
        {status}
      </p> */}
    </div>
  );
}

export default Minter;