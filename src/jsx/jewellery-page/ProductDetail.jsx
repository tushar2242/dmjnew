import React, { useEffect, useState } from "react";
import HeaderCon from "../header/HeaderCon";
import Navbar from "../header/Navbar";

// import RemoveIcon from "@mui/icons-material/Remove";
// import AddIcon from "@mui/icons-material/Add";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from '@mui/icons-material/Share';
import "./Productdetail.css";
// import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
// import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
// import TwitterIcon from "@mui/icons-material/Twitter";
import axios from "axios";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import Footer from "../footer/Footer";
import Loader from "../loader/Loader";
import { ProductCard } from "../carousel/CarouselForHome";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
// import './App.css'
import { Keyboard, Scrollbar, Navigation, Pagination } from "swiper/modules";
import ReactImageMagnify from "react-image-magnify";
// import ShareIcon from "@mui/icons-material/Share";
import img1 from "../../assets/images/earring.jpg";
import img2 from "../../assets/images/ring1.jpg";
import img3 from "../../assets/images/ring2.jpg";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import StarsIcon from "@mui/icons-material/Stars";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import Switch from "@mui/material/Switch";
import deliveryicon from "../../assets/images/delivery.png";
import payicon from "../../assets/images/payicon.png";
import exchange from "../../assets/images/exchange.png";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import { GlassMagnifier } from "react-image-magnifiers";
import { Helmet } from "react-helmet";
// import Switch from '@mui/material/Switch';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';

// import InnerImageZoom from "https://cdn.skypack.dev/react-inner-image-zoom@3.0.0";

const url = "https://api.diwamjewels.com/DMJ/";
const endPoint = "api/v1/products";
const ratingEnd = "api/v1/Rating/count";
// const variantEnd = "api/v1/variantproduct/productId";
// const sizeEnd = "api/v1/variantproduct/productIdwithSize/1?size=";
// const colorEnd = "api/v1/variantproduct/productIdwithColor/1?color=green";
const getProductEnd = "api/v1/products/sku/";
const imgUrl = 'https://squid-app-2-7wbvi.ondigitalocean.app/';
const typeEnd = 'api/v1/products/type?type=';

// const slug = 'this is slug'
// const skuid = 'dmj@123'
// const id = localStorage.getItem("productId");

// const productEndPoint = "api/v1/products";/

const ProductDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <HeaderCon />
      <Navbar />
      <Product />
      <Footer />
    </>
  );
};

const responsive1 = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1022 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1020, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

// export {fetchData}

