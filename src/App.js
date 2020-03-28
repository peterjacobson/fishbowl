import React, { useState, useEffect } from "react";

import * as FirestoreService from "./services/firestore";

import CreateRoom from "./scenes/CreateRoom";
import JoinRoom from "./scenes/JoinRoom";
import InsideRoom from "./scenes/InsideRoom";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

import useQueryString from "./hooks/useQueryString";

function App() {
  const [user, setUser] = useState();
  const [userId, setUserId] = useState();
  const [room, setroom] = useState();
  const [error, setError] = useState();

  // Use a custom hook to subscribe to the grocery list ID provided as a URL query parameter
  const [roomId, setroomId] = useQueryString("listId");

  // Use an effect to authenticate and load the grocery list from the database
  useEffect(() => {
    FirestoreService.authenticateAnonymously()
      .then(userCredential => {
        setUserId(userCredential.user.uid);
        if (roomId) {
          FirestoreService.getroom(roomId)
            .then(room => {
              if (room.exists) {
                setError(null);
                setroom(room.data());
              } else {
                setError("grocery-list-not-found");
                setroomId();
              }
            })
            .catch(() => setError("grocery-list-get-fail"));
        }
      })
      .catch(() => setError("anonymous-auth-failed"));
  }, [roomId, setroomId]);

  function onroomCreate(roomId, userName) {
    setroomId(roomId);
    setUser(userName);
  }

  function onCloseroom() {
    setroomId();
    setroom();
    setUser();
  }

  function onSelectUser(userName) {
    setUser(userName);
    FirestoreService.getroom(roomId)
      .then(updatedroom => setroom(updatedroom.data()))
      .catch(() => setError("grocery-list-get-fail"));
  }

  // render a scene based on the current state
  if (room && user) {
    return (
      <InsideRoom
        users={room.users}
        {...{ roomId, user, onCloseroom, userId }}
      ></InsideRoom>
    );
  } else if (room) {
    return (
      <div>
        <ErrorMessage errorCode={error}></ErrorMessage>
        <JoinRoom
          users={room.users}
          {...{ roomId, onSelectUser, onCloseroom, userId }}
        ></JoinRoom>
      </div>
    );
  }
  return (
    <div>
      <ErrorMessage errorCode={error}></ErrorMessage>
      <CreateRoom onCreate={onroomCreate} userId={userId}></CreateRoom>
    </div>
  );
}

export default App;
