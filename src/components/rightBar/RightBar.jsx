import React, { useContext } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import "./rightBar.scss";

const RightBar = () => {
  const navigate = useNavigate();

  let discover = "";
  const { isLoading, error, data } = useQuery(["users", discover], () =>
    makeRequest.get("users/search?searchId=" + discover).then((res) => {
      return res.data;
    })
  );

  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Get into the Crowd</span>
          {isLoading
            ? "Loading"
            : data.map((item) => (
                <div className="user">
                  <div className="userInfo">
                    <img
                      src={"/upload/" + item.profilePic}
                      alt=""
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src =
                          "https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_400,h_400/https://useqwitter.com/wp-content/uploads/2022/08/blank-twitter-icon.jpg";
                      }}
                    />
                    <span>{item.name}</span>
                  </div>
                  <div className="buttons">
                    <button
                      onClick={() => {
                        navigate(`/profile/${item.id}`);
                      }}
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
        </div>
        <div className="item">
          <span>Latest Activities</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/14559395/pexels-photo-14559395.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                alt=""
              />
              <p>
                <span>Surya D</span> changed their cover picture
              </p>
            </div>
            <span>1 minute ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/14559395/pexels-photo-14559395.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                alt=""
              />
              <p>
                <span>Surya D</span> changed their cover picture
              </p>
            </div>
            <span>1 minute ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/14559395/pexels-photo-14559395.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                alt=""
              />
              <p>
                <span>Surya D</span> changed their cover picture
              </p>
            </div>
            <span>1 minute ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/14559395/pexels-photo-14559395.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                alt=""
              />
              <p>
                <span>Surya D</span> changed their cover picture
              </p>
            </div>
            <span>1 minute ago</span>
          </div>
        </div>
        <div className="item">
          <span>Online Crowd</span>

          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/14559395/pexels-photo-14559395.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                alt=""
              />
              <div className="online" />
              <span>Surya D</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RightBar;
