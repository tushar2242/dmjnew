import React, { useState,useEffect,memo } from "react";
import "./dropdown-menu.css";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import editorimg from "../../assets/images/earring.jpg";



const DeskDropdown = () => {
  return (
    <>
      <NewDropdownMenu />
    </>
  );
};

export default DeskDropdown;

const NewDropdownMenu = () => {
  const [activeCategory, setActiveCategory] = useState("Faishon Jewellery");

  const handleCategoryMouseOver = (category) => {
    setActiveCategory(category);
  };

  const handleCategoryMouseOut = () => {
    setActiveCategory(null);
  };

  return (
    <>
      <div className="new-menu-boxvw">
        <div className="d-flex">
          <div className="" style={{ width: "350px" }}>
            <p className="cate-hd-fntsz">
              All Jewellery Categories <ArrowRightAltIcon />
            </p>
            <MainCategory
              category="Faishon Jewellery"
              isActive={activeCategory === "Faishon Jewellery"}
              onMouseOver={() => handleCategoryMouseOver("Faishon Jewellery")}
            />
            <MainCategory
              category="Gold Jewellery"
              isActive={activeCategory === "Gold Jewellery"}
              onMouseOver={() => handleCategoryMouseOver("Gold Jewellery")}
            />
            <MainCategory
              category="Silver Jewellery"
              isActive={activeCategory === "Silver Jewellery"}
              onMouseOver={() => handleCategoryMouseOver("Silver Jewellery")}
            />
          </div>

          <div className="linefrleft"></div>
          {(activeCategory === "Faishon Jewellery" ||
            activeCategory === "Gold Jewellery" ||
            activeCategory === "Silver Jewellery") && (
            <div className="row" style={{ width: "1000px" }}>
              <SubcategoryBox submaincategory={activeCategory} />
              <SubcategoryBox submaincategory={activeCategory} />
              <SubcategoryBox submaincategory={activeCategory} />
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

const SubcategoryBox = (props) => {
  return (
    <>
      <div className="col">
        <p className="main-cate-fnt-sz">{props.submaincategory}</p>
        <SubcategoryList subcategory="Bridal Churas" />
        <SubcategoryList subcategory="Kadas" />
        <SubcategoryList subcategory="Kaleeras" />
      </div>
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





