import WasteManProfile from './WasteManProfile';

const Home = () => {
  return (
    <div style={{marginTop: 80}}>
      <h1 className='titleText'> Mint now </h1>
      <div>
        <WasteManProfile minter entry={{image: "/girlclubmint.gif"}} index={1}/>
      </div>
    </div>
  )
}
export default Home;