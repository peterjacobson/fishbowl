import React, { useEffect, useState } from "react";
import { navigate } from "@reach/router";
import { CopyToClipboard } from "react-copy-to-clipboard";

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
  RightSpan,
  ButtonText,
  UserCheckInWrapper,
} from "../components/styledComponents";

export default function MyCheckin({ roomId, userId }) {
  const [error, setError] = useState(null);
  const [myCheckIn, setMyCheckIn] = useState([]);
  const [roomConfig, setRoomConfig] = useState({});
  const [roomUsers, setRoomUsers] = useState([]);
  const [linkCopied, setLinkCopied] = useState(false);
  const [checkIns, setCheckIns] = useState([]);
  const [openAccordion, setOpenAccordion] = useState(null);

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

  useEffect(() => {
    const unsubscribe = FirestoreService.streamRoomCheckIns(roomId, {
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
    return unsubscribe;
  }, [roomId, setCheckIns, setMyCheckIn, userId]);

  if (!roomId || !userId) {
    navigate("/");
  }

  function updateLinkCopyState() {
    setLinkCopied(true);
  }

  const labels = {
    green: "One comfortable thing I've felt in the last 24hrs",
    peach: "One uncomfortable thing I've felt in the last 24hrs",
    need: "Three needs that are alive in me",
    strategy: "One strategy I'll try to meet my needs",
  };

  function selectors() {
    return ["green", "peach", "need", "strategy"].map((itemType, index) => {
      return (
        <WordSelectorWrapper key={index}>
          <SelectLabel>{labels[itemType]}</SelectLabel>
          <CheckinSelector
            itemType={itemType}
            accordionIndex={index}
            {...{
              myCheckIn,
              roomConfig,
              roomId,
              setMyCheckIn,
              userId,
              openAccordion,
              setOpenAccordion,
            }}
          />
        </WordSelectorWrapper>
      );
    });
  }

  const otherUsers = roomUsers.filter((user) => user.userId !== userId);

  const otherUsersCheckIns = otherUsers.map((otherUser, index) => {
    const userCheckin = checkIns.find(
      (checkIn) => checkIn.userId === otherUser.userId
    );
    return (
      <UserCheckInWrapper key={index}>
        <h2>{otherUser.name}</h2>
        {userCheckin ? (
          <CheckInSmall
            checkIn={userCheckin.checkInWords}
            roomId={roomId}
            setMyCheckIn={setMyCheckIn}
            showRemoveIcon={true}
            userId={userId}
          />
        ) : (
          "hasn't started checking in"
        )}
      </UserCheckInWrapper>
    );
  });

  return (
    <MauveBackground onClick={() => setOpenAccordion(null)}>
      <MobileWidthWrapper>
        <RightSpan>
          <CopyToClipboard
            text={`${window.location.origin}/join-room/${roomId}`}
          >
            <MauveButton>
              <ButtonText onClick={updateLinkCopyState}>
                Copy invite url
                {linkCopied ? "  🙌 Link copied" : null}
              </ButtonText>
            </MauveButton>
          </CopyToClipboard>
        </RightSpan>
        <Heading>Select your check-in</Heading>
        {roomConfig ? selectors() : null}

        <br />
        {otherUsersCheckIns}
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
