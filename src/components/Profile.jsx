import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Minter from './Minter';
import MiamiAfterDark  from  "./contracts/MiamiAfterDark.json";
import Web3 from 'web3';
require("dotenv").config();

const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;

const Profile = ({entry, index, minter = false}) => {
  console.log(entry, index)
  const [connectedWallet, setConnectedWallet] = useState(null)
  
  var provider = alchemyKey;
  var web3Provider = new Web3.providers.HttpProvider(provider);
  const web3 = new Web3(web3Provider);
  const contractAddr = '0xFa3bA15F69d3dd4d9b3c9F2f19A47e47E0Bcb49E';

  const contract = new web3.eth.Contract(MiamiAfterDark.abi, contractAddr);

  const [number, setNumber] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMinted().then(() => {
      setLoading(false);
    })
  }, [])

  const getMinted = async () => {
    const result = await contract.methods.getMinted().call();
    console.log(result);
    setNumber(result);
    return result;
  }
  
  const mint = () => {

  }
  
  return (
    <div style={{display: 'flex', flexDirection: 'column', border: "2px solid #e5e5e5", borderRadius: 10, padding: 20, margin: 10, marginRight: 'auto', marginLeft: 'auto', maxWidth: 440}}>
      {!minter && <h2 className="titleText" style={{fontSize: 24}}> <b>M.A.D #{index + 1} <br/></b> </h2> }
      <img className="grid-element" src={entry.image} style={{height: 300, width: 300 }}/>
      {
        minter && 
        <div className="element-info">
          {connectedWallet &&
            <div>
              {/* Put in an input field for number to mint */}
              <Button onClick={mint}> Mint </Button>
            </div>
          }
          <Minter />
          <span style={{ paddingTop: 10}}> {loading ? "Loading" : `Total Minted: ${number}`} </span>
        </div>
      }
    </div>)
}

export default Profile;