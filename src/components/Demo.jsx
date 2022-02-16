import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { verifyPossibleTransaction } from "../alchemy/interact.js";
import { withSnackbar } from 'notistack';
import ConnectWallet from "./ConnectWallet.jsx";
import './Demo.css'
import ReactLoading from "react-loading";
import AddIcon from '@mui/icons-material/Add';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import FormHelperText from '@mui/material/FormHelperText'
import Select from '@mui/material/Select';
import Minter from './Minter';

const Demo = (props) => {
  // State variables

  const [project, setProject] = useState(null);
  const [avatarChange, setShowAvatarChange] = useState(false);
  const [mintDisabled, setMintDisabled] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const [tokenId, setTokenId] = useState("");
  const { enqueueSnackbar } = props;
  const [selectedBackground, setSelectedBackground] = useState(-1);
  const [step, setStep] = useState(1)
  const [selectedProject, setSelectedProject] = useState('Amingo');
  const [isMinting, setIsMinting] = useState(false);

  const projectInfo = {
      'WoW': {
        img: "wow-removebg.png",
        name: "World of Women",
        tokens: 10000
      },
      'DOD': {
        img: "doodle-removebg.png",
        name: "Doodles",
        tokens: 10000
      },
      "CC": {
        img: 'nothinge',
        name: 'CryptoChicks',
        tokens: 10000
      },
      "EP": {
        img: 'nothing',
        name: 'ExpansionPunks',
        tokens: 10000
      },
      "Amingo": {
        name: "Amingos",
        img: 'mingo.png',
        tokens: 10000
      }
  }
  const projects = ['Amingo', 'WoW','DOD']

  const backgrounds = [
    {
      img: "coral-destroyed.png",
      descriptor: "Coral",
      left: '102'
    },
    {
      img: "ocean-destroyed.png",
      descriptor: 'Ocean',
      left: '1232'
    },
    {
      img: "forest-destroyed.png",
      descriptor: "Forest",
      left: '1567'
    },
    {
      img: "iceberg-destroyed.png",
      descriptor: 'Iceberg',
      left: '2102'
    }]

  const onNextClicked = () => {
    console.log("OnNextClicked")
    setStep(step + 1)
  }

  const onBackClicked = () => {
    setStep(step - 1)
  }

  const onTokenChange = (evt) => {
    evt.preventDefault();
    if (evt.target.value != "") {
      setMintDisabled(false)
    }
    setTokenId(evt.target.value);
  }

  const handleProjectSelected = (evt) => {
    evt.preventDefault();
    if (evt.target.value != 'Amingo' && tokenId == "") {
      setMintDisabled(true);
    } else {
      setMintDisabled(false)
    }
    setSelectedProject(evt.target.value);
  }
  
  const getAnother = () => {
    setStep(1);
    setSelectedProject('Amingo');
    setShowAvatarChange(false);
  }

  const onChangeCharacterClicked = () => {
    setStep(step += 1)
  }

  const onMintClicked = async () => {
    // const { canMint, reason } = verifyPossibleTransaction(selectedBackground, selectedProject, walletAddress)
    // if (!canMint) {
    //   enqueueSnackbar(reason, { variant: 'error' })
    // }

    // mint one of ours
    // hit our backend and sell them
    if (mintDisabled) {
      return false;
    }
    setIsMinting(true);
    await new Promise(r => setTimeout(r, 3000));
    setIsMinting(false);
    
    setStep(step + 1)
  }

  const clickedBackground = (index) => {
    setSelectedBackground(index);
    setStep(step + 1);
  }


  const onUseTokenClicked = () => {
    // verify that they own the token
    // call the blockchain project and verify that they own the tokem
    var owned = true; // they do own it
    setStep(step + 1);
  }

  //the UI of our component
  return (
    <div className="DemoPage" style={{display: 'flex', flexDirection: "column", marginTop: 25}}>
      {
        step == 0 && 
        <div>
          <div className="mansTitle">
            <h1 className="titleText">Let's get you connected</h1>
            <p className="paraText">First, connect your Metamask</p>
          </div>
          <div style={{width: 'fit-content', marginLeft: 'auto', marginRight: 'auto'}}>
            <ConnectWallet walletAddress={walletAddress} setWalletAddress={setWalletAddress} callback={onNextClicked}/>
          </div>
        </div>
      }
      {
        step == 1 &&
          <div>
            <div className="mansTitle">
                <h1 className="titleText">Choose the cause you want to support </h1>
                <p className="paraText">Your environment will be cleaned after we reach out donation goals</p>
            </div>
            <div className="backgrounds" style={{display: 'flex', padding: 20, justifyContent: 'center'}}>
              {
                backgrounds.map((x, index) => {
                  return(
                  <div style={{display: 'flex', flexDirection: 'column'}}>
                    <span className="duoText">{x.descriptor}</span>
                    <img src={x.img} className={(index == selectedBackground ? "selectedBackground" : "") + " chooseBackground"} onClick={() => clickedBackground(index)}/>
                    <span className="duoText">{x.left} left</span>
                  </div>);
                })
              }
            </div>
          </div>
      }
      {
        step == 2 &&
          <div style={{display: 'flex', justifyContent: "center"}}>
            <div>
              <div className="mansTitle">
                <h1 className="titleText">Mint your Amingo now</h1>
                <p className="paraText">You get a random Amingo with your mint (some are more rare than others!).</p>
                <div className="previewContainer">
                  {
                    isMinting ? 
                      <div style={{marginRight: 'auto', marginLeft: 'auto'}}>
                        <ReactLoading type={'cubes'} color="#2782EC" width={240}/>
                      </div> :
                      <div className="previewImageContainer" style={{ backgroundImage: `url(${backgrounds[selectedBackground].img})`, marginRight: 'auto', marginLeft: 'auto' }}>
                        <img src={projectInfo[selectedProject].img} onClick={onBackClicked}/> 
                      </div>
                  }

                </div>
                {
                  !isMinting &&
                    <Button variant="primary" id="nextButton" onClick={onMintClicked} style={{width: 'fitContent', marginTop: 11, marginLeft: 20}} disabled={mintDisabled}>
                      Mint
                    </Button>
                }
              </div>
              
            </div>
          </div>
      }
      {
        step == 3 &&
          <div style={{display: 'flex', justifyContent: "center"}}>
            <div>
              <div className="mansTitle">
                <h1 className="titleText">Would you like to import a character?</h1>
                <p className="paraText">Even if you import an avatar from another project you will always own your Amingo and can revert to it at any time</p>
                {
                  avatarChange ?
                  <div>
                    <div className="previewContainer">
                        <div className="previewImageContainer" style={{ backgroundImage: `url(${backgrounds[selectedBackground].img})` }}>
                          <img src={projectInfo[selectedProject].img} onClick={onBackClicked}/> 
                        </div>
                        
                        <div style={{width: '100%', marginLeft: 10, marginTop: 20}} >
                          <FormControl style={{width: '90%'}}>
                              <InputLabel id="demo-simple-select-label">Character</InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedProject}
                                label="Project To Import From"
                                onChange={handleProjectSelected}
                              >
                                {
                                  projects.map(x => {
                                    return <MenuItem value={x}>{projectInfo[x].name}</MenuItem>
                                  })
                                }
                              </Select>
                            </FormControl>
                          {
                            selectedProject != 'Amingo' &&
                            <FormControl style={{width: '90%', marginTop: 10}}>
                              <InputLabel htmlFor="my-input">Token Id</InputLabel>
                              <Input id="my-input" aria-describedby="my-helper-text" onChange={onTokenChange}/>
                                <FormHelperText id="my-helper-text">You need to own this token</FormHelperText>
                            </FormControl>
                          }
                      </div>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                      <Button variant="primary" id="nextButton" onClick={onChangeCharacterClicked} style={{width: 300, marginTop: 11, marginLeft: 20}} disabled={mintDisabled}>
                        Change character
                      </Button>
                      <Button variant="secondary" id="nextButton" onClick={() => setStep(step + 1)} style={{width: 300, marginTop: 11, marginLeft: 20}}>
                        Skip
                      </Button>
                    </div>
                  </div> :
                  <div style={{marginTop: 20}}>
                    <Button variant="primary" id="nextButton" onClick={() => setShowAvatarChange(true)} style={{width: 'fitContent', marginTop: 11, marginLeft: 20, width: 70}} >
                      Yes
                    </Button>
                    <Button variant="secondary" id="nextButton" onClick={() => setStep(step + 1)} style={{width: 'fitContent', marginTop: 11, marginLeft: 20,  width: 70}}>
                      No
                    </Button>
                  </div>
                }
              </div>
            </div>
          </div>
      }
      {
        step == 4 &&
          <div>
            {/*loading && <*/}
            <div className="mansTitle">
                <h1 className="titleText">Congratulations!!!!🎉🥳</h1>
                <p className="paraText">Share to your social media</p>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: "center", marginTop: 25}}>
                  <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <div className="previewImageContainer" style={{ backgroundImage: `url(${backgrounds[selectedBackground].img})` }}>
                        <img src={projectInfo[selectedProject].img} onClick={onBackClicked}/>
                    </div>                 
                  </div>
                </div>
            </div>
            <Button variant="primary" id="nextButton" onClick={getAnother} style={{width: 'fitContent', marginTop: 11, marginLeft: 20}}>
              Get another
            </Button>
          </div>
      }
    </div>
  );
}

export default withSnackbar(Demo);