import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListMans from './components/ListMans';
import Header from './components/Header';
import Home from './components/Home';
import Refund from './components/Refund';
import Demo from './components/Demo';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNFTs from './components/MyNFTs';

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/mans" element={<ListMans metamask/>} />
          <Route path="/refund" element={<Refund/>} />
          <Route path="/mine" element={<MyNFTs/>} />
          <Route path="/demo" element={<Demo/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
