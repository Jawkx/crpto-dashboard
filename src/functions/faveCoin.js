import firebase from "firebase/app";
import { message } from "antd";
import { db } from "./initFirebase";

export const updatefaveCoin = (coinid, isFaved, uid) => {
  const docRef = db.collection("crptoDb").doc(uid);

  if (isFaved) {
    docRef
      .update({
        favCoins: firebase.firestore.FieldValue.arrayRemove(coinid),
      })
      .then(() => message.error(`Removed "${coinid}" from favourite`));
  } else {
    docRef
      .update({
        favCoins: firebase.firestore.FieldValue.arrayUnion(coinid),
      })
      .then(() => {
        message.success(`Added "${coinid}" to favourite`);
      });
  }
};
