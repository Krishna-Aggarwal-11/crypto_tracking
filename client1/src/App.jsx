import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import News from "./pages/News";
import ContactUs from "./pages/ContactUs";
import Market from "./pages/Market";
import SingleCryptoDetail from "./pages/SingleCryptoDetail.jsx";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/news" element={<News />}></Route>
        <Route path="/crypto/:id" element={<SingleCryptoDetail />}></Route>
        <Route path="/market" element={<Market />}></Route>
        <Route path="/contact" element={<ContactUs />}></Route>
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
