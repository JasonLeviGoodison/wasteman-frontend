import React, { useEffect, useState } from 'react';
import "./ListMans.css"
import Profile from './Profile';

const ListMans = () => {
  //const [connectedWallet, setConnectedWallet] = useState(false);
  let [entries, setEntries] = useState([])

  useEffect(() => {
    getEntries()
  }, [])

  const getEntries = async () => {
    let url = '/.netlify/functions/getAll'
    var response = await fetch(url); //http://localhost:3001/wastemans/getall'
    var results = await response.json()
    console.log(results, "HERHEREHREHR")
    //TODO: REMOVE THIS AND JUST RETURN RESUTLS
    setEntries([results[0], results[0], results[0], results[0], results[0]])
  }

  //entries = [entries[0], entries[0], entries[0], entries[0], entries[0]]
  console.log(entries)

  return (
    <div>
      <div>
        <div className="mansTitle">
          <h1 className="titleText">Take a look at our collection </h1>
          <p className="paraText">This is a list of every M.A.D</p>
        </div>
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
          {entries.length > 0 && entries.map((entry, index) => {
            return <Profile entry={entry} index={index}/>
          })}
        </div>
      </div>
    </div>
  );
}

export default ListMans;