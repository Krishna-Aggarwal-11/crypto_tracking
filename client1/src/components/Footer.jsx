import { Footer } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTwitch, BsTwitterX } from "react-icons/bs";

const Footers = () => {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5 flex flex-col w-[50%] ">
            <Link
              to={"/"}
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
            >
              
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-lg ">
                Disclaimer
              </span>
            </Link>
              <p className="mt-5">The information provided is for general purposes only and not financial advice. Cryptocurrency markets are highly volatile. Always conduct your own research and consult with a qualified financial advisor before making any investment decisions.</p>
          </div>
          <div className="grid grid-cols-3 gap-8 mt-4 sm:grid-cols-4 sm:gap-6">
            <div>
              <Footer.Title title="Links" />
              <Footer.LinkGroup col>
                <Footer.Link href="/" >
                  Home
                </Footer.Link>
                <Footer.Link href="/market" >
                  Market
                </Footer.Link>
                <Footer.Link href="/news">
                  News
                </Footer.Link>
                <Footer.Link href="/contact">
                  Contact Us
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link href="#" target="_blank">
                  Facebook
                </Footer.Link>
                <Footer.Link href="#" target="_blank">
                  Twitter
                </Footer.Link>
                <Footer.Link href="#" target="_blank">
                  GitHub
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#" target="_blank">
                  Privacy
                </Footer.Link>
                <Footer.Link href="#" target="_blank">
                  Terms
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className=" w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="CoinVortex"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitch} />
            <Footer.Icon href="#" icon={BsTwitterX} />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default Footers;
