import React, { useEffect, useState, useRef } from "react";
import { navigate } from "@reach/router";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import { addedDiff } from "deep-object-diff";
import size from "lodash.size";

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
  Button,
  Need,
  GreenFeeling,
  PeachFeeling,
  Strategy,
  SnapButton,
  ToastName,
} from "../components/styledComponents";

export default function MyCheckin({ roomId, userId }) {
  const [error, setError] = useState(null);
  const [myCheckIn, setMyCheckIn] = useState([]);
  const [roomConfig, setRoomConfig] = useState({});
  const [roomUsers, setRoomUsers] = useState([]);
  const [linkCopied, setLinkCopied] = useState(false);
  const [checkIns, setCheckIns] = useState([]);
  const [openAccordion, setOpenAccordion] = useState(null);

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const typeHash = {
    green: GreenFeeling,
    peach: PeachFeeling,
    need: Need,
    strategy: Strategy,
  };

  const numberAllowedDict = {
    green: "numGreenFeelings",
    peach: "numPeachFeelings",
    need: "numNeeds",
    strategy: "numStrategies",
  };

  function Bread({ userName, type, word }) {
    const C = typeHash[type];
    return (
      <C>
        <ToastName>{userName}</ToastName>
        {word}
        <SnapButton onClick={() => handleSnap({ userName, type, word })}>
          SNAP
        </SnapButton>
      </C>
    );
  }

  function handleSnap({ userName, type, word }) {
    const checkInOfType = myCheckIn.filter((item) => item.type === type);
    if (checkInOfType.length < roomConfig[numberAllowedDict[type]] + 2) {
      addCheckinWord(type, word);
    }
  }

  function makeToast(props) {
    toast(<Bread {...props} />, {
      className: "checkin-toast",
    });
  }

  function addCheckinWord(type, word) {
    const nextCheckin = [...myCheckIn, { type, word }];
    setMyCheckIn(nextCheckin);
    FirestoreService.updateCheckIn(nextCheckin, roomId, userId);
  }

  const prevCheckIns = usePrevious(checkIns);

  // function makeToasts(prevCheckIns, checkIns) {}

  useEffect(() => {
    checkIns
      .filter((checkIn) => checkIn.userId !== userId)
      .forEach((checkIn, i) => {
        if (prevCheckIns.length > 0) {
          const userName = roomUsers.find(
            (user) => user.userId === checkIn.userId
          ).name;
          const prevCheckIn =
            prevCheckIns.find(
              (prevCheckin) => prevCheckin.userId === checkIn.userId
            ) || [];
          const diff = addedDiff(prevCheckIn, checkIn);
          if (size(diff) > 0) {
            const newItems = addedDiff(prevCheckIn, checkIn).checkInWords;
            Object.keys(newItems).forEach((key) => {
              const type = newItems[key].type;
              const word = newItems[key].word;
              makeToast({ userName: userName, type: type, word: word });
            });
          }
        }
      });
  }, [checkIns]);

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
        // makeToasts(prevCheckIns, nextCheckins);
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
              showRemoveIcon={false}
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
    <>
      <MauveBackground onClick={() => setOpenAccordion(null)}>
        <MobileWidthWrapper>
          <RightSpan>
            <CopyToClipboard
              text={`${window.location.origin}/join-room/${roomId}`}
            >
              <MauveButton onClick={updateLinkCopyState}>
                <ButtonText>
                  Copy invite url
                  {linkCopied ? "  🙌 Link copied" : null}
                </ButtonText>
              </MauveButton>
            </CopyToClipboard>
          </RightSpan>
          <Heading>Select your check-in</Heading>
          {/* <Button onClick={makeToast}>TOASTMASTER</Button> */}
          {roomConfig ? selectors() : null}

          <br />
          <Heading>Other's check-ins</Heading>
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
    </>
  );
}
