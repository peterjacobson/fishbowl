import { Router } from "@reach/router";
import React from "react";
import { ModalProvider } from "styled-react-modal";
import "./App.css";
import CreateRoom from "./scenes/CreateRoom2";
import CheckInTogether from "./scenes/CheckInTogether";
import JoinRoom from "./scenes/JoinRoom";
import MyCheckin from "./scenes/MyCheckin";

function App() {
  return (
    <ModalProvider>
      <Router className="full-height">
        <CreateRoom path="/" userId={"sdlfkjlksdjf"} />
        <JoinRoom path="/join-room/:roomId" />
        <MyCheckin path="/room/:roomId/user/:userId/my-check-in" />
        <CheckInTogether path="/room/:roomId/user/:userId/check-in-together" />
      </Router>
    </ModalProvider>
  );
}

export default App;
