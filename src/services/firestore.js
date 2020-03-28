import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

console.log("FIREBASE KEY: ", process.env.REACT_APP_FIREBASE_API_KEY);

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  databaseURL: "https://zoom-heartwork-guide.firebaseio.com"
  // storageBucket: "zoom-heartwork-guide.appspot.com",
  // messagingSenderId: "611561058284",
  // appId: "1:611561058284:web:01509a7f1136d4faf65ac9",
  // measurementId: "G-3F1HQ3JJK4"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export const authenticateAnonymously = () => {
  return firebase.auth().signInAnonymously();
};

export const createroom = (userName, userId) => {
  return db.collection("rooms").add({
    created: firebase.firestore.FieldValue.serverTimestamp(),
    createdBy: userId,
    users: [
      {
        userId: userId,
        name: userName
      }
    ]
  });
};

export const getroom = roomId => {
  return db
    .collection("rooms")
    .doc(roomId)
    .get();
};

export const getroomItems = roomId => {
  return db
    .collection("rooms")
    .doc(roomId)
    .collection("items")
    .get();
};

export const streamroomItems = (roomId, observer) => {
  return db
    .collection("rooms")
    .doc(roomId)
    .collection("items")
    .orderBy("created")
    .onSnapshot(observer);
};

export const streamRoomUsers = (roomId, observer) => {
  return db
    .collection("rooms")
    .doc(roomId)
    .onSnapshot(observer);
};

export const addUserToroom = (userName, roomId, userId) => {
  return db
    .collection("rooms")
    .doc(roomId)
    .update({
      users: firebase.firestore.FieldValue.arrayUnion({
        userId: userId,
        name: userName
      })
    });
};

export const updateRoomUser = (roomId, userIndex, userCheckin) => {
  console.log("userIndex: ", userIndex);
  console.log("thing: ", { [`users[${userIndex}].checkIn`]: userCheckin });
  // return db
  //   .collection("rooms")
  //   .doc(roomId)
  //   .update({
  //     [`users[${userIndex}].checkIn`]: userCheckin
  //   });
};

export const addroomItem = (item, roomId, userId) => {
  return getroomItems(roomId)
    .then(querySnapshot => querySnapshot.docs)
    .then(roomItems =>
      roomItems.find(
        roomItem => roomItem.data().name.toLowerCase() === item.toLowerCase()
      )
    )
    .then(matchingItem => {
      if (!matchingItem) {
        return db
          .collection("rooms")
          .doc(roomId)
          .collection("items")
          .add({
            name: item,
            created: firebase.firestore.FieldValue.serverTimestamp(),
            createdBy: userId
          });
      }
      throw new Error("duplicate-item-error");
    });
};
