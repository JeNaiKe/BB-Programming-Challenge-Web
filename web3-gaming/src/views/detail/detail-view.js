import React, { useState, useRef, useEffect } from "react";
import "./detail-view.css";
import Navbar from "../../components/navbar";

function isInLocalStorage(key) {
  if (localStorage.getItem(key) === null) {
    return false;
  }
  return true;;
}

const Detail = () => {
  
  useEffect(() => {
    document.title = "Web3 Gaming - Detail";
    // TODO get info from the local storage about the game, or request it.
  });

  return (
    <div className="detailed">
      <Navbar />
      <div className="detailed-header-name">
        Bitcoin 
        <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"/>
         [BTC]
      </div>
      <div>
      <p className="al-l">
        Current price: 1000$
        <button className="detailed-favorite">Favorite</button>
      </p>
      <br/>
      <p className="al-l">
        Url: <a href="https://bitcoin.org/en/">https://bitcoin.org/en/</a>
      </p>
      <p className="al-r">
        Description:<br/>
        <div class="detailed-description">
        Bitcoin is a decentralized cryptocurrency originally described in a 2008 whitepaper by a person, or group of people, using the alias Satoshi Nakamoto. It was launched soon after, in January 2009.
        Bitcoin is a peer-to-peer online currency, meaning that all transactions happen directly between equal, independent network participants, without the need for any intermediary to permit or facilitate them. Bitcoin was created, according to Nakamotos own words, to allow “online payments to be sent directly from one party to another without going through a financial institution.”
        Some concepts for a similar type of a decentralized electronic currency precede BTC, but Bitcoin holds the distinction of being the first-ever cryptocurrency to come into actual use.
        </div>
      </p>
      </div>
    </div>
  );
};

export default Detail;
