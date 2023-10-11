// import React from 'react';
import HeaderCon from "../header/HeaderCon";
import Navbar from "../header/Navbar";
import FilterCard from "../ProductCard/FilterCard";
import ProductFilter from "../ProductCard/ProductFilter1";
import Pagination from '@mui/material/Pagination';
import Footer from "../footer/Footer";
import "./search.css";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

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
  return (
    <>
      <h4 className="fltr-ftr-headingtag">
        Jewellery Designs for Festive Season{" "}
      </h4>
      <p className="fltr-para-textfnt">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
        ipsum repellat reiciendis maxime architecto quibusdam est quisquam?
        Repellat soluta reprehenderit similique eum consectetur velit voluptates
        repudiandae doloribus magni laboriosam modi, consequuntur, rem possimus
        voluptate dignissimos? Recusandae quis esse alias impedit ipsam dolor
        magnam iusto placeat at eos saepe, quod nulla expedita quaerat eius quas
        nemo autem modi culpa ullam. Cum ullam praesentium earum, obcaecati
        cumque corporis voluptate illum illo, tenetur similique repudiandae sed
        adipisci ratione dolor molestiae nulla. Temporibus quidem iste pariatur
        assumenda. Fuga explicabo asperiores pariatur! Consectetur cupiditate
        repudiandae sit ipsum optio possimus praesentium, magnam voluptatum qui
        ullam officia porro asperiores dignissimos aliquam tempora iusto, non
        temporibus recusandae ut, rem nostrum architecto suscipit esse! Eaque,
        asperiores. Iusto ducimus numquam consequuntur minima nulla? Blanditiis,
        rerum fugiat. Maxime dicta eius asperiores quaerat non necessitatibus
        sed explicabo vel deserunt pariatur placeat praesentium, repudiandae
        accusantium, eligendi eum, doloribus earum facilis. Reiciendis facilis
        architecto voluptas atque, ipsa consequuntur provident explicabo odit
        porro, assumenda perferendis debitis doloribus. Minima dolor ad est,
        blanditiis illo neque pariatur corporis quos aliquam rerum nesciunt
        autem labore perspiciatis esse. Harum, delectus adipisci quos mollitia
        architecto enim! Vero, quis corporis. Totam non laboriosam obcaecati
        dolor molestias nesciunt. Itaque minima unde natus.
      </p>
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