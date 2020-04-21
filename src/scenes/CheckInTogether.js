import React, { useEffect, useState } from "react";
import { navigate } from "@reach/router";

import * as FirestoreService from "../services/firestore";
import CheckInSmall from "../components/CheckInSmall";
import {
  MauveBackground,
  MobileWidthWrapper,
  Heading,
  NarrowCenterText,
  UserCheckInWrapper,
} from "../components/styledComponents";

const CheckInWithTitle = ({ checkIn, userName }) => (
  <UserCheckInWrapper>
    <h2>{userName}'s check-in</h2>
    <CheckInSmall checkIn={checkIn} showRemoveIcon={false} />
  </UserCheckInWrapper>
);

export default function CheckInTogether({ roomId }) {
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

  const otherUsers = roomUsers.filter((user) => user.userId !== userId);

  const otherUsersCheckIns = otherUsers.map((otherUser, index) => {
    const userCheckIn = checkIns.find(
      (checkIn) => checkIn.userId === otherUser.userId
    );

    return (
      <UserCheckInWrapper key={index}>
        <h2>{otherUser.name}</h2>
        {userCheckIn ? (
          userCheckIn.checkInWords.length > 0 ? (
            <CheckInSmall
              checkIn={userCheckIn.checkInWords}
              roomId={roomId}
              setMyCheckIn={setMyCheckIn}
              showRemoveIcon={true}
              userId={userId}
            />
          ) : (
            <p>hasn't selected a check-in yet</p>
          )
        ) : null}
      </UserCheckInWrapper>
    );
  });

  return (
    <MauveBackground>
      <MobileWidthWrapper>
        <Heading>Check-in Together</Heading>
        <NarrowCenterText>
          Each person has an opportunity to speak to the check-in words they
          have chosen
        </NarrowCenterText>
        <h2>My check-in</h2>

        {myCheckIn && (
          <UserCheckInWrapper>
            <CheckInSmall
              checkIn={myCheckIn}
              roomId={roomId}
              showRemoveIcon={false}
              userId={userId}
            />
          </UserCheckInWrapper>
        )}

        {otherUsersCheckIns}

        {/* {checkIns.map((c, i) => (
          <CheckInWithTitle
            checkIn={c.checkInWords}
            key={i}
            userName={roomUsers.find((u) => u.userId === c.userId).name}
          />
        ))} */}
      </MobileWidthWrapper>
    </MauveBackground>
    // <>
    //   <h1>Check-in Together</h1>
    //   <p>
    //     You each have a little time to speak to the words you chose. Everyone
    //     else is called to listen with curiosity, trust, attention and aroha.
    //   </p>
    //   <p>
    //     Trust that any responses can wait until everyone has checked in (you can
    //     just do another round if it's feeling called for).
    //   </p>
    //   <button>Start my check-in</button>

    //   {error && <p>{error}</p>}

    //   <button>We've all checked in</button>
    // </>
  );
}
