import React, { useContext } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import LoadingSpin from "react-loading-spin";
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
          {isLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <LoadingSpin
                duration="2s"
                width="5px"
                timingFunction="ease-in-out"
                direction="alternate"
                size="2rem"
                primaryColor="#5271ff"
                secondaryColor="transparent"
                numberOfRotationsInAnimation={2}
              />
            </div>
          ) : (
            data.map((item) => (
              <div className="user" key={item.id}>
                <div className="userInfo">
                  {/* {console.log(item)} */}
                  <img
                    src={item.profilePic}
                    alt=""
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src =
                        "https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_400,h_400/https://useqwitter.com/wp-content/uploads/2022/08/blank-twitter-icon.jpg";
                    }}
                  />
                  <span>{item.name || item.username}</span>
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
            ))
          )}
        </div>
      </div>
    </div>
  );
};
export default RightBar;
