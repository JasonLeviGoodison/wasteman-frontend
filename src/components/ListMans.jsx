import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import "./ListMans.css"
import WalletLinker from './WalletLinker';

const ListMans = () => {
  //const [connectedWallet, setConnectedWallet] = useState(false);
  let [entries, setEntries] = useState([{
    name: "#1",
    image: "https://ipfs.infura.io/ipfs/QmcFgDJJoYrUvYcHSuGPTiSeaSY8sp5Xz1PapiB8QM8wzM",
    votes: 0
  }])
  const [clickedEntry, setClickedEntry] = useState(0);


  useEffect(() => {
    getEntries()
  }, [])

  const getEntries = async () => {
    var response = await fetch('http://localhost:3000/entries/getall');
    var results = await response.json()
    console.log(results)
    setEntries(results)
  }

  const voteForEntryClicked = (index) => {
    return () => {
      setClickedEntry(index);
    }
  }

  entries = [entries[0], entries[0], entries[0], entries[0], entries[0]]

  return (
    <div>
      <div>
        <div className="mansTitle">
          <h1 className="titleText">Cop a look at our Mans </h1>
          <p className="paraText">This is a list of every WasteMan</p>
        </div>
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
          {entries && entries.map((entry, index) => {
            //<Entry entry={entry}/>
            return (
              <div style={{display: 'flex', flexDirection: 'column', border: "2px solid #e5e5e5", borderRadius: 10, padding: 20, margin: 10}}>
                <h2 className="titleText" style={{fontSize: 24}}> <b>WasteMan #{index + 1} <br/></b> </h2>
                <img className="grid-element" src={entry.image} style={{height: 300, width: 300 }}/>
                {/* <div className="element-info">
                Minter: 
                </div> */}
              </div>)
          })}
        </div>
      </div>
    </div>
  );
}

export default ListMans;