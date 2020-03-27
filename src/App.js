import React, { useState, useEffect } from "react";

import * as FirestoreService from "./services/firestore";

import CreateList from "./scenes/CreateList/CreateList";
import JoinList from "./scenes/JoinList/JoinList";
import EditList from "./scenes/EditList/EditList";
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
    return <EditList {...{ roomId, user, onCloseroom, userId }}></EditList>;
  } else if (room) {
    return (
      <div>
        <ErrorMessage errorCode={error}></ErrorMessage>
        <JoinList
          users={room.users}
          {...{ roomId, onSelectUser, onCloseroom, userId }}
        ></JoinList>
      </div>
    );
  }
  return (
    <div>
      <ErrorMessage errorCode={error}></ErrorMessage>
      <CreateList onCreate={onroomCreate} userId={userId}></CreateList>
    </div>
  );
}

export default App;
