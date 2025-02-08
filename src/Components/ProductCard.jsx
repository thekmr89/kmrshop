import ReactStars from "react-rating-stars-component";               
import { Icon } from "@iconify/react";   
import { Link } from "react-router-dom";
import { useMaster } from "./MasterPage";

export const ProductCard = ({ product, addtoCart, removefromCart }) => {
    const { cartItems, slugifytitle } = useMaster();
    const { id, title, price, category, image, rating } = product;

    // Check if the product is already in the cart
    const isProductInCart = cartItems.some(item => item.id === id);

    return (
        <div className="item">
            <Link to={`/kmrshop/products/${slugifytitle(category)}/${id}`} className='figure'>
                <img src={image} alt={title} />
                <span className="strip">${price}</span>
                <span className="desc">{category}</span>
            </Link>
            <figcaption>
                <div className="upr-ttl">
                    <h4>{title}</h4>
                </div>
                {rating && (
                    <>
                        <div className="rtnd-div">
                            <ReactStars
                                count={5}
                                size={25}
                                value={rating.rate}
                                halfIcon={<Icon icon="mdi:star-half" />}
                                filledIcon={<Icon icon="mdi:star" />}
                                emptyIcon={<Icon icon="mdi:star-outline" />}
                                activeColor="#ffd700"
                            />
                            <span className="ttl-rt">({rating.count})</span>
                        </div>
                    </>
                )}
                {!isProductInCart ? (
                    <button className="add-to-cart" onClick={() => addtoCart(product)}>
                        Add to cart <Icon icon="material-symbols:bookmark-added-rounded" width="24" height="24" />
                    </button>
                ) : (
                    <button className="add-to-cart" onClick={() => removefromCart(product)} style={{ background: 'red' }}>
                        Remove From Cart<Icon icon="mingcute:delete-line" width="24" height="24" />
                    </button>
                )}
            </figcaption>
        </div>
    );
};
