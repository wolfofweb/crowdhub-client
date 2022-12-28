import React, { useContext } from "react";
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import "./following.scss";
import { Link } from "react-router-dom";
import LoadingSpin from "react-loading-spin";

const Following = () => {
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser.id;
  const { isLoading, error, data } = useQuery(["relationships", userId], () =>
    makeRequest.get("relationships/following?userId=" + userId).then((res) => {
      console.log(data);
      return res.data;
    })
  );

  return (
    <div className="friends">
      <h2>Following</h2>
      {error ? (
        "Something went wrong!"
      ) : isLoading ? (
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
          <div className="card">
            <img
              src={item.profilePic}
              alt={item.name}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src =
                  "https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_400,h_400/https://useqwitter.com/wp-content/uploads/2022/08/blank-twitter-icon.jpg";
              }}
            />
            <div className="prof">
              <p>{item.username}</p>
              <Link
                to={`/profile/${item.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <button>View Profile</button>
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Following;
