const axios = require('axios');
const controllers = {};


//https://coinmarketcap.com/api/documentation/v1/#operation/getV1CryptocurrencyListingsLatest


const { CMC_API_URL, CMC_API_KEY, CMC_TEST_URL, CMC_TEST_KEY } = require('../config/coinmarketcap.config.js');

// TODO Order by market cap / cmc_rank
const top5Cached = {};
controllers.getTop5 = async (req, res) => {

    try{if (top5Cached.data && top5Cached.time > Date.now() - 1000*60*15){ // 15 minutes
            console.log("Returning the cached Data from CMC getTop5.");
            res.json(top5Cached.data);
            return;
        }
    }catch (error) {console.log("Error fetching cached data from CMC getTop5: " + error.code + "\n" + JSON.stringify(error));}


    //const url = CMC_API_URL + "/v1/cryptocurrency/listings/latest" + "?start=1&limit=5&sort=market_cap" // &tag=gaming does not work
    const url = CMC_API_URL + "/v1/cryptocurrency/category" + "?id=60fb6ba4ee872d7cfdd7556d"
    const url2 = CMC_API_URL + "/v2/cryptocurrency/info"
    try {
        const response = await axios.get(url,{
            headers: {'X-CMC_PRO_API_KEY': CMC_API_KEY,},
        });
        console.log("Returning the retrieved Data from CMC Top5.");

        if(response.data.data.coins){ // Category API difference
            response.data.data = response.data.data.coins;
        }

        // response.data.data = response.data.data.sort().slice(0,5); // This works somehow??
        response.data.data = response.data.data.sort((a, b)=>{a.cmc_rank-b.cmc_rank}).slice(0,5);

        // TODO, these shouldn't change often, so we should cache them and only update them every 24h for example
        let ids_array = []
        let ids = "?id="
        response.data.data.map((item) => {ids += String(item.id) + ","; ids_array.push(item.id)});
        const responseInfo = await axios.get(url2 + ids.slice(0, -1),{
            headers: {'X-CMC_PRO_API_KEY': CMC_API_KEY,},
        });
        

        ids_array.forEach((id) => {
            let item        = response.data.data.find((item) => item.id === id);
            let itemInfo    = responseInfo.data.data[id];
            item.description    = itemInfo.description;
            item.logo           = itemInfo.logo;
            item.urls           = itemInfo.urls;
        });

        top5Cached.data = response.data.data;
        top5Cached.time = Date.now();

        res.json(response.data.data);

    } catch (error) {
        console.log("Error fetching data from CMC Top5: " + error.code);
        console.log(JSON.stringify(error))
        if (error.response) {
            if (typeof error.response.status === "number") { // Didnd't connect to the server
                res.status(error.response.status).json({ message: error.message});
            }else{
                res.status(error.code).json({ message: error.response.status.error_message});
            }
        } else {
            res.status(500).json({ message: "Error fetching data from CoinMarketCap API, without response."});
        }
    }
}


const idCached = {};
controllers.byID = async (req, res) => {
    const { id } = req.params;

    try{if (idCached.hasOwnProperty(id))
            if(idCached[id] && idCached[id].time > Date.now() - 1000*60*60){ // 60 minutes
                console.log("Returning the cached Data from CMC by ID: " + id);
                const returning = idCached[id].data;
                if (returning){res.json(returning); return;}
                console.log("Error fetching cached data from CMC by ID: " + id + " returning null data");
            }
    }catch (error) {console.log("Error fetching cached data from CMC by ID: " + error.code + "\n" + JSON.stringify(error));}

    
    const url = CMC_API_URL + "/v2/cryptocurrency/info" + "?id=" + id;
    const url2 = CMC_API_URL + "/v2/cryptocurrency/quotes/latest" + "?id=" + id; // &tag=gaming does not work
    
    try {

        const response = await axios.get(url,{
            headers: {'X-CMC_PRO_API_KEY': CMC_API_KEY,},
        });

        const response2 = await axios.get(url2,{
            headers: {'X-CMC_PRO_API_KEY': CMC_API_KEY,},
        });
        console.log("Returning the retrieved Data from CMC by ID: " + id);
        
        const metadata = response.data.data[id];
        const data = response2.data.data[id];


        const object = {time: Date.now(), data: {metadata, data}};
        idCached[id] = object;
        res.json(object.data);

    } catch (error) {
        console.log("Error fetching data from CMC by ID: " + error.code);
        console.log(JSON.stringify(error))
        if (error.response) {
            if (typeof error.response.status === "number") { // Didnd't connect to the server
                res.status(error.response.status).json({ message: error.message});
            }else{
                res.status(error.code).json({ message: error.response.status.error_message});
            }
        } else {
            res.status(500).json({ message: "Error fetching data from CoinMarketCap API, without response."});
        }
    }
}


