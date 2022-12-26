import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "../trending/trending.scss";

const Shopping = () => {
  let [news, setNews] = useState([]);
  useEffect(() => {
    getData();
  }, []);
let getData = async () => {
    let res = await fetch('https://api.currentsapi.services/v1/search?' +
            'keywords=shopping&language=en&' + 
            'apiKey=sRm4uU7AOS5nIyJilHwoxsoKCkbbDRsfRMI2KZWLwqbjAVK0');
    let data = await res.json();
    console.log(data);
    setNews(data.news);
  };
  return (
    <div className="news">
      <h2>Marketplace</h2>
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
export default Shopping;
