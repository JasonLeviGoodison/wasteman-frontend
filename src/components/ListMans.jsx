import React, { useEffect, useState } from 'react';
import "./ListMans.css"
import WalletLinker from './WalletLinker';
import WasteManProfile from './WasteManProfile';

const ListMans = () => {
  //const [connectedWallet, setConnectedWallet] = useState(false);
  let [entries, setEntries] = useState([{
    name: "#1",
    image: "https://ipfs.infura.io/ipfs/QmcFgDJJoYrUvYcHSuGPTiSeaSY8sp5Xz1PapiB8QM8wzM",
    votes: 0
  }])

  useEffect(() => {
    getEntries()
  }, [])

  const getEntries = async () => {
    var response = await fetch('http://localhost:3000/entries/getall');
    var results = await response.json()
    console.log(results)
    setEntries(results)
  }

  entries = [entries[0], entries[0], entries[0], entries[0], entries[0]]
  console.log(entries)

  return (
    <div>
      <div>
        <div className="mansTitle">
          <h1 className="titleText">Cop a look at our Mans </h1>
          <p className="paraText">This is a list of every WasteMan</p>
        </div>
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
          {entries && entries.map((entry, index) => {
            return <WasteManProfile entry={entry} index={index}/>
          })}
        </div>
      </div>
    </div>
  );
}

export default ListMans;