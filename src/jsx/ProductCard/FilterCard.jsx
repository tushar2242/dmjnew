import "./filtercard.css";
// import ringimg from '../../assets/images/ring2.jpg'
// import tika from '../../assets/images/tika.jpg'
// import necklace from '../../assets/images/necklace3.jpg'
// import neckpiece from '../../assets/images/neckpiece.jpg'
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";

const proto = 'https://api.diwamjewels.com/DMJ/';
const imgUrl = 'https://squid-app-2-7wbvi.ondigitalocean.app/'
const endPoint = "api/v1/products/search?query=";

// const search = 'dd';

// const page = undefined;

const FilterCard = () => {

  var searchSelctor = useSelector((state) => state.product.search.payload);

  const [searchData, setSearchData] = useState([]);
  const [isLoad, setLoad] = useState(false)

  const fetData = async () => {

    setLoad(true)
    if (searchSelctor === undefined) {
      searchSelctor = ''
    }
    try {
      const res = await axios.get(`${proto}${endPoint}${searchSelctor}&pageSize=0`);
      // console.log(res.data.data)
      setSearchData(res.data.data.order);
      setLoad(false)
    } catch (error) {
      console.log(error);
      setLoad(true)
    }
  };
  useEffect(() => {
    fetData();
    window.scrollTo(0, 0);
  }, [searchSelctor]);

  return (
    <>
      <div className="container contain-grid">
        <div className="grid-view">
          {!isLoad ? searchData.length > 0 &&
            searchData.map((sItem) => {
              // console.log(sItem.images[0].thumbImage);

              return (
                <ProductItemCard
                  img={sItem.images.length > 0 && imgUrl + sItem.images[0].thumbImage}
                  key={sItem.id}
                  item={sItem}
                  price={sItem.images.length > 0 && sItem.images[0].productVariantEntities.length > 0 && sItem.images[0].productVariantEntities[0].price}
                />
              );
            })
            :
            <Loader />
          }

        </div>
      </div>
    </>
  );
};

export default FilterCard;





const ProductItemCard = ({ img, item, price }) => {

  const navigate = useNavigate();


  const addToCart = (productId) => {
    // Get the existing cart from localStorage or initialize an empty array if it doesn't exist
    let quantity = 2;
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the product with the same ID already exists in the cart
    const existingProduct = existingCart.find(item => item.productId === productId);

    if (existingProduct) {
      // If the product exists, update its quantity
      existingProduct.quantity += quantity;
    } else {
      // If the product doesn't exist, add it to the cart as a new item
      const newItem = {
        productId: productId,
        quantity: quantity
      };
      existingCart.push(newItem);
    }

    // Save the updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(existingCart));
    navigate('/addToCart')
  };

  const dispatch = useDispatch()


  function RedirectDetailsPage(id, dir) {
    navigate(dir, { state: { id: id } });
    dispatch(addSearch(val));
    localStorage.setItem("productId", id);
  }
  // console.log(item.images[0].productVariantEntities[0].price);
  return (
    <>
      <div className="grid-column">
        <div className="text-decoration-none pro-cd-flt-box">

          <div
            className="card__container shadow-sm"
          >
            <div className=""
              onClick={() => RedirectDetailsPage(item.id, `/productDetails/` + item.slug + '/' + item.sku)} style={{ cursor: 'pointer' }}>
              <div className="bg-box"></div>
              <div className="card__top__section">
                <div className="pro-img-box">
                  <img src={img} alt="product" className="pro-img-card" />
                </div>
                <div
                  onClick={() => RedirectDetailsPage(item.id, "/wishlist")}
                  className="text-decoration-none"
                ><div className="card__top__section__icons">
                    <FavoriteBorderIcon className="card-pro-icon" />
                  </div>
                </div>
              </div>

              <div
                onClick={() => RedirectDetailsPage(item.id, "/productDetails")}
                className="text-decoration-none">

                <p className="trend-cont-fnt ms-2">{item.name.length < 20 ? item.name : item.name.replace(/"/g, '').slice(0, 20) + '...'}</p>
              </div>
              <div className="d-flex">
                <p className="strike-text1">
                  <b>
                    {/* {item.manualPrice} */}
                  </b>
                </p>
                <div className="pro-price-fx">
                <p className="trend-price1 ml-2">
                  <b>
                    <CurrencyRupeeIcon className="rup-icon-sz ms-1" />


                    {(item.images.length > 0 && item.images[0].productVariantEntities.length > 0) && item.images[0].productVariantEntities[0].price}
                    <span
                      style={{
                        textDecoration: "line-through",
                        marginLeft: "8px",
                        fontSize: "14px",
                        color: "#7a7a7a",
                      }}
                    >
                      <CurrencyRupeeIcon className="rup-icon-sz ms-1" />
                      {(item.images.length > 0 && item.images[0].productVariantEntities.length > 0) && item.images[0].productVariantEntities[0].manualPrice}

                    </span>
                    {' '}
                   
                  </b>
                 
                  {/* <span className="span-pr-fnt">on wards</span> */}
                </p>
                <p className="off-font">( {(item.images.length > 0 && item.images[0].productVariantEntities.length > 0)? item.images[0].productVariantEntities[0].discount :0 }% OFF )</p>
               </div>
              </div>
              <div className="d-flex p-2">
                <p className="trend-rt-box1">
                  <b>
                    4.5 <i className="bi bi-star-fill trend-rt-icon"></i>
                  </b>
                </p>
                <p className="trend-span-fnt1">15 reviews</p>
              </div>
            </div>
            <div onClick={async () => {
              await addToCart(item.id)
             
            }} >
              <button className="trend-cart-btn">
                <b>Add To Cart</b>
              </button>
            </div>
          </div>


        </div>
      </div>

    </>
  );
};
