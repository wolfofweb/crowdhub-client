import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "../trending/trending.scss";
import axios from "axios"


const Sports = () => {
  let [news, setNews] = useState([]);
  useEffect(() => {
    getData();
  }, []);
//   let getData = async () => {
//     let res = await fetch('https://api.currentsapi.services/v1/search?' +
//             'keywords=sports&language=en&' + 
//             'apiKey=sRm4uU7AOS5nIyJilHwoxsoKCkbbDRsfRMI2KZWLwqbjAVK0');
//     let data = await res.json();
//     console.log(data);
//     setNews(data.news);
//   };
//     let getData=async()=>{
//   const proxyUrl = "https://crowdhub.netlify.app/"
// const qInTitle = "sports";
// const apiKey = "sRm4uU7AOS5nIyJilHwoxsoKCkbbDRsfRMI2KZWLwqbjAVK0";
// const url = `${proxyUrl}https://api.currentsapi.services/v1/search?keywords=${qInTitle}&language=en&apiKey=${apiKey}`;
// const request = new Request(url);
// fetch(request)
//   .then(response =>{
//         console.log(response);
//         response.json()})
//   .then((data) => {
//     console.log(data);
//    setNews(data.news);
//   })
//   .catch(error => {
//     console.log(error);
//   });
    }
    let getData=()=>{
    return axios('https://api.currentsapi.services/v1/search?' +
            'keywords=sports&language=en&' + 
            'apiKey=sRm4uU7AOS5nIyJilHwoxsoKCkbbDRsfRMI2KZWLwqbjAVK0', {
      method: 'GET',
       headers: {
        'Access-Control-Allow-Origin': 'https://crowdhub.netlify.app',
        'Content-Type': 'application/json',
      },
      mode: 'no-cors',
      withCredentials: true,
      credentials: 'same-origin',
    }).then(response => {
      let data= response.json();
      console.log(data)
      setNews(data.news);
    })
    }
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
