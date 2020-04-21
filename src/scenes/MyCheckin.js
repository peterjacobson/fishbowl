import React, { useEffect, useState } from "react";
import { navigate } from "@reach/router";

import * as FirestoreService from "../services/firestore";
import CheckInSmall from "../components/CheckInSmall";
import CheckinSelector from "../components/CheckinSelector";
import {
  MauveBackground,
  MobileWidthWrapper,
  Heading,
  NavigationButtons,
  NavigationText,
  MauveButton,
  RightArrowIcon,
  SelectLabel,
  WordSelectorWrapper,
} from "../components/styledComponents";

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

  if (!roomId || !userId) {
    navigate("/");
  }

  const labels = {
    green: "One comfortable thing I've felt in the last 24hrs",
    peach: "One uncomfortable thing I've felt in the last 24hrs",
    need: "One need that's alive in me",
    strategy: "One strategy I'll try to meet my needs",
  };

  function selectors() {
    return ["green", "peach", "need", "strategy"].map((itemType, index) => {
      return (
        <WordSelectorWrapper key={index}>
          <SelectLabel>{labels[itemType]}</SelectLabel>
          <CheckinSelector
            itemType={itemType}
            {...{ myCheckIn, roomConfig, roomId, setMyCheckIn, userId }}
          />
        </WordSelectorWrapper>
      );
    });
  }

  return (
    <MauveBackground>
      <MobileWidthWrapper>
        <Heading>Select your check-in</Heading>
        {roomConfig ? selectors() : null}
        <CheckInSmall
          checkIn={myCheckIn}
          roomId={roomId}
          setMyCheckIn={setMyCheckIn}
          showRemoveIcon={true}
          userId={userId}
        />

        {/* TODO: checks before proceed */}
        {/* <button onClick={() => navigate(`/room/${roomId}`)}>I'm Ready</button> */}
        {error && <p>error</p>}
        <NavigationButtons>
          <NavigationText>
            Next:&nbsp;&nbsp;&nbsp;Check-in together
          </NavigationText>
          <MauveButton
            onClick={() =>
              navigate(`/room/${roomId}/user/${userId}/check-in-together`)
            }
          >
            <RightArrowIcon />
          </MauveButton>
        </NavigationButtons>
      </MobileWidthWrapper>
    </MauveBackground>
  );
}
