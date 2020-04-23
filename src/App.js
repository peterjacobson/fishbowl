import { Router } from "@reach/router";
import React from "react";
import { ModalProvider } from "styled-react-modal";
import "./App.css";
import CreateRoom from "./scenes/CreateRoom2";
import JoinRoom from "./scenes/JoinRoom";
import MyCheckin from "./scenes/MyCheckin";
import CheckInTogether from "./scenes/CheckInTogether";
import Feedback from "./scenes/Feedback";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <ModalProvider>
      <Router className="full-height">
        <CreateRoom path="/" userId={"sdlfkjlksdjf"} />
        <JoinRoom path="/join-room/:roomId" />
        <MyCheckin path="/room/:roomId/user/:userId/my-check-in" />
        <CheckInTogether path="/room/:roomId/user/:userId/check-in-together" />
        <Feedback path="/room/:roomId/user/:userId/feedback" />
      </Router>
      <ToastContainer hideProgressBar closeOnClick={false} />
    </ModalProvider>
  );
}

export default App;
