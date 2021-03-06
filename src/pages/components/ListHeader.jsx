import React, { useState, useEffect } from "react";

import { Cascader } from "antd";

const orderOption = {
  "CoinGecko's scoring system": "GECKO",
  "Market Cap": "MARKET_CAP",
  Volume: "VOLUME",
  "Coin Name (A-Z)": "COIN_NAME",
  Price: "PRICE",
  "24 hour change": "HOUR_24",
};

const currencyOption = ["myr", "usd", "hkd", "sgd"];

export const ListHeader = ({ updateOrderOption, updateCurrency }) => {
  //   const [orderBy, setOrderBy] = useState("CoinGecko's scoring system");
  //   const [ascDesc, setAscDesc] = useState(false); //Descending

  //   useEffect(() => {
  //     updateOrderOption(`${orderOption[orderBy]}_${ascDesc ? "ASC" : "DESC"}`);
  //   }, [orderBy, ascDesc]);

  return (
    <div>
      <Cascader
        options={currencyOption}
        onChange={(value) => updateCurrency(value)}
      />
    </div>
  );
};
