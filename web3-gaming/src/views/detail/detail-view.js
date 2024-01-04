import React, { useState, useRef, useEffect } from "react";
import "./detail-view.css";
import Navbar from "../../components/navbar";

const axios = require('axios');
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
const SAVE_DETAILVIEW_LOCALSTORAGE = process.env.REACT_APP_SAVE_DETAILVIEW_LOCALSTORAGE
const id = new URLSearchParams(window.location.search).get("id")



const FavoriteButton = () => {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleClick = () => {
    setIsFavorited(!isFavorited);
    updateLocalStorage(id, !isFavorited);
  };

  const updateLocalStorage = (id, favorited) => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (favorited) {
      favorites.push(id);
    } else {
      const index = favorites.indexOf(id);
      if (index > -1) {
        favorites.splice(index, 1);
      }
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorited(favorites.includes(id));
  }, [id]);

  return (
    <button className="detailed-favorite" onClick={handleClick}>
      {isFavorited ? "Unfavorite" : "Favorite"}
    </button>
  );
}


const ConstructDetail = ({data}) => (
  <div className="detailed">
      <Navbar />
      <div className="detailed-header-name">
        {data.data.name} 
        <img src={data.metadata.logo}/>
         [{data.data.symbol}]
      </div>
      <div>
        <p className="al-l">
          Current price: {(data.data.quote.USD.price).toFixed(2)}$
          <br/>
          <FavoriteButton />
        </p>
        <br/>
        <p className="al-l">
          Url: <a href={data.metadata.urls.website.slice(0,1)}>{data.metadata.urls.website.slice(0,1)}</a>
        </p>
        <p className="al-r">
          Description:
        </p>
        <div className="detailed-description">
          {data.metadata.description}
        </div>
        <br/>
        {data.metadata.notice && 
        <p className="al-l detailed-description">
          Notice: {data.metadata.notice}
        </p>}
        
      </div>
    </div>
)


const Detail = () => {
  const [data, setData] = useState(null); // {metadata, data}, metadata from info, data from quotes, check API for values
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    document.title = "Web3 Gaming - Detail";
    
    const fetchData = async () => {
      try {
        const response = await axios.get(BACKEND_URL + "/cmc/getByID/" + id);
        console.log("Obtained data from the server with success.");
        console.log(response);
        setData(response.data);
    } catch (error) {
        console.log("Error fetching data from the server.");
        console.log(error);
        if (error.response) {
            if (error.response.status === 0){setError("Error connecting to backend server, check console for more.");
                console.log("Error connecting to backend server, maybe the .env file is not configured correctly or server is down?");
            }else{
                if (error.response.data){setError("Error response from backend: " + error.response.data.message);}
                else{ setError("Error response from backend: " + error.code);}}
        }else{setError("Error fetching data, check console. " + error.code);}
    }finally {setLoading(false);}
    };
    
    /*
    const item = localStorage.getItem(id);
    if (item) {
      setData(JSON.parse(localStorage.getItem(id)));
      console.log("Obtained data from local storage with success.");
      setLoading(false);
    } else {
      fetchData();
    }*/

    fetchData();

  }, []);

  useEffect(() => {
    if (SAVE_DETAILVIEW_LOCALSTORAGE === "true"){
      localStorage.setItem(id, JSON.stringify(data));
    }
  }, [data]);

  return (
    <div className=''>
            {loading && <p>loading...</p>}
            {error && <p>{error}</p>}
            {data && <ConstructDetail data={data}/>}
    </div>
  );
};

export default Detail;
