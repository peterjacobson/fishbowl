import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import _ from "lodash";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  databaseURL: "https://zoom-heartwork-guide.firebaseio.com",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export const createroom = (userName, userId, wordPhrasesList) => {
  return db.collection("rooms").add({
    created: firebase.firestore.FieldValue.serverTimestamp(),
    createdBy: userId,
    users: [
      {
        userId: userId,
        name: userName,
      },
    ],
    wordPhrases: wordPhrasesList,
    roundWordPhrasesLeft: wordPhrasesList,
  });
};

export const getroom = (roomId) => {
  return db.collection("rooms").doc(roomId).get();
};

export const streamRoom = (roomId, observer) => {
  return db.collection("rooms").doc(roomId).onSnapshot(observer);
};

export const addUserToroom = (
  userName,
  roomId,
  userId,
  nextWordPhrases,
  nextRoundWordPhrasesLeft
) => {
  return db
    .collection("rooms")
    .doc(roomId)
    .update({
      users: firebase.firestore.FieldValue.arrayUnion({
        userId: userId,
        name: userName,
      }),
      wordPhrases: nextWordPhrases,
      roundWordPhrasesLeft: nextRoundWordPhrasesLeft,
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

export const createTeams = (roomId, teams, teamNames) => {
  return db.collection("rooms").doc(roomId).update({
    team0: teams[0],
    team1: teams[1],
    teamNames: teamNames,
  });
};
