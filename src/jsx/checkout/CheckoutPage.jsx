/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// import React from 'react';
import HeaderCon from '../header/HeaderCon';
import Navbar from '../header/Navbar';
import Footer from '../footer/Footer';
import './checkout.css';
import indialogo from './images/indialogo.png';
import Form from 'react-bootstrap/Form';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Input from '@mui/material/Input';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import creditcard from './images/credit.png'
import paypal from './images/paypal.png'
import visa from './images/visa.png'
import mastercard from './images/mastercard.png'
import phonpe from './images/phonpe.png'
import paytm from './images/paytm.png'
import googlepay from './images/google1.png'
import product from '../../assets/images/ring1.jpg';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


const url = 'https://api.diwamjewels.com/DMJ/';
const imgUrl = 'https://squid-app-2-7wbvi.ondigitalocean.app/';

const userId = localStorage.getItem('userId')

const endPoint = 'api/v1/user/';
// const endPoint = 'api/v1/products/';
const productEndPoint = 'api/v1/products';
var cart = JSON.parse(localStorage.getItem('pdIds')) || [];


const CheckoutPage = () => {

  const [delivery, setDelivery] = useState([{
    fName: '',
    lName: '',
    mobileNo: '',
    address: '',
    address2: '',
    city: '',
    country: '',
    postalCode: '',
  }])

  const [userInfo, setUserInfo] = useState(false)

  async function fetchUserData() {
    try {
      const res = await axios.get(url + endPoint + userId)
      // console.log(res.data.data)
      setUserInfo(res.data.data)
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchUserData()
  }, [])


  return (
    <>
      <HeaderCon />
      <Navbar />
      <div className="container-fluid">
        <div className="checkout-bg row fl-dirt-col">
          <div className="col-md-7 mt-3">
            <DeliveryCountry />
            <PromoCode />
            <div className="del-ct-bg mt-2">
              <h3 className="hd-tag-font">EMAIL ADDRESS</h3>
              <p className="em-add-font">{userInfo.email}</p>
            </div>
            <DlryAddress
              delivery={delivery}
              setDelivery={setDelivery}
            />
            <DlryOptions delivery={delivery} />
            <PaymentType />

            <Button className="ck-buy-btn">BUY NOW</Button>
            <p className="cond-font">By placing your order you agree to our Terms & Conditions, privacy and returns policies .
              You also consent to some of your data being stored by , which may be used to make future shopping experiences better for you.</p>
          </div>

          <div className="col-md-5 mt-3">
            <CheckoutItem />

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CheckoutPage;


const DeliveryCountry = () => {

  const [countryList, setCountryList] = useState([]);
  const [flag, setFlag] = useState('')

  useEffect(() => {
    axios.get('http://restcountries.com/v3.1/all')
      .then(res => {
        // console.log(res)
        setCountryList(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  function handleCountryLogo(name) {
    axios.get(`http://restcountries.com/v3.1/name/${name}`)
      .then((res) => {
        // console.log(res.data[0].flags.png)
        setFlag(res.data[0].flags.png)
      })
      .catch(res => {
        console.log(res)
      })
  }

  async function handleSelectCountry(e) {
    const countryName = await e.target.value

    handleCountryLogo(countryName)

  }
  return (
    <>
      <div className="del-ct-bg">
        <h3 className="hd-tag-font">DELIVERY COUNTRY</h3>

        <div className="ct-box">
          <img src={flag ? flag : indialogo} alt="country" className="cnt-logo" />
          <Form.Select className="sel-box" onChange={handleSelectCountry}>
            <option>India</option>
            {

              countryList.map((country, index) => {
                return (
                  <option key={index}>{country.name.common}</option>
                )
              })
            }

          </Form.Select>
        </div>

      </div>
    </>
  );
}

const PromoCode = () => {
  return (
    <>
      <div className="del-ct-bg mt-2">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className="hd-tag-font">PROMO / CODE OR VOUCHERS</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <form action="" className='d-flex'>
                <input type="text" className='input-box-bdr' placeholder="Enter your promo code" />
                <button className='check-verify-btn'>Verify</button>
              </form>
            </Typography>
          </AccordionDetails>
        </Accordion>

      </div>
    </>
  );
}

const EmailAddress = () => {
  return (
    <>

    </>
  );
}

const DlryAddress = (props) => {
  const { delivery, setDelivery } = props;

  return (
    <>
      <div className="del-ct-bg mt-2">
        <h3 className="hd-tag-font">DELIVERY ADDRESS</h3>

        <FormLabel className="fm-lbl-heading">FIRST NAME </FormLabel><br />
        <Input type="text" className="input-box-bdr mt-1" value={delivery.fName} onChange={(e) => {
          setDelivery(prev => ({ ...prev, fName: e.target.value }))
        }}></Input><br />

        <FormLabel className="fm-lbl-heading" >LAST NAME </FormLabel><br />
        <Input type="text" className="input-box-bdr mt-1" value={delivery.lName} onChange={(e) => {
          setDelivery(prev => ({ ...prev, lName: e.target.value }))
        }}></Input><br />

        <FormLabel className="fm-lbl-heading">MOBILE </FormLabel><br />
        <Input type="number" className="input-box-bdr mt-1" value={delivery.mobileNo} onChange={(e) => {
          setDelivery(prev => ({ ...prev, mobileNo: e.target.value }))
        }}></Input><br />

        <FormLabel className="fm-lbl-heading">ADDRESS </FormLabel><br />
        <Input type="text" className="input-box-bdr mt-1" value={delivery.address} onChange={(e) => {
          setDelivery(prev => ({ ...prev, address: e.target.value }))
        }}></Input><br />
        <Input type="text" className="input-box-bdr mt-1" value={delivery.address2} onChange={(e) => {
          setDelivery(prev => ({ ...prev, address2: e.target.value }))
        }}></Input><br />


        <FormLabel className="fm-lbl-heading">CITY </FormLabel><br />
        <Input type="text" className="input-box-bdr mt-1" value={delivery.city} onChange={(e) => {
          setDelivery(prev => ({ ...prev, city: e.target.value }))
        }}></Input><br />

        <FormLabel className="fm-lbl-heading">COUNTRY</FormLabel><br />
        <Input type="text" className="input-box-bdr mt-1" value={delivery.country} onChange={(e) => {
          setDelivery(prev => ({ ...prev, country: e.target.value }))
        }}></Input><br />

        <FormLabel className="fm-lbl-heading">POSTAL CODE </FormLabel><br />
        <Input type="number" className="input-box-bdr mt-1" value={delivery.postalCode} onChange={(e) => {
          setDelivery(prev => ({ ...prev, postalCode: e.target.value }))
        }}></Input><br />

        <Button className="dlry-btn">DELIVER TO THIS ADDRESS</Button>
      </div>
    </>
  );
}


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
          <RateOptions rate="$7.00" dlryname="Standard Delivery" date="Delivered on or before Tuesday, 27 June, 2023" />
          <RateOptions rate="$22.50" dlryname="Express Delivery" date="Delivered on or before Tuesday, 27 June, 2023" />

        </div>
      </RadioGroup>
    </>
  );
}

const RateOptions = (props) => {
  return (
    <>

      <div className="ct-box mt-4">
        <h6 className="pay-font-sz">{props.rate}</h6>
        <div>
          <h6 className="opt-dlry-fnt">{props.dlryname}</h6>
          <p className="dlry-date">{props.date}</p>
        </div>
        <FormControlLabel value="standard" control={<Radio />} className="ms-2" />
      </div>

    </>
  );
}

const PaymentType = () => {
  return (
    <>
      <div className="del-ct-bg mt-2">
        <h3 className="hd-tag-font">Payment Type</h3>
        <AccountCardType cardname="ADD CREDIT / DEBIT CARD" cardimg={creditcard} />
        <h6 className="opt-dlry-fnt mt-4">OR</h6>
        <AccountCardType cardname="PAYPAL" cardimg={paypal} />

        <div className="ct-box mt-4">
          <h6 className="opt-dlry-fnt mt-1">WE ACCEPT :</h6>
          <img src={visa} alt="visa" className="cr-cd-img" />
          <img src={mastercard} alt="visa" className="cr-cd-img" />
          <img src={phonpe} alt="visa" className="cr-cd-img" />
          <img src={paytm} alt="visa" className="cr-cd-img" />
          <img src={googlepay} alt="visa" className="cr-cd-img" />
        </div>
      </div>
    </>
  );
}

const AccountCardType = (props) => {
  return (
    <>
      <div className="ct-box cr-cd-box mt-4">
        <img src={props.cardimg} alt="credit" className="cr-cd-img" />
        <h6 className="opt-dlry-fnt mt-1">{props.cardname}</h6>
      </div>
    </>
  );
}

const CheckoutItem = () => {



  const [totalPrice, setTotal] = useState(0)
  const [disTotal, setDisTotal] = useState(0)
  const [deliveryCharges, setDeliveryCharges] = useState(150)
  const [proDetails, setProDetails] = useState([])
  const [isUpdate, setIsUpdate] = useState(false)

  const { name, price, } = useParams()
  const navigate = useNavigate()


  async function fethcProductData(id) {
    // console.log(id)
    try {
      const res = await axios.get(url + productEndPoint + '/' + id)
      // console.log(res.data.data)
      setProDetails((items) => [...items, res.data.data])

      // console.log(proDetails)
      setIsUpdate(true)
    }
    catch (err) {
      console.log(err)
    }
  }

  async function handleAllPrice() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    setTotal('');
    setDisTotal('');
    let total = 0;
    let discountTotal = 0;



    cart.forEach((cartItem) => {
      const product = proDetails.find((item) => item.id === cartItem.productId);
      if (product && product.images.length > 0 && product.images[0].productVariantEntities.length > 0) {
        const productPrice = parseInt(product.images[0].productVariantEntities[0].price);
        const productManualPrice = parseInt(product.images[0].productVariantEntities[0].manualPrice);
        total += productPrice * cartItem.quantity;
        discountTotal += productManualPrice * cartItem.quantity;
      }

    });

    setTotal(total);
    console.log(total)
    setDisTotal(discountTotal);
  }


  // async function handleAllPrice() {
  //   // console.log(item1)/
  //  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  //   setTotal('')
  //   setDisTotal('')
  //   let total = 0;
  //   // let discount = 0;
  //   let discountTotal = 0;
  //   // let deliveryCharges = 150

  //   item1.length > 0 && item1.map((item) => {
  //     total = parseInt(item.images[0].productVariantEntities[0].price) + total
  //     discountTotal = parseInt(item.images[0].productVariantEntities[0].manualPrice) + discountTotal
  //   })

  //   await setTotal(total)
  //   await setDisTotal(discountTotal)
  //   // setIsUpdate(false)

  // }



  useEffect(() => {
    cart = JSON.parse(localStorage.getItem('cart')) || [];

    setProDetails([])
    // setAdtCart(cart)
    cart.map((id) => fethcProductData(id.productId));
    window.scrollTo(0, 0);
    handleAllPrice()
  }, [])



  return (
    <>
      <div className="del-ct-bg stk-box-item" style={{ top: '70px' }}>
        <div className="ct-box justify-content-between">
          <h6 className="opt-dlry-fnt">ITEMS</h6>
          <h6 className="opt-dlry-fnt" onClick={() => navigate('/addToCart')} style={{ cursor: 'pointer' }}>EDIT</h6>

        </div>
        <hr />
        {
          proDetails.length > 0 && proDetails.map((item) => {
            // console.log(item)
            return (

              <div className="ct-box mt-4" key={item.id}>
                <img src={imgUrl + item.images[0].thumbImage} alt="item" className="ck-item-img" />
                <div className="">
                  <h3 className="hd-tag-font opt-dlry-fnt"><i className="bi bi-currency-rupee"></i>{item.images.length > 0 && item.images[0].productVariantEntities.length > 0 && item.images[0].productVariantEntities[0].price}</h3>
                  <p className="item-pro-font opt-dlry-fnt">{item.name}</p>
                  {/* <h2 className="opt-dlry-fnt">White Color</h2> */}
                  <h2 className="opt-dlry-fnt">{item.images.length > 0 && item.images[0].productVariantEntities.length > 0 && item.images[0].productVariantEntities[0].size}</h2>
                  <h2 className="opt-dlry-fnt">Qty : 1</h2>
                </div>
              </div>

            )
          })
        }


        <hr className="mt-5" />
        <div className="ct-box justify-content-between">
          <h6 className="opt-dlry-fnt">Subtotal</h6>
          <h6 className="opt-dlry-fnt"><i className="bi bi-currency-rupee"></i>{totalPrice}</h6>
        </div>
        <div className="ct-box justify-content-between">
          <h5 className="opt-dlry-fnt"><b>Discount</b></h5>
          <h5 className="opt-dlry-fnt"><b>{totalPrice - disTotal}</b></h5>
        </div>
        <div className="ct-box justify-content-between">
          <h6 className="opt-dlry-fnt">Delivery</h6>
          <h6 className="opt-dlry-fnt"><i className="bi bi-currency-rupee"></i>{deliveryCharges}</h6>
        </div>

        <div className="ct-box justify-content-between">
          <h5 className="opt-dlry-fnt"><b>TOTAL TO PAY</b></h5>
          <h5 className="opt-dlry-fnt"><b>{disTotal + deliveryCharges}</b></h5>
        </div>
      </div>
    </>
  );
}