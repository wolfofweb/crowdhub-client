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
//     let res = await fetch(
//       `https://newsapi.org/v2/everything?q=sports&sortBy=popularity?country=in&apiKey=a54a083a384e4e2fa8a09733da5a3c38`
//     );
//     let data = await res.json();
//     console.log(data);
//     setNews(data.articles);
//   };
//    let getData=()=>{
//     return axios( `https://newsapi.org/v2/everything?q=sports&sortBy=popularity?country=in&apiKey=a54a083a384e4e2fa8a09733da5a3c38`, {
//       method: 'GET',
//       mode: 'no-cors',
//       headers: {
//         'Access-Control-Allow-Origin': 'https://crowdhub.netlify.app',
//         'Content-Type': 'application/json',
//       },
//       withCredentials: 'omit',
//       credentials: 'same-origin',
//     }).then(response => {
//       let data= response.json();
//       console.log(data)
//       setNews(data.articles);
//     })

//   }
  let getData=()=>{
//   const proxyUrl = "https://crowdhub.netlify.app/"
// const qInTitle = "sports";
// const apiKey = "a54a083a384e4e2fa8a09733da5a3c38";
// const url = `${proxyUrl}https://newsapi.org/v2/everything?qInTitle=${qInTitle}&sortBy=popularity?country=in&apiKey=${apiKey}`;
// const request = new Request(url);

// // fetch(request)
// //   .then(response => response.json())
// //   .then((data) => {
// //     console.log(data);
// //    setNews(data.articles);
// //   })
// //   .catch(error => {
// //     console.log(error);
// //   });
//      let res = await fetch(request);
//     let data = await res.json();
//     console.log(data);
//     setNews(data.articles);
     var url = 'https://api.currentsapi.services/v1/search?' +
            'keywords=sports&language=en&' + 
            'apiKey=sRm4uU7AOS5nIyJilHwoxsoKCkbbDRsfRMI2KZWLwqbjAVK0';
    var req = new Request(url);
    fetch(req).then(response => {
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
