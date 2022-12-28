import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { makeRequest } from "../../axios";
import "./update.scss";

const Update = ({ setOpenUpdate, user }) => {
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [texts, setTexts] = useState({
    name: "",
    city: "",
    website: "",
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    github: "",
  });

  //MULTER FILE UPLOAD
  const upload = async (file) => {
    // console.log(file);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      console.log(res.data.file);

      return res.data.file;
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (user) => {
      return makeRequest.put("/users", user);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["user"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();

    let coverUrl;
    let profileUrl;
    coverUrl = cover ? await upload(cover) : user.coverPic;
    profileUrl = profile ? await upload(profile) : user.profilePic;

    mutation.mutate({ ...texts, coverPic: coverUrl, profilePic: profileUrl });
    setOpenUpdate(false);
    setCover(null);
    setProfile(null);
  };
  return (
    <div className="update">
      <div className="wrapper">
        <h1>Update Your Profile</h1>
        <form>
          <div className="files">
            <label htmlFor="cover">
              <span>Cover Picture</span>
              <div className="imgContainer">
                <img
                  src={cover ? URL.createObjectURL(cover) : user.coverPic}
                  alt=""
                />
              </div>
            </label>
            <input
              type="file"
              id="cover"
              style={{ display: "none" }}
              onChange={(e) => setCover(e.target.files[0])}
            />
            <label htmlFor="profile">
              <span>Profile Picture</span>
              <div className="imgContainer">
                <img
                  src={profile ? URL.createObjectURL(profile) : user.profilePic}
                  alt=""
                />
              </div>
            </label>
            <input
              type="file"
              id="profile"
              style={{ display: "none" }}
              onChange={(e) => setProfile(e.target.files[0])}
            />
          </div>
          <label>Name</label>
          <input
            type="text"
            value={texts.name}
            name="name"
            onChange={handleChange}
          />
          <label>Country / City</label>
          <input
            type="text"
            name="city"
            value={texts.city}
            onChange={handleChange}
          />
          <label>Website</label>
          <input
            type="text"
            name="website"
            value={texts.website}
            onChange={handleChange}
          />
          <label>Facebook</label>
          <input
            type="text"
            name="facebook"
            value={texts.facebook}
            onChange={handleChange}
          />
          <label>Instagram</label>
          <input
            type="text"
            name="instagram"
            value={texts.instagram}
            onChange={handleChange}
          />
          <label>Twitter</label>
          <input
            type="text"
            name="twitter"
            value={texts.twitter}
            onChange={handleChange}
          />
          <label>LinkedIn</label>
          <input
            type="text"
            name="linkedin"
            value={texts.linkedin}
            onChange={handleChange}
          />
          <label>GitHub</label>
          <input
            type="text"
            name="github"
            value={texts.github}
            onChange={handleChange}
          />
          <button onClick={handleClick}>Update</button>
        </form>
        <button className="close" onClick={() => setOpenUpdate(false)}>
          close
        </button>
      </div>
    </div>
  );
};

export default Update;
