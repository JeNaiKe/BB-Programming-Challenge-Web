import React from "react";
import { FixedSizeList} from "react-window";

import "./list.css";

// Todo Gather info from local storage with the index
const Row = ({ index, style }) => (
  <div className={("row ") + (index % 2 ? 'ListItemOdd' : 'ListItemEven')} style={style}>
      <tr key={index}>
        <td className='al-r'>{index}</td>
        <td className='al-l'>Bitcoin</td>
        <td className='al-c'>Icon{}</td>
        <td className='al-l'><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"/></td>
        <td className='al-l'>0.00$</td>
      </tr>
  </div>
);

// TODO: make itemSize dynamic by using local Storage ammount of favorited items
export const FavoritedList = () => (
  <FixedSizeList
    className="no-scrollbars"
    height={200}
    itemCount={10}
    itemSize={35}
    width={600}
  >
    {Row}
  </FixedSizeList>
);
