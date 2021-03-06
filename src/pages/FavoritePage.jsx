import React, { useState } from "react";
import { Divider, List, Modal } from "antd";
import { CrptoInfoPostFetch } from "./components/CrptoInfoPostfetch";
import { ModalContent } from "./components/ModalContent";
export const FavouritePage = ({
  appCurrency,
  faveCoins,
  width,
  isPhone,
  handleFaveCoin,
}) => {
  const [modalCoinObj, setModalCoinObj] = useState({ id: null, name: null });
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (coinid, coinName) => {
    setModalCoinObj({
      id: coinid,
      name: coinName,
    });
    setOpenModal(true);
  };

  const data = faveCoins;

  return (
    <div className="content">
      <List
        bordered={true}
        itemLayout={isPhone ? "vertical" : "horizontal"}
        dataSource={data}
        renderItem={(coinid) => {
          return (
            <div>
              <CrptoInfoPostFetch
                coinid={coinid}
                currency={appCurrency}
                isPhone={isPhone}
                width={width}
                handleFaveCoin={handleFaveCoin}
                handleOpenModal={handleOpenModal}
              />
              <Divider />
            </div>
          );
        }}
      ></List>

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
