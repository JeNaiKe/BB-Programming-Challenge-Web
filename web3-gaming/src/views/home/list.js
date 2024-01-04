import React, { useState, useEffect } from "react";
import { FixedSizeList} from "react-window";

import "./list.css";

const axios = require('axios');
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

// Todo Gather info from local storage with the index

// TODO: make itemSize dynamic by using local Storage ammount of favorited items
export const FavoritedList = () => {

  const [error, setError]       = useState(null);
  const [loading, setLoading]   = useState(true);
  const [favList, setFavList]   = useState(localStorage.getItem("favorites")?.split(",").map(a => (a.replace(/\[|\]|"/g, ''))).map(Number) || []);
  const [favCount, setFavCount] = useState(favList.length || 0);
  const [favData, setFavData]   = useState([]);

  useEffect(() => {
    setFavCount(favList.length);
  }, [favList]);

  useEffect(() => {
    if(favCount > 0){
        const fetchData = async () => {
          try {
              const response = await axios.get(BACKEND_URL + "/cmc/getByIDs/" + favList.join(","));
              console.log("Obtained fav list data from the server with success.");
              console.log(response);
              setFavData(response.data);
          } catch (error) {
              console.log("Error fetching data from the server.\n" + error);
              if (error.response) {
                  if (error.response.status === 0){setError("Error connecting to backend server, check console for more.");
                      console.log("Error connecting to backend server, maybe the .env file is not configured correctly or server is down?");
                  }else{if (error.response.data){setError("Error response from backend: " + error.response.data.message);}
                      else{ setError("Error response from backend: " + error.code);}}
              }else{setError("Error fetching data, check console. " + error.code);}
          } finally {setLoading(false);}
      };
      fetchData();
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (favData) {
      console.log("favData set");
    }
  }, [favData]);

   // TODO This fixed list is very buggy, needs more work, due to backend getByIDs 
  const Row = ({ index, style }) => {
    if (!favData) return;
    const i   = favList[index]
    let name, src, symbol, price;
    try{
      name    = favData?.metadata[i]?.name || favData?.metadata.name;
      src     = favData?.metadata[i]?.logo || favData?.metadata.logo;
      symbol  = favData?.metadata[i]?.symbol || favData?.metadata.symbol;
      price   = favData?.data[i]?.quote.USD.price.toFixed(2) || favData?.data.quote.USD.price.toFixed(2);
    } catch (error){
      name    = "No data";
      src     = "";
      symbol  = "";
      price   = "";
    }
    return(
    <div key={index} className={("row ") + (index % 2 ? 'ListItemOdd' : 'ListItemEven')} style={style}>
      <div className='al-r'>{index}</div>
      <div className='al-l'>{name} </div>
      <div className='al-c'><img src={src}/></div>
      <div className='al-l'>{symbol} </div>
      <div className='al-l'>{price}$</div>
    </div>
  );};

            
  const FixedList = ({favData}) => {
    if (favData.length === 0) {return (<p>No data</p>);}

    return(
      <FixedSizeList
        className="no-scrollbars"
        itemCount={favCount}
        itemSize={40}
        height={200}
        width={600}
        key={favData} // Add key prop here
      >
        {Row}
      </FixedSizeList>
    );
  };

  
  return (
    <div className=''>
      <h2 className="al-c">Favorites</h2>
      {loading && <p>loading...</p>}
      {error && <p>{error}</p>}
      {<FixedList favData={favData}/>} 
    </div>
  );
}
