import React from 'react';
import { useMaster } from '../Components/MasterPage';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowRight, faTrash } from '@fortawesome/free-solid-svg-icons'; 
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

export const ProductDetail = () => {
  const { productData, slugifytitle, addtoCart, removefromCart, cartItems } = useMaster();
  const { id, category } = useParams();
  const product = productData.find(product => product.id === parseInt(id));
  const filteredProducts = productData.filter(product => slugifytitle(product.category) === category && product.id !== parseInt(id));
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
                <div className="item">
                  <Link to={`/kmrshop/products/${slugifytitle(product.category)}/${product.id}`} className='figure' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <img src={product.image} alt={product.title} />
                    <span className="strip">${product.price}</span>
                    <span className="desc">{product.category}</span>
                  </Link>
                  <figcaption>
                    <div className="upr-ttl">
                      <h4>{product.title}</h4>
                    </div>
                    {!cartItems.some(item => item.id === product.id) ?
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
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </div>
    </>
  );
};
