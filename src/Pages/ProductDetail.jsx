import React from 'react';
import { useMaster } from '../Components/MasterPage';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowRight, faTrash } from '@fortawesome/free-solid-svg-icons'; 
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { ProductCard } from '../Components/ProductCard';
import ReactStars from "react-rating-stars-component";               
import { Icon } from '@iconify/react/dist/iconify.js';
import '@splidejs/react-splide/css';

export const ProductDetail = () => {
  const { productData, slugifytitle, addtoCart, removefromCart, cartItems} = useMaster();
  const { id, category } = useParams();
  const product = productData.find(product => product.id === parseInt(id));
  const filteredProducts = productData.filter(product => slugifytitle(product.category) === slugifytitle(category) && product.id !== parseInt(id));
  const isProductInCart = product && cartItems.some(item => item.id === product.id);

  if (!product) {
    return <div>Product Not Found!</div>;
  }

  return (
    <>
      <div className="prod-dtl-secA">
        <div className="container">
          <div className="flex">
            <div className="colA">
                <figure><img src={product.image} alt={product.title} title={product.title} /></figure>
            </div>
            <div className="colB">
              <div className="card">
                <h1>{product.title}</h1>
                <span>${product.price}</span>
                {product.rating && (
                    <>
                        <div className="rtnd-div">
                            <ReactStars
                                count={5}
                                size={25}
                                value={product.rating.rate}
                                halfIcon={<Icon icon="mdi:star-half" />}
                                filledIcon={<Icon icon="mdi:star" />}
                                emptyIcon={<Icon icon="mdi:star-outline" />}
                                activeColor="#ffd700"
                            />
                            <span className="ttl-rt">({product.rating.count})</span>
                        </div>
                    </>
                )}
                <p>{product.description}</p>
                {!isProductInCart ?
                    <button className="add-to-cart" onClick={() => addtoCart(product)}>
                      Add to cart <FontAwesomeIcon icon={faCircleArrowRight} />
                    </button>
                    :
                    <button className="add-to-cart" onClick={() => removefromCart(product)}>
                      Remove From Cart<FontAwesomeIcon icon={faTrash} />
                    </button>
                  }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="prod-dtl-secB">
        <div className="container">
          <div className="heading text-center">
            <h3>Other Products</h3>
          </div>
          <Splide
            className="product-slider products-list"
            options={{
              type: 'slide',
              gap: "20px",
              pauseOnHover: true,
              perPage: 4,
              autoplay: false,
              pagination: false,
              arrows: true,
              breakpoints: {
                767: {
                  perPage: 1,
                  pauseOnHover: false,
                  arrows: true,
                }
              },
            }}
            aria-label="products"
          >
            {filteredProducts.map(product => (
              <SplideSlide key={product.id}>
                <ProductCard
                    key={product.id}
                    product={product}
                    isProductInCart={isProductInCart}
                    addtoCart={addtoCart}
                    removefromCart={removefromCart}
                  />
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </div>
    </>
  );
};
