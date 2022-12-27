import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "../trending/trending.scss";
import LoadingSpin from "react-loading-spin";

const Shopping = () => {
  let [news, setNews] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);
  let getData = async () => {
    let res = await fetch(
      "https://api.currentsapi.services/v1/search?" +
        "keywords=shopping&language=en&" +
        "apiKey=sRm4uU7AOS5nIyJilHwoxsoKCkbbDRsfRMI2KZWLwqbjAVK0"
    );
    let data = await res.json();
    console.log(data);
    setNews(data.news);
    setLoading(false);
  };
  return (
    <div className="news">
      <h2>Marketplace</h2>
      {loading && (
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
      )}
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
