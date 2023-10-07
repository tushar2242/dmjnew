import React from 'react';
import Navbar from '../header/Navbar';
import Banner from '../Banner/Banner';
import Footer from '../footer/Footer';
import HeaderCon from '../header/HeaderCon';
import phoneImg from '../../assets/images/phoneImg.png';
import mailImg from '../../assets/images/mailImg.png';
import socialImg from '../../assets/images/socialImg.png';
import axios from 'axios';
import { NavLink } from 'react-router-dom';


export default class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: '',
      successMessageVisible: false,
    };

    this.componentDidMount = this.componentDidMount.bind(this)

  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { name, email, message } = this.state;
    const formData = { name, email, message };

    axios.post('http://localhost:8080/api/v1/contact', formData)
      .then(response => {
        console.log(response.data);
        this.setState({
          name: '',
          email: '',
          message: '',
          successMessageVisible: true,
          errorMessageVisible: false,
        });


        setTimeout(() => {
          this.setState({ successMessageVisible: false });
        }, 3000);
      })
      .catch(error => {
        console.error(error);
        this.setState({
          successMessageVisible: false,
          errorMessageVisible: true,
        });

        setTimeout(() => {
          this.setState({ errorMessageVisible: false });
        }, 3000);

      });
  };

  render() {
    const { name, email, message, successMessageVisible, errorMessageVisible } = this.state;

    return (
      <>
        <HeaderCon />
        <Navbar />

        {successMessageVisible && (
          <div className="successfullmsg">
            <p className='succesmsg'>Data added successfully</p>
          </div>
        )}
        {errorMessageVisible && (
          <div className="successfullmsg">
            <p className='errmsg'>Data not added. Please try again.</p>
          </div>
        )}
        <Banner
          title='Contact Us'
          fullTitle='Home / contact us'
        />

        <div className="container">
          <div className="row">
            <ConBox
              title='Phone'
              contact='+91-9664073873'
              img={phoneImg}
            />
            <ConBox
              title='Email'
              contact='info@diwamjewels.com'
              img={mailImg}
            />
            <ConBox
              title='Follow us'
              contact=''
              img={socialImg}
            >
              <div>
                <NavLink to="https://www.facebook.com/diwamjewels"><i className="bi bi-facebook text-primary cont-zoom-icon"></i></NavLink>
                <NavLink to="https://www.instagram.com/diwamjewels/"> <i className="bi bi-instagram text-danger ms-2 cont-zoom-icon"></i></NavLink>
                <NavLink to="https://twitter.com/DiwamJewels"> <i className="bi bi-twitter text-primary ms-2 cont-zoom-icon"></i></NavLink>
                <NavLink to="https://api.whatsapp.com/send?phone=919664073873"><i className="bi bi-whatsapp text-success ms-2 cont-zoom-icon"></i></NavLink>
                <NavLink to="https://www.pinterest.ca/diwamjewels/"><i className="bi bi-pinterest text-danger ms-2 cont-zoom-icon"></i></NavLink>
              </div>
            </ConBox>
          </div>
        </div>

        <div className="container mb-4">
          <div className="row mb-3">
            <div className="col-md-6">
              <div className="contact-box mt-5">
                <h6 className="text-center"><b>Have a question ?</b></h6>
                <form>
                  <div className="row">
                    <div className="col-md-6 mt-3">
                      <label className="form-label"><b>Name</b></label>
                      <input
                        type="text"
                        className="form-control input-box-contact"
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mt-3">
                      <label className="form-label"><b>Email address</b></label>
                      <input
                        type="email"
                        className="form-control input-box-contact"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                  <div className="col-md-12 mt-3">
                  <label className="form-label"><b>Phone Number</b></label>
                  <input
                        type="number"
                        className="form-control input-box-contact"
                        id="phonenumber"
                        name="phonenumber"
                        placeholder="Enter your phone number"
                        required
                        
                      />
                  </div>
                    <div className="col-md-12 mt-3">
                      <label className="form-label"><b>Message</b></label>
                      <textarea
                        name="message"
                        id="message"
                        cols="30"
                        rows="10"
                        className="form-control input-box-contact"
                        placeholder="Enter your message"
                        value={message}
                        onChange={this.handleChange}
                        required
                      ></textarea>
                    </div>
                  </div>
                  <button className="trend-cart-btn mt-4" onClick={this.handleSubmit}>Submit <i className="bi bi-send-fill"></i></button>
                </form>
              </div>
            </div>
            <Frame />
          </div>
        </div>



        <Footer />
      </>
    )
  }
}


class ConBox extends React.Component {
  render() {
    const { title, contact, img, children } = this.props;
    return (
      <>
        <div className="col-md-4 mt-5">
          <div className="box-bg d-flex justify-content-center">
          
            <img src={img} className="img-fluid cont-img" alt="phone" />
           <div className="ms-2">
            <h4 className="heading-text mt-2">{title}</h4>

            <p><b>{contact}</b></p>
            {children}
            </div>
          </div>
        </div>
      </>
    )
  }
}


class Frame extends React.Component {
  render() {
    return (
      <>
        <div className="col-md-6 mt-5">
          {/* <iframe
            src="http://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3556.549732400763!2d75.8375939!3d26.9494854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db116f0ddf9b7%3A0x6d42b8919f551433!2sRamgarhmode%2C%20Parasrampuri%2C%20Jaipur%2C%20Rajasthan%20302002!5e0!3m2!1sen!2sin!4v1670213487399!5m2!1sen!2sin"
            width="100%"
            height="550"
            style={{ border: "0" }}
            className="rounded"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe> */}

          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3556.7373398681866!2d75.83585837452185!3d26.94354015876671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db779978c364d%3A0xcb91f9a5495f3927!2sDiwam%20Jewels!5e0!3m2!1sen!2sin!4v1695298015218!5m2!1sen!2sin" width="100%" height="550" style={{ border: "solid 1px #b79d33" }}
            className="rounded"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </>
    )
  }
}


// class ContactForm extends React.Component{
//     render(){
//         return(
//             <>

//             </>
//         )
//     }
// }