// TODO Use the id's of the cached and only fetch the ones that are not cached, and save them correctly
//object {Metadata[id], Data[id]}
controllers.byIDs = async (req, res) => {
    const { ids } = req.params;
    if(!ids){res.status(400).json({ message: "No ids provided."}); return;}
    

    // QUICK FIX
    let id = ids.replace(/\[|\]|"/g, ''); // Remove any "[]"" and "" from the id string
    try{if (idCached.hasOwnProperty(id))
        if(idCached[id] && idCached[id].time > Date.now() - 1000*60*60){ // 60 minutes
            const returning = idCached[id].data;
            if (returning){res.json(returning); return;}
        }
    }catch (error) {console.log("Error fetching cached data from CMC by ID: " + error.code + "\n" + JSON.stringify(error));}


    const url = CMC_API_URL + "/v2/cryptocurrency/info" + "?id=" + id;
    const url2 = CMC_API_URL + "/v2/cryptocurrency/quotes/latest" + "?id=" + id; // &tag=gaming does not work
    
    console.log("Fetching data from CMC by IDs into: " + url);

    try {
        const response = await axios.get(url,{
            headers: {'X-CMC_PRO_API_KEY': CMC_API_KEY,},
        });

        const response2 = await axios.get(url2,{
            headers: {'X-CMC_PRO_API_KEY': CMC_API_KEY,},
        });
        console.log("Returning the retrieved Data from CMC by ID: " + id);
        
        const metadata = response.data.data;
        const data = response2.data.data;


        const object = {time: Date.now(), data: {metadata, data}};
        idCached[id] = object;
        res.json(idCached[id].data);

    } catch (error) {
        console.log("Error fetching data from CMC by ID: " + error.code);
        console.log(JSON.stringify(error))
        if (error.response) {
            if (typeof error.response.status === "number") { // Didnd't connect to the server
                res.status(error.response.status).json({ message: error.message});
            }else{
                res.status(error.code).json({ message: error.response.status.error_message});
            }
        } else {
            res.status(500).json({ message: "Error fetching data from CoinMarketCap API, without response."});
        }
    }
}



const categoriesCached = {};
/* TODO ADD to cache into a file time and data
const filePath = '../model/coinmarketcap.categories.json';
categoriesCached.data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
console.log("Initializing categoriesCached");
console.log(categoriesCached.data); 
*/
controllers.getCategories = async (req, res) => {
    if (categoriesCached.data && categoriesCached.time > Date.now() - 1000*60*60*24*15){ // 24h * 15 = 15 days
        console.log("Returning the cached Data from CMC Categories.");
        res.json(categoriesCached.data);
        return;
    }
    const url = CMC_API_URL + "/v1/cryptocurrency/categories"
    try {
        const response = await axios.get(url,{
            headers: {
                'X-CMC_PRO_API_KEY': CMC_API_KEY,
            },
        });
        console.log("Returning the retrieved Data from CMC Categories..");
        categoriesCached.data = response.data.data;
        categoriesCached.time = Date.now();
        console.log(response.data.status);
        res.json(response.data.data);
    } catch (error) {
        console.log("Error " + error)
        res.status(500).json({ message: "Error fetching data from CoinMarketCap API.", error: error});
    }
}


module.exports = controllers;