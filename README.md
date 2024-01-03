# BB Programming Challenge Web
 BB Programming Challenge Web. Semi-done in a day.
 Backend connected with free account to [CoinMarketCap API](https://coinmarketcap.com/api/).

Index:
> [How to Install](README.md#how-to-install) <br>
> [Gallery](README.md#Gallery) <br>
> [Achieved](README.md#Achieved) <br>
> [Missing](README.md#Missing) <br>

## How to install
Execute `npm install` on both frontend and backend to install necessary node modules. Make sure nodejs is installed. This was done with v20.
Create the <b>config file</b> needed for the API explained in the README.txt inside backend.

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
 - API Integration.
   - Executes calls and handles them.
 - Quality.
   - It works fine and doesn't crash/bug free. Doesn't haves tests tho.

  ## Missing
  - Only game-related coins.
    - Due to not knowing wich tag/s on the coins relate to games, their API doesn't specify.
  - Backend and Frontend Caching, things don't change in less than 30 seconds.
  - Local Storage. Need to creat helpers/action so that after backend calls, they're saved on local storage correctfully. 
  - Detailed page and Favorite's coin not working due to previous (local storage) not being completed.
  - OPTIONAL: Arrow evolution not implemented, needed on local storage too.
  - OPTIONAL: Search feature on Home Screen (frontend) and related API call (backend).
  - OPTIONAL: Pagination for project list.
