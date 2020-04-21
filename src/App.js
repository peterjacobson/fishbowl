import { Router } from "@reach/router";
import React from "react";
import { ModalProvider } from "styled-react-modal";
import "./App.css";
import CreateRoom from "./scenes/CreateRoom2";
import CheckInTogether from "./scenes/CheckInTogether";
import JoinRoom from "./scenes/JoinRoom";
import MyCheckin from "./scenes/MyCheckin";

// checkin from this morning: roomId: LqGk5TJYtASTCSwhv0T4, userID: WFUsJEWKdIVdHRHr41LbjBjmPfh2
//

function App() {
  return (
    <ModalProvider>
      <Router className="full-height">
        <CreateRoom path="/" userId={"sdlfkjlksdjf"}>
          {/* Welcome */}
          {/* Room Config */}
          {/* Share link to room */}
        </CreateRoom>
        <JoinRoom
          path="/join-room/:roomId"
          users={[]}
          roomId={"ljdslkjfds"}
          userId={"dsljkdsf"}
          // {...{ roomId, onSelectUser, userId }}
        />
        <MyCheckin path="/room/:roomId/user/:userId/my-check-in" />
        <CheckInTogether path="/room/:roomId/user/:userId/check-in-together" />
        {/* Next steps */}
      </Router>
    </ModalProvider>
  );
}

export default App;
