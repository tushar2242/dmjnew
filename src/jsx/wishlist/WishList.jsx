import React from 'react';
import HeaderCon from '../header/HeaderCon';
import cardImg from '../../assets/images/carpet3.jpg';
import { NavLink } from 'react-router-dom';
import axios from 'axios';




const url = 'https://api.diwamjewels.com/DMJ/'
const endPoint = 'api/v1/products/';
const productEndPoint = 'api/v1/products';
const imgUrl = 'https://squid-app-2-7wbvi.ondigitalocean.app/';

const userToken = sessionStorage.getItem('userToken');
var wishList = JSON.parse(localStorage.getItem('wishList')) || [];



export default class WishList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            prodetails: []
        }


        this.clearItem = this.clearItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleWishListItems = this.handleWishListItems.bind(this)
    }

    async handleWishListItems(id) {

        try {
            const res = await axios.get(url + productEndPoint + '/' + id)
            // console.log(res.data.data)
            const updatedProDetails = [...this.state.prodetails, res.data.data];
            this.setState({ prodetails: updatedProDetails });

            // console.log(proDetails)
        }
        catch (err) {
            console.log(err)
        }

    }

    componentDidMount() {
        wishList = JSON.parse(localStorage.getItem('wishList')) || [];
        window.scrollTo(0, 0);
        // setProDetails([])
        this.setState({ prodetails: [] });
        // setAdtCart(cart)
        wishList.map((id) => this.handleWishListItems(id))
        // addProductData() 

    }

    clearItem() {
        console.log('clearItems')
    }

    deleteItem() {
        console.log('single id deleted')
    }
    render() {

        const { prodetails } = this.state

        return (
            <>
                <HeaderCon />

                <div className="container mt-4">
                    <NavLink to="/search" className="text-decoration-none" style={{ width: 'fit-content', display: 'inline-block' }}>
                        <h6 className="mt-4 cont-shp mb-3"><i className="bi bi-chevron-left"></i>
                            Continue shopping</h6></NavLink>
                    <div className="wish-bg">
                        <div className="d-flex justify-content-between">
                            <h5><b>Wishlist</b></h5>
                            <p className="clear-text" onClick={() => this.clearItem()}>Clear items <i className="bi bi-trash3-fill"></i></p>
                        </div>

                        <div className="row">

                            {
                                prodetails.length > 0 ? prodetails.map((item, index) => {
                                    return (
                                        <WhiteItemCard
                                            item={item}
                                            key={index}
                                        />
                                    )
                                })
                                    :
                                    <h4 className="mt-4 text-center">Please Add Some Products</h4>
                            }

                        </div>
                    </div>
                </div>
            </>
        )
    }
}


const WhiteItemCard = ({ item }) => {

    const addToCart = (id) => {
        const existingCart = JSON.parse(localStorage.getItem("pdIds")) || [];
        existingCart.push(id);

        localStorage.setItem("pdIds", JSON.stringify(existingCart));
    };


    return (
        <>
            <div className="col-md-3 mt-3">
                <h2>{userToken}</h2>
                <div className="card border-0 shadow-sm">
                    <img src={imgUrl + item.images[0].thumbImage} className="card-img-top img-fluid" alt="wishlist" />
                    <div className="card-body wish-body">
                        <h6 className="card-title"><b>{item.seo_title.replace(/"/g, '').slice(0, 25)}</b></h6>
                        <p className="pro-font"><i className="bi bi-currency-rupee"></i>
                            {item.images.length > 0 && item.images[0].productVariantEntities.length > 0 && item.images[0].productVariantEntities[0].price}
                        </p>
                        <p className="off-text">
                            MRP: <del><i className="bi bi-currency-rupee"></i> {item.images.length > 0 && item.images[0].productVariantEntities.length > 0 && item.images[0].productVariantEntities[0].manualPrice}</del><span> (Incl all taxes)</span>
                        </p>
                        <div className="wish-star">
                            <i className="bi bi-star-fill" style={{ color: '#0227bd' }}></i>
                            <i className="bi bi-star-fill" style={{ color: '#0227bd' }}></i>
                            <i className="bi bi-star-fill" style={{ color: '#0227bd' }}></i>
                            <i className="bi bi-star-fill" style={{ color: '#0227bd' }}></i>
                            <i className="bi bi-star-half" style={{ color: '#0227bd' }}></i>
                            <span className="review-text"> 50 Reviews</span>
                        </div>
                        <div className="d-flex justify-content-between mt-4">
                            <NavLink to="/addToCart"><button className="text-white border-0 px-3 py-1 add-cart-btn" onClick={async () => {
                                await addToCart(item.id);
                                navigate("/addtocart");
                            }}>Add to cart</button></NavLink>
                            <NavLink to="/checkout"><button className="text-white border-0 px-3 py-1 buy-now-btn" onClick={async () => {
                                await addToCart(item.id);
                                navigate("/checkout");
                            }}>Buy Now</button></NavLink>
                            <i className="bi bi-trash-fill fs-5 text-danger" onClick={() => deleteItem()}></i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}