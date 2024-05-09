import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HistoryChart from "../components/HistoryChart";
const SingleCryptoDetail = () => {
  const params = useParams();
  const id = params.id;

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
        const data = await res.json();

        setData({
          ...data,
          description: data?.description?.en,
          image: data?.image?.small,
        });
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  console.log(data);

  return (
    <div className="min-h-screen mt-20 mx-auto  w-[80%]">
      <div className=" flex w-[50%]  mx-auto p-3 items-center justify-evenly bg-gradient-to-r from-indigo-500 to-violet-500 rounded-lg  ">
        <h1 className="  text-white underline text-3xl">
          {id.toLocaleUpperCase()}
        </h1>
        <img className="px-4" src={data?.image} alt="image" />
      </div>

      <p
        className="text-xl my-4 [&>a]:text-blue-600 dark:[&>a]:text-red-400 "
        dangerouslySetInnerHTML={{ __html: data?.description }}
      ></p>

      <h1 className="w-[50%] mx-auto text-center p-3 items-center justify-evenly bg-gradient-to-r from-indigo-500 to-violet-500 rounded-lg  text-3xl text-white underline">
        Graph
      </h1>
      <HistoryChart id={id} currency="usd" days="30" />

      <h1 className="w-[50%] mx-auto text-center p-3 items-center justify-evenly bg-gradient-to-r from-indigo-500 to-violet-500 rounded-lg  text-3xl text-white underline">
        Market
      </h1>

      <div className="grid grid-cols-2 gap-4 m-10">
        <p className="text-xl ">
          Current Prices : <span className="font-bold text-cyan-500">${
            data?.market_data?.current_price?.usd
          }</span>
        </p>
        <p className="text-xl">
          Market Rank :{" "}
          <span className="font-bold text-cyan-500">
            {data?.market_data?.market_cap_rank}
          </span>
        </p>
        <p className="text-xl">
          Total Volume :{" "}
          <span className="font-bold text-cyan-500">
            {data?.market_data?.total_volume?.usd.toString().slice(0, -6)} M
          </span>
        </p>
        <p className="text-xl">
           Market Cap :{" "}
          <span className="font-bold text-cyan-500">
            ${data?.market_data?.market_cap?.usd.toString().slice(0, -6)} M
          </span>
        </p>
        
      </div>
    </div>
  );
};

export default SingleCryptoDetail;
