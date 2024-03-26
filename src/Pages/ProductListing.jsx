import '../assets/sass/product/product.css'
import { useMaster } from '../Components/MasterPage';
import { useParams, Link } from 'react-router-dom';

export const ProductListing = () => {
    const { productlisting } = useParams();
    const { categories,slugifytitle } = useMaster();
    return (
        <>
            <div className="banner product-listing-banner">
                <div className="bg"><img src={require('../assets/images/product-listing.webp')} alt="" /></div>
                <div className="banner-wrapper">
                    <div className="container">
                        <div className="content">
                            <h1></h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="prod-SecA">
                <div className="container">
                    <div className="grid">
                    
                    </div>
                </div>
            </div>
        </>
    );
};
