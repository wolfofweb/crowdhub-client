import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "../trending/trending.scss";
import axios from "axios"
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";


const Sports = () => {
  let [news, setNews] = useState([]);


  return (
    <div className="news">
      <h2>All about Sports</h2>
      {news.map((article) => (
        <div className="post" key={article.url}>
          <div className="container">
            <div className="details">
              <span className="name">
                Author: {article.author ? article.author : "Unknown Author"}
              </span>
            </div>

            <div className="content">
              <p>{article.title}</p>
              <p>{article.description}</p>
              <a target="_blank" rel="noreferrer" href={article.url}>
                See more
              </a>
              <img src={article.image} alt="" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Sports;
