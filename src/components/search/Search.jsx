import React, { useContext } from "react";
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";
import { Link } from "react-router-dom";
import "./search.scss";

const Search = ({ setSearch, info }) => {
  // const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["users", info], () =>
    makeRequest.get("users/news?searchId=" + info).then((res) => {
      return res.data;
    })
  );

  <input type="text" name="info" value={info} />;
  return (
    <div className="searchArea">
      {error ? (
        "Something went wrong!"
      ) : isLoading ? (
        "loading"
      ) : (
        <div className="cards">
          {data.map((profile) => (
            <div className="card">
              <img
                src={"/upload/" + profile.profilePic}
                alt={profile.name}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src =
                    "https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_400,h_400/https://useqwitter.com/wp-content/uploads/2022/08/blank-twitter-icon.jpg";
                }}
              />
              <div className="prof">
                <p>{profile.username}</p>
                <Link
                  to={`/profile/${profile.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <button
                    onClick={() => {
                      setSearch(false);
                    }}
                  >
                    View Profile
                  </button>
                </Link>
              </div>
            </div>
          ))}
          <button className="close" onClick={() => setSearch(false)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Search;
