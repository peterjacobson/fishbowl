import React, { useEffect, useState } from "react";

import * as FirestoreService from "../services/firestore";
import CheckinSmall from "../components/CheckinSmall";
import CheckinSelector from "../components/CheckinSelector";

export default function MyCheckin({ roomId, userId }) {
  const [error, setError] = useState(null);
  const [myCheckIn, setMyCheckIn] = useState([]);
  const [roomConfig, setRoomConfig] = useState({});
  const [roomUsers, setRoomUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = FirestoreService.streamRoom(roomId, {
      next: (querySnapshot) => {
        const queryData = querySnapshot.data();
        setRoomUsers(queryData.users);
        // setTimer(querySnapshot.data().timer || defaultTimer);
        setRoomConfig(queryData.config);
        debugger;
      },
      error: () => setError("grocery-list-item-get-fail"),
    });
    return unsubscribe;
  }, [roomId]);

  return (
    <>
      <h1>Select my check-in</h1>
      <CheckinSelector
        {...{ myCheckIn, roomConfig, roomId, setMyCheckIn, userId }}
      />
      <CheckinSmall myCheckIn={myCheckIn} roomId={roomId} userId={userId} />
      <button>I'm Ready</button>
      {error && <p>error</p>}
    </>
  );
}
