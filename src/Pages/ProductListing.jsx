import React, { useState, useEffect } from 'react';
import { useMaster } from '../Components/MasterPage';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowRight, faTrash } from '@fortawesome/free-solid-svg-icons'; 

export const ProductListing = () => {
  const { productData, categories, slugifytitle, addtoCart, removefromCart, cartItems } = useMaster(); 
  const { category: urlCategory } = useParams();

  const [visibleProductCount, setVisibleProductCount] = useState(3);
  const [category, setCategory] = useState(urlCategory);
  
  useEffect(() => {
    setVisibleProductCount(3);
    setCategory(urlCategory);
  }, [urlCategory]);

  const categoryExists = categories.some(cat => slugifytitle(cat) === category);
  const filteredProducts = categoryExists ? productData.filter(product => slugifytitle(product.category) === category) : [];

  const loadMore = () => {
    setVisibleProductCount(prevVisibleProductCount => prevVisibleProductCount + 3);
  };

  return (
    <div className="prod-List-secA">
      <div className="container">
        {!categoryExists && <div>Category Not found</div>}
        {categoryExists && (
          <>
            <div className="heading text-center">
              <h3>{`Products in ${category}`}</h3>
            </div>
            <div className="prod-con products-list">
              {filteredProducts.slice(0, visibleProductCount).map(product => {
                const isProductInCart = cartItems.some(item => item.id === product.id);
                return (
                  <div className="item" key={product.id}>
                    <Link to={`/products/${slugifytitle(product.category)}/${product.id}`} className='figure' onClick={() => window.scrollTo({ top: 0 })}>
                      <img src={product.image} alt={product.title} />
                      <span className="strip">${product.price}</span>
                      <span className="desc">{product.category}</span>
                    </Link>
                    <figcaption>
                      <div className="upr-ttl">
                        <h4>{product.title}</h4>
                      </div>
                      {!isProductInCart ?
                        <button className="add-to-cart" onClick={() => addtoCart(product)}>
                          Add to cart <FontAwesomeIcon icon={faCircleArrowRight} />
                        </button>
                        :
                        <button className="add-to-cart" onClick={() => removefromCart(product)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      }
                    </figcaption>
                  </div>
                );
              })}
            </div>
            {visibleProductCount < filteredProducts.length && (
              <button onClick={loadMore} className='btn' >Load More</button>
            )}
          </>
        )}
      </div>
    </div>
  );
};
