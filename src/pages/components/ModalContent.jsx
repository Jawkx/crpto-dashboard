import React, { useEffect, useState } from "react";
import { Divider, Image, Skeleton, Typography } from "antd";
import ReactHtmlParser from "react-html-parser";

import { getCoinData } from "../../functions/cgApiFunc";
import Paragraph from "antd/lib/typography/Paragraph";

import { Sparklines, SparklinesLine } from "react-sparklines";
const { Text } = Typography;
export const ModalContent = ({ coinid, currency }) => {
  const [coinData, setCoinData] = useState(null);

  console.log(coinData);
  useEffect(() => {
    getCoinData(coinid, setCoinData);
  }, [coinid]);

  if (coinData !== null) {
    const imgUrl = coinData.image.large;
    const marketData = coinData.market_data;
    return (
      <div className="modal-content">
        <Image className="img" src={imgUrl} width={130} />
        <br />
        <Text type="secondary">
          <p> {coinData.symbol} </p>
        </Text>
        <Divider> Ranking</Divider>
        <div className="modal-container">
          <p> Coin Gecko Rank: {coinData.coingecko_rank} </p>
          <p> Market Cap Rank: {coinData.market_cap_rank} </p>
        </div>
        <Divider> Market Data</Divider>
        <div className="modal-container">
          <p>
            <Text strong>Market Cap: </Text>
            {marketData.market_cap[currency] + " " + currency.toUpperCase()}
          </p>

          <p>
            <Text strong>Total Volume: </Text>
            {marketData.total_volume[currency] + " " + currency.toUpperCase()}
          </p>
          <p>
            <Text strong>Highest in 24h: </Text>
            {marketData.high_24h[currency] + " " + currency.toUpperCase()}
          </p>
          <p>
            <Text strong>Lowest in 24 h: </Text>
            {marketData.low_24h[currency] + " " + currency.toUpperCase()}
          </p>
          <p>
            <Text strong>Price change in 24 hours: </Text>
            {marketData.price_change_percentage_24h > 0
              ? "+" + marketData.price_change_percentage_24h + " %"
              : marketData.price_change_percentage_24h + " %"}
          </p>
          <p>
            <Text strong> Price change in 7 days: </Text>
            {marketData.price_change_percentage_7d > 0
              ? "+" + marketData.price_change_percentage_7d + " %"
              : marketData.price_change_percentage_7d + " %"}
          </p>
          <p>
            <Text strong> Price change in 30 days: </Text>
            {marketData.price_change_percentage_30d > 0
              ? "+" + marketData.price_change_percentage_30d + " %"
              : marketData.price_change_percentage_30d + " %"}
          </p>
        </div>
        <Divider> 7 days price graph </Divider>
        <div className="modal-container">
          <Sparklines
            data={marketData.sparkline_7d.price}
            className="sparklines"
          >
            <SparklinesLine color="turquoise" />
          </Sparklines>
        </div>
        {coinData.description.en && (
          <div>
            <Divider> Description </Divider>
            <div className="modal-container">
              <Paragraph
                ellipsis={{ rows: 5, expandable: true }}
                className="description"
              >
                {ReactHtmlParser(coinData.description.en)}
              </Paragraph>
            </div>
          </div>
        )}
        <Divider />
        <div className="modal-container">
          <p>
            Last updated on :{" "}
            {coinData.last_updated.replace("T", "@").replace("Z", "")}
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="modal-content">
        <Skeleton.Image active />
        <Skeleton active />
        <Divider />
        <Skeleton active />
        <Divider />
        <Skeleton active />
        <Divider />
        <Skeleton active />
        <Divider />
      </div>
    );
  }
};
