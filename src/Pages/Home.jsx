import '../assets/sass/home/home.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBag,faCircleArrowRight,faTrash } from '@fortawesome/free-solid-svg-icons';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { useMaster } from '../Components/MasterPage';



export const Home = () => {

    const { productData,cartItems,addtoCart,removefromCart} = useMaster();
    const [visibleProductCount, setVisibleProductCount] = useState(5);
    const loadMore = () => {
        setVisibleProductCount(prevVisibleProductCount => prevVisibleProductCount + 5);
    };

    return (
        <>
        <div className="home-banner">
            <div className="container">
                <div className="banner-wrapper">
                    <div className="content">
                        <h1>Explore endless treasures with every click.</h1>
                        <button className="btn"><FontAwesomeIcon icon={faShoppingBag} />Shop Now</button>
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
                            className="product-slider"
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
                                productData.map((product) => {
                                    const { id, title, price, category,image } = product;
                                    const isProductInCart = cartItems.some(item => item.id === product.id);
                                    return (
                                        <SplideSlide key={id}>
                                            <div className="item">
                                                <Link to={'/'} className='figure'>
                                                    <img src={image} alt={title}></img>
                                                    <span className="strip">${price}</span>
                                                    <span className="desc">{category}</span>
                                                </Link>
                                                <figcaption>
                                                    <div className="upr-ttl">
                                                        <h4>{title}</h4>
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
                                        </SplideSlide>
                                    );
                                })}
                        </Splide>
                    </div>
            </div>
        </div>
        <div className="pagination" style={{ padding: '60px 0' }}>
                <div className="container">
                    <div className="flex" style={{gap: '45px 0' }}>
                        {productData &&
                            productData.slice(0, visibleProductCount).map((product, index) => {
                                const { image } = product;
                                return (
                                    <div className="col" style={{ flex: '0 1 25%' }} key={index}>
                                        <img src={image} alt="" style={{ width: '100%', aspectRatio: '1', objectFit: 'contain' ,padding: '30px'}} />
                                    </div>
                                );
                            })}
                    </div>
                    {visibleProductCount < productData.length && (
                        <button onClick={loadMore} className='btn' style={{ display: 'block',textAlign: 'center' ,margin: '0 auto'}}>Load More</button>
                    )}
                </div>
            </div>
        </>
    );
};
