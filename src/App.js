import { Router } from "@reach/router";
import React from "react";
import { ModalProvider } from "styled-react-modal";
import "./App.css";
import CreateGame from "./scenes/CreateGame";
import JoinRoom from "./scenes/JoinRoom";
import FishBowl from "./scenes/FishBowl";

function App() {
  return (
    <ModalProvider>
      <Router className="full-height">
        <CreateGame path="/" />
        <JoinRoom path="/join-room/:roomId" />
        <FishBowl path="/room/:roomId/user/:userId/bowl" />
      </Router>
    </ModalProvider>
  );
}

export default App;
