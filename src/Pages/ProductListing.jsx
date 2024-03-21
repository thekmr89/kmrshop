import '../assets/sass/product/product-listing.css'

export const ProductListing = () => {
    return (
        <>
            <div className="banner product-listing-banner">
                <div className="bg"><img src={require('../assets/images/product-listing.webp')} alt="" /></div>
            </div>
            <div className="prod-SecA">
                <div className="heading text-center">
                    <h3>Our Products</h3>
                </div>
            </div>
        </>
    );
};
