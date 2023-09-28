// import React from 'react';
import HeaderCon from '../header/HeaderCon';
import Navbar from '../header/Navbar';
import FilterCard from '../ProductCard/FilterCard'
import ProductFilter from '../ProductCard/ProductFilter1'
import Footer from '../footer/Footer'
import './search.css';
import { useEffect } from 'react'
import { Helmet } from 'react-helmet';

const Search = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
         <Helmet>
            <meta charSet="utf-8" />
            <title>Search</title>
            <meta name="description" content='Search' />
            <meta name="keywords" content='search' />

          </Helmet>
            <HeaderCon />
            <Navbar />
            <div className="filter-view">
                <ProductFilter />
                <FilterCard />
            </div>
            <Footer />
        </>
    )
}


export default Search;