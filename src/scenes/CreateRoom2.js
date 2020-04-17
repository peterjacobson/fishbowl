import React, { useState, useEffect } from "react";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import * as FirestoreService from "../services/firestore";

// Click GO at end of this form
//    Create a room in firebase
//    Add me as a user to that room
//    Sets config of room
//    Redirects me to that room

function CreateList() {
  const [userName, setUserName] = useState("");
  const [error, setError] = useState();
  const [roomId, setRoomId] = useState(null);
  const [userId, setUserId] = useState(null);

  // Create the room
  function createRoom(e) {
    e.preventDefault();
    if (!userName) {
      setError("user-name-required");
      return;
    }
    setError(null);
    console.log("e: ", e);

    FirestoreService.authenticateAnonymously()
      .then((userCredential) => {
        setUserId(userCredential.user.uid);
        console.log("userCredential: ", userCredential);
        FirestoreService.createroom(userName, userId)
          .then((docRef) => {
            setRoomId(docRef.id);
            console.log("docRef: ", docRef);
          })
          .catch((reason) => {
            setError("create-list-error");
          });
      })
      .catch((e) => {
        console.error(e);
        setError("anonymous-auth-failed");
      });
  }

  return (
    <>
      <h1>
        Open a new
        <br />
        Heartwork
        <br />
        check-in room
      </h1>
      <input
        autoFocus={true}
        type="text"
        name="userName"
        placeholder="My name is..."
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input type="submit" value="Create room" className="button" />
    </>
  );
}

export default CreateList;
