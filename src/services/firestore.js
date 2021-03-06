import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

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
    usedWordPhrases: [],
    roundWordPhrasesLeft: wordPhrasesList,
    round: 0, // five rounds, 0-4
    roundActive: false,
    turnActive: false,
    team0: [],
    team1: [],
    currentTeam: 0, // set team who's turn it is.
    currentPlayers: [0, 0], // set active player. when I finish my turn, it checks my index and sets the next index to be that +1 % team length
    turnStartTime: null, // set with Date.now() on turn start
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
    });
};

export const updateRoom = (roomId, update) => {
  return db.collection("rooms").doc(roomId).update(update);
};

export const createTeams = (roomId, teams, teamNames) => {
  return db
    .collection("rooms")
    .doc(roomId)
    .update({
      team0: teams[0],
      team1: teams[1],
      teamNames: teamNames,
      points: [0, 0],
    });
};

export const startRound = (roomId, roundWordPhrases) => {
  return db.collection("rooms").doc(roomId).update({
    roundActive: true,
    roundWordPhrasesLeft: roundWordPhrases,
  });
};

export const startTurn = (roomId, startTime, nextRoundWordPhrasesLeft) => {
  return db.collection("rooms").doc(roomId).update({
    turnActive: true,
    turnStartTime: startTime,
    roundWordPhrasesLeft: nextRoundWordPhrasesLeft,
  });
};

export const endTurn = (
  roomId,
  nextCurrentPlayers,
  nextCurrentTeam,
  nextRoundWordPhrasesLeft,
  roundWordPhrasesLeft
) => {
  console.log("------------: ");
  console.log("END TURN: ");
  console.log("roundWordPhrasesLeft: ", roundWordPhrasesLeft);
  console.log("nextRoundWordPhrasesLeft: ", nextRoundWordPhrasesLeft);
  console.log("------------: ");
  if (nextRoundWordPhrasesLeft.length > roundWordPhrasesLeft) return null;
  return db.collection("rooms").doc(roomId).update({
    turnActive: false,
    turnStartTime: null,
    currentPlayers: nextCurrentPlayers,
    currentTeam: nextCurrentTeam,
  });
};

export const teamGotIt = (roomId, nextRoundWordPhrasesLeft, nextPoints) => {
  return db.collection("rooms").doc(roomId).update({
    roundWordPhrasesLeft: nextRoundWordPhrasesLeft,
    points: nextPoints,
  });
};

export const cheated = (roomId, nextRoundWordPhrasesLeft) => {
  return db.collection("rooms").doc(roomId).update({
    roundWordPhrasesLeft: nextRoundWordPhrasesLeft,
  });
};

export const teamGotItOuttaWords = (
  roomId,
  nextRoundWordPhrasesLeft,
  nextPoints,
  nextRound,
  nextCurrentPlayers,
  nextCurrentTeam
) => {
  return db.collection("rooms").doc(roomId).update({
    roundWordPhrasesLeft: nextRoundWordPhrasesLeft,
    points: nextPoints,
    turnActive: false,
    roundActive: false,
    round: nextRound,
    currentPlayers: nextCurrentPlayers,
    currentTeam: nextCurrentTeam,
  });
  /// End turn too - increment currentPlayers cound
};
