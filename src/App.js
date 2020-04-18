import { Router } from "@reach/router";
import React from "react";
import styled from "styled-components";
import { ModalProvider } from "styled-react-modal";
import "./App.css";
import CreateRoom from "./scenes/CreateRoom2";
import JoinRoom from "./scenes/JoinRoom";
// import MyCheckin from "./scenes/MyCheckin";

// checkin from this morning: roomId: LqGk5TJYtASTCSwhv0T4, userID: WFUsJEWKdIVdHRHr41LbjBjmPfh2
//

function App() {
  return (
    <ModalProvider>
      <Router class="full-height">
        <CreateRoom path="/" userId={"sdlfkjlksdjf"}>
          {/* Welcome */}
          {/* Room Config */}
          {/* Share link to room */}
        </CreateRoom>
        <JoinRoom
          path="/join"
          // users={[]}
          // roomId={"ljdslkjfds"}
          // userId={"dsljkdsf"}
          // {...{ roomId, onSelectUser, userId }}
        />
        {/* <MyCheckin path="/room/:roomId/user/:userId" /> */}
        {/* Select Checkin */}
        {/* ? Spoken Checkin  */}
        {/* Next steps */}
      </Router>
    </ModalProvider>
  );
}

export default App;
