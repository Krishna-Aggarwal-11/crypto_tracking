import React from 'react'
import Img  from "../assets/banner/b4.jpg"
const Cards = ({news , title }) => {
  return (
    <div>
        <h1 className="my-5 text-3xl font-bold text-center text-teal-500 underline">
        {title}
      </h1>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 rounded-md  gap-4">
        {news.map((item) => {
          return (
            <div
              key={item.id }
              className=" bg-slate-100 rounded-md dark:bg-black"
            >
              <img
                src={item.imageurl}
                className="rounded-md container rounded-b-none"
                alt="news-thumbnail"
              />
              <div className="p-4">
                <h2 className="font-semibold text-black  dark:text-white underline truncate">{item.title}</h2>
                <p className="text-sm mt-4 text-cyan-600  ">
                  {item.body.substr(0,100) }{" "}
                </p>
                <a href={item.guid} target="_blank" rel="noreferrer">
                  <button className="bg-blue-500  mt-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Read More
                  </button>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default Cards