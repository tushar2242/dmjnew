import React from "react";
import HeaderCon from "../header/HeaderCon";
import Navbar from "../header/Navbar";
import Footer from "../footer/Footer";
import { useEffect } from "react";

const Refund = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HeaderCon />
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-md-12 mt-5">
            <h2>
              <b>**Diwamjewels Return and Refund Policy**</b>
            </h2>

            <p className="bottom-border"></p>
            <h5 className="mt-4">
              <b>**1. Returns**</b>
            </h5>
            <p className="privacy-para">
              We want you to be completely satisfied with your purchase from
              Diwamjewels. If you are not happy with your order, we offer a
              hassle-free return process under the following conditions:
            </p>

            <h6>
              <b>1.1. **Eligible Items**: </b>
            </h6>
            <p className="privacy-para">
              **: Most jewelry, handicrafts, and blue pottery products are
              eligible for return within 7 Days from the date of delivery. To be
              eligible for a return, items must be in their original condition,
              unused, and in the original packaging.
            </p>

            <h6>
              <b>1.2. **Non-Returnable Items**: </b>
            </h6>

            <p className="privacy-para">
              **: Some items, such as personalized or custom-made products, are
              not eligible for return unless they are defective or damaged upon
              receipt.
            </p>
            <h5 className="mt-4">
              <b>**2. Return Process**</b>
            </h5>
            <h6>
              <b>To initiate a return, please follow these steps:</b>
            </h6>
            <h6>
              <b>2.1. **Contact Us**: </b>
            </h6>
            <p className="privacy-para">
              **: Send an email to info@diwamjewels.com with the subject line
              "Return Request - Your Order Number." In the email, include your
              order number, the item(s) you wish to return, and the reason for
              the return.
            </p>
            <h6>
              <b>2.2. **Approval**: </b>
            </h6>
            <p className="privacy-para">
              We will review your return request and notify you of its approval
              or denial. If approved, we will provide you with return
              instructions, including the return shipping address.
            </p>
            <h6>
              <b>2.3. **Pack and Ship**: </b>
            </h6>
            <p className="privacy-para">
              Carefully pack the item(s) in their original packaging and include
              any accessories, tags, or documentation. Ship the item(s) back to
              us using a trackable shipping method.
            </p>
            <h5 className="mt-4">
              <b>**3. Refunds**</b>
            </h5>
            <h6><b>3.1. **Refund Process**: </b></h6>
            <p className="privacy-para">
            **: Once we receive and inspect the returned item(s), we will notify you of the status of your refund. If the return is approved, we will initiate a refund to your original payment method. Please allow 7 to 10 days for the refund to appear in your account, depending on your payment provider.
            </p>
            <h6><b>3.2. **Return Shipping Costs**:  </b></h6>
            <p className="privacy-para">
            Customers are responsible for return shipping costs, except in cases where the return is due to a product defect or an error on our part.
            </p>
            <h5 className="mt-4"><b>**4. Exchanges**</b></h5>
            <p className="privacy-para">Unfortunately, we do not offer exchanges at this time. If you wish to exchange an item, please follow the return process outlined above and place a new order for the desired item.</p>
            <h5 className="mt-4"><b>**5. Damaged or Defective Items**</b></h5>
            <p className="privacy-para">If you receive a damaged or defective item, please contact us immediately. We will work with you to resolve the issue promptly, which may include providing a replacement, repair, or refund.</p>
            <h5 className="mt-4"><b>**6. Contact Us**</b></h5>
            <p className="privacy-para">If you have any questions or concerns about our return and refund policy, please contact our customer support team at info@diwamjewels.com</p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
export default Refund;
