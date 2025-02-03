import React from 'react';
import { Link } from 'react-router-dom';            
import { Icon } from "@iconify/react";   
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { useMaster } from '../Components/MasterPage';
import { ProductCard } from '../Components/ProductCard';


export const Home = () => {

    const { productData,cartItems,addtoCart,removefromCart} = useMaster();
    
    return (
        <>
            <div className="home-banner">
                <div className="container">
                    <div className="banner-wrapper">
                        <div className="content">
                            <h1>Explore endless treasures with every click.</h1>
                            <Link to={'/kmrshop/products/'} className="btn"><Icon icon="ant-design:shopping-filled" width="24" height="24" />Shop Now</Link>
                        </div>
                        <figure className='bannerImg'>
                            <img src={require('../assets/images/bannerimg.png')} alt="" />
                        </figure>
                    </div>
                </div>
            </div>
            <div className="homeSecA">
                <div className="container">
                    <div className="heading text-center">
                        <h3>Our Products</h3>
                    </div>
                    <div className="product-demo">
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
                            {productData &&
                                productData.map((product) => (
                                    <SplideSlide key={product.id}>
                                        <ProductCard 
                                            product={product} 
                                            cartItems={cartItems} 
                                            addtoCart={addtoCart} 
                                            removefromCart={removefromCart} 
                                        />
                                    </SplideSlide>
                                ))
                            }
                        </Splide>
                    </div>
                </div>
            </div>
        </>
    );
};
