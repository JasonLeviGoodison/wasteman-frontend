import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListMans from './components/ListMans';
import Header from './components/Header';
import Home from './components/Home';
import Refund from './components/Refund';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/mans" element={<ListMans metamask/>} />
          <Route path="/refund" element={<Refund/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
