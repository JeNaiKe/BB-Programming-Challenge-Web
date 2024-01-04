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
            <td className='al-c'><a href={"/detail?id=" + item.id}><img src={item.logo}/>{}</a></td>
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
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures that this effect runs only once when the component mounts

    // TODO Instead of loading text (wich causles blinking) use a ghost table of the same size
    return(
        <div className=''>
            <h3 className='al-c'>Top Five</h3>
            {loading && <p>loading...</p>}
            {error && <p>{error}</p>}
            {data && <ConstructTable data={data} />}
        </div>
  );
};