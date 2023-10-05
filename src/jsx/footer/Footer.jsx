import React, { useState } from "react";
import logo from "../../assets/images/dmj.png";
import etsy from "../../assets/images/etsy.png";
import amazon from "../../assets/images/amazon.png";
import ebay from "../../assets/images/ebay.png";
import indiamart from "../../assets/images/indiamart.png";
import flipkart from "../../assets/images/flipkart.png";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { addSearch } from "../redux/dmjSlice";
import { useDispatch } from "react-redux";
import shareicon from "../../assets/images/shareicon.png";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const useFullLink = [
  {
    title: "Jewellery",
    link: false,
  },
  {
    title: "Handi crafts",
    link: false,
  },

  {
    title: "Blue Pottery",
    link: false,
  },
];

const section = [
  {
    title: "About DMJ",
    link: "/about",
  },
  {
    title: "Blog",
    link: "/blog",
  },
  {
    title: "FAQ",
    link: "/faq",
  },
  {
    title: " Track Your Order",
    link: "/trackOrder",
  },
  // {
  //   title: 'Help',
  //   link: '/faq'
  // }
];

const info = [
  {
    // title: 'Payment Option',
    // link: false
  },
  {
    title: "  Returns & Refund",
    link: "/refundpolicy",
  },
  {
    title: "Terms & Conditions",
    link: "/termscondition",
  },
  {
    title: " Privacy Policy",
    link: "/privacypolicy",
  },
  {
    title: "Contact Us",
    link: "/contactUs",
  },
];

export default class Footer extends React.Component {
  render() {
    return (
      <>
        <ShareIcon />
        <div className="footer-bg mt-1">
          <div className="container">
            <footer className="">
              <div className="row">
                <div className="col-md-3 mt-3">
                  <img
                    src={logo}
                    alt="Logo"
                    className="img-fluid footer-logo"
                  />

                  <p className="footer-para mt-3">
                    Elevate your style with exquisite jewelry. Discover timeless
                    pieces for every occasion on our curated jewelry website.
                  </p>

                  <h6
                    style={{ color: "#abdbe3", fontSize: "18px" }}
                    className="mt-4"
                  >
                    <b>Social Media</b>
                  </h6>
                  <ul className="list-unstyled d-flex">
                    <li className="ms-3">
                      <NavLink
                        className="link-dark"
                        to="https://www.facebook.com/diwamjewels"
                      >
                        <i className="bi bi-facebook fs-5 footer-icbx"></i>
                      </NavLink>
                    </li>
                    <li className="ms-3">
                      <NavLink
                        className="link-dark"
                        to="https://www.youtube.com/@diwamjewelsvlog"
                      >
                        <i className="bi bi-youtube fs-5 footer-icbx"></i>
                      </NavLink>
                    </li>
                    <li className="ms-3">
                      <NavLink
                        className="link-dark"
                        to="https://www.instagram.com/diwamjewels/"
                      >
                        <i className="bi bi-instagram fs-5 footer-icbx"></i>
                      </NavLink>
                    </li>
                    <li className="ms-3">
                      <NavLink
                        className="link-dark"
                        to="https://twitter.com/DiwamJewels"
                      >
                        <i className="bi bi-twitter fs-5 footer-icbx"></i>
                      </NavLink>
                    </li>
                    <li className="ms-3">
                      <NavLink
                        className="link-dark"
                        to="https://www.pinterest.ca/diwamjewels/"
                      >
                        <i className="bi bi-pinterest fs-5 footer-icbx"></i>
                      </NavLink>
                    </li>
                  </ul>

                  <h6
                    style={{ color: "#abdbe3", fontSize: "18px" }}
                    className="mt-4"
                  >
                    <b>E-Commerce</b>
                  </h6>
                  <ul className="list-unstyled d-flex">
                    <li className="ms-3">
                      <NavLink
                        className="link-dark"
                        to="https://www.etsy.com/in-en/shop/DiwamHandicrafts?ref=shop-header-name&listing_id=1482578792"
                      >
                        <img src={etsy} alt="icon" className="ecomrce-icon" />
                      </NavLink>
                    </li>
                    <li className="ms-3">
                      <NavLink className="link-dark" to="/">
                        <img src={amazon} alt="icon" className="ecomrce-icon" />
                      </NavLink>
                    </li>
                    <li className="ms-3">
                      <NavLink className="link-dark" to="/">
                        <img src={ebay} alt="icon" className="ecomrce-icon" />
                      </NavLink>
                    </li>
                    <li className="ms-3">
                      <NavLink className="link-dark" to="/">
                        <img
                          src={flipkart}
                          alt="icon"
                          className="ecomrce-icon"
                        />
                      </NavLink>
                    </li>
                    <li className="ms-3">
                      <NavLink
                        className="link-dark"
                        to="https://www.indiamart.com/diwamjewels-jaipur/"
                      >
                        <img
                          src={indiamart}
                          alt="icon"
                          className="ecomrce-icon"
                        />
                      </NavLink>
                    </li>
                  </ul>
                </div>
                <FooterItem
                  head=" Useful Links"
                  items={useFullLink}
                  navi={false}
                />
                <FooterItem head=" Main Pages" items={section} navi={true} />
                <FooterItem head=" Important" items={info} navi={true} />
              </div>
                 <div className="footer-topline"></div>
                 <div>
                 <h3 className="ppl-srch-hdfnt">Popular Searches</h3>
                 <div className="pplr-srch-inblk">
                 <PopularSearches />
                 <PopularSearches />
                 <PopularSearches />
                 <PopularSearches />
                 </div>
                 </div>
                 
              <div className="d-flex justify-content-between py-4 my-4 border-top ">
                <p className="footer-para">
                  &copy; 2021-2023 Diwamjewels, All rights reserved.
                </p>
              </div>
            </footer>
          </div>
        </div>
      </>
    );
  }
}

