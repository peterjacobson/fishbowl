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
      },
      error: () => setError("grocery-list-item-get-fail"),
    });
    return unsubscribe;
  }, [roomId]);

  return (
    <>
      <h1>Select my check-in</h1>

      {roomConfig && roomConfig.numGreenFeelings > 0 && (
        <>
          <span>A feeling I've felt in the last 24 hrs</span>
          <CheckinSelector
            itemType="green"
            {...{ myCheckIn, roomConfig, roomId, setMyCheckIn, userId }}
          />
        </>
      )}
      {roomConfig && roomConfig.numPeachFeelings > 0 && (
        <>
          <span>A feeling I've felt in the last 24 hrs</span>
          <CheckinSelector
            itemType="peach"
            {...{ myCheckIn, roomConfig, roomId, setMyCheckIn, userId }}
          />
        </>
      )}
      {roomConfig && roomConfig.numNeeds > 0 && (
        <>
          <span>A need I'd love to meet</span>
          <CheckinSelector
            itemType="need"
            {...{ myCheckIn, roomConfig, roomId, setMyCheckIn, userId }}
          />
        </>
      )}
      <>
        <span>A strategy to meet a need of mine</span>
        <CheckinSelector
          itemType="strategy"
          {...{ myCheckIn, roomConfig, roomId, setMyCheckIn, userId }}
        />
      </>
      <CheckinSmall
        myCheckIn={myCheckIn}
        roomId={roomId}
        showRemoveIcon={true}
        userId={userId}
      />
      <button>I'm Ready</button>
      {error && <p>error</p>}
    </>
  );
}

