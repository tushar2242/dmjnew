import React, { useState } from "react";
import "./catergory-filter.css";
import Navbar from "../header/Navbar";
import HeaderCon from "../header/HeaderCon";
import Footer from "../footer/Footer";
import banner from "../../assets/images/cate-img.png";
import img from "../../assets/images/earring.jpg";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import FilterCard from "../ProductCard/FilterCard";
import ProductFilter from "../ProductCard/ProductFilter1";

const CategoryFilter = () => {
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
        <FilterCard />
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

