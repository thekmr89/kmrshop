import React, { useState } from 'react';
import { useMaster } from '../Components/MasterPage';
import { useParams } from 'react-router-dom';
import { ProductCard } from '../Components/ProductCard';

export const ProductListing = () => {
  const { productData, categories, addtoCart, removefromCart, cartItems, slugifytitle } = useMaster();
  const { category: urlCategory } = useParams();
  
  const formattedCategory = slugifytitle(urlCategory);

  const originalCategory = categories.find(cat => slugifytitle(cat) === formattedCategory) || urlCategory;
  
  const categoryExists = categories.some(cat => slugifytitle(cat) === formattedCategory);

  const filteredProducts = categoryExists ? productData.filter(product => slugifytitle(product.category) === formattedCategory) : [];

  const [visibleProductCount, setVisibleProductCount] = useState(3);

  const loadMore = () => setVisibleProductCount(prev => prev + 3);

  return (
    <div className="prod-List-secA">
      <div className="container text-center">
        {!categoryExists ? (
          <h3>Category Not Found</h3>
        ) : (
          <>
            <div className="heading">
              <h3>{`Products in ${originalCategory}`}</h3>
            </div>
            <div className="prod-con products-list">
              {filteredProducts.slice(0, visibleProductCount).map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isProductInCart={cartItems.some(item => item.id === product.id)}
                  addtoCart={addtoCart}
                  removefromCart={removefromCart}
                />
              ))}
            </div>
            {visibleProductCount < filteredProducts.length && (
              <button onClick={loadMore} className="btn btn-primary mt-3">Load More</button>
            )}
          </>
        )}
      </div>
    </div>
  );
};
