import React, { useState, useEffect, memo } from "react";
import "./dropdown-menu.css";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import editorimg from "../../assets/images/earring.jpg";
import axios from "axios";

const url = "https://api.diwamjewels.com/DMJ/";
const endPoint = "api/v1/category/maincategoryName/";
const subSubEndPoint = 'api/v1/category/subcategory/';

const DeskDropdown = ({ cateData }) => {

  return (
    <>
      <NewDropdownMenu cateData={cateData} />
    </>
  );
};

export default DeskDropdown;

const NewDropdownMenu = ({ cateData }) => {
  const [activeCategory, setActiveCategory] = useState("Faishon Jewellery");
  const [subCateData, setSubCateData] = useState([])


  async function getSubSubCate(value) {
    // console.log(value)
    try {
      const res = await axios.get(url + subSubEndPoint + value)
      // console.log(res.data.data)
      if (!res.data.data) {
        setSubCateData([])
      }
      else {
        setSubCateData(res.data.data)

      }

    }
    catch (err) {
      console.log(err)
      setSubCateData([])
    }
  }


  const handleCategoryMouseOver = async (category, id) => {
    setActiveCategory(category);
    getSubSubCate(id)

  };

  const handleCategoryMouseOut = () => {
    setActiveCategory(null);
  };

  return (
    <>
      <div className="new-menu-boxvw">
        <div className="d-flex">
          <div className="" style={{ width: "350px" }}>
            {/* <p className="cate-hd-fntsz">
              {/* All Jewellery Categories <ArrowRightAltIcon /> 
            </p> */}

            {
              cateData.length > 0 && cateData.map((item) => {
                console.log(item)
                return (
                  <>
                    <MainCategory
                      category={item.type}
                      isActive={activeCategory === item.type}
                      onMouseOver={() => handleCategoryMouseOver(item.type, item.id)}
                      
                    />
                  </>
                )
              })
            }


          </div>

          <div className="linefrleft"></div>
          {(
            <div className="row" style={{ width: "1000px" }}>
              <div className="col">
                {/* <p className="main-cate-fnt-sz">{props.submaincategory}</p>
         */}



                {
                  subCateData.length > 0 && subCateData.map((cateList) => {
                    // console.log(cateList)
                    return (
                      <>
                        <SubcategoryList subcategory={cateList.type} />

                      </>
                    )
                  })
                }
              </div>

              <EditorPick />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const MainCategory = (props) => {
  return (
    <>
      <div
        className={`hoverable-list pt-2 ${props.isActive ? "active-category" : ""}`}
        onMouseOver={props.onMouseOver}
        onMouseOut={props.onMouseOut}
      >
        <p className="main-cate-fnt-sz">{props.category}</p>
        <NavigateNextIcon className="" />
      </div>
    </>
  );
};

const SubcategoryBox = ({ submaincategory }) => {

  return (
    <>

    </>
  );
};

const SubcategoryList = (props) => {
  return (
    <>
      <p className="subcate-fnt-sz">{props.subcategory}</p>
    </>
  );
};

const EditorPick = () => {
  return (
    <>
      <div className="col">
        <div className="edtr-box-vw">
          <div className="editor-pickimg">
            <img src={editorimg} alt="EditorPick" className="editor-img"/>
          </div>

          <p className="subcate-fnt-sz mt-2">Editor's Pick</p>
          <p className="cate-hd-fntsz" style={{ marginTop: "-13px" }}>
            Jewellery Shop
          </p>
        </div>
      </div>
    </>
  );
};





