import { Router } from "@reach/router";
import React from "react";
import styled from "styled-components";
import { ModalProvider } from "styled-react-modal";
import "./App.css";
import CreateRoom from "./scenes/CreateRoom2";
import CheckinTogether from "./scenes/CheckinTogether";
import JoinRoom from "./scenes/JoinRoom";
import MyCheckin from "./scenes/MyCheckin";

const AppWrapper = styled.div`
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

// checkin from this morning: roomId: LqGk5TJYtASTCSwhv0T4, userID: WFUsJEWKdIVdHRHr41LbjBjmPfh2
//

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
          <MyCheckin path="/room/:roomId/user/:userId" />
          <CheckinTogether path="/room/:roomId" />
          {/* ? Spoken Checkin  */}
          {/* Next steps */}
        </Router>
      </ModalProvider>
    </AppWrapper>
  );
}

export default App;
