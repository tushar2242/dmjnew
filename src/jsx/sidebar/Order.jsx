import React from 'react';
// import { NavLink } from 'react-router-dom';
import deliveryimg from './box.png'
import productimg from './product.png'
import './dashboard.css';
import Details from './Orderdetails';

export default class Orderpage extends React.Component {
// constructor(props){
//     super(props);
//     this.state = {
//     orderdetail: "false",
//     }
// }

    render() {
        return (
            <>
            <div className="sidebar-content">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {/* <Filter /> */}
                            <div className="order-info">
                                <Ordercard />
                                <Ordercard />
                            </div>
                        </div>
                    </div>
                </div>
                </div>
               { <Details />}
            </>
        )
    }
}

class Filter extends React.Component {
    render() {
        return (
            <>
                <div className="order-view mt-5">
                    <h6>All orders <span>from anytime</span></h6>
                    <form className="d-flex">
                        <input className="form-control me-2 w-100" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                        <button className="filter-btn shadow-sm ms-4">Filters</button>
                    </form>

                </div>
            </>
        )
    }
}



class Ordercard extends React.Component {
    render() {
        return (
            <>
                <div className="delivery-bg shadow-sm">
                    <div className="order-display">
                        <img src={deliveryimg} alt="Product" className="del-img mt-1" />
                        <div className="ms-3">
                            <h6 className="text-success">Delivered</h6>
                            <p className="date-text">On Sunday, 27 Feb 2023</p>
                        </div>
                    </div>
                    <div className="info-del-pro">

                       <button><div className="order-display">
                            <img src={productimg} alt="Delivery" className="img-fluid product-image" />
                            <div className="ms-3 mt-2">
                                <h5>Shoes</h5>
                                <p className="pro-info-text">U S Polo Assn Men Grey BRENTT 2.0 Sneakers</p>
                            </div>
                        </div></button>
                        <hr></hr>
                        <ul>
                            <li className="pro-info-text">
                                Exchange/Return window closed on Wed, 9 Mar 2023
                            </li>
                        </ul>
                        <hr></hr>
                        <p className="pro-info-text pb-3">
                            Rate Product <i className="bi bi-star pro-icon"></i>
                            <i className="bi bi-star pro-icon"></i>
                            <i className="bi bi-star pro-icon"></i>
                            <i className="bi bi-star pro-icon"></i>
                            <i className="bi bi-star pro-icon"></i>
                        </p>
                    </div>
                </div>
            </>
        )
    }
}