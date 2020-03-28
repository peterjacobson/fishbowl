import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

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

export const streamRoomUsers = (roomId, observer) => {
  return db
    .collection("rooms")
    .doc(roomId)
    .onSnapshot(observer);
};

export const streamRoomCheckIns = (roomId, observer) => {
  return db
    .collection("rooms")
    .doc(roomId)
    .collection("checkIns")
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

export const updateCheckIn = (checkIn, roomId, userId) => {
  db.collection("rooms")
    .doc(roomId)
    .collection("checkIns")
    .get()
    .then(querySnapshot => querySnapshot.docs)
    .then(checkIns =>
      checkIns.find(checkIn => checkIn.data().userId === userId)
    )
    .then(matchingCheckIn => {
      if (!matchingCheckIn) {
        return db
          .collection("rooms")
          .doc(roomId)
          .collection("checkIns")
          .add({
            userId: userId,
            ...checkIn
          });
      } else {
        return db
          .collection("rooms")
          .doc(roomId)
          .collection("checkIns")
          .doc(matchingCheckIn.id)
          .update(checkIn);
      }
    });
};

export const startTimer = (timeStamp, roomId, userId) => {
  db.collection("rooms")
    .doc(roomId)
    .collection("timers")
    .get()
    .then(querySnapshot => querySnapshot.docs)
    .then(timers => {
      if (timers.length < 1) {
        db.collection("rooms")
          .doc(roomId)
          .collection("timers")
          .add({
            startTime: timeStamp,
            roomId: roomId,
            userId: userId
          });
      } else {
        db.collection("rooms")
          .doc(roomId)
          .collection("timers")
          .doc(timers[0].id)
          .update({
            startTime: timeStamp,
            roomId: roomId,
            userId: userId
          });
      }
      // console.log(timers[0].data());
    });
};
