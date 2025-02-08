import React, { createContext, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';
import axios from 'axios';
import slugify from 'slugify'; 

const Mastercontext = createContext(); 

export const MasterPage = ({ children }) => {
    const [productData, setProductData] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const categories = Array.from(new Set(productData.map(product => product.category)));
    const [pop, setPop] = useState('');
    const showPop = (popup) => {
        setPop(popup);
        document.documentElement.style.setProperty('overflow', 'hidden');
    };
    const hidePop = (popup) => {
        if (pop === popup) {
            setPop('');
            document.documentElement.style.setProperty('overflow', 'visible');
          }
    };
    useEffect(() => {
        const storedCartItems = sessionStorage.getItem('cartItems');
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
        }
        axios.get('https://fakestoreapi.com/products')
            .then(response => {
                setProductData(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    function addtoCart(product) {
        const isProductInCart = cartItems.some(item => item.id === product.id);
        if (!isProductInCart) {
            setCartItems(cartItems => [...cartItems, product]);
            const updatedCartItems = [...cartItems, product];
            sessionStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        }
        else{
            alert('Item Already in Cart');
        }
    }
    function removefromCart(product) {
        const updatedCartItems = cartItems.filter(item => item.id !== product.id);
        setCartItems(updatedCartItems);
        sessionStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    }

    const slugifytitle = (categoryName) => {
        return slugify(categoryName, { lower: true,remove: /[*+~.()'"!:@]/g });
    };
     
    return (
        <Mastercontext.Provider value={{productData,cartItems,categories,setProductData,addtoCart,removefromCart,slugifytitle}}>
            <div>
                <header>
                    <div className="header-wrapper">
                        <div className="colA">
                            <Link className="logo" to={'/kmrshop/'}>KMR<span>shop</span></Link>
                        </div>
                        <div className="colB">
                            <ul className='nav'>
                                <li className='hasdropdown'>
                                    <Link to={'/kmrshop/products'}>Products</Link>
                                    <menu className="dropdown-menu">
                                        {categories.map((category, index) => (
                                            <li key={index}><Link to={`/kmrshop/products/${slugifytitle(category)}`} onClick={() => window.scrollTo({ top: 0 })}>{category}</Link></li>
                                        ))}
                                    </menu>
                                </li>
                            </ul>
                            <button className="btn" onClick={() => showPop('model-cart')}><Icon icon="ion:bag-handle" width="20" height="20" /> Cart {cartItems.length > 0 && <span className="dot">{cartItems.length}</span>}</button>
                        </div>
                    </div>
                </header>
                <main>
                    {children}
                </main>
                {/* <footer>
                    <div className="footer-wrapper">
                        <div className="colA">
                            <Link className="logo" to={'/'}>KMR<span>shop</span></Link>
                        </div>
                    </div>
                </footer> */}
                <div className={`model model-cart ${pop === 'model-cart' ? 'is-open' : ''}`}>
                    <button className="close" onClick={() => hidePop('model-cart')}><Icon icon="material-symbols:close-rounded" width="22" height="22" /></button>
                    <div className="model-body">
                        <div className="cart-titl">
                            <h3>Cart</h3>
                            <p>Total Items: <span>{cartItems.length}</span></p>
                        </div>
                        <div className="cart-items">
                            {cartItems &&
                                cartItems.map((cart) => {
                                    const { id, title, price, image } = cart;
                                    return (
                                        <div className='col-md' key={id}>
                                            <img src={image} alt={title} />
                                            <div className="mid">
                                                <span>{title}</span>
                                                <p>${price}</p>
                                            </div>
                                            <button className='delt-btn' onClick={() => removefromCart(cart)}><Icon icon="fluent:delete-48-filled" width="20" height="20" /></button>
                                        </div>
                                    );
                                })
                            }
                            {cartItems.length === 0 && 
                                <div className="no-item">
                                    <Icon icon="ic:outline-error" width="52" height="52" />
                                    <p>Nothing in Cart!</p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Mastercontext.Provider>
    );
};

export const useMaster = () => {
    return useContext(Mastercontext);
};
