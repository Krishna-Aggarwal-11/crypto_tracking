import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";
import { Dropdown, Avatar, Button, Navbar } from "flowbite-react";
import { ThemeContext } from "../contextApi/theme.jsx";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/user/userSlice.js";

const Header = () => {
  const path = useLocation().pathname;
  const { currentUser :user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { theme, setTheme } = useContext(ThemeContext);

  const handleLogout = async() => {
    try {
      const res = await fetch('http://localhost/crypto/server/logout',{
        method:'POST',
      });
      const data = await res.json();;
      if (!res.ok) {
        console.log(data.errorMessage)
      }else{
        dispatch(logout(data));
      }
    } catch (error) {
      
    }
  }



  return (
    <Navbar className="border-b-2">
      <Link
        to={"/"}
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-lg ">
        CoinVortex
        </span>
      </Link>

      <div className="flex gap-2 md:order-2">
        <Button
          className="w-12 h-10  sm:inline"
          color="gray"
          pill
          onClick={() => {
            setTheme(theme === "dark" ? "light" : "dark");
          }}
        >
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </Button>

        {user ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="user" img={""} rounded />}
          >
            <Dropdown.Header>
              <span className="block text-sm">{user.data.username}</span>
              <span className="block text-sm font-medium truncate">{user.data.email}</span>
            </Dropdown.Header>
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout} >Log out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to={"/sign-in"}>
            <Button className="w-26 h-10" color="gray" pill>
              Sign in
            </Button>
          </Link>
        )}

        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to={"/"}>Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/market"} as={"div"}>
          <Link to={"/market"}>Market</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/news"} as={"div"}>
          <Link to={"/news"}>News</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/contact"} as={"div"}>
          <Link to={"/contact"}>Contact Us</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
