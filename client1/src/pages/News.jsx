import React, { useEffect, useState } from "react";
import Cards from "../components/Cards.jsx";

const News = () => {
  const [news, setNews] = useState([]);
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(
          "https://min-api.cryptocompare.com/data/v2/news/?lang=EN",
          {
            method: "GET",
            headers: {
              "authorization":"Apikey a3da5bedc177a25b4048edcddac05f07f5d014aa06b399f5c5a9a52f5c369dcd"
                
            },
          }
        );
        const data = await res.json();
        setNews(data.Data);
      } catch (error) {
       console.log(error);
      }
    };
    fetchNews();
  }, []);

  

  return (
    <div className="mx-auto my-5 max-w-7xl">
      <Cards key={news.id} news={news} title="Crypto News"/>
    </div>
  );
};

export default News;
