import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import styled from "styled-components";
import { ModalProvider } from "styled-react-modal";

import "./App.css";
import CreateRoom from "./scenes/CreateRoom2";
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

  // Just for Join Room
  // function onSelectUser(userName) {
  //   setUser(userName);
  //   FirestoreService.getroom(roomId)
  //     .then((updatedroom) => setroom(updatedroom.data()))
  //     .catch(() => setError("grocery-list-get-fail"));
  // }
  //
  return (
    <AppWrapper>
      <ModalProvider>
        <Router>
          <CreateRoom path="/" userId={"sdlfkjlksdjf"}>
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
