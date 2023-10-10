import { useState, memo, useRef } from "react";
import "./newNav.css";

import logo from "../../assets/images/dmjicon.png";
import searchIcon from "./icons/search.png";
import { NavLink, useNavigate } from "react-router-dom";
// import earring from "../../assets/images/earring1.jpg";
import NavbarDropdown from "./NavbarDropdown";
import { useDispatch, useSelector } from "react-redux";
import { addSearch } from "../redux/dmjSlice";
import { useEffect } from "react";
import ThreeLine from "@mui/icons-material/DehazeOutlined";
import CrossIcon from "@mui/icons-material/CloseOutlined";
import menubar from "../../assets/images/menuicon.png";
import Offcanvas from "react-bootstrap/Offcanvas";
import Accordion from "react-bootstrap/Accordion";
import "../search-contentbox/search-input-box.css";

import axios from "axios";

const url = "https://api.diwamjewels.com/DMJ/";
const endPoint2 = "api/v1/user/";
// const url = 'http://137.184.3.191:8080/DMJ/';
// const endPoint = 'api/v1/category/maincategory';
const endPoint = "api/v1/category";
const subSubEndPoint = "api/v1/category/subcategory/";

const userId = localStorage.getItem("userId");



function Navbar() {
  async function fetchMenu() {
    try {
      const res = await axios.get(url + endPoint);
      // console.log(res.data.data)
      setCate(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  const [isJwelOpen, setIsJwelOpen] = useState(false);
  const [isArtOpen, setIsArtOpen] = useState(false);
  const [isCarpet, setIsCarpet] = useState(false);
  const [isMobNav, setIsMobNav] = useState(true);

  const [search, setSearch] = useState("");

  const [profile, setProfile] = useState(false);

  const dispatch = useDispatch();
  const searchTxt = useSelector((state) => state.product.search.payload);
  const [cateData, setCate] = useState([]);
  const [hoverTimeout, setHoverTimeout] = useState(null);

  const navigate = useNavigate();

  const [wishLength, setWishLength] = useState(0)
  const [cartLength, setCartLength] = useState(0)

  const [userName, setUserName] = useState('There')

  async function handleSearch(e) {
    e.preventDefault();
    setSearch(e.target.value);
    dispatch(addSearch(e.target.value));
    // navigate('/search')
  }

  async function handleProSearch() {
    navigate("/search");
  }

  async function handleProfile() {
    setProfile(true);
  }

  async function handleSignOut() {
    localStorage.removeItem("userId");
  }

  // const [isBoxVisible, setIsBoxVisible] = useState(false);
  // const toggleBoxVisibility = () => {
  //   setIsBoxVisible(!isBoxVisible);
  // };

  // function handleLeaveMouse() {
  //   // Delay for 500 milliseconds (adjust as needed)
  //   const timeoutId = setTimeout(() => {
  //     setIsJwelOpen(false);
  //     setIsArtOpen(false);
  //     setIsCarpet(false);
  //   }, 5000);
  //   // Store the timeout ID to clear it if necessary
  //   setHoverTimeout(timeoutId);
  // }

  function handleJewelEnter() {
    setIsJwelOpen(!isJwelOpen);
    setIsArtOpen(false);
    setIsCarpet(false);
    // Clear any previous timeout (if any)
    clearTimeout(hoverTimeout);
    // /console.log('fired')
  }


  async function fetchUserData() {
    try {
      const res = await axios.get(url + endPoint2 + userId);
      // console.log(res.data.data)
      setUserName(res.data.data);
    } catch (err) {
      console.log(err);
      setUserName('There')
    }
  }


  function handleArtEnter() {
    setIsArtOpen(!isArtOpen);
    setIsJwelOpen(false);
    setIsCarpet(false);
    // Clear any previous timeout (if any)
    clearTimeout(hoverTimeout);
  }

  function handleCraft() {
    setIsCarpet(!isCarpet);
    setIsJwelOpen(false);
    setIsArtOpen(false);
    // Clear any previous timeout (if any)
    clearTimeout(hoverTimeout);
  }

  const dropdownRef = useRef(null);
  // Function to close the dropdown when a click occurs outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsJwelOpen(false);
    }
  };

  useEffect(() => {
    // console.log(searchTxt)

    let wishList = JSON.parse(localStorage.getItem('wishList')) || [];
    const uniqueWishList = [...new Set(wishList)];
    setWishLength(uniqueWishList.length)
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartLength(cart.length)

    if (userId) {
      fetchUserData()
    }
    setSearch(searchTxt);
    fetchMenu();
    // Attach the event listener when the component mounts
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };

  }, [searchTxt]);


  return (
    <>
      <div className="nav-outer-dropdown nav-drop-shadow shadow desktop-navbar-vw" ref={dropdownRef}>
        <div className="navOuter shadow-sm">
          <NavLink to="/">
            <div className="nav-logo">
              <img src={logo} alt="logo" />
            </div>
          </NavLink>
          <ul>
            <div className="nav-product">
              <li
                className="dropdown1 mt-2"
                onClick={() => handleJewelEnter()}
              // onMouseLeave={() => handleLeaveMouse()}
              >
                <NavLink
                  className="nav-box-product"
                  style={isJwelOpen ? { color: "#d0b646" } : null}
                >
                  Jewellery{" "}
                  {!isJwelOpen ? (
                    <i className="bi bi-chevron-down caret-icon-sz ms-2 mt-1"></i>
                  ) : (
                    <i className="bi bi-chevron-up caret-icon-sz ms-2 mt-1"></i>
                  )}
                </NavLink>
              </li>

              <li
                className="dropdown1 mt-2"
                onClick={() => handleArtEnter()}
              // onMouseLeave={() => handleLeaveMouse()}
              >
                <NavLink
                  className="nav-box-product"
                  style={isArtOpen ? { color: "#d0b646" } : null}
                >
                  HandiCraft{" "}
                  {!isArtOpen ? (
                    <i className="bi bi-chevron-down caret-icon-sz ms-2 mt-1"></i>
                  ) : (
                    <i className="bi bi-chevron-up caret-icon-sz ms-2 mt-1"></i>
                  )}
                </NavLink>
              </li>
              <li
                className="mt-2 dropdown1"
                onClick={() => handleCraft()}
              // onMouseLeave={() => handleLeaveMouse()}
              >
                <NavLink
                  className="nav-box-product"
                  style={isCarpet ? { color: "#d0b646" } : null}
                >
                  Blue Pottery{" "}
                  {!isCarpet ? (
                    <i className="bi bi-chevron-down caret-icon-sz ms-2 mt-1"></i>
                  ) : (
                    <i className="bi bi-chevron-up caret-icon-sz ms-2 mt-1"></i>
                  )}
                </NavLink>
              </li>
            </div>
          </ul>
          <div className="nav-box-search">
            <input
              type="text"
              className="nav-search"
              value={search}
              onChange={handleSearch}
            />
            <img
              src={searchIcon}
              className="nav-search-icon"
              onClick={handleProSearch}
            />
          </div>
          <div className="nav-account">
            <div
              className="nav-box"
              onClick={() => {
                setProfile(!profile);
              }}
            >
            <div style={{marginTop:'19px'}}>
              <i className="bi bi-person-circle nav-icon-item ms-5"></i><br />
              <p className="user-name-fntsz">hi,there</p>
              </div>
            </div>
            {profile && (
              <div className="more-profile">
                {(!userId && userId == undefined) ? (
                  <li
                    onClick={async () => {
                      navigate("/defaultlogin");
                    }}
                  >
                    Log In / Sign Up
                  </li>
                ) : (
                  <>
                    <li onClick={() => navigate('/profile')}>Profile</li>
                    <li
                      className="mt-2"
                      onClick={() => {
                        handleSignOut();
                        window.location.reload();
                      }}
                    >
                      Sign Out
                    </li>
                  </>
                )}
              </div>
            )}
            <div className="nav-box">
              <NavLink to="/wishlist">
                {" "}
                <div className="show-numbericn">
                  <i className="bi bi-suit-heart-fill nav-icon-item ms-4"></i>
                  <div className="number-icon-sz">{wishLength}</div>
                </div>
              </NavLink>
            </div>
            <div className="nav-box">
              <NavLink to="/addToCart">
                {" "}

                <div className="show-numbericn">
                  <i className="bi bi-cart4 nav-icon-item ms-4"></i>
                  <div className="number-icon-sz">{cartLength}</div>
                </div>
              </NavLink>
            </div>
          </div>
        </div>

        <div className="navbar-mobile">
          <div className="nav-mob-icon">

            <img src={logo} alt="logo" className="nav-logo" />
            {isMobNav ? (
              <ThreeLine
                onClick={() => {
                  setIsMobNav(false);
                }}
              />
            ) : (
              <CrossIcon
                onClick={() => {
                  setIsMobNav(true);
                  setIsJwelOpen(false);
                  setIsArtOpen(false);
                  setIsCarpet(false);
                }}
              />
            )}
          </div>
          {!isMobNav ? (
            <div className="nav-mobile-item">
              <ul>
                <div className="nav-product">
                  <li
                    className="dropdown1 mt-2"
                    onClick={() => {
                      setIsJwelOpen(!isJwelOpen);
                      setIsArtOpen(false);
                      setIsCarpet(false);
                    }}
                  >
                    <NavLink
                      className="nav-box-product"
                      style={isJwelOpen ? { color: "#d0b646" } : null}
                    >
                      Jewellery{" "}
                      {!isJwelOpen ? (
                        <i className="bi bi-chevron-down caret-icon-sz ms-2 mt-1"></i>
                      ) : (
                        <i className="bi bi-chevron-up caret-icon-sz ms-2 mt-1"></i>
                      )}
                    </NavLink>
                  </li>

                  <li
                    className="dropdown1 mt-2"
                    onClick={() => {
                      setIsArtOpen(!isArtOpen);
                      setIsJwelOpen(false);
                      setIsCarpet(false);
                    }}
                  >
                    <NavLink
                      className="nav-box-product"
                      style={isArtOpen ? { color: "#d0b646" } : null}
                    >
                      Art & Craft{" "}
                      {!isArtOpen ? (
                        <i className="bi bi-chevron-down caret-icon-sz ms-2 mt-1"></i>
                      ) : (
                        <i className="bi bi-chevron-up caret-icon-sz ms-2 mt-1"></i>
                      )}
                    </NavLink>
                  </li>
                  <li
                    className="mt-2 dropdown1"
                    onClick={() => {
                      setIsCarpet(!isCarpet);
                      setIsJwelOpen(false);
                      setIsArtOpen(false);
                    }}
                  >
                    <NavLink
                      className="nav-box-product"
                      style={isCarpet ? { color: "#d0b646" } : null}
                    >
                      Carpet{" "}
                      {!isCarpet ? (
                        <i className="bi bi-chevron-down caret-icon-sz ms-2 mt-1"></i>
                      ) : (
                        <i className="bi bi-chevron-up caret-icon-sz ms-2 mt-1"></i>
                      )}
                    </NavLink>
                  </li>
                </div>
              </ul>
              <div className="nav-box-search">
                <input
                  type="text"
                  className="nav-search"
                  value={search}
                  onChange={handleSearch}
                />
                <img
                  src={searchIcon}
                  className="nav-search-icon"
                  onClick={handleProSearch}
                />
              </div>

              <div className="nav-account">
                <div
                  className="nav-box"
                  onClick={() => {
                    setProfile(!profile);
                  }}
                >
                  <div style={{ marginTop: '27px' }}>
                    <i className="bi bi-person-circle nav-icon-item ms-5"></i><br />
                    <p className="user-name-fntsz">hi,there</p>
                  </div>
                </div>
                {profile && (
                  <div className="more-profile">
                    {(!userId && userId == undefined) ? (
                      <li
                        onClick={async () => {
                          navigate("/login");
                        }}
                      >
                        Log In / Sign Up
                      </li>
                    ) : (
                      <>
                        <li onClick={() => { navigate('/profile') }}>Profile</li>
                        <li
                          className="mt-2"
                          onClick={() => {
                            handleSignOut();
                            window.location.reload();
                          }}
                        >
                          Sign Out
                        </li>
                      </>
                    )}
                  </div>
                )}
                <div className="nav-box">
                  <i className="bi bi-suit-heart-fill nav-icon-item ms-4"></i>
                </div>
                <div className="nav-box">
                  <i className="bi bi-cart4 nav-icon-item ms-4"></i>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {isJwelOpen && cateData.length > 0 ? (
          <NavbarDropdown
            title="jewellery"
            cateData={cateData[0][0].subCategory}
            marginLeft="140px"
            handleNavMouseEnter={handleJewelEnter}
          />
        ) : null}
        {isArtOpen && cateData.length > 0 ? (
          <NavbarDropdown
            title="art"
            cateData={cateData[1][0].subCategory}
            marginLeft="170px"
            handleNavMouseEnter={handleArtEnter}

          />
        ) : null}
        {isCarpet && cateData.length > 0 ? (
          <NavbarDropdown
            title="carpet"
            cateData={cateData[2][0].subCategory}
            marginLeft="200px"
            handleNavMouseEnter={handleCraft}
          />
        ) : null}
      </div>

      <div className="nav-outer-dropdown nav-drop-shadow shadow mobile-navbarview p-2">
        <div className="d-flex justify-content-between">
          <NavLink to="/">
            <div className="nav-logo">
              <img src={logo} alt="logo" />
            </div>
          </NavLink>

          <div className="d-flex mt-2">
            {/* <div className="ms-3">
              {" "}
              <i
                className="bi bi-search nav-icon-item"
                onClick={toggleBoxVisibility}
              ></i>
            </div> */}
            <NavLink to="/wishlist">
              {" "}
              <div className="show-numbericn">
                <i className="bi bi-suit-heart-fill nav-icon-item ms-3"></i>
                <div className="number-icon-sz">{wishLength}</div>
              </div>
            </NavLink>
            <NavLink to="/addToCart">
              {" "}
              {/* <i className="bi bi-cart4 nav-icon-item ms-3"></i> */}
              <div className="show-numbericn">
                <i className="bi bi-cart4 nav-icon-item ms-3"></i>
                <div className="number-icon-sz">{cartLength}</div>
              </div>
            </NavLink>

            <NavLink
              className=""
              onClick={() => {
                setProfile(!profile);
              }}
            >
              <div style={{marginTop:'-6px'}}>
              <i className="bi bi-person-circle nav-icon-item ms-4"></i><br />
              <p className="user-name-fntsz1">hi,there</p>
              </div>
            </NavLink>
            {profile && (
              <div className="more-profile">
                {(!userId && userId == undefined) ? (
                  <li
                    onClick={async () => {
                      navigate("/login");
                    }}
                  >
                    Log In / Sign Up
                  </li>
                ) : (
                  <>
                    <li onClick={() => { navigate('/profile') }}>Profile</li>
                    <li
                      className="mt-2"
                      onClick={() => {
                        handleSignOut();
                        window.location.reload();
                      }}
                    >
                      Sign Out
                    </li>
                  </>
                )}
              </div>
            )}

            {/* <MenuBarList  /> */}
            <div className="mobile-navbarview">
              {["start"].map((placement, idx) => (
                <MobileMenuBar
                  key={idx}
                  placement={placement}
                  name={placement}
                  cateData={cateData}
                />
              ))}
            </div>
            {/* <div className='ms-3'><img src={menubar} alt="icon" className="menubar-icon-nav" /></div> */}
          </div>
        </div>
        {/* {isBoxVisible && <SearchInputContent toggleBoxVisibility={toggleBoxVisibility} />} */}
      </div>
    </>
  );
}

export default Navbar;

// function TrendingItem() {
//   return (
//     <>
//       {/* <NavLink to="/" className="sp-list-type"> */}
//       <div className="d-flex">
//         <NavLink to="/search" className="text-decoration-none">
//           <div>
//             <img src={earring} alt="product" className="dropdown-pro-img" />
//             <p className="sp-list-type mt-1">Earring</p>
//           </div>
//         </NavLink>
//         <NavLink to="/search" className="text-decoration-none">
//           <div className="ms-3">
//             <img src={earring} alt="product" className="dropdown-pro-img" />
//             <p className="sp-list-type mt-1">Earring</p>
//           </div>
//         </NavLink>
//       </div>
//       {/* </NavLink> */}
//     </>
//   );
// }

// function ArrivalItem() {
//   return (
//     <>
//       <div className="d-flex">
//         <NavLink to="/search" className="text-decoration-none">
//           {" "}
//           <div>
//             <img src={earring} alt="product" className="ar-pro-img" />
//             <p className="sp-list-type mt-2 text-center">Earring</p>
//           </div>
//         </NavLink>
//         <NavLink to="/search" className="text-decoration-none">
//           <div className="ms-3">
//             <img src={earring} alt="product" className="ar-pro-img" />
//             <p className="sp-list-type mt-2 text-center">Earring</p>
//           </div>
//         </NavLink>
//       </div>
//     </>
//   );
// }

// function SellerItem() {
//   return (
//     <>
//       <div>
//         <img src={earring} alt="product" className="sel-item-img" />
//         <p className="sp-list-type mt-2">UPTO 50% OFF</p>

//         <NavLink to="/search" className="sp-list-type">
//           View all designs <i className="bi bi-arrow-right"></i>
//         </NavLink>
//       </div>
//     </>
//   );
// }

// export const TrendingWrap = memo(TrendingItem);

// export const ArrivalWrap = memo(ArrivalItem);

// export const SellerWrap = memo(SellerItem);




function MobileMenuBar({ cateData, ...props }) {
  const [show, setMenuShow] = useState(false);

  const handleClose = () => setMenuShow(false);
  const handleShow = () => setMenuShow(true);

  async function fetchMenu() {
    try {
      const res = await axios.get(url + endPoint);
      // console.log(res.data.data)
      // setCate(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  const [search, setSearch] = useState("");
  const searchTxt = useSelector((state) => state.product.search.payload);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    // console.log(searchTxt)
    setSearch(searchTxt);
    fetchMenu();
  }, [searchTxt]);

  async function handleSearch(e) {
    e.preventDefault();
    setSearch(e.target.value);
    dispatch(addSearch(e.target.value));
    // navigate('/search')
  }
  async function handleProSearch(e) {
    e.preventDefault()
    navigate("/search");
    // toggleBoxVisibility()
  }

  return (
    <>
      <div className="ms-3" onClick={handleShow}>
        <img src={menubar} alt="icon" className="menubar-icon-nav" />
      </div>
      <Offcanvas
        show={show}
        onHide={handleClose}
        {...props}
        style={{ zIndex: "40000" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
         
          <form action="" className="d-flex mb-3 justify-content-center" onSubmit={handleProSearch}>
            <input type="text" className="srch-input-box w-100" placeholder="Search here..."  value={search}
              onChange={handleSearch}/>
            <button type="submit" className="search-offbtn" onClick={(e) =>{
              handleProSearch(e)
               handleClose()
               }}>Search</button>
          </form>
      
          {cateData.length > 0 &&
            cateData.map((cate) => {
              // console.log(cate)
              return (
                <AccordianMenuList
                  title={cate[0].type}
                  subCateDate={cate.length > 0 ? cate[0].subCategory : []}
                  handleClose={handleClose}
                />
              );
            })}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}


function AccordianMenuList({ title, subCateDate, handleClose }) {
  // console.log(subCateDate)
  return (
    <>
      <Accordion>
        <Accordion.Item eventKey="0" className="accord-item-list-box">
          <Accordion.Header className="menucate-title-fnt">
            {title}
          </Accordion.Header>
          <Accordion.Body>
            {subCateDate.map((item) => {
              // console.log(item)
              return <AccordianSubMenu title={item.name} id={item.id} handleClose={handleClose} />;
            })}

          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}

export {AccordianMenuList};

function AccordianSubMenu({ title, id, handleClose }) {
  const [subCate, setSubCate] = useState([]);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function getSubSubCate(value) {
    // console.log(value)
    try {
      const res = await axios.get(url + subSubEndPoint + value);
      // console.log(res.data.data)
      if (!res.data.data) {
        setSubCate([]);
      } else {
        setSubCate(res.data.data);
      }
    } catch (err) {
      console.log(err);
      setSubCate([]);
    }

  }
  useEffect(() => {
    getSubSubCate(id);
  }, []);

  // console.log(id)/
  return (
    <>
      <Accordion >
        <Accordion.Item eventKey="0" className="accord-item-list-box">
          <Accordion.Header className="menucate-title-fnt">
            {title}
          </Accordion.Header>
          <Accordion.Body>
            <h6 className="list-fntsz-mbvw">Shop by Category</h6>
            {subCate.length > 0 &&
              subCate.map((item, index) => {
                return (
                  <>
                    <p className="list-ptag-font" key={index} onClick={() => {
                      handleClose()
                      dispatch(addSearch(item.name));
                      navigate('/search')
                    }}>
                      {item.name}
                    </p>
                  </>
                );
              })}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}

// const SearchInputContent = () => {
//   async function fetchMenu() {
//     try {
//       const res = await axios.get(url + endPoint);
//       // console.log(res.data.data)
//       setCate(res.data.data);
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   const [search, setSearch] = useState("");
//   const searchTxt = useSelector((state) => state.product.search.payload);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   useEffect(() => {
//     // console.log(searchTxt)
//     setSearch(searchTxt);
//     fetchMenu();
//   }, [searchTxt]);

//   async function handleSearch(e) {
//     e.preventDefault();
//     setSearch(e.target.value);
//     dispatch(addSearch(e.target.value));
//     // navigate('/search')
//   }
//   async function handleProSearch(e) {
//     e.preventDefault()
//     navigate("/search");
//     toggleBoxVisibility()
//   }
//   return (
//     <>
//       <div className="srch-ipt-cntet-bx">
//         <div className="nav-box-search mt-2 mb-3">
//           <form onSubmit={handleProSearch}>
//             <input
//               type="text"
//               className="nav-search"
//               value={search}
//               onChange={handleSearch}
//             />
//             <img
//               src={searchIcon}
//               className="nav-search-icon1"
//               onClick={handleProSearch}
//             />
//             <button type="submit" style={{ display: 'none' }}></button>
//           </form>
//         </div>
       
//       </div>
//     </>
//   );
// };

const ImageWithSearch = (props) => {
  return (
    <>
      {/* <div className="d-flex mt-2">
        <img src={props.image} alt="icon" className="search-img-dtl1" />
        <p className="srch-ipt-detail-ptag mt-2">{props.detail}</p>
      </div> */}
    </>
  );
};
