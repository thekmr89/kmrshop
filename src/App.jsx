import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './Pages/Home';
import { ProductCategory } from './Pages/ProductCategory';
import { ProductListing } from './Pages/ProductListing';
import { ProductDetail } from './Pages/ProductDetail';
import { PageNotFound } from './Pages/PageNotFound';
import { MasterPage } from './Components/MasterPage';
import './assets/fonts/stylesheet.css';
import './assets/sass/style.css';

function App() {
  return (
    <Router>
      <MasterPage>
        <Routes>
          <Route exact path="/kmrshop" element={<Home />} />
          <Route path="/kmrshop/products" element={<ProductCategory />} />
          <Route path="/kmrshop/products/:category" element={<ProductListing />} />
          <Route path="/kmrshop/products/:category/:id" element={<ProductDetail />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </MasterPage>
    </Router>
  );
}

export default App;
