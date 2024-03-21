import  React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './Pages/Home';
import { ProductListing } from './Pages/ProductListing';
import { MasterPage } from './Components/MasterPage';
import './assets/css/style.css'
import '@fortawesome/fontawesome-free/css/all.css';


function App() {

  useEffect(() => {
    document.documentElement.style.setProperty('--headerheight', window.getComputedStyle(document.querySelector("header")).height);
    document.documentElement.style.setProperty('--footerheight', window.getComputedStyle(document.querySelector("footer")).height);
  }, []);

  return (
    <Router>
      <MasterPage>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/products" element={<ProductListing />} />
        </Routes>
      </MasterPage>
    </Router>

  );
}

export default App;