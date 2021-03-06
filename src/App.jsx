import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout, PageHeader } from "antd";
import { NavigationBar } from "./pages/components/NavigationBar";
import { HomePage } from "./pages/HomePage";
import { FavouritePage } from "./pages/FavoritePage";
import "./App.scss";
import { Content } from "antd/lib/layout/layout";
import { updatefaveCoin } from "./functions/faveCoin";
import firebase from "./functions/initFirebase";
import { useWindowSize } from "./functions/useWindowSize";
import { getCoinsNum } from "./functions/cgApiFunc";
var db = firebase.firestore();

const checkExistDataBase = (uid) => {
  const docRef = db.collection("crptoDb").doc(uid);
  docRef.get().then((doc) => {
    if (!doc.exists) {
      db.collection("crptoDb").doc(uid).set({
        favCoins: [],
      });
    }
  });
};
function App() {
  const [width] = useWindowSize();
  const isPhone = Boolean(width < 650);
  const [currentPage, setCurrentPage] = useState("homePage");
  const [appCurrency, setAppCurrency] = useState("myr");
  const [uid, setUid] = useState(null);
  const [coinsNumber, setCoinsNumber] = useState(150);
  const [favCoins, setfavCoins] = useState([]);

  const loginAnon = () => {
    firebase
      .auth()
      .signInAnonymously()
      .then(() => {
        console.log("Signed in");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(`error signing in ${errorCode}:${errorMessage}`);
      });
  };

  const handleAuthStateChange = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var uid = user.uid;
        setUid(uid);
      } else {
        console.log(`error signing state change`);
      }
    });
  };

  const handleFaveCoin = (coinid, isfaved) => {
    updatefaveCoin(coinid, isfaved, uid);
  };

  useEffect(() => {
    loginAnon();
    handleAuthStateChange();
    getCoinsNum(setCoinsNumber);
    if (uid !== null) {
      checkExistDataBase(uid);
    }
    return () => {};
  }, [uid]);

  useEffect(() => {
    if (uid !== null) {
      const docRef = db.collection("crptoDb").doc(uid);
      let unsubscribe = docRef.onSnapshot((doc) => {
        if (doc.exists) {
          const data = doc.data();
          setfavCoins(data.favCoins);
        }
      });
      return () => {
        unsubscribe();
      };
    }
  }, [uid]);

  return (
    <Router>
      <div className="App">
        <Layout>
          <PageHeader
            className="site-page-header"
            backIcon={null}
            title="Cryptocurrencies Dashboard"
            subTitle="Powered by CoinGecko API"
          />
          <NavigationBar
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            appCurrency={appCurrency}
            setAppCurrency={setAppCurrency}
          />
          <Layout>
            <Content>
              <Switch>
                <Route
                  path={["/", "/homePage"]}
                  exact
                  render={() => (
                    <HomePage
                      appCurrency={appCurrency}
                      faveCoins={favCoins}
                      handleFaveCoin={handleFaveCoin}
                      width={width}
                      isPhone={isPhone}
                      coinsNumber={coinsNumber}
                    />
                  )}
                />
                <Route
                  path="/favouritePage"
                  exact
                  render={() => (
                    <FavouritePage
                      appCurrency={appCurrency}
                      handleFaveCoin={handleFaveCoin}
                      faveCoins={favCoins}
                      width={width}
                      isPhone={isPhone}
                    />
                  )}
                />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
