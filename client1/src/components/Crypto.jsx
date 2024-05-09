import React from "react";
import { Link } from "react-router-dom";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Crypto = ({key, data, title }) => {
  return (
    <div className="w-[80%] mx-auto my-8">
      <h1 className="text-3xl underline mb-4 text-cyan-500">{title} : </h1>
      <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-4 ">
        {data.map((crypto) => {
          return (
            <Link to={`/crypto/${crypto.id}`}>
              <div
                key={crypto.id}
                className="flex justify-between flex-col border rounded-lg "
              >
                <div className="border-b flex items-center justify-between py-4 px-8">
                  <h1 className="text-xl font-bold">{crypto.name}</h1>
                  <img className="w-8 h-8" src={crypto.image} alt="" />
                </div>
                <div className="py-4 px-8">
                  <p
                    className={`text-sm font-semibold py-1  ${
                      crypto.price_change_percentage_24h < 0
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    Price Change 24h : {crypto.price_change_percentage_24h.toFixed(2)} %
                  </p>
                  <p className="text-sm font-semibold py-1">
                    Price :$ {numberWithCommas(crypto.current_price)}
                  </p>
                  <p className="text-sm font-semibold py-1">
                    Market Cap : $ {numberWithCommas(crypto.market_cap.toString().slice(0,-6))} M
                  </p>
                  <p className="text-sm font-semibold py-1">
                    Market Rank : {crypto.market_cap_rank}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Crypto;
