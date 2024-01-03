import React, { useState, useEffect } from 'react';
import "./table.css";

const axios = require('axios');
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

// TODO Implement caching, so that we don't have to fetch data from the server every time
const ConstructTable = ({data}) => (
    <table>
        <thead>
        <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Icon</th>
            <th>Symbol</th>
            <th>Price</th>
        </tr>
        </thead>
    <tbody>
    {data.slice(0,5).map((item, index) => (
        <tr key={index}>
            <td className='al-r'><a href={"/detail?id=" + item.id}>{item.id}</a></td>
            <td className='al-l'><a href={"/detail?id=" + item.id}>{item.name}</a></td>
            <td className='al-c'><a href={"/detail?id=" + item.id}><img src={item.icon}/>{}</a></td>
            <td className='al-l'><a href={"/detail?id=" + item.id}>{item.symbol}</a></td>
            <td className='al-l'><a href={"/detail?id=" + item.id}>{(item.quote.USD.price).toFixed(2)+"$"}</a></td>
        </tr>
        
    ))}
    </tbody>
    </table>
);


export const Top5Table = () => {
    const [data, setData] = React.useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //https://coinmarketcap.com/api/documentation/v1/#operation/getV1CryptocurrencyListingsLatest
        const fetchData = async () => {
            try {
                const response = await axios.get(BACKEND_URL + "/cmc/top5");
                console.log("Obtained data from the server with success.");
                console.log(response);
                setData(response.data);
            } catch (error) {
                console.log(error);
                if (error.response) {
                    setError("Error response from backend: " + error.response.data.message);
                }else{
                    setError("Error fetching data, check console.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures that this effect runs only once when the component mounts

    return(
        <div className=''>
            {loading && <p>loading...</p>}
            {error && <p>{error}</p>}
            {data && <ConstructTable data={data} />}
        </div>
  );
};