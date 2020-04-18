import React, { useEffect, useState } from "react";
import { navigate } from "@reach/router";

import * as FirestoreService from "../services/firestore";
import CheckInSmall from "../components/CheckInSmall";

export default function CheckinTogether({ roomId }) {
  const [error, setError] = useState(null);
  const [roomUsers, setRoomUsers] = useState([]);
  const [myCheckIn, setMyCheckIn] = useState(null);
  const [checkIns, setCheckIns] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    FirestoreService.getCurrentUser((user) => {
      if (user) {
        return setUserId(user.uid);
      }
      navigate("/");
    });
  });

  useEffect(() => {
    const unsubscribe = FirestoreService.streamRoom(roomId, {
      next: (querySnapshot) => {
        const queryData = querySnapshot.data();
        setRoomUsers(queryData.users);
        // setTimer(querySnapshot.data().timer || defaultTimer);
      },
      error: () => setError("grocery-list-item-get-fail"),
    });

    return unsubscribe;
  }, [roomId, setRoomUsers]);

  useEffect(() => {
    const unsubscribe = FirestoreService.streamRoomCheckIns(roomId, {
      next: (querySnapshot) => {
        const nextCheckIns = querySnapshot.docs.map((docSnapshot) => {
          return docSnapshot.data();
        });
        setCheckIns(nextCheckIns.filter((c) => c.userId !== userId));
        const myNextCheckIn = nextCheckIns.find((checkIn) => {
          return checkIn.userId === userId;
        });
        if (myNextCheckIn) {
          setMyCheckIn(myNextCheckIn.checkInWords);
        }
      },
      error: () => setError("grocery-list-item-get-fail"),
    });

    return unsubscribe;
  }, [roomId, setCheckIns, setError, setMyCheckIn, userId]);

  return (
    <>
      <h1>Check-in Together</h1>
      <p>
        You each have a little time to speak to the words you chose. Everyone
        else is called to listen with curiosity, trust, attention and aroha.
      </p>
      <p>
        Trust that any responses can wait until everyone has checked in (you can
        just do another round if it's feeling called for).
      </p>
      <button>Start my check-in</button>

      {error && <p>{error}</p>}

      <h3>My Check-in</h3>

      {myCheckIn && (
        <CheckInSmall
          checkIn={myCheckIn}
          roomId={roomId}
          showRemoveIcon={false}
          userId={userId}
        />
      )}

      <h3>Others' Check-ins</h3>
      {checkIns.map((c) => (
        <CheckInSmall
          checkIn={c.checkInWords}
          roomId={roomId}
          showRemoveIcon={false}
          userId={userId}
        />
      ))}

      <button>We've all checked in</button>
    </>
  );
}
