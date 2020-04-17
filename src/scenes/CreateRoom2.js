import React, { useState } from "react";
import * as FirestoreService from "../services/firestore";

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

    FirestoreService.authenticateAnonymously()
      .then((userCredential) => {
        setUserId(userCredential.user.uid);
        console.log("userCredential: ", userCredential);
        FirestoreService.createroom(userName, userId)
          .then((docRef) => {
            setRoomId(docRef.id);
            console.log("docRef: ", docRef);
            console.log("NAV TO ROOM", roomId, userId);
            // navigate to roomConfig
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
      <form name="create-room" onSubmit={createRoom}>
        <input
          autoFocus={true}
          type="text"
          name="userName"
          placeholder="My name is..."
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input type="submit" value="Create room" className="button" />
        {error && <p>{error}</p>}
      </form>
    </>
  );
}

export default CreateList;
