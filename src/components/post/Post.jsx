import React, { useContext, useState } from "react";
import "./post.scss";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { MdOutlineTextsms } from "react-icons/md";
import { FiMoreHorizontal } from "react-icons/fi";
import { Link } from "react-router-dom";
import moment from "moment";
import Comments from "../comments/Comments";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["likes", post.id], () =>
    makeRequest.get("/likes?postId=" + post.id).then((res) => {
      return res.data;
    })
  );
  /////
  const {
    isLoading: cIsLoading,
    error: cError,
    data: cData,
  } = useQuery(["comments", post.id], () =>
    makeRequest.get("/comments/count?postId=" + post.id).then((res) => {
      return res.data;
    })
  );

  //////

  const queryClient = useQueryClient();

  const mutation = useMutation(
    //POSTING THE NEW POST
    (liked) => {
      if (liked) return makeRequest.delete("/likes?postId=" + post.id);
      else return makeRequest.post("/likes", { postId: post.id });
    },
    {
      //IF like is pressed REFETCH THE likes USING QUERYCLIENT FROM REACT-QUERY
      onSuccess: () => {
        //Invalidate and refetch
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );

  const deleteMutation = useMutation(
    //deleting THE POST
    (postId) => {
      return makeRequest.delete("/posts/" + postId);
    },
    {
      //IF delete is pressed REFETCH THE posts USING QUERYCLIENT FROM REACT-QUERY
      onSuccess: () => {
        //Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleLike = () => {
    mutation.mutate(data.includes(currentUser.id));
  };

  const handleDelete = () => {
    deleteMutation.mutate(post.id);
  };
  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img
              src={"/upload/" + post.profilePic}
              alt=""
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src =
                  "https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_400,h_400/https://useqwitter.com/wp-content/uploads/2022/08/blank-twitter-icon.jpg";
              }}
            />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <FiMoreHorizontal onClick={() => setMenuOpen(!menuOpen)} />
          {menuOpen && post.userId === currentUser.id && (
            <button onClick={handleDelete}>Delete</button>
          )}
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={"./upload/" + post.img} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {isLoading ? (
              "loading"
            ) : data.includes(currentUser.id) ? (
              <AiFillHeart style={{ color: "#c92730" }} onClick={handleLike} />
            ) : (
              <AiOutlineHeart onClick={handleLike} />
            )}
            {data?.length} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <MdOutlineTextsms />
            {cData?.length} Comments
          </div>
        </div>
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
};

export default Post;
