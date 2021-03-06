import React from "react";

import { List, Typography, Skeleton, Divider, Button, Tooltip } from "antd";

import { Sparklines, SparklinesLine } from "react-sparklines";

import { ReadOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import Avatar from "antd/lib/avatar/avatar";

const { Text } = Typography;

export const CrptoInfo = ({
  isLoading,
  data,
  currency,
  isPhone,
  width,
  faveCoins,
  handleFaveCoin,
  handleOpenModal,
}) => {
  if (!isLoading) {
    const { id, symbol, name, market_data } = data;
    const thumbnailUrl = data.image.thumb;
    const {
      current_price,
      sparkline_7d,
      total_volume,
      price_change_percentage_24h,
    } = market_data;

    const icon = <Avatar src={thumbnailUrl} className="list-icon" />;
    const price = current_price[currency];
    const volume = total_volume[currency];

    const priceNVol = (
      <div className="price-n-vol">
        <Text className="price">
          <Text strong>Price :</Text> {price + " " + currency.toUpperCase()}
        </Text>
        <Divider />
        <Text className="volume">
          <Text strong> Volume :</Text>
          {volume + " " + currency.toUpperCase()}
        </Text>
      </div>
    );

    const isFaved = faveCoins.includes(id);
    const favButton = (
      <Tooltip
        placement="topRight"
        title={isFaved ? "remove from favourite" : "add to favourite"}
      >
        <Button
          type={isFaved ? "primary" : "default"}
          size="large"
          shape="circle"
          icon={isFaved ? <StarFilled /> : <StarOutlined />}
          onClick={() => {
            handleFaveCoin(id, isFaved);
          }}
        />
      </Tooltip>
    );

    const detailButton = (
      <Tooltip placement="topRight" title={"details"}>
        <Button
          type="default"
          size="large"
          shape="circle"
          icon={<ReadOutlined />}
          onClick={() => {
            handleOpenModal(id, name);
          }}
        />
      </Tooltip>
    );

    return (
      <List.Item actions={[favButton, detailButton]}>
        <Skeleton loading={isLoading} active avatar></Skeleton>

        <List.Item.Meta avatar={icon} title={name} description={symbol} />

        <div className="list-content">
          <Sparklines
            data={sparkline_7d.price}
            className="sparklines"
            svgWidth={isPhone ? width / 2.5 : width / 5}
            svgHeight={70}
          >
            <SparklinesLine
              color={
                sparkline_7d.price[sparkline_7d.price.length - 1] -
                  sparkline_7d.price[0] >=
                0
                  ? "green"
                  : "red"
              }
            />
          </Sparklines>
          {priceNVol}
          {!isPhone && (
            <Text className="priceChange">
              <Text strong>24 Hour Change :</Text>{" "}
              {price_change_percentage_24h > 0 ? (
                <Text type="success">
                  {"+" + price_change_percentage_24h} %
                </Text>
              ) : (
                <Text type="danger">{price_change_percentage_24h} %</Text>
              )}
            </Text>
          )}
        </div>
      </List.Item>
    );
  } else {
    return (
      <List.Item>
        <Skeleton loading={true} active avatar></Skeleton>
      </List.Item>
    );
  }
};
