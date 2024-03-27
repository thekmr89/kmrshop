import '../assets/sass/product/product.css'
import { useMaster } from '../Components/MasterPage';
import { Link } from 'react-router-dom';

export const ProductCategory = () => {
    const { categories,slugifytitle } = useMaster();
    const categoryImages = [
        'men-cloathing.svg',
        'jewelery.svg',
        'electronics.svg',
        'women-clothing.svg',
    ];
    
    return (
        <>
            <div className="banner product-category-banner">
                <div className="bg"><img src={require('../assets/images/product-listing.webp')} alt="" /></div>
            </div>
            <div className="prod-SecA">
                <div className="container">
                    <div className="heading text-center">
                        <h3>Our Products</h3>
                    </div>
                    <div className="grid">
                    {categories.map((category, index) => (
                            <Link className='col' key={index} to={`/products/${slugifytitle(category)}`} onClick={() => window.scrollTo({ top: 0 })}>
                                <figure> <img src={require(`../assets/images/category/${categoryImages[index]}`)} alt="" /></figure>
                                <figcaption><h5>{category}</h5></figcaption>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
