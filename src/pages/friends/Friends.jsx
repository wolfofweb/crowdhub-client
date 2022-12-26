
import React from "react";
import { Route, Routes } from "react-router-dom";
import Follower from "../../components/follower/Follower";
import Following from "../../components/following/Following";
import Terms from "../Terms/Terms";

const Friends = () => {
  return (
    <Routes>
      <Route path="/" element={<Following />} />
      <Route path="/follower" element={<Follower />} />
      <Route path="/terms" element={<Terms />} />
    </Routes>
  );
};

export default Friends;
