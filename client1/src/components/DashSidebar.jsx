import { Sidebar } from "flowbite-react";
import {  HiArrowSmRight,  HiOutlineUserGroup, HiUser } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/user/userSlice.js";
const DashSidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [tab, setTab] = useState("");
  const currentUser = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost/crypto/server/logout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.errorMessage);
      } else {
        dispatch(logout(data));
      }
    } catch (error) {}
  };
  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
      
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={ "User"}
              labelColor="dark"
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>

          {currentUser && (
            <Link to="/dashboard?tab=users">
            <Sidebar.Item
              active={tab === "users"}
              icon={HiOutlineUserGroup}
              as="div"
            >
              Users
            </Sidebar.Item>
          </Link>
          )}
          

          <Sidebar.Item
            icon={HiArrowSmRight}
            className="cursor-pointer"
            onClick={handleLogout}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
