import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import styled from "styled-components";
import { ModalProvider } from "styled-react-modal";

import * as FirestoreService from "./services/firestore";
import "./App.css";
import CreateRoom from "./scenes/CreateRoom";
import JoinRoom from "./scenes/JoinRoom";
import InsideRoom from "./scenes/InsideRoom";
// import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

import useQueryString from "./hooks/useQueryString";

const AppWrapper = styled.div`
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

function App() {
  const [user, setUser] = useState();
  const [userId, setUserId] = useState();
  const [room, setroom] = useState();
  const [error, setError] = useState();
  // Use a custom hook to subscribe to the grocery list ID provided as a URL query parameter
  const [roomId, setroomId] = useQueryString("listId");

  // For Create Room & Join Room
  useEffect(() => {
    FirestoreService.authenticateAnonymously()
      .then((userCredential) => {
        setUserId(userCredential.user.uid);
        if (roomId) {
          FirestoreService.getroom(roomId)
            .then((room) => {
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

  // Just for Join Room
  function onSelectUser(userName) {
    setUser(userName);
    FirestoreService.getroom(roomId)
      .then((updatedroom) => setroom(updatedroom.data()))
      .catch(() => setError("grocery-list-get-fail"));
  }

  return (
    <AppWrapper>
      <ModalProvider>
        <Router>
          <CreateRoom path="/" onCreate={onroomCreate} userId={"sdlfkjlksdjf"}>
            {/* Welcome */}
            {/* Room Config */}
            {/* Share link to room */}
          </CreateRoom>
          <JoinRoom
            path="/join/:roomId"
            users={[]}
            roomId={"ljdslkjfds"}
            userId={"dsljkdsf"}
            // {...{ roomId, onSelectUser, userId }}
          />
          <InsideRoom
            path="/room/:roomId/user/:userId"
            users={[]}
            roomId={"ljdslkjfds"}
            userId={"dsljkdsf"}
          >
            <p>INSIDE</p>
            {/* Select Checkin */}
            {/* ? Spoken Checkin  */}
            {/* Next steps */}
          </InsideRoom>
        </Router>
      </ModalProvider>
    </AppWrapper>
  );
}

export default App;
