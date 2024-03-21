import '../assets/sass/home/home.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBag,faCircleArrowRight,faTrash } from '@fortawesome/free-solid-svg-icons';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { useMaster } from '../Components/MasterPage';



export const Home = () => {

    const { productData,cartItems,addtoCart,removefromCart } = useMaster();
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
        </>
    );
};
