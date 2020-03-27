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

export const createGroceryList = (userName, userId) => {
  return db.collection("groceryLists").add({
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

export const getGroceryList = groceryListId => {
  return db
    .collection("groceryLists")
    .doc(groceryListId)
    .get();
};

export const getGroceryListItems = groceryListId => {
  return db
    .collection("groceryLists")
    .doc(groceryListId)
    .collection("items")
    .get();
};

export const streamGroceryListItems = (groceryListId, observer) => {
  return db
    .collection("groceryLists")
    .doc(groceryListId)
    .collection("items")
    .orderBy("created")
    .onSnapshot(observer);
};

export const addUserToGroceryList = (userName, groceryListId, userId) => {
  return db
    .collection("groceryLists")
    .doc(groceryListId)
    .update({
      users: firebase.firestore.FieldValue.arrayUnion({
        userId: userId,
        name: userName
      })
    });
};

export const addGroceryListItem = (item, groceryListId, userId) => {
  return getGroceryListItems(groceryListId)
    .then(querySnapshot => querySnapshot.docs)
    .then(groceryListItems =>
      groceryListItems.find(
        groceryListItem =>
          groceryListItem.data().name.toLowerCase() === item.toLowerCase()
      )
    )
    .then(matchingItem => {
      if (!matchingItem) {
        return db
          .collection("groceryLists")
          .doc(groceryListId)
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
