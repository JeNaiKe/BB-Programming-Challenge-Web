const axios = require('axios');
const controllers = {};

/*
https://coinmarketcap.com/api/documentation/v1/#operation/getV1CryptocurrencyListingsLatest
Json response from CMC:
 status: OBJ{timestamp, error_code, error_message, elapsed, credit_count, notice, total_count}
 data: ARRAY[] of OBJ{id, name, symbol, slug, num_market_pairs, date_added, tags[], max_supply, circulating_supply, total_supply, platform{id, name, symbol, slug, token_address}, cmc_rank, self_reported_circulating_supply, self_reported_market_cap, last_updated, tvl_ratio, last_updated, quote{USD{price, volume_24h, volume_change_24h percent_change_1h, percent_change_24h, percent_change_7d, percent_change_30d, percent_change_60d, percent_change_90d, market_cap, market_cap_dominance, fully_diluted_market_cap, tvl, last_updated}}}}
*/

const { CMC_API_URL, CMC_API_KEY, CMC_TEST_URL, CMC_TEST_KEY } = require('../config/coinmarketcap.config.js');

// TODO implement a cache and min time between requests, save api calls and INFOS
// &tag=play-to-earn TODO MISSING A PROPER TAG https://coinmarketcap.com/view/play-to-earn/
let top5_last_request = 0;
controllers.getTop5 = async (req, res) => {
    const url = CMC_API_URL + "/v1/cryptocurrency/listings/latest" + "?start=1&limit=5&sort=market_cap"
    const url2 = CMC_API_URL + "/v2/cryptocurrency/info"
    try {
        const response = await axios.get(url,{
            headers: {
                'X-CMC_PRO_API_KEY': CMC_API_KEY,
            },
        });
        console.log("Returning the retrieved Data from CMC Top5.");

        let ids_array = []
        let ids = "?id="
        response.data.data.map((item) => {ids += String(item.id) + ","; ids_array.push(item.id)});
        ids = ids.slice(0, -1);
        
        const responseInfo = await axios.get(url2 + ids,{
            headers: {
                'X-CMC_PRO_API_KEY': CMC_API_KEY,
            },
        });

        ids_array.forEach((id) => {
            /*
            response.data.data.forEach((item) => {
                if(item.id === id){
                    item.icon = responseInfo.data.data[id].logo;
                    item.description = responseInfo.data.data[id].description;
                    item.urls = responseInfo.data.data[id].urls;
                }
            })*/
            response.data.data.find((item) => item.id === id).icon = responseInfo.data.data[id].logo;
        });

        res.json(response.data.data);

    } catch (error) {
        console.log("Error fetching data from CMC Top5: " + error.code);
        console.log(JSON.stringify(error))
        if (error.response) {
            if (typeof status === "number") { // Didnd't connect to the server
                res.status(error.response.status).json({ message: error.message});
            }else{
                res.status(error.code).json({ message: error.response.status.error_message});
            }
        } else {
            res.status(500).json({ message: "Error fetching data from CoinMarketCap API, without response."});
        }
    }
}

controllers.byID = async (req, res) => {
    const { id } = req.params;
    const url = CMC_API_URL + "/v1/cryptocurrency/info" + "?id=" + id;
    try {
        const response = await axios.get(url,{
            headers: {
                'X-CMC_PRO_API_KEY': CMC_API_KEY,
            },
        });
        console.log("Returning the retrieved Data from CMC by ID.");
        res.json(response.data.data);
    } catch (error) {
        console.log("Error fetching data from CMC by ID: " + error.code);
        console.log(JSON.stringify(error))
        if (error.response) {
            if (typeof error.response.status === "number") { // Didnd't connect to the server
                res.status(status).json({ message: error.message});
            }else{
                res.status(error.code).json({ message: error.response.status.error_message});
            }
        } else {
            res.status(500).json({ message: "Error fetching data from CoinMarketCap API, without response."});
        }
    }
}

module.exports = controllers;