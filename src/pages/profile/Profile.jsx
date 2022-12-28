import "./profile.scss";
import {
  RiFacebookLine,
  RiLinkedinLine,
  RiInstagramLine,
  RiTwitterLine,
  RiGithubLine,
} from "react-icons/ri";
import { GoLocation } from "react-icons/go";
import { FiGlobe, FiMoreVertical } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import Posts from "../../components/posts/Posts";
import { makeRequest } from "../../axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update";
import LoadingSpin from "react-loading-spin";

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const userId = parseInt(useLocation().pathname.split("/")[2]);
  console.log(userId);
  console.log(useLocation().pathname);

  const { isLoading, error, data } = useQuery(["user"], () =>
    makeRequest.get("/users/find/" + userId).then((res) => {
      return res.data;
    })
  );

  console.log(data);

  const { isLoading: rIsLoading, data: relationshipData } = useQuery(
    ["relationship"],
    () =>
      makeRequest.get("/relationships?followedUserId=" + userId).then((res) => {
        return res.data;
      })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (following) => {
      if (following)
        return makeRequest.delete("/relationships?userId=" + userId);
      return makeRequest.post("/relationships", { userId });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["relationship"]);
      },
    }
  );

  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(currentUser.id));
  };

  return (
    <div className="profile">
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
        <>
          <div className="images">
            <img
              src={data.coverPic}
              alt=""
              className="cover"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src =
                  "https://img.freepik.com/free-photo/group-kids-friends-arm-around-sitting-together_1150-3905.jpg?w=2000";
              }}
            />
            <img
              src={data.profilePic}
              alt=""
              className="profilePic"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src =
                  "https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_400,h_400/https://useqwitter.com/wp-content/uploads/2022/08/blank-twitter-icon.jpg";
              }}
            />
          </div>
          <div className="profileContainer">
            <div className="uInfo">
              <div className="left">
                <a href={data.facebook}>
                  <RiFacebookLine fontSize="1.5rem" />
                </a>
                <a href={data.instagram}>
                  <RiInstagramLine fontSize="1.5rem" />
                </a>
                <a href={data.twitter}>
                  <RiTwitterLine fontSize="1.5rem" />
                </a>
                <a href={data.linkedin}>
                  <RiLinkedinLine fontSize="1.5rem" />
                </a>
                <a href={data.github}>
                  <RiGithubLine fontSize="1.5rem" />
                </a>
              </div>
              <div className="center">
                <span>{data.name}</span>
                <div className="info">
                  <div className="item">
                    <GoLocation fontSize="1.2rem" />
                    <span>{data.city}</span>
                  </div>
                  <div className="item">
                    <FiGlobe fontSize="1.2rem" />
                    <span>{data.website}</span>
                  </div>
                </div>
                {rIsLoading ? (
                  "Loading"
                ) : userId === currentUser.id ? (
                  <button onClick={() => setOpenUpdate(true)}>Update</button>
                ) : (
                  <button onClick={handleFollow}>
                    {relationshipData.includes(currentUser.id)
                      ? "Following"
                      : "Follow"}
                  </button>
                )}
              </div>
              <div className="right">
                <HiOutlineMail fontSize="1.2rem" />
                <FiMoreVertical fontSize="1.2rem" />
              </div>
            </div>
            <Posts userId={userId} />
          </div>
        </>
      )}
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </div>
  );
};

export default Profile;
