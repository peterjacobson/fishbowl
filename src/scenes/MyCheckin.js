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

  return (
    <MauveBackground>
      <MobileWidthWrapper>
        <Heading>Select your check-in</Heading>

        {roomConfig && roomConfig.numGreenFeelings > 0 && (
          <>
            <SelectLabel>
              One comfortable thing I've felt in the last 24 hrs
            </SelectLabel>
            <CheckinSelector
              itemType="green"
              {...{ myCheckIn, roomConfig, roomId, setMyCheckIn, userId }}
            />
          </>
        )}
        {roomConfig && roomConfig.numPeachFeelings > 0 && (
          <>
            <SelectLabel>
              One uncomfortable thing I've felt in the last 24 hrs
            </SelectLabel>
            <CheckinSelector
              itemType="peach"
              {...{ myCheckIn, roomConfig, roomId, setMyCheckIn, userId }}
            />
          </>
        )}
        {roomConfig && roomConfig.numNeeds > 0 && (
          <>
            <SelectLabel>One need that's alive for me now</SelectLabel>
            <CheckinSelector
              itemType="need"
              {...{ myCheckIn, roomConfig, roomId, setMyCheckIn, userId }}
            />
          </>
        )}
        <>
          <SelectLabel>One strategy to meet my needs</SelectLabel>
          <CheckinSelector
            itemType="strategy"
            {...{ myCheckIn, roomConfig, roomId, setMyCheckIn, userId }}
          />
        </>
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
