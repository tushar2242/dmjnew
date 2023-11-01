import React from "react";
// import { NavLink } from 'react-router-dom';
import deliveryimg from "./box.png";
import productimg from "./product.png";
import "./dashboard.css";
import Details from "./Orderdetails";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import StarRateIcon from "@mui/icons-material/StarRate";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

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
                <div className="order-desktopvw">
                  <Ordercard />
                  <Ordercard />
                  </div>

                  <div className="ordered-mobviw">
                   <OrderListCardMob />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* { <Details />} */}
      </>
    );
  }
}

class Filter extends React.Component {
  render() {
    return (
      <>
        <div className="order-view mt-5">
          <form action="" className="d-flex">
            <input
              type="text"
              placeholder="Search your orders here ..."
              className="form-control ord-search-int"
            />
            <button className="srch-ord-btnvew" type="submit">
              Search
            </button>
          </form>
        </div>
      </>
    );
  }
}

class Ordercard extends React.Component {
  render() {
    return (
      <>
        <div className="ordered-prdctbox mt-3">
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <div className="ord-prdct-img-boxv">
                <img
                  src={productimg}
                  alt="product"
                  className="ord-product-imgvw"
                />
              </div>

              <div className="ms-3">
                <p className="prd-namefnt">Lorem ipsum dolor sit amet.</p>
                <p className="prd-clr-type">color: Grey</p>
              </div>
            </div>

            <div>
              <h6 className="ord-price-pro">
                <CurrencyRupeeIcon className="rupee-icn-frpr" />
                890
              </h6>
            </div>

            <div>
              <h6 className="dlry-date-fnts">
                <FiberManualRecordIcon
                  className="rupee-icn-frpr"
                  style={{ color: "#0aa847" }}
                />
                Delivered on Oct 09
              </h6>
              <p className="prd-clr-type">Your item has been delivered</p>
              <p className="rate-fntsz-vw">
                <StarRateIcon style={{ fontSize: "20px" }} /> Rate & Review
                Product
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
}


const OrderListCardMob = () => {
    return (
        <>
          <div className="mob-vw-ordlist mt-2 mb-2">
            <div className="d-flex justify-content-between">
            <div className="ord-prdct-img-boxv">
                <img
                  src={productimg}
                  alt="product"
                  className="ord-product-imgvw"
                />
              </div>

              <div className="mt-3">
              <h6 className="dlry-date-fnts">
                Delivered on Oct 09
              </h6>

              <p className="prd-namefnt">Lorem ipsum ...</p>
              </div>

               <div className="mt-4">
                 <NavigateNextIcon />
               </div>

            </div>

            <div className="d-flex justify-content-between">
            <p className="rate-fntsz-vw">
                Rate & Review
                Product
              </p>  
              <div>
               <StarOutlineIcon /> <StarOutlineIcon /> <StarOutlineIcon /> <StarOutlineIcon /> <StarOutlineIcon />
              </div> 
            </div>
          </div>
        </>
    )
}