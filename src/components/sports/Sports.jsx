import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "../trending/trending.scss";

const Sports = () => {
  let [news, setNews] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  let getData = async () => {
    let res = await fetch(
      `https://newsapi.org/v2/everything?q=sports&sortBy=popularity?country=in&apiKey=a54a083a384e4e2fa8a09733da5a3c38`
    );
    let data = await res.json();
    console.log(data);
    setNews(data.articles);
  };
  return (
    <div className="news">
      <h2>All about Sports</h2>
      {news.map((article) => (
        <div className="post" key={article.url}>
          <div className="container">
            <div className="details">
              <span className="name">Source: {article.source.name}</span>
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
              <img src={article.urlToImage} alt="" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Sports;
