import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import WalletLinker from './WalletLinker';

const WasteManProfile = ({entry, index, minter = false}) => {
  console.log(entry, index)
  const [connectedWallet, setConnectedWallet] = useState(null)
  return (
    <div style={{display: 'flex', flexDirection: 'column', border: "2px solid #e5e5e5", borderRadius: 10, padding: 20, margin: 10, marginRight: 'auto', marginLeft: 'auto', maxWidth: 440}}>
      {!minter && <h2 className="titleText" style={{fontSize: 24}}> <b>WasteMan #{index + 1} <br/></b> </h2> }
      <img className="grid-element" src={entry.image} style={{height: 300, width: 300 }}/>
      {
        minter && 
        <div className="element-info">
          {connectedWallet && <Button> Mint </Button> }
          {!connectedWallet && <WalletLinker setConnectedWallet={setConnectedWallet}/>}
        </div>
      }
    </div>)
}

export default WasteManProfile;