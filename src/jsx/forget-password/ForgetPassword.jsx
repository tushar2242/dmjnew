import React, { useState } from "react";
import "./forgetpassword.css";
import loginImg1 from "../../assets/images/banner/login1.png";
import dmjicon from "../../assets/images/dmj.png";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const url = "https://api.diwamjewels.com/DMJ/api/v1/user/";
const verifyEndPoint = "verify/otp";
const endPoint = "send/otp/login";
const signIn = "signin/withEmailOrPhoneNumber";

const ForgetPassword = () => {
  const [mobileNo, setMobileNo] = useState("");
  const [isPhone, setIsPhone] = useState("");
  const [isOtp, setOtp] = useState(false);
  const [otp, setOtpValue] = useState("");
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await localStorage.setItem("mobileNo", mobileNo);
    setOtp(true);
  };

  async function verifyOtp(e) {
    setLoading(true);
    e.preventDefault();
    const otpValue = {
      userName: mobileNo,
      otp: otp,
    };

    try {
      const otpRes = await axios.post(url + verifyEndPoint, otpValue);

      if (otpRes.data.message === "OTP verified") {
        // console.log('fired')
        let formdata = new FormData();

        formdata.append("userName", mobileNo);

        try {
          const loginRes = await axios.post(url + signIn, formdata);
          // console.log(loginRes.data.data)
          localStorage.setItem("userId", loginRes.data.data.id);
          if (loginRes.data.data.id) {
            navigate("/");
            window.location.reload();
          }
        } catch (err) {
          console.log(err);
          alert("Please Enter a Correct OTP");
        }
      } else {
        console.log("Otp Expired");
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  async function sentOtp(e) {
    setLoading(true);
    e.preventDefault();
    const headers = {
      "Content-Type": "multipart/form-data",
    };

    const formdata = new FormData();

    formdata.append("mailOrPhone", mobileNo);

    try {
      const otpRes = await axios.post(url + endPoint, formdata, { headers });

      if (otpRes.data.message === "OTP send successfully") {
        setOtp(true);
      } else {
        console.log(otpRes.data.message);
        alert("Failed to send OTP: " + otpRes.data.message);
      }
    } catch (err) {
      console.log(err);
      if (
        err.response &&
        err.response.data &&
        err.response.data.message === "Bad credentials"
      ) {
        alert("Invalid Email");
      } else {
        alert("Failed to send OTP. Please try again later.");
      }
    }
    setLoading(false);
  }

  return (
    <>
      <div
        className="fullpage-bg pt-1"
        style={{ backgroundImage: `url(${loginImg1})` }}
      >
        <div className="container">
          <div className="login-bg shadow-sm">
            <div className="text-center cp-img-boxvw">
              <img src={dmjicon} className="coupon-img" alt="Coupon" />
            </div>
            <hr />
            <div className="user-login">
              <h6>
                <b>Forget password</b>
              </h6>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <input
                  type="text"
                  className="login-input"
                  id="login-number"
                  placeholder="Mobile Number / Email-id *"
                  value={mobileNo}
                  onChange={(e) => {
                    setMobileNo(e.target.value);
                  }}
                  required
                />

                {isOtp && (
                  <>
                    <b
                      style={{
                        color: "green",
                        letterSpacing: "0.3px",
                        padding: "4px",
                      }}
                    >
                      Otp Sent Successfully
                    </b>

                    <input
                      type="number"
                      className="login-input"
                      placeholder="Enter the Otp*"
                      value={otp}
                      onChange={(e) => {
                        setOtpValue(e.target.value);
                      }}
                      required
                    />
                  </>
                )}
                {/* <div className="pas-eicon-box">
                  <input
                    type="password"
                    className="login-input"
                    id="login-number1"
                    placeholder="Enter the Password*"
                    required
                  />
                  <VisibilityIcon className="password-icon" />
                </div>  */}

                {/* <div className="pas-eicon-box">
                  <input
                    type="password"
                    className="login-input"
                    id="login-number1"
                    placeholder="Confirm Password*"
                    required
                  />
                  <VisibilityIcon className="password-icon" />
                </div>  */}
                <p className="tp-text">
                  By Continuing, I agree to the{" "}
                  <NavLink to="/termscondition">
                    <span className="tp-color">
                      <b>Terms of Use & Privacy Policy</b>
                    </span>
                  </NavLink>
                </p>
                {isOtp ? (
                  <button
                    type="button"
                    className="continue-btn"
                    onClick={(e) => {
                      verifyOtp(e);
                    }}
                  >
                    Verify and Log In
                  </button>
                ) : (
                  <button
                    type="button"
                    className="continue-btn"
                    onClick={(e) => {
                      sentOtp(e);
                    }}
                  >
                    SIGN IN
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ForgetPassword;