function Product() {
  const [decryptedProductId, setDecryptedProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [showDescription, setShowDescription] = useState(true);
  const [showReview, setShowReview] = useState(false);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [apiCheck, setApiCheck] = useState(true);

  const [itemInfo, setItemInfo] = useState([]);
  const [isLoad, setIsLoad] = useState(true);

  const [rating, setRating] = useState("");

  const navigate = useNavigate();
  const { skuid, slug } = useParams();


  async function getProductId(skuNo) {
    try {
      const proRes = await axios.get(url + getProductEnd + skuNo);
      console.log(proRes.data);
      return proRes.data.data.id;
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchRating(id) {
    try {
      const ratingRes = await axios.get(url + ratingEnd + "/" + id);
      setRating(ratingRes.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  const fetchData = async () => {

    if (slug && skuid) {
      // const id = await decryptProductId(pId)

      const id = await getProductId(skuid);
      await fetchRating(id);

      try {
        const res = await axios.get(url + endPoint + "/" + id);

        // console.log(res.data.data)
        setSelectedImage(res.data.data.images[0]);
        // console.log(variantRes.data.data)
        // setVariant(variantRes.data.data)

        const commaSeparatedString = await res.data.data.images[0].pictures;
        const imgArray = commaSeparatedString.split(",");
        setSelectedImage(imgArray[0]);
        setImages(imgArray);

        setItemInfo(res.data.data);
        // console.log(res.data.data)
        setIsLoad(false);
        // setApiCheck(false)
      } catch (err) {
        console.log(err);
        setIsLoad(false);
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, [skuid]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const wishList = (id) => {
    const existingCart = JSON.parse(localStorage.getItem("wishList")) || [];
    existingCart.push(id);

    localStorage.setItem("wishList", JSON.stringify(existingCart));
  };

  const addToCart = (id) => {
    const existingCart = JSON.parse(localStorage.getItem("pdIds")) || [];
    existingCart.push(id);

    localStorage.setItem("pdIds", JSON.stringify(existingCart));
  };

  // const location = useLocation();

  // console.log(productId)
  // console.log(id)

  return (
    <>

      {!isLoad ? (
        <>
          <Helmet>
            <meta charSet="utf-8" />
            <title>{itemInfo && itemInfo.seo_title.replace(/"/g, '')}</title>
            <meta name="description" content={itemInfo && itemInfo.seo_description.replace(/<[^>]*>/g, '')} />
            <meta name="keywords" content={itemInfo && itemInfo.search_keywords} />

          </Helmet>
          <div className="container-fluid">

            <div className="row">
              <div className="col-md-6 top-space-dt">
                <div className="hid-mob-view stk-box-item">
                  <div className="product-display">
                    <div className="carouselmini">
                      <div className="upperSmallCarousel mobile-view-dply">
                        <Swiper
                          direction={"vertical"}
                          slidesPerView={5}
                          pagination={{
                            clickable: true,
                          }}
                          Navigation={true}
                          modules={[Navigation, Pagination]}
                          className="mySwiper"
                        >
                          {images.length > 0 &&
                            images.map((image, index) => {
                              return (
                                <>
                                  <div
                                    key={index}
                                    className="smalCarouselimg"
                                    onClick={() => handleImageClick(image)}
                                  >

                                    <img
                                      src={imgUrl + image}
                                      alt={`Image ${index + 1}`}
                                    />
                                  </div>
                                </>
                              );
                            })}
                        </Swiper>
                      </div>
                    </div>



                    <GlassMagnifier
                      imageSrc={imgUrl + selectedImage}
                      imageAlt="Product"
                      largeImageSrc={imgUrl + selectedImage} // Optional
                      className="glass-magnify-sz"
                      magnifierSize={'80%'}
                      square
                    />
                  </div>
                </div>

                <div className="desktop-dis-view">


                  <div id="carouselExampleIndicators" className="carousel slide">
                    <div className="carousel-indicators">
                      <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="0"
                        className="active"
                        aria-current="true"
                        aria-label="Slide 1"
                      ></button>
                      <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="1"
                        aria-label="Slide 2"
                      ></button>
                      <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="2"
                        aria-label="Slide 3"
                      ></button>
                    </div>
                    <div className="carousel-inner">
                      {images.length > 0 &&
                        images.map((image, index) => {
                          return (
                            <div
                              className="carousel-item active obtft-img-vw"
                              key={index}
                            >
                              <img
                                src={imgUrl + image}
                                className="product-mobvw-slidersz"
                              />
                            </div>
                          );
                        })}
                    </div>
                  </div>

                  <div className="varient-img-box">

                    {images.length > 0 &&
                      images.map((image, index) => {
                        return (
                          <div
                            onClick={() => handleImageClick(image)}
                            key={index}
                          >
                            <img
                              src={imgUrl + image}
                              alt="varient product"
                              className="varient-imgsz"

                            />
                          </div>
                        );
                      })}



                  </div>
                </div>
              </div>

              <div className="col-md-6 mt-5">
                <div className="pt-mob-view">

                  <ProductPrice
                    title={itemInfo.name}
                    des={itemInfo.seo_description}
                    // manualPrice={price.manualPrice}
                    // price={price.price}
                    // discount={price.discount}
                    rating={rating}
                    variant={itemInfo.images}
                    prodes={itemInfo.description}
                  />

                  <div className="mt-2" style={{ display: "flex" }}>
                    <div>
                      <button
                        className="add-to-cart-btn-sz"
                        onClick={async () => {
                          await addToCart(itemInfo.id);
                          navigate("/addtocart");
                        }}
                      >
                        <LocalMallIcon /> ADD To CART
                      </button>
                    </div>
                    <div>
                      <button
                        className="wishlist-btn-sz"
                        onClick={async () => {
                          await wishList(itemInfo.id);
                          navigate("/wishlist");
                        }}
                      >
                        <FavoriteBorderIcon /> WISHLIST
                      </button>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="chk-del-date">Check delivery options</h4>
                    <form className="d-flex">
                      <input
                        className="form-control me-2 pin-box-int"
                        type="text"
                        placeholder="Enter your zipcode"
                      />
                      <button className="check-btn-del" type="submit">
                        Check
                      </button>
                    </form>
                    <p className="zip-code-fnt">
                      Please enter PIN code to check delivery time & Pay on
                      Delivery Availability
                    </p>
                    <div>
                      <DeliveryIcon
                        icon={deliveryicon}
                        title="Get it by Sun, Aug 27"
                      />
                      <DeliveryIcon
                        icon={payicon}
                        title="Pay on delivery available"
                      />
                      <DeliveryIcon
                        icon={exchange}
                        title="Easy 14 days return & exchange available"
                      />
                    </div>
                  </div>

                  <p className="tagline-line"></p>
                  <div className="">




                    <OfferDetails />
                    <p className="tagline-line"></p>
                    <div>
                      <button className="add-to-cart-btn-sz w-100">
                        Buy Now
                      </button>
                    </div>
                    <p className="tagline-line"></p>
                    <RatingBox />

                    <p className="tagline-line"></p>

                    <RatingComment />

                    <p className="tagline-line"></p>
                    <h6 className="text-primary">
                      <b>All 150 reviews</b>
                    </h6>
                  </div>
                </div>
              </div>
            </div>

            <div className="bottomdetails">
              <div className="lowerCarousel">
                <p className="mt-3">
                  <b>Related Products</b>
                </p>
              </div>

              <RelatedProduct
                search={itemInfo.parentType}
              />
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default ProductDetails;

const ProductPrice = ({ title, des, rating, variant, prodes }) => {
  // const [variant, setVariant] = useState([])

  const [price, setPrice] = useState({});
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [currencyRate, setRate] = useState("");
  const [currencyValue, setCurrencyValue] = useState("Rupee");

  async function fetchPrice() {
    if (variant[0].productVariantEntities.length > 0) {


      // await fetchCurrancy()
      if (currencyValue === "Rupee") {
        await setPrice({
          manualPrice: variant[0].productVariantEntities[0].manualPrice,
          price: variant[0].productVariantEntities[0].price,
          discount: variant[0].productVariantEntities[0].discount,
        });
      } else {
        await setPrice({
          manualPrice: (
            variant[0].productVariantEntities[0].manualPrice / currencyRate
          ).toFixed(2),
          price: (
            variant[0].productVariantEntities[0].price / currencyRate
          ).toFixed(2),
          discount: variant[0].productVariantEntities[0].discount,
        });
      }
      setSelectedColor(variant[0].productVariantEntities[0].color);
      setSelectedSize(variant[0].productVariantEntities[0].size);
    }
    else {
      // console.log('fired')
      await setPrice({
        manualPrice: 0,
        price: 0,
        discount: 0,
      });
      setSelectedColor("No color Added");
      setSelectedSize("No Size");
    }



  }

  async function fetchCurrancy() {
    try {
      const res = await axios.get(
        "https://v6.exchangerate-api.com/v6/b8b9cf1587f8ce9a8ab97b74/latest/USD"
      );
      setRate(res.data.conversion_rates.INR);
      // console.log(res.data.conversion_rates.INR)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    // console.log(variant)
    fetchCurrancy();
    window;
    scrollTo(0, 0);
    // console.log(variant[0].productVariantEntities)
    fetchPrice();

    // console.log(price)
  }, [currencyValue, variant]);

  // async function handleVaraintSize(size) {
  //   setSelectedSize(size)
  // }

  async function handleVariantColor(color) {
    setSelectedSize(color);
  }

  return (
    <>
      <div>
        <h2 className="pro-detail-heading">{title.replace(/"/g, '')}</h2>
        {/* <p
          className=""
          dangerouslySetInnerHTML={{ __html: des }}
        ></p> */}


       
        <div className="rate-icon-box">
          <p>
            <b>4.5</b> <i className="bi bi-star-fill rate-icon-col"></i> |{" "}
            {rating} Ratings
          {/* <ShareIcon/> */}
          </p>
        </div>
      </div>
      <p className="tagline-line"></p>
      <div className="d-flex justify-content-between">
        <h4 className="price">
          MRP: {currencyValue === "Rupee" ? "₹ " : "$ "}
          {price.manualPrice}
          <span
            style={{
              textDecoration: "line-through",
              marginLeft: "8px",
              fontSize: "14px",
              color: "#7a7a7a",
            }}
          >
            {currencyValue === "Rupee" ? "₹ " : "$ "}
            {price.price}
          </span>
          <span className="off-font">( {price.discount}% OFF )</span>
        </h4>
        <div>
          <SwitchCurrency
            // currencyValue={currencyValue}
            setCurrencyValue={setCurrencyValue}
          />
        </div>
      </div>
      <p className="tax-font">Inclusive of all taxes</p>

      <p className="col-fnt-sz offer-heading-txt">MORE COLORS</p>
      <div className="color-container">
        {/* <div
         style={{ background:` url(${imgUrl}${img.thumbImage})`,backgroundSize:'100% 100%' }}
          alt="Product"
          className="pro-color-img-active"
        ></div> */}

        {variant.length > 0 &&
          variant.map((img) => {

            // if (color.color != selectedColor) {
            //   {
            //     /* console.log(color.color) */
            //   }
            return (
              <div
                style={img.thumbImage && { background: ` url(${imgUrl}${img.thumbImage})` }}
                alt="Product"
                className="pro-color-img"
              // onClick={() => handleVariantColor(img.thumbImage)}
              ></div>
            );
          }
          )}
      </div>

      <p className="col-fnt-sz mt-4 offer-heading-txt">SELECT SIZE</p>
      <div style={{ display: "flex" }}>
        <p className="sel-size-active" style={{ marginLeft: "8px" }}>
          {selectedSize}
        </p>
        {variant[0].productVariantEntities.length > 0 &&
          variant[0].productVariantEntities.map((varSize) => {
            if (varSize.size !== selectedSize) {
              return (
                <p className="sel-size" style={{ marginLeft: "8px" }}>
                  {varSize.size}
                </p>
              );
            }
          })}
        {/* <NotAvailable /> */}



      </div>

      {/*  */}
      <p className="tagline-line"></p>
      <AccordionTxt
          title='Product Details'
          des={<DetailsBox des={prodes} />}
          className="AccordionTxt"
        />
      <p className="tagline-line"></p>
      <AccordionTxt
        title='Dimension'
        des={
          variant[0].productVariantEntities.length > 0 &&
          <>

            {variant[0].productVariantEntities[0].product_width != 0 && <p>Width : {variant[0].productVariantEntities[0].product_width} {' '}{variant[0].productVariantEntities[0].size}</p>}
            {variant[0].productVariantEntities[0].product_heigth != 0 && <p>Height : {variant[0].productVariantEntities[0].product_heigth} {' '}{variant[0].productVariantEntities[0].size}</p>}
            {variant[0].productVariantEntities[0].product_weight != 0 && <p>Weight : {variant[0].productVariantEntities[0].product_weight}</p>}
            {variant[0].productVariantEntities[0].product_depth != 0 && <p>Depth : {variant[0].productVariantEntities[0].product_depth} {' '}{variant[0].productVariantEntities[0].size}</p>}
          </>

        }
      />
      
      <>
      </>
      <p className="tagline-line"></p>

      <AccordionTxt
        title='Material'
        des={
          <>

            <h5 className="offer-heading-txt d-flex">
              <b className="mx-2">Material:</b>
              <p>{variant[0].productVariantEntities.length > 0 && variant[0].productVariantEntities[0].material}</p>
            </h5>
          </>
        }
      />

    </>
  );
};

const NotAvailable = () => {
  return (
    <>
      <div className="out-stock" style={{ marginLeft: "8px" }}>
        <p className="">2.8</p>
      </div>
    </>
  );
};



const DetailsBox = ({ des }) => {

  const [filterDes, setFilterDes] = useState('')

  function removeEmptyTags(html) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    const emptyTags = tempDiv.querySelectorAll(':empty');
    emptyTags.forEach(tag => tag.remove());

    setFilterDes(tempDiv.innerHTML)
    // return tempDiv.innerHTML;
  }

  useEffect(() => {
    removeEmptyTags(des)
  }, [])



  return (
    <>
      <div className=""></div>
      {/* <h5 className="offer-heading-txt">
        <b>Product Details</b>
      </h5> */}
      <p
        className="pro-dtl-ft-sz"
        dangerouslySetInnerHTML={{
          __html: filterDes,
        }}
      ></p>
      <div className="p-4"></div>
    </>
  );
};

function RatingBox() {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h5 className="mt-3 offer-heading-txt">
          <b>Ratings</b> <StarsIcon />
        </h5>
        <button className="rate-prod-btn shadow-sm">Rate Product</button>
      </div>
      <div className="d-flex justify-content-evenly mt-4">
        <div>
          <h5 className="rating-fnt-sz-1 mt-4">
            4.5
            <i
              className="bi bi-star-fill fs-4"
              style={{ color: "#b79d33" }}
            ></i>
          </h5>
          <p className="pro-dtl-ft-sz">1.2K Verified Buyers</p>
        </div>

        <div>
          <div>
            <p className="pro-dtl-ft-sz">
              <span>50</span>
              <i className="bi bi-star-fill" style={{ color: "#b79d33" }}></i>
              <i className="bi bi-star-fill" style={{ color: "#b79d33" }}></i>
              <i className="bi bi-star-fill" style={{ color: "#b79d33" }}></i>
              <i className="bi bi-star-fill" style={{ color: "#b79d33" }}></i>
              <i className="bi bi-star-fill" style={{ color: "#b79d33" }}></i>
            </p>
            <p className="pro-dtl-ft-sz" style={{ marginTop: "-11px" }}>
              <span>45</span>
              <i className="bi bi-star-fill" style={{ color: "#b79d33" }}></i>
              <i className="bi bi-star-fill" style={{ color: "#b79d33" }}></i>
              <i className="bi bi-star-fill" style={{ color: "#b79d33" }}></i>
              <i className="bi bi-star-fill" style={{ color: "#b79d33" }}></i>
              <i className="bi bi-star" style={{ color: "#b79d33" }}></i>
            </p>
            <p className="pro-dtl-ft-sz" style={{ marginTop: "-11px" }}>
              <span>35</span>
              <i className="bi bi-star-fill" style={{ color: "#b79d33" }}></i>
              <i className="bi bi-star-fill" style={{ color: "#b79d33" }}></i>
              <i className="bi bi-star-fill" style={{ color: "#b79d33" }}></i>
              <i className="bi bi-star" style={{ color: "#b79d33" }}></i>
              <i className="bi bi-star" style={{ color: "#b79d33" }}></i>
            </p>
            <p className="pro-dtl-ft-sz" style={{ marginTop: "-11px" }}>
              <span>14</span>
              <i className="bi bi-star-fill" style={{ color: "#b79d33" }}></i>
              <i className="bi bi-star-fill" style={{ color: "#b79d33" }}></i>
              <i className="bi bi-star" style={{ color: "#b79d33" }}></i>
              <i className="bi bi-star" style={{ color: "#b79d33" }}></i>
              <i className="bi bi-star" style={{ color: "#b79d33" }}></i>
            </p>
            <p className="pro-dtl-ft-sz" style={{ marginTop: "-11px" }}>
              <span>5</span>
              <i className="bi bi-star-fill" style={{ color: "#b79d33" }}></i>
              <i className="bi bi-star" style={{ color: "#b79d33" }}></i>
              <i className="bi bi-star" style={{ color: "#b79d33" }}></i>
              <i className="bi bi-star" style={{ color: "#b79d33" }}></i>
              <i className="bi bi-star" style={{ color: "#b79d33" }}></i>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

const RatingComment = () => {
  return (
    <>
      <div className="d-flex">
        <p className="rating-box-1">
          4.5 <i className="bi bi-star-fill rating-icon-sz"></i>
        </p>
        <p className="pro-dtl-ft-sz ms-2 mt-1">Perfect Product</p>
      </div>
      <p className="pro-dtl-ft-sz">This is an amazing Product to begin with.</p>
      <div>
        <img src={img1} alt="Product" className="pro-color-img" />
      </div>
      <div className="user-cmt-bx mt-3">
        <div className="d-flex">
          <p className="pro-dtl-ft-sz">
            Tina Singh <i className="bi bi-check-circle-fill text-muted"></i>
          </p>
          <p className="pro-dtl-ft-sz ms-1">
            Certified Buyer, Mysore 10 months ago
          </p>
        </div>
        <div className="d-flex">
          <p className="like-fnt-icon">
            450 <ThumbUpIcon className="lk-icon-sz" />
          </p>
          <p className="ms-2 like-fnt-icon">
            15 <ThumbDownIcon className="lk-icon-sz" />
          </p>
        </div>
      </div>
    </>
  );
};

const DeliveryIcon = (props) => {
  return (
    <>
      <div className="d-flex">
        <img src={props.icon} alt="icon" className="img-fluid pro-icn-sz-1" />
        <p className="pro-icn-para ms-2 mt-1">{props.title}</p>
      </div>
    </>
  );
};

const OfferDetails = () => {
  return (
    <>
      <div className="accord-item-vwindex">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className="offer-heading-txt">
              <b>BEST OFFERS</b>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography style={{ marginLeft: "20px" }}>
              <h6 className="offer-heading-txt">
                <b>
                  Best Price: <span className="offer-price">Rs. 347</span>
                </b>
              </h6>
              <ul className="offer-list-fnt">
                <li>Coupon code: DMJ200</li>
                <li>
                  Coupon Discount: Rs. 77 off (check cart for final savings)
                </li>
                <li>
                  Applicable on: Orders above Rs. 1099 (only on first purchase)
                </li>
              </ul>
              <p className="offer-price">
                <b>View Eligible Products</b>
              </p>
              <h6 className="offer-heading-txt">
                <b>7.5% Instant Discount on Myntra Kotak Credit Card.</b>
              </h6>
              <ul className="offer-list-fnt">
                <li>Max Discount Up to ₹750 on every spends.</li>
              </ul>
              <p className="offer-price">
                <b>Terms & Condition</b>
              </p>
              <h6 className="offer-heading-txt">
                <b>UpTo ₹500 Cashback on CRED pay UPI transactions.</b>
              </h6>
              <ul className="offer-list-fnt">
                <li>Min Spend ₹1,000. Available only on Android Devices.</li>
              </ul>
              <p className="offer-price">
                <b>Terms & Condition</b>
              </p>
              <h6 className="offer-heading-txt">
                <b>EMI option available</b>
              </h6>
              <ul className="offer-list-fnt">
                <li>EMI starting from Rs.20/month</li>
              </ul>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
};

const RelatedProduct = ({ search }) => {
  const [relatedProduct, setReletedProduct] = useState([]);

  async function fetchData() {
    if (search) {
      try {
        const res = await axios.get(url + typeEnd + search);
        // console.log(res.data.data);
        if (res.data.data) {
          setReletedProduct(res.data.data);
        }

      } catch (err) {
        console.log(err);
      }
    }
    else {
      try {
        const res = await axios.get(url + typeEnd);
        // console.log(res.data.data);
        if (res.data.data) {
          setReletedProduct(res.data.data);
        }

      } catch (err) {
        console.log(err);
      }
    }

  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {relatedProduct ? (
        <Carousel
          swipeable={true}
          draggable={true}
          showDots={false}
          responsive={responsive1}
          ssr={true}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={2000}
          keyBoardControl={true}
          customTransition="all .5s"
          transitionDuration={500}
          containerClass="carousel-container productcard-home-sldr"
          // removeArrowOnDeviceType={["desktop", "tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px productcard-home-sldr"
          arrows={false}
        >
          {relatedProduct.map((item) => {
            {
              /* console.log(item.images.length>0&&item.images[0].productVariantEntities.length>0&&item.images[0].productVariantEntities[0].price) */
            }
            return (
              <ProductCard
                key={item.id}
                img={item.images.length > 0 && imgUrl + item.images[0].thumbImage}
                name={item.seo_title.replace(/"/g, '')}
                category={item.name}
                id={item.id}
                price={
                  item.images.length > 0 &&
                  item.images[0].productVariantEntities.length > 0 &&
                  item.images[0].productVariantEntities[0].price
                }
                sku={item.sku}
                slug={item.slug}
              />
            );
          })}
        </Carousel>
      ) : (
        "loading.."
      )}
    </>
  );
};

export { RelatedProduct };

const SwitchCurrency = ({ setCurrencyValue }) => {
  // async function fetchCurrancy() {
  //   try {
  //     const res = await axios.get('https://v6.exchangerate-api.com/v6/b8b9cf1587f8ce9a8ab97b74/latest/USD');
  //     setRate(res.data.conversion_rates.INR)
  //     console.log(res.data.conversion_rates.INR)
  //   }
  //   catch (err) {
  //     console.log(err)
  //   }
  // }

  // useEffect(() => {
  //   fetchCurrancy()
  // }, [])

  // const [currencyRate, setRate] = useState('')

  // Initialize the currency state with a default value
  const [selectedCurrency, setSelectedCurrency] = useState("Rupee");

  // Function to handle radio button change
  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
    setCurrencyValue(event.target.value);
  };

  // Function to perform an action when the currency is switched
  const handleCurrencySwitch = () => {
    // You can perform any action here based on the selectedCurrency state
    console.log(`Selected Currency: ${selectedCurrency}`);
  };

  return (
    <>
      <div className="leftsd-curncy-box">
        <div className="switches-container">
          <input
            type="radio"
            id="switchRupee"
            name="switchPlan"
            value="Rupee"
            checked={selectedCurrency === "Rupee"}
            onChange={handleCurrencyChange}
          />
          <input
            type="radio"
            id="switchDolar"
            name="switchPlan"
            value="Dolar"
            checked={selectedCurrency === "Dolar"}
            onChange={handleCurrencyChange}
          />
          <label for="switchRupee">
            <i className="bi bi-currency-rupee"></i>
          </label>
          <label for="switchDolar">
            <i className="bi bi-currency-dollar"></i>
          </label>
          <div className="switch-wrapper">
            <div className="switch">
              <div>
                <i className="bi bi-currency-rupee"></i>
              </div>
              <div>
                <i className="bi bi-currency-dollar"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};



const AccordionTxt = ({ title, des }) => {
  return (
    <>
      <div className="accord-item-vwindex">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className="offer-heading-txt">
              <h5>{title}</h5>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography style={{ marginLeft: "30px" }}>
              {des}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  )
}