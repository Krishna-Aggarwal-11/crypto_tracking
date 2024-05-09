import React, { useEffect, useState } from "react";
import Crypto from "../components/Crypto";
import Cards from "./../components/Cards";
import NewsLetter from "../components/NewsLetter";
import Banner from "../assets/banner/b6.jpg";
import { Link } from "react-router-dom";
import { Button } from 'flowbite-react';
const Home = () => {
  const [data, setData] = useState([]);
  const [news, setNews] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          ` https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
        );
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.log(error.message);
      }
    };
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
        setNews(data.Data.slice(0,4));
        
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
    fetchNews();
  }, []);


  

  

  return (
    <div>
      <div className="py-20 md:py-28">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap xl:items-center -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-16 md:mb-0">
              <span className="inline-block py-px px-2 mb-4 text-xs leading-5 text-white bg-green-500 uppercase rounded-9xl">
                PROJECT CRYPTO TRACKER
              </span>
              <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl leading-tight font-bold tracking-tight">
                Track Your Crypto Currencies in One Place
              </h1>
              <p className="mb-8 text-lg md:text-xl text-gray-500 font-medium">
                Your CoinVortex is a centralized platform that navigate the market with real-time data,
                intelligent analysis, and future-focused insights.
              </p>
              <div className="flex flex-wrap">
                <div className="w-full md:w-auto py-1 md:py-0">
                  <Link
                    className="inline-block py-5 px-7 w-full text-base md:text-lg leading-4 text-coolGray-800 font-medium text-center bg-green-500 hover:bg-coolGray-100 focus:ring-2 focus:ring-coolGray-200 focus:ring-opacity-50 border border-coolGray-200 rounded-md shadow-sm"
                    to="/sign-up"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-4">
              <div className="relative mx-auto md:mr-0 max-w-max">
                <img
                  className="relative rounded-7xl h-[600px]"
                  src={Banner}
                  alt="landing"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <Crypto key={data.id} data={data} title="Trending Cryptocurrencies" />
        
        <Button className='mt-5 max-w-xs ml-auto mr-auto' gradientDuoTone="purpleToBlue" outline  >{
              <Link to={"/market"}> See More </Link>
            }
            </Button>
        <NewsLetter />
        <div className="mx-auto my-5 max-w-7xl">
          <Cards news={news} key={news.id} title="Latest Crypto News" />
          <Button className='mt-5 max-w-xs ml-auto mr-auto' gradientDuoTone="purpleToBlue" outline  >{
              <Link to={"/news"}> See More </Link>
            }
            </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
