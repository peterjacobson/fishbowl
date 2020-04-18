import React, { useEffect, useState } from "react";
import { navigate } from "@reach/router";

import * as FirestoreService from "../services/firestore";
import CheckinSmall from "../components/CheckinSmall";

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
    FirestoreService.streamRoom(roomId, {
      next: (querySnapshot) => {
        const queryData = querySnapshot.data();
        setRoomUsers(queryData.users);
        // setTimer(querySnapshot.data().timer || defaultTimer);
      },
      error: () => setError("grocery-list-item-get-fail"),
    });
  }, [roomId]);

  useEffect(() => {
    FirestoreService.streamRoomCheckIns(roomId, {
      next: (querySnapshot) => {
        const nextCheckins = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        );
        setCheckIns(nextCheckins);
        const myNextCheckIn = nextCheckins.find((checkin) => {
          return checkin.userId === userId;
        });
        if (myNextCheckIn) setMyCheckIn(myNextCheckIn.checkInWords);
      },
      error: () => setError("grocery-list-item-get-fail"),
    });
  }, [roomId, userId]);

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
        <CheckinSmall
          showRemoveIcon={false}
          {...{ myCheckIn, roomId, userId }}
        />
      )}

      <button>We've all checked in</button>
    </>
  );
}
