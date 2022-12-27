import React from "react";
// import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import Followers from "../../assets/14.png";
import "../leftBar/leftBar.scss";
import Friends from "../../assets/1.png";
import Groups from "../../assets/2.png";
import Market from "../../assets/3.png";
import Watch from "../../assets/4.png";
import Memories from "../../assets/5.png";
import Door from "../../assets/15.png";
import Events from "../../assets/6.png";
import Gaming from "../../assets/7.png";
import Sports from "../../assets/8.png";
import Videos from "../../assets/9.png";
import Tutorials from "../../assets/11.png";
import Courses from "../../assets/12.png";
import Tech from "../../assets/tech.png";

import Fund from "../../assets/13.png";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  return (
    <Menu>
      <div className="leftBar">
        <div className="container">
          <div className="menu">
            <div className="user">
              <img
                src={"/upload/" + currentUser.profilePic}
                alt=""
                onClick={() => navigate(`/profile/${currentUser.id}`)}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src =
                    "https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_400,h_400/https://useqwitter.com/wp-content/uploads/2022/08/blank-twitter-icon.jpg";
                }}
              />
              <span onClick={() => navigate(`/profile/${currentUser.id}`)}>
                {currentUser.name}
              </span>
            </div>
            <div className="item" onClick={() => navigate("/friends")}>
              <img src={Followers} alt="" />
              <span>Following</span>
            </div>
            <div className="item" onClick={() => navigate("/friends/follower")}>
              <img src={Friends} alt="" />
              <span>Followers</span>
            </div>

            <div className="item" onClick={() => navigate("/news/marketplace")}>
              <img src={Market} alt="" />
              <span>Marketplace</span>
            </div>
          </div>
          <hr />
          <div className="menu">
            <span>Current Affairs</span>
            <div className="item" onClick={() => navigate("/news")}>
              <img src={Events} alt="" />
              <span>Trending</span>
            </div>
            <div className="item" onClick={() => navigate("/news/tech")}>
              <img src={Tech} alt="" />
              <span>Tech</span>
            </div>
            <div className="item" onClick={() => navigate("/news/gaming")}>
              <img src={Gaming} alt="" />
              <span>Gaming</span>
            </div>
            <div className="item" onClick={() => navigate("/news/sports")}>
              <img src={Sports} alt="" />
              <span>Sports</span>
            </div>
            <div className="item" onClick={() => navigate("/news/cinema")}>
              <img src={Videos} alt="" />
              <span>Movies</span>
            </div>
            <div className="item" onClick={() => navigate("/news/politics")}>
              <img src={Groups} alt="" />
              <span>Politics</span>
            </div>
          </div>
          <hr />
          <div className="menu">
            <span>Controls</span>
            <div className="item" onClick={() => navigate("/login")}>
              <img src={Door} alt="" />
              <span>Log out</span>
            </div>
          </div>
          <hr />
          <div className="menu">
            <span>Creator Panel</span>
            <div className="item">
              <img src={Fund} alt="" />
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.github.com/wolfofweb"
              >
                Repositories
              </a>
            </div>
            <div className="item">
              <img src={Tutorials} alt="" />
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.suryad.epizy.com"
              >
                Portfolio
              </a>
            </div>
            <div
              className="item"
              id="bottom"
              onClick={() => navigate("/friends/terms")}
            >
              <img src={Courses} alt="" />
              <span>Terms & Conditions</span>
            </div>
          </div>
        </div>
      </div>
    </Menu>
  );
}

export default Nav;
