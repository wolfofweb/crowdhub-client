import React from "react";
import "./navBar.scss";
import {
  BiHome,
  BiMoon,
  BiWorld,
  BiSun,
  BiSearchAlt2,
  BiShoppingBag,
} from "react-icons/bi";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { BsFillPersonFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import Search from "../search/Search";
import { useState } from "react";
import Nav from "../nav/Nav";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  const [search, setSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [mobileSearch, setMobileSearch] = useState(false);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setSearch(true);
    }
  };
  const navigate = useNavigate();

  return (
    <div className="navBar">
      <div className="left">
        <div id="mobileIcons">
          <Nav />
          <BiHome onClick={() => navigate("/")} />
          {darkMode ? <BiSun onClick={toggle} /> : <BiMoon onClick={toggle} />}
        </div>
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>CrowdHub</span>
        </Link>
        <BiHome onClick={() => navigate("/")} />
        {darkMode ? <BiSun onClick={toggle} /> : <BiMoon onClick={toggle} />}
        <BiWorld onClick={() => navigate("/news")} />
        <div className="search">
          <BiSearchAlt2 onClick={() => setMobileSearch((prev) => !prev)} />
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        {mobileSearch && (
          <div className="mobileSearch">
            <input
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="mobileClose"
              onClick={() => setMobileSearch((prev) => !prev)}
            >
              X
            </button>
          </div>
        )}
      </div>
      <div className="right">
        <BsFillPersonFill
          onClick={() => navigate(`/profile/${currentUser.id}`)}
        />
        <BiShoppingBag onClick={() => navigate("/news/marketplace")} />
        <RiLogoutBoxRLine onClick={() => navigate("/login")} />
        <div className="user">
          <img
            src={currentUser.profilePic}
            alt=""
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src =
                "https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_400,h_400/https://useqwitter.com/wp-content/uploads/2022/08/blank-twitter-icon.jpg";
            }}
            onClick={() => navigate(`/profile/${currentUser.id}`)}
          />
          <span onClick={() => navigate(`/profile/${currentUser.id}`)}>
            {currentUser.name}
          </span>
        </div>
      </div>
      {search && <Search setSearch={setSearch} info={searchValue}></Search>}
    </div>
  );
};

export default Navbar;
