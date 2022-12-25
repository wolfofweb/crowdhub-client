import React from "react";
import { Route, Routes } from "react-router-dom";
import "./news.scss";
import Tech from "../../components/tech/Tech";
import Trending from "../../components/trending/Trending";
import Sports from "../../components/sports/Sports";
import Politics from "../../components/politics/Politics";
import Cinema from "../../components/cinema/Cinema";
import Gaming from "../../components/Gaming/Gaming";
import Shopping from "../../components/shopping/Shopping";

const News = () => {
  // let location = useLocation();
  return (
    <Routes>
      <Route path="/" element={<Trending />} />
      {/* <Route path=" element={<Trending />} /> */}
      <Route path="/tech" element={<Tech />} />
      <Route path="/sports" element={<Sports />} />
      <Route path="/politics" element={<Politics />} />
      <Route path="/cinema" element={<Cinema />} />
      <Route path="/gaming" element={<Gaming />} />
      <Route path="/marketplace" element={<Shopping />} />
    </Routes>
  );
};

export default News;
