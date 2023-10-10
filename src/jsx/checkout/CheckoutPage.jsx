/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// import React from 'react';
import HeaderCon from "../header/HeaderCon";
import Navbar from "../header/Navbar";
import Footer from "../footer/Footer";
import "./checkout.css";
import indialogo from "./images/indialogo.png";
import Form from "react-bootstrap/Form";
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Input from "@mui/material/Input";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import creditcard from "./images/credit.png";
import paypal from "./images/paypal.png";
import upilogo from "../../assets/images/bhim.png";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import AddIcon from "@mui/icons-material/Add";
import { Select } from "@mui/material";
import PopUp from "../popup/PopUp";
import { NavLink } from 'react-router-dom';

const url = "https://api.diwamjewels.com/DMJ/";
const imgUrl = "https://squid-app-2-7wbvi.ondigitalocean.app/";
// const endPoint = 'api/v1/products/';
const productEndPoint = "api/v1/products";
const endPoint = "api/v1/user/";

const userId = localStorage.getItem("userId");

var cart = JSON.parse(localStorage.getItem("cart")) || [];

const CheckoutPage = () => {

  const [userInfo, setUserInfo] = useState(false);

  async function fetchUserData() {
    try {
      const res = await axios.get(url + endPoint + userId);
      // console.log(res.data.data)
      setUserInfo(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <HeaderCon />
      <Navbar />

      {userId ? <div className="checkout-bg">
        <div className="container-fluid">
          <div className="row fl-dirt-col">
            <div className="col-md-7 mt-3">
              <DeliveryCountry />
              <PromoCode />
              <EmailAddress
                email={userInfo ? userInfo.email : "Login For Buy Now"}
              />
              <Accordion defaultActiveKey="0" className="mt-2">
                <Accordion.Item eventKey="0">
                  <Accordion.Header className="hd-tag-font">
                    Billing Address
                  </Accordion.Header>
                  <Accordion.Body>
                    <DlryAddress
                    />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <Accordion className="mt-2">
                <Accordion.Item eventKey="1">
                  <Accordion.Header className="hd-tag-font">
                    Shipping Address
                  </Accordion.Header>
                  <Accordion.Body>
                    <DlryAddress
                    />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>

              <DlryOptions />

              <PaymentType />

              <Button className="ck-buy-btn"
                type="button"
                disabled={cart.length > 0 ? false : true}
                style={cart.length > 0 ? { cursor: 'pointer' } : { cursor: 'not-allowed' }}
              >BUY NOW</Button>

              <p className="cond-font">
                By placing your order you agree to our <NavLink to="/terms">Terms & Conditions</NavLink>,
                <NavLink to="/privacypolicy">privacy and returns policies</NavLink> . You also consent to some of your
                data being stored by , which may be used to make future shopping
                experiences better for you.
              </p>
            </div>

            <div className="col-md-5 mt-3">
              <CheckoutItem />
            </div>
          </div>
        </div>
      </div> : <PopUp />
      }

      <Footer />
    </>
  );
};

export default CheckoutPage;

const DeliveryCountry = () => {
  const [countryList, setCountryList] = useState([]);
  const [flag, setFlag] = useState("");

  useEffect(() => {
    axios
      .get("http://restcountries.com/v3.1/all")
      .then((res) => {
        // console.log(res)
        setCountryList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCountryLogo(name) {
    axios
      .get(`http://restcountries.com/v3.1/name/${name}`)
      .then((res) => {
        // console.log(res.data[0].flags.png)
        setFlag(res.data[0].flags.png);
      })
      .catch((res) => {
        console.log(res);
      });
  }

  async function handleSelectCountry(e) {
    const countryName = await e.target.value;

    handleCountryLogo(countryName);
  }
  return (
    <>
      <div className="del-ct-bg">
        <h3 className="hd-tag-font">DELIVERY COUNTRY</h3>

        <div className="ct-box">
          <img
            src={flag ? flag : indialogo}
            alt="country"
            className="cnt-logo"
          />
          <Form.Select className="sel-box" onChange={handleSelectCountry}>
            <option>India</option>
            {countryList.map((country, index) => {
              return <option key={index}>{country.name.common}</option>;
            })}
          </Form.Select>
        </div>
      </div>
    </>
  );
};

const PromoCode = () => {
  return (
    <>
      <div className="del-ct-bg mt-2">
        <Accordion>
          <Accordion.Item eventKey="1">
            <Accordion.Header className="hd-tag-font">
              PROMO / CODE OR VOUCHERS
            </Accordion.Header>
            <Accordion.Body>
              <form action="" className="d-flex p-2">
                <input
                  type="text"
                  className="input-box-bdr"
                  placeholder="Enter your promo code"
                />
                <button className="check-verify-btn">Verify</button>
              </form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </>
  );
};

const EmailAddress = ({ email }) => {
  return (
    <>
      <div className="del-ct-bg mt-2">
        <h3 className="hd-tag-font">EMAIL ADDRESS</h3>
        <p className="em-add-font">{email}</p>
      </div>
    </>
  );
};

const DlryAddress = (props) => {
  // const { delivery, setDelivery } = props;
  const [selectedCountry, setSelectedCountry] = useState('India');
  const [delivery, setDelivery] = useState([
    {
      fName: "",
      lName: "",
      mobileNo: "",
      address: "",
      address2: "",
      city: "",
      state: "",
      postalCode: "",
    },
  ]);

  const [isHomeChecked, setIsHomeChecked] = useState(false);
  const [isOfficeChecked, setIsOfficeChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    if (e.target.name === 'home') {
      setIsHomeChecked(!isHomeChecked);
      setIsOfficeChecked(false); // Uncheck "Office"
    } else if (e.target.name === 'office') {
      setIsOfficeChecked(!isOfficeChecked);
      setIsHomeChecked(false); // Uncheck "Home"
    }
  };
  return (
    <>
      <div className="del-ct-bg mt-2">
        <h3
          className="hd-tag-font text-end"
          style={{ color: "#b79d33", cursor: "pointer" }}
        >
          <AddIcon /> ADD NEW ADDRESS
        </h3>
        <h3 className="hd-tag-font">DELIVERY ADDRESS</h3>

        <FormLabel className="fm-lbl-heading">Full NAME </FormLabel>
        <br />
        <Input
          type="text"
          className="input-box-bdr mt-1"
          required
          value={delivery.fName}
          onChange={(e) => setDelivery({ ...delivery, fName: e.target.value })}
        ></Input>
        <br />

        <FormLabel className="fm-lbl-heading">MOBILE </FormLabel>
        <br />
        <Input
          type="number"
          className="input-box-bdr mt-1"
          required
          value={delivery.mobileNo}
          onChange={(e) => setDelivery({ ...delivery, mobileNo: e.target.value })}
        ></Input>
        <br />
        <FormLabel className="fm-lbl-heading">POSTAL CODE </FormLabel>
        <br />
        <Input
          type="number"
          className="input-box-bdr mt-1"
          value={delivery.postalCode}
          onChange={(e) => setDelivery({ ...delivery, postalCode: e.target.value })}
        ></Input>
        <br />
        <FormLabel className="fm-lbl-heading">ADDRESS </FormLabel>
        <br />
        <Input
          type="text"
          className="input-box-bdr mt-1"
          required
          value={delivery.address}
          onChange={(e) => setDelivery({ ...delivery, address: e.target.value })}
        ></Input>
        <br />
        <Input
          type="text"
          className="input-box-bdr mt-1"
          required
          value={delivery.address2}
          onChange={(e) => setDelivery({ ...delivery, address2: e.target.value })}
        ></Input>
        <br />

        <FormLabel className="fm-lbl-heading">CITY </FormLabel>
        <br />
        <Input
          type="text"
          className="input-box-bdr mt-1"
          required
          value={delivery.city}
          onChange={(e) => setDelivery({ ...delivery, city: e.target.value })}
        ></Input>
        <br />
        <FormLabel className="fm-lbl-heading">STATE </FormLabel>
        <br />
        <Input type="text" className="input-box-bdr mt-1" required
          value={delivery.state}
          onChange={(e) => setDelivery({ ...delivery, state: e.target.value })}>

        </Input>
        <br />

        <FormLabel className="fm-lbl-heading">COUNTRY</FormLabel>
        <br />
        <select className="input-box-bdr mt-1" required
          value={selectedCountry}
          onChange={e => setSelectedCountry(e.target.value)}
        >
          <option value="India">India</option>
          <option value="USA">USA</option>
        </select>
        <br />

        <div className="d-flex">
          <label className="dlry-work-btn">
            <input
              type="checkbox"
              name="home"
              checked={isHomeChecked}
              onChange={handleCheckboxChange}
              className="check-bx-vw-sz"

            />
            Home
          </label>
          <label className="dlry-work-btn">
            <input
              type="checkbox"
              name="office"
              checked={isOfficeChecked}
              onChange={handleCheckboxChange}
              className="check-bx-vw-sz"
            />
            Office
          </label>
        </div>

        <Button className="dlry-btn">DELIVER TO THIS ADDRESS</Button>
      </div>
    </>
  );
};

const DlryOptions = () => {
  return (
    <>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="standard"
        name="radio-buttons-group"
      >
        <div className="del-ct-bg mt-2">
          <h3 className="hd-tag-font">DELIVERY OPTIONS</h3>
          <RateOptions
            rate="$7.00"
            dlryname="Standard Delivery"
            date="Delivered on or before Tuesday, 27 June, 2023"
          />
          <RateOptions
            rate="$22.50"
            dlryname="Express Delivery"
            date="Delivered on or before Tuesday, 27 June, 2023"
          />
        </div>
      </RadioGroup>
    </>
  );
};

const RateOptions = (props) => {
  return (
    <>
      <div className="ct-box mt-4">
        <h6 className="pay-font-sz">{props.rate}</h6>
        <div>
          <h6 className="opt-dlry-fnt">{props.dlryname}</h6>
          <p className="dlry-date">{props.date}</p>
        </div>
        <FormControlLabel
          value="standard"
          control={<Radio />}
          className="ms-2"
        />
      </div>
    </>
  );
};

const PaymentType = () => {
  const [formData, setFormData] = useState({
    cardHolderName: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <>
      <form action="">
        <Accordion className="mt-2">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <div className="d-flex">
                <img src={creditcard} alt="credit" className="cr-cd-img" />
                <h6 className="opt-dlry-fnt mt-1">ADD CREDIT / DEBIT CARD</h6>
              </div>
            </Accordion.Header>
            <Accordion.Body>
            <div className="p-2">
              <div className="row">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="input-box-bdr mt-2 w-100"
                    placeholder="Card Holder Name"
                    name="cardHolderName"
                    value={formData.cardHolderName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="number"
                    className="input-box-bdr mt-2 w-100"
                    placeholder="Card Number"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="date"
                    className="input-box-bdr mt-2 w-100"
                    placeholder="Expiration Date"
                    name="expirationDate"
                    value={formData.expirationDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="input-box-bdr mt-2 w-100"
                    placeholder="CVV"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header className="hd-tag-font">
              <div className="d-flex">
                <img src={upilogo} alt="credit" className="cr-cd-img" />
                <h6 className="opt-dlry-fnt mt-1">UPI ID</h6>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="d-flex p-2">
                <input
                  type="text"
                  className="input-box-bdr"
                  placeholder="Enter UPI ID"
                />
                <button className="check-verify-btn">Verify</button>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header className="hd-tag-font">
              <div className="d-flex">
                <img src={paypal} alt="credit" className="cr-cd-img" />
                <h6 className="opt-dlry-fnt mt-1">Paypal ID</h6>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="d-flex p-2">
                <input
                  type="text"
                  className="input-box-bdr"
                  placeholder="Enter Paypal ID"
                />
                <button className="check-verify-btn">Verify</button>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </form>
    </>
  );
};

const AccountCardType = (props) => {
  return (
    <>
      <div className="ct-box cr-cd-box mt-4">
        <img src={props.cardimg} alt="credit" className="cr-cd-img" />
        <h6 className="opt-dlry-fnt mt-1">{props.cardname}</h6>
      </div>
    </>
  );
};

const CheckoutItem = () => {
  const [totalPrice, setTotal] = useState(0);
  const [disTotal, setDisTotal] = useState(0);
  const [deliveryCharges, setDeliveryCharges] = useState(150);
  const [proDetails, setProDetails] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [quantity, setQuantity] = useState("");

  const { name, price } = useParams();
  const navigate = useNavigate();

  async function fethcProductData(id) {
    // console.log(id)
    try {
      const res = await axios.get(url + productEndPoint + "/" + id);
      // console.log(res.data.data)
      setProDetails((items) => [...items, res.data.data]);

      // console.log(proDetails)
      setIsUpdate(true);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleAllPrice(item1) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;
    let discountTotal = 0;
    let quanti = [];
    setTotal(0);
    setDisTotal(0);
    setQuantity("");
    cart.forEach((cartItem) => {
      // Find the corresponding item in item1 array based on the cart item productId
      const matchingItem = item1.find((item) => item.id === cartItem.productId);

      if (
        matchingItem &&
        matchingItem.images.length > 0 &&
        matchingItem.images[0].productVariantEntities.length > 0
      ) {
        const productPrice = parseInt(
          matchingItem.images[0].productVariantEntities[0].price
        );
        const productManualPrice = parseInt(
          matchingItem.images[0].productVariantEntities[0].manualPrice
        );

        // Calculate the total and discount total based on the cart item's quantity
        total += productPrice * (cartItem.quantity - 1);
        discountTotal += productManualPrice * (cartItem.quantity - 1);
        quanti.push(cartItem.quantity);
      }
    });

    await setTotal(total);
    await setDisTotal(discountTotal);
    setQuantity(quanti);
  }

  // Example usage:
  // handleAllPrice(item1); // Call this function to update the total and discount total based on the cart

  useEffect(() => {
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    window.scrollTo(0, 0);
    setProDetails([]);
    // setAdtCart(cart)
    cart.map((id) => fethcProductData(id.productId));
    handleAllPrice(proDetails);
  }, [isUpdate]);

  return (
    <>
      <div className="del-ct-bg stk-box-item">
        <div className="ct-box justify-content-between">
          <h6 className="opt-dlry-fnt">ITEMS</h6>
          <h6
            className="opt-dlry-fnt"
            onClick={() => navigate("/addToCart")}
            style={{ cursor: "pointer" }}
          >
            EDIT
          </h6>
        </div>
        <hr />
        {proDetails.length > 0 &&
          proDetails.map((item, index) => {
            // console.log(item)
            return (
              <div className="ct-box mt-4" key={item.id}>
                <img
                  src={imgUrl + item.images[0].thumbImage}
                  alt="item"
                  className="ck-item-img"
                />
                <div className="">
                  <h3 className="hd-tag-font opt-dlry-fnt">
                    <i className="bi bi-currency-rupee"></i>
                    {item.images.length > 0 &&
                      item.images[0].productVariantEntities.length > 0 &&
                      item.images[0].productVariantEntities[0].price}
                  </h3>
                  <p className="item-pro-font opt-dlry-fnt">{item.name}</p>
                  {/* <h2 className="opt-dlry-fnt">White Color</h2> */}
                  <h2 className="opt-dlry-fnt">
                    {item.images.length > 0 &&
                      item.images[0].productVariantEntities.length > 0 &&
                      item.images[0].productVariantEntities[0].size}
                  </h2>
                  <h2 className="opt-dlry-fnt">Qty : {quantity[index] - 1}</h2>
                </div>
              </div>
            );
          })}

        <hr className="mt-5" />
        <div className="ct-box justify-content-between">
          <h6 className="opt-dlry-fnt">Subtotal</h6>
          <h6 className="opt-dlry-fnt">
            <i className="bi bi-currency-rupee"></i>
            {totalPrice}
          </h6>
        </div>
        <div className="ct-box justify-content-between">
          <h5 className="opt-dlry-fnt">
            <b>Discount</b>
          </h5>
          <h5 className="opt-dlry-fnt">
            <b>{totalPrice - disTotal}</b>
          </h5>
        </div>
        <div className="ct-box justify-content-between">
          <h6 className="opt-dlry-fnt">Delivery</h6>
          <h6 className="opt-dlry-fnt">
            <i className="bi bi-currency-rupee"></i>
            {deliveryCharges}
          </h6>
        </div>

        <div className="ct-box justify-content-between">
          <h5 className="opt-dlry-fnt">
            <b>TOTAL TO PAY</b>
          </h5>
          <h5 className="opt-dlry-fnt">
            <b>{disTotal + deliveryCharges}</b>
          </h5>
        </div>
      </div>
    </>
  );
};
