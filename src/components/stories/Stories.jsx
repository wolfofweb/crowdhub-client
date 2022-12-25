import React, { useContext } from "react";
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
//For Carousel slider
import { Splide, SplideSlide } from "@splidejs/react-splide";
// Default theme
import "@splidejs/react-splide/css";
// or other themes
import "@splidejs/react-splide/css/skyblue";
import "@splidejs/react-splide/css/sea-green";
// or only core styles
import "@splidejs/react-splide/css/core";
import { useNavigate } from "react-router-dom";
import "./stories.scss";

const Stories = () => {
  // const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  let discover = "";
  const { isLoading, error, data } = useQuery(["users", discover], () =>
    makeRequest.get("users/search?searchId=" + discover).then((res) => {
      return res.data;
    })
  );
  // console.log(data);
  return (
    <div className="storyMain">
      <h2>Lets Discover the crowd</h2>
      <Splide
        className="stories"
        options={{
          perPage: 4,
          arrows: false,
          pagination: false,
          drag: "free",
          gap: "1.5rem",
        }}
      >
        {isLoading
          ? "Loading"
          : data.map((story) => (
              <SplideSlide
                className="story"
                key={story.id}
                onClick={() => navigate(`profile/${story.id}`)}
              >
                <img
                  src={"/upload/" + story.profilePic}
                  alt=""
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src =
                      "https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_400,h_400/https://useqwitter.com/wp-content/uploads/2022/08/blank-twitter-icon.jpg";
                  }}
                />
                <span>{story.name}</span>
              </SplideSlide>
            ))}
      </Splide>
    </div>
  );
};

export default Stories;
