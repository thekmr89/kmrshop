import React, { useState, useEffect } from 'react';
import { useMaster } from '../Components/MasterPage';
import { useParams } from 'react-router-dom';
import slugify from 'slugify';
import { ProductCard } from '../Components/ProductCard';

export const ProductListing = () => {
  const { productData, categories, addtoCart, removefromCart, cartItems } = useMaster();
  const { category: urlCategory } = useParams();
  
  const [visibleProductCount, setVisibleProductCount] = useState(3);
  const [category, setCategory] = useState(urlCategory);
  
  useEffect(() => {
    setVisibleProductCount(3);
    setCategory(urlCategory);
  }, [urlCategory]);

  const categoryExists = categories.some(cat => slugify(cat) === category);
  const filteredProducts = categoryExists
    ? productData.filter(product => slugify(product.category) === category)
    : [];

  const loadMore = () => {
    setVisibleProductCount(prev => prev + 3);
  };

  return (
    <div className="prod-List-secA">
      <div className="container">
        {!categoryExists && <div>Category Not Found</div>}
        {categoryExists && (
          <>
            <div className="heading text-center">
              <h3>{`Products in ${category}`}</h3>
            </div>
            <div className="prod-con products-list">
              {filteredProducts.slice(0, visibleProductCount).map(product => {
                const isProductInCart = cartItems.some(item => item.id === product.id);
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isProductInCart={isProductInCart}
                    addtoCart={addtoCart}
                    removefromCart={removefromCart}
                  />
                );
              })}
            </div>
            {visibleProductCount < filteredProducts.length && (
              <button onClick={loadMore} className='btn'>Load More</button>
            )}
          </>
        )}
      </div>
    </div>
  );
};
