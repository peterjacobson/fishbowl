import { Router } from "@reach/router";
import React from "react";
import styled from "styled-components";
import { ModalProvider } from "styled-react-modal";
import "./App.css";
import CreateRoom from "./scenes/CreateRoom2";
import InsideRoom from "./scenes/InsideRoom";
import JoinRoom from "./scenes/JoinRoom";

const AppWrapper = styled.div`
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

function App() {
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
