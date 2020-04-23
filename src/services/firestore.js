import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  databaseURL: "https://zoom-heartwork-guide.firebaseio.com",
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

// FIRESTORE DATA EXAMPLE
// const roomObjectExampleInDB = {
//   created: 2197091370932,
//   createdBy: "userId",
//   users: [
//     {
//       name: "Peter",
//       userId: "ojsdoi8u3840423",
//     },
//   ],
//   timer: {
//     name: "Peter",
//     userId: "ojsdoi8u3840423",
//     startTime: 12984093289058,
//   },
//   config: {
//     timerLength: 60, //s
//     checkInFormat: ["green", "peach", "need", "need", "need"],
//   },
// };
//
// const checkInOjectExampleinDB = {
//   userId: "0992308432",
//   userName: "Peter",
//   checkIn: [
//     { type: "need", word: "belonging" },
//     { type: "peach", word: "angry" },
//     { type: "green", word: "grateful" },
//   ],
// };
//
export const createroom = (
  userName,
  userId,
  checkinTime = 60,
  checkinQuestionSet,
  hasSpokenCheckin = false
) => {
  return db.collection("rooms").add({
    created: firebase.firestore.FieldValue.serverTimestamp(),
    createdBy: userId,
    users: [
      {
        userId: userId,
        name: userName,
      },
    ],
    config: {
      // TODO: Defaults for now
      hasSpokenCheckin,
      numGreenFeelings: 1,
      numPeachFeelings: 1,
      numNeeds: 3,
      numStrategies: 1,
      timerLength: checkinTime,
      ...checkinQuestionSet,
    },
  });
};

export const getroom = (roomId) => {
  return db.collection("rooms").doc(roomId).get();
};

export const streamRoom = (roomId, observer) => {
  return db.collection("rooms").doc(roomId).onSnapshot(observer);
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
        name: userName,
      }),
    });
};

export const getCurrentUser = (f) => firebase.auth().onAuthStateChanged(f);

export const updateCheckIn = (checkIn, roomId, userId) => {
  const checkInDbEntry = {
    userId: userId,
    checkInWords: checkIn,
  };
  db.collection("rooms")
    .doc(roomId)
    .collection("checkIns")
    .get()
    .then((querySnapshot) => querySnapshot.docs)
    .then((checkIns) =>
      checkIns.find((checkIn) => checkIn.data().userId === userId)
    )
    .then((matchingCheckIn) => {
      if (!matchingCheckIn) {
        return db
          .collection("rooms")
          .doc(roomId)
          .collection("checkIns")
          .add(checkInDbEntry);
      } else {
        return db
          .collection("rooms")
          .doc(roomId)
          .collection("checkIns")
          .doc(matchingCheckIn.id)
          .update(checkInDbEntry);
      }
    });
};

export const startTimer = (timeStamp, roomId, userId, userName) => {
  db.collection("rooms")
    .doc(roomId)
    .update({
      timer: {
        startTime: timeStamp,
        userId: userId,
        userName: userName,
      },
    });
};
export const stopTimer = (roomId) => {
  db.collection("rooms").doc(roomId).update({
    timer: {},
  });
};
// export const startTimer = (timeStamp, roomId, userId) => {
//   db.collection("rooms")
//     .doc(roomId)
//     .collection("timers")
//     .get()
//     .then(querySnapshot => querySnapshot.docs)
//     .then(timers => {
//       if (timers.length < 1) {
//         db.collection("rooms")
//           .doc(roomId)
//           .collection("timers")
//           .add({
//             startTime: timeStamp,
//             roomId: roomId,
//             userId: userId
//           });
//       } else {
//         db.collection("rooms")
//           .doc(roomId)
//           .collection("timers")
//           .doc(timers[0].id)
//           .update({
//             startTime: timeStamp,
//             roomId: roomId,
//             userId: userId
//           });
//       }
//       // console.log(timers[0].data());
//     });
// };
