import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";
import LoadingSpin from "react-loading-spin";

const Posts = ({ userId }) => {
  const { isLoading, error, data } = useQuery(["posts"], () =>
    makeRequest.get("/posts?userId=" + userId).then((res) => {
      return res.data;
    })
  );

  return (
    <div className="posts">
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
        data.map((post) => <Post post={post} key={post.id} />)
      )}
    </div>
  );
};

export default Posts;
