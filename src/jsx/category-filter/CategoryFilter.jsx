import React, { useState, useEffect } from "react";
import "./catergory-filter.css";
import Navbar from "../header/Navbar";
import HeaderCon from "../header/HeaderCon";
import Footer from "../footer/Footer";
import banner from "../../assets/images/cate-img.png";
import img from "../../assets/images/earring.jpg";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import FilterCard from "../ProductCard/FilterCard";
import ProductFilter from "../ProductCard/ProductFilter1";
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from "react-redux";
import Loader from "../loader/Loader";
import axios from 'axios';
import {ProductItemCard} from '../ProductCard/FilterCard';


const proto = "https://api.diwamjewels.com/DMJ/";
const imgUrl = "https://squid-app-2-7wbvi.ondigitalocean.app/";
const endPoint = "api/v1/products/search?query=";


const CategoryFilter = () => {
  const searchTxt = useSelector((state) => state.product.search.payload);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {query}=useParams();
  // console.log(query);


  const fetchData = () => {
    setLoading(true);
    const apiUrl = `https://api.diwamjewels.com/DMJ/api/v1/category/type?type=${query}`;
    axios
      .get(apiUrl)
      .then((response) => {
        if (response.data && response.data.data) {
          const categoryDescription = response.data.data.categoryDescription;
          if (categoryDescription !== null) {
            const categoryDescriptionWithoutHtml = categoryDescription.replace(/<[^>]*>/g, "");
            setData(categoryDescription);
          } else {
            setData("Category description not available");
          }
        } else {
          setData("Category data not available");
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [searchTxt]);

  return (
    <>
      <HeaderCon />
      <Navbar />
      <CategoryBanner />
      <div className="component-boxvw">
        <div className="container-fluid">
          <div className="row grid-row-view">
            <CategoryComponent category="Faishon Jewellery" image={img} />
            <CategoryComponent category="Home Decor" image={img} />
            <CategoryComponent category="Blue Pottery" image={img} />
            <CategoryComponent category="Silver Jewellery" image={img} />
            <CategoryComponent category="Art & Craft" image={img} />
            <CategoryComponent category="Necklaces" image={img} />
            <CategoryComponent category="Ring" image={img} />
          </div>
        </div>
      </div>
      <h3 className="text-center mt-4 mb-4"><b>Category Products</b></h3>
      <ProductFilter />
      <div>
        <FilterCategoryCard />
      </div>

      <Footer />
    </>
  );
};
export default CategoryFilter;

const CategoryBanner = () => {
  return (
    <>
      <div className="cate-banner-box">
        <img src={banner} alt="banner" className="cate-banner-img" />
      </div>
    </>
  );
};

const CategoryComponent = (props) => {
  return (
    <>
      <div className="column-grid-vw text-center">
        <div className="comp-box-scale">
          <div className="cate-img-boxvw">
            <img
              src={props.image}
              alt="categoryImg"
              className="img-vwfr-category"
            />
          </div>
          <p className="comp-para-fnt">
            {props.category} <ArrowRightAltIcon />
          </p>
        </div>
      </div>
    </>
  );
};



const FilterCategoryCard = () => {
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