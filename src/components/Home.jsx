import Profile from './Profile';

const Home = () => {
  return (
    <div style={{marginTop: 80}}>
      <h1 className='titleText'> Mint now </h1>
      <div>
        <Profile minter entry={{image: "/girlclubmint.gif"}} index={1}/>
      </div>
    </div>
  )
}
export default Home;