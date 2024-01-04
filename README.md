# BB Programming Challenge Web
 BB Programming Challenge Web. Semi-done in a day.
 Backend connected with free account to [CoinMarketCap API](https://coinmarketcap.com/api/).

Index:
> [How to Install](README.md#how-to-install) <br>
> [Executing](README.md#Executing) <br>
> [Gallery](README.md#Gallery) <br>
> [Achieved](README.md#Achieved) <br>
> [Missing](README.md#Missing) <br>

## How to install
- Execute `npm install` on both frontend and backend folders (web3-gaming & web3-backend) to install necessary node modules. Make sure nodejs is installed. This was done with v20.
- Configure connection of frontend to backend, using the '.env' inside the web3-gaming folder.
- Configure backend CoinMarketCap API Key on `backend/src/config/coinmarketcap.config.js`. Free tier included

## Executing
Have two terminals, do `cd` to their respective folder, as above, but execute `npm run start` on frontend and `npm start dev` on backend.

## Gallery
The navbar is a reused component currently only for navigating back to home screen.


The Home screen,
Has a fixed list of the top 5 coins rated by CoinMarketCap and a scrollable list below to show the favorites.
![homescreen](https://github.com/JeNaiKe/BB-Programming-Challenge-Web/blob/main/images/homescreen.png?raw=true)

The Detail screen <b>[WIP, currently is boiler plate and doesn't change or work]</b>,

Shows some details of the selected coin.
![detailed view, wip](https://github.com/JeNaiKe/BB-Programming-Challenge-Web/blob/main/images/detailedscreen.png?raw=true)

## Achieved
- Website foundation, View wise and Backend wise.
- Only game-related coins, filtering by category 'play-to-earn'.
- API Integration.
   - Executes calls and handles them gracefully. Needs better error messages.
- Caching. 
   - The backend has a cache period of 15 minutes, to not use/destroy the API key tokens.
   - But it's cached on RAM, resets on restart. Needs to save on disk.
- Local Storage.
   - Frontend uses local storage to store the ID's of the favorites. Can also store data and metadata for details
- Quality.
   - Only missing some tests. Crucial on backend.

  ## Missing
  - Some TODO's scattered around the app.
  - OPTIONAL: Arrow evolution not implemented.
    - Need to save favorites price when loaded, and compare if there are any to set states and represent well.
  - OPTIONAL: Search feature on Home Screen (frontend) and related API call (backend).
    - Maybe backend needs on boot to read, from API or a disk cached list, to send to frontend local storage.
  - OPTIONAL: Pagination for project list.
    - With the limited top 5 + scrollabe view under it, this doesn't seems necessary.