const FooterItem = ({ head, items, navi }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleNavigate(val) {
    await dispatch(addSearch(val));
    navigate("/search");
  }

  return (
    <>
      <div className="col-md-3 mt-3">
        <h5 className="text-white">
          <b>{head}</b>
        </h5>

        <p className="headline"></p>

        <ul className="nav flex-column mt-4">
          {items.map((itemVal, index) => {
            return (
              <li className="nav-item mb-2" key={index}>
                {navi ? (
                  <NavLink
                    className="nav-link p-0 footer-text"
                    to={itemVal.link}
                  >
                    {itemVal.title}
                  </NavLink>
                ) : (
                  <li
                    className="nav-link p-0 footer-text"
                    onClick={() => {
                      handleNavigate(itemVal.title);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {itemVal.title}
                  </li>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

const ShareIcon = () => {
  const [isBoxOpen, setIsBoxOpen] = useState(false);

  const toggleBox = () => {
    setIsBoxOpen(!isBoxOpen);
    console.log(isBoxOpen);
  };

  return (
    <>
      <div className="share-icon-box1">
        <div className="whatsapp-icon" onClick={toggleBox}>
          {isBoxOpen ? (
            <img src={shareicon} alt="icon" className="shareicon-sz" />
          ) : (
            <img src={shareicon} alt="icon" className="shareicon-sz" />
          )}
        </div>
        {isBoxOpen && (
          <div className="scl-icnftr-vw">
            <div className="sticky-icons">
              <div><NavLink
                className="link-dark"

                to="https://www.facebook.com/diwamjewels"
              >
                <i className="bi bi-facebook fs-5 footer-icbx"></i>
              </NavLink></div>
             
              <div className="mt-3"> 
              <NavLink className="link-dark stky-scl-icngap" to="/">
                <i className="bi bi-whatsapp fs-5 footer-icbx"></i>
              </NavLink>
              </div>
            </div>

            <div className="sticky-icons1">
              <NavLink
                className="link-dark"

                to="/"
              >
                <i className="bi bi-instagram fs-5 footer-icbx"></i>
              </NavLink>
              
              <NavLink className="link-dark" to="/">
                <i className="bi bi-telegram fs-5 footer-icbx ms-2"></i>
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </>
  );
};



const PopularSearches = () => {
  return (
    <>
   
      <div className="d-flex ms-1">
        <p className="pop-srch-fnt-sz">Rings</p> 
        <div className="ftr-leftline"></div>
        <p className="pop-srch-fnt-sz">Rings</p>
      </div>
    </>
  )
}