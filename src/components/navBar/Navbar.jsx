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
    if (event.keyCode === 13 || event.keyCode === 10) {
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
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"></path>
            </svg>
            {/* onClick={() => setSearch(true)}/> */}
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
