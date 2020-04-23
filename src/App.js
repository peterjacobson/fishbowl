import { Router } from "@reach/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ModalProvider } from "styled-react-modal";
import "./App.css";
import CheckInTogether from "./scenes/CheckInTogether";
import CreateRoom from "./scenes/CreateRoom2";
import JoinRoom from "./scenes/JoinRoom";
import MyCheckin from "./scenes/MyCheckin";
import { AuthContext, useAuth } from "./services/auth";
import { streamRoom, streamRoomCheckIns } from "./services/firestore";
import { RoomContext } from "./services/room";

const AppWrapper = styled.div`
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

function App() {
  const auth = useAuth();

  const [checkInData, setCheckInData] = useState();
  const [roomId, setRoomId] = useState();
  const [roomData, setRoomData] = useState();
  const [unsubscribe, setUnsubscribe] = useState();
  const [unsubscribeCheckIns, setUnsubscribeCheckIns] = useState();

  const leaveRoom = () => {
    if (typeof unsubscribe === "function") {
      unsubscribe();
    }
    if (typeof unsubscribeCheckIns === "function") {
      unsubscribeCheckIns();
    }
  };

  useEffect(() => {
    if (!roomId) {
      leaveRoom();
      return;
    }

    const unsub = streamRoom(roomId, {
      next: (querySnapshot) => setRoomData(querySnapshot.data()),
      error: console.error,
    });
    setUnsubscribe(() => unsub);

    const unsubCheckIns = streamRoomCheckIns(roomId, {
      next: (querySnapshot) =>
        setCheckInData(
          querySnapshot.docs.map((docSnapshot) => docSnapshot.data())
        ),
      error: console.error,
    });
    setUnsubscribeCheckIns(() => unsubCheckIns);
  }, [roomId, setRoomData]);

  return (
    <AppWrapper>
      <ModalProvider>
        <AuthContext.Provider value={auth}>
          <RoomContext.Provider value={{ checkInData, roomData, setRoomId }}>
            <Router>
              <CreateRoom path="/">
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
              <CheckInTogether path="/room/:roomId" />
              {/* ? Spoken Checkin  */}
              {/* Next steps */}
            </Router>
          </RoomContext.Provider>
        </AuthContext.Provider>
      </ModalProvider>
    </AppWrapper>
  );
}

export default App;
