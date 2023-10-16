import React, { useState } from 'react';
import HeaderCon from "../header/HeaderCon";
import Navbar from "../header/Navbar";
import FilterCard from "../ProductCard/FilterCard";
import ProductFilter from "../ProductCard/ProductFilter1";
import Pagination from '@mui/material/Pagination';
import Footer from "../footer/Footer";
import "./search.css";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

const Search = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Search</title>
        <meta name="description" content="Search" />
        <meta name="keywords" content="search" />
      </Helmet>
      <HeaderCon />
      <Navbar />

      <p className="breadcrumb-fnt-sz ms-3"> Home / Products </p>

      <ProductFilter />


      <div>
        <FilterCard />
      </div>
      <div className="mt-4 mb-3">
      <PaginationBox />
      </div>
      <div className="filter-ftr-content">
        <ProductContentFilter />
      </div>
    
      <Footer />
    </>
  );
};

export default Search;

const ProductContentFilter = () => {
  const searchTxt = useSelector((state) => state.product.search.payload);
  // const { searchTxt } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    const apiUrl = `https://api.diwamjewels.com/DMJ/api/v1/category/type?type=${searchTxt}`;
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

      <div className="fltr-para-textfnt">
      {loading ? (
          'Loading data...'
        ) : error ? (
          `Error: ${error.message}`
        ) : data ? (
          <div dangerouslySetInnerHTML={{ __html: data }}>

          </div>
        ) : null}
      </div>

   
    </>
  );
};

const PaginationBox = () => {
  return (
    <>
       <Pagination count={50} color="primary" />
    </>
  )
}