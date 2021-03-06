import React from "react";
import { Layout, Menu, Cascader, Typography } from "antd";
import { Link } from "react-router-dom";

const { Header } = Layout;
const { Text } = Typography;
const currencyList = [
  "aed",
  "ars",
  "aud",
  "bch",
  "bdt",
  "bhd",
  "bmd",
  "bnb",
  "brl",
  "btc",
  "cad",
  "chf",
  "clp",
  "cny",
  "czk",
  "dkk",
  "dot",
  "eos",
  "eth",
  "eur",
  "gbp",
  "hkd",
  "huf",
  "idr",
  "ils",
  "inr",
  "jpy",
  "krw",
  "kwd",
  "lkr",
  "ltc",
  "mmk",
  "mxn",
  "myr",
  "ngn",
  "nok",
  "nzd",
  "php",
  "pkr",
  "pln",
  "rub",
  "sar",
  "sek",
  "sgd",
  "thb",
  "try",
  "twd",
  "uah",
  "usd",
  "vef",
  "vnd",
  "xag",
  "xau",
  "xdr",
  "xlm",
  "xrp",
  "yfi",
  "zar",
  "bits",
  "link",
  "sats",
];

const currencyOptions = currencyList.map((value) => {
  return {
    value: value,
    label: value.toUpperCase(),
  };
});
export const NavigationBar = ({ currentPage, setAppCurrency, appCurrency }) => {
  const handleSetAppCurrency = (value) => {
    setAppCurrency(value[0]);
  };

  return (
    <Header>
      <Menu mode="horizontal">
        <Menu.Item key="homepage">
          <Link to="homepage">All Coins </Link>
        </Menu.Item>
        <Menu.Item key="favoritePage">
          <Link to="favouritePage">My Favourite</Link>
        </Menu.Item>

        <span className="currency-selector">
          <Text strong>Currency : </Text>
          <Cascader
            allowClear={false}
            size="small"
            options={currencyOptions}
            value={[appCurrency]}
            onChange={(value) => {
              handleSetAppCurrency(value);
            }}
          />
        </span>
      </Menu>
    </Header>
  );
};
