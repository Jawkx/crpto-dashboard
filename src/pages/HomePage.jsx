import React, { useEffect, useState } from "react";
import {
  List,
  Divider,
  Cascader,
  Button,
  Modal,
  Typography,
  Tooltip,
} from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { getCoinsData } from "../functions/cgApiFunc";
import { CrptoInfo } from "./components/CrptoInfo";
import { ModalContent } from "./components/ModalContent";

const { Text } = Typography;
const pageSizeOptions = [10, 20, 30, 50];

const sortingOptionToKeys = {
  "CoinGecko's scoring system": "GECKO",
  "Market Cap": "MARKET_CAP",
  Volume: "VOLUME",
  "Coin Name (A-Z)": "COIN_NAME",
  Price: "PRICE",
  "24 hour change": "HOUR_24",
};

const sortingOptions = Object.keys(sortingOptionToKeys).map((sortBy) => {
  return {
    value: sortingOptionToKeys[sortBy],
    label: sortBy,
  };
});

const createEmptyArr = (size) => {
  let arr = [];
  for (let index = 0; index < size; index++) {
    arr.push({
      image: { thumb: null },
    });
  }
  return arr;
};
export const HomePage = ({
  appCurrency,
  faveCoins,
  handleFaveCoin,
  width,
  isPhone,
  coinsNumber,
}) => {
  const [coinsData, setCoinsData] = useState(createEmptyArr(20));
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [isLoading, setIsLoading] = useState(true);

  const [sortby, setSortby] = useState("GECKO");
  const [ascDsc, setAscDsc] = useState(false);

  const [modalCoinObj, setModalCoinObj] = useState({ id: null, name: null });
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getCoinsData(
      pageSize,
      currentPage,
      setCoinsData,
      setIsLoading,
      sortby,
      ascDsc
    );
  }, [currentPage, pageSize, sortby, ascDsc]);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handleSortChange = (value) => {
    setCurrentPage(1);
    setSortby(value[0]);
  };

  const handleAscDsc = (val) => {
    setCurrentPage(1);
    setAscDsc(val);
  };

  const handleOpenModal = (coinid, coinName) => {
    setModalCoinObj({
      id: coinid,
      name: coinName,
    });
    setOpenModal(true);
  };

  return (
    <div className="content">
      <List
        header={
          <div className="sorting-selection">
            <Text strong> Sort By : </Text>
            <Cascader
              allowClear={false}
              value={[sortby]}
              options={sortingOptions}
              onChange={(value) => {
                handleSortChange(value);
              }}
            />
            <Tooltip placement="top" title="Sort Descending">
              <Button
                type={ascDsc ? "default" : "primary"}
                icon={<ArrowDownOutlined />}
                onClick={() => handleAscDsc(false)}
              />
            </Tooltip>
            <Tooltip placement="right" title="Sort Ascending">
              <Button
                type={!ascDsc ? "default" : "primary"}
                icon={<ArrowUpOutlined />}
                onClick={() => handleAscDsc(true)}
              />
            </Tooltip>
          </div>
        }
        pagination={{
          size: isPhone ? "small" : "default",
          position: "both",
          total: coinsNumber,
          pageSize: pageSize,
          pageSizeOptions: pageSizeOptions,
          current: currentPage,
          onChange: (page, pageSize) => handlePageChange(page, pageSize),
        }}
        bordered={true}
        itemLayout={isPhone ? "vertical" : "horizontal"}
        dataSource={coinsData}
        renderItem={(coinData) => (
          <div>
            <CrptoInfo
              data={coinData}
              currency={appCurrency}
              isLoading={isLoading}
              isPhone={isPhone}
              width={width}
              faveCoins={faveCoins}
              handleFaveCoin={handleFaveCoin}
              handleOpenModal={handleOpenModal}
            />
            <Divider />
          </div>
        )}
      />
      <Modal
        title={modalCoinObj.name}
        footer={null}
        visible={openModal}
        onCancel={() => setOpenModal(false)}
        destroyOnClose={true}
      >
        <ModalContent coinid={modalCoinObj.id} currency={appCurrency} />
      </Modal>
    </div>
  );
};
