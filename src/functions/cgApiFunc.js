const CoinGecko = require("coingecko-api");

const CoinGeckoClient = new CoinGecko();

export const getCoinsData = async (
  size,
  page,
  updateCoinsData,
  setIsLoading,
  orderBy,
  ascDsc
) => {
  const orderKey = orderBy + (ascDsc ? "_ASC" : "_DESC");
  console.log(orderKey);
  let data = await CoinGeckoClient.coins.all({
    order: CoinGecko.ORDER[orderKey],
    per_page: size,
    page: page,
    localization: false,
    sparkline: true,
  });

  if (data) {
    console.log(`Get coin data success`);
    updateCoinsData(data.data);
    setIsLoading(false);
  } else {
    console.log(`Get coin data error - ${data.code}`);
  }
};

export const getCoinData = async (coinId, updateCoinData) => {
  let data = await CoinGeckoClient.coins.fetch(coinId, {
    tickers: false,
    sparkline: true,
  });

  if (data) {
    console.log(`Get coin data success`);
    updateCoinData(data.data);
  } else {
    console.log(`Get coin data error - ${data.code}`);
  }
};

export const getCoinsNum = async (updateCoinNumber) => {
  let data = await CoinGeckoClient.coins.list();

  if (data) {
    console.log(`Get coin list data success`);
    updateCoinNumber(data.data.length);
  } else {
    console.log(`Get coin data error - ${data.code}`);
  }
};
