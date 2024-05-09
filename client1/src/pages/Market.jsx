import React, { useEffect, useState } from "react";
import Crypto from "../components/Crypto";
import Globalstats from './../components/Globalstats';

const Market = () => {
  const [data, setData] = useState([]);
  const [stats, setStats] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
        );
        const data = await res.json();
      
        setData(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchStats = async () => {
      try {
        const res = await fetch(
          "https://coinranking1.p.rapidapi.com/stats?referenceCurrencyUuid=yhjMzLPhuIDl",
          {
            method: "GET",
            headers: {
              "X-RapidAPI-Key":
                "5afac722d5msh94706f74a27c8e8p1b42c3jsn6e122115a33b",
              "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
            },
          }
        );
        const data = await res.json();
        
        setStats(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    fetchStats();
  }, []);
  return (
    <div className="">
      <Globalstats stats={stats} />
      <Crypto data={data} title={"CryptoCurrencies"} />
    </div>
  );
};

export default Market;
