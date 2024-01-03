import React, { useState, useRef, useEffect } from "react";
import "./home-view.css";
import Navbar from "../../components/navbar";
import { FavoritedList } from "./list";
import { Top5Table } from "./Top5Table";

const Home = () => {
  
  useEffect(() => {
    document.title = "Web3 Gaming - Home";
  });

  return (
    <div className="home-view">
      <Navbar />
      <div className="home-fixed-list c">
        <Top5Table />
      </div>
      <div className="home-favorited c">
        <FavoritedList />
      </div>
    </div>
  );
};

export default Home;
