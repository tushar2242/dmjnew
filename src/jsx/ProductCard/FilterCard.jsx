import "./filtercard.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";
import { addSearch } from "../redux/dmjSlice";


const proto = "https://api.diwamjewels.com/DMJ/";
const imgUrl = "https://squid-app-2-7wbvi.ondigitalocean.app/";
const endPoint = "api/v1/products/search?query=";

// const search = 'dd';

// const page = undefined;

const FilterCard = () => {
  var searchSelctor = useSelector((state) => state.product.search.payload);
  const { q } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchData, setSearchData] = useState([]);
  const [isLoad, setLoad] = useState(false);

  const fetData = async () => {
    setLoad(true);
    if (searchSelctor === undefined) {
      searchSelctor = "";
    }
    try {
      const res = await axios.get(
        `${proto}${endPoint}${searchSelctor}&pageSize=0`
      );
      // console.log(res.data.data)
      setSearchData(res.data.data.order);
      setLoad(false);
    } catch (error) {
      console.log(error);
      setLoad(true);
    }
  };
  useEffect(() => {
    if (searchSelctor !== q) {
      if (searchSelctor) {
        navigate(`/search/${searchSelctor}`);
      }
      else {
        dispatch(addSearch(q));
      }
    }
    fetData();
    window.scrollTo(0, 0);
  }, [searchSelctor, q]);

  return (
    <>
      <div className="container-fluid contain-grid">
        <div className="grid-view">
          {!isLoad ? (
            searchData.length > 0 &&
            searchData.map((sItem) => {
              // console.log(sItem.images[0].thumbImage);

              return (
                <ProductItemCard
                  img={
                    sItem.images.length > 0 &&
                    imgUrl + sItem.images[0].thumbImage
                  }
                  key={sItem.id}
                  item={sItem}
                  price={
                    sItem.images.length > 0 &&
                    sItem.images[0].productVariantEntities.length > 0 &&
                    sItem.images[0].productVariantEntities[0].price
                  }
                />
              );
            })
          ) : (
            <Loader />
          )}
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
    const existingProduct = existingCart.find(
      (item) => item.productId === productId
    );

    if (existingProduct) {
      // If the product exists, update its quantity
      existingProduct.quantity += quantity;
    } else {
      // If the product doesn't exist, add it to the cart as a new item
      const newItem = {
        productId: productId,
        quantity: quantity,
      };
      existingCart.push(newItem);
    }

    // Save the updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(existingCart));
    navigate("/addToCart");
  };

  const dispatch = useDispatch();

  function RedirectDetailsPage(id, dir) {
    navigate(dir, { state: { id: id } });
    dispatch(addSearch(val));
    localStorage.setItem("productId", id);
  }
  return (
    <>
      <div className="grid-column mt-3">
        <div className="filtr-new-box-1" onClick={() => RedirectDetailsPage(item.id, `/p/` + item.slug + '/' + item.sku)} style={{ cursor: 'pointer' }}>
          <div className="pro-img-card">
            <img src={img} alt="product" />
          </div>
          <div
            onClick={() => RedirectDetailsPage(item.id, "/p")}
            className="text-decoration-none d-flex justify-content-between"
          >
            <p className="trend-cont-fnt ms-2">
              {item.name.length < 15
                ? item.name
                : item.name.replace(/"/g, "").slice(0, 15) + "..."}
            </p>
            <FavoriteBorderIcon className="hm-crd-posticon" />
          </div>

          <div className="pro-price-fx">
            <p className="trend-price1 ml-2">
              <b>
                <CurrencyRupeeIcon className="rup-icon-sz ms-1" />
                {item.images.length > 0 &&
                  item.images[0].productVariantEntities.length > 0 &&
                  item.images[0].productVariantEntities[0].manualPrice}
                <span
                  style={{
                    textDecoration: "line-through",
                    marginLeft: "8px",
                    fontSize: "14px",
                    color: "#7a7a7a",
                  }}
                >
                  <CurrencyRupeeIcon className="rup-icon-sz ms-1" />
                  {item.images.length > 0 &&
                    item.images[0].productVariantEntities.length > 0 &&
                    item.images[0].productVariantEntities[0].price}
                </span>{" "}
              </b>
            </p>
            <p className="off-font">
              ({" "}
              {item.images.length > 0 &&
                item.images[0].productVariantEntities.length > 0
                ? item.images[0].productVariantEntities[0].discount
                : 0}
              % OFF )
            </p>
          </div>

          <div className="d-flex ms-2" style={{ marginTop: '-10px' }}>
            <p className="trend-rt-box1">
              <b>
                4.5 <i className="bi bi-star-fill trend-rt-icon"></i>
              </b>
            </p>
            <p className="trend-span-fnt1">15 reviews</p>
          </div>
        </div>
      </div>
    </>
  );
};


export {ProductItemCard}