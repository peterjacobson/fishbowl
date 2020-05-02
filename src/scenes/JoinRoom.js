import React, { useState, useEffect } from "react";
import * as FirestoreService from "../services/firestore";
import { navigate } from "@reach/router";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

import {
  BlueBackground,
  MobileWidthWrapper,
  SwatchHeading,
  NameTextField,
  NavigationButtons,
  NavigationText,
  Button,
  Error,
  CenterForm,
  RightArrowIcon,
  HeartworkLogoBig,
  WhiteFadeBackground,
  WhiteBackground,
  ButtonWithText,
  NarrowCenterText,
} from "../components/styledComponents";
import Footer from "../components/Footer";

function JoinRoom(props) {
  const roomId = props.location.pathname.substr(11);
  const [room, setRoom] = useState({ users: [] });
  const [userName, setUserName] = useState("");
  const [error, setError] = useState();
  const wordPhraseIndexes = [0, 1, 2];
  const initialWordPhraseState = wordPhraseIndexes.reduce((obj, i) => {
    return { ...obj, [i]: "" };
  }, {});
  const [wordPhrases, setWordPhrases] = useState(initialWordPhraseState);
  const unfilledWordPhrases = _.find(wordPhrases, (word) => word === "");

  useEffect(() => {
    const unsubscribe = FirestoreService.streamRoom(roomId, {
      next: (querySnapshot) => {
        const queryData = querySnapshot.data();
        setRoom(queryData);
      },
      error: () => setError("grocery-list-item-get-fail"),
    });
    return unsubscribe;
  }, [roomId, setRoom]);

  function joinRoom(e) {
    e.preventDefault();
    if (!userName || unfilledWordPhrases) {
      setError("all-fields-required");
      return;
    }
    setError(null);

    const userId = uuidv4();
    const wordPhrasesList = _.values(wordPhrases);
    const nextWordPhrasesList = [...room.wordPhrases, ...wordPhrasesList];

    const nextRoundWordPhrasesLeft = _.shuffle([
      ...room.roundWordPhrasesLeft,
      ...wordPhrasesList,
    ]);

    FirestoreService.addUserToroom(
      userName,
      roomId,
      userId,
      nextWordPhrasesList,
      nextRoundWordPhrasesLeft
    ).then(() => {
      navigate(`/room/${roomId}/user/${userId}/bowl`);
    });
  }

  // function addExistingUser(e) {
  //   e.preventDefault();
  //   onSelectUser(e.target.innerText);
  // }

  // function getUserButtonList() {
  //   const buttonList = users.map((user) => (
  //     <button key={user.name} onClick={addExistingUser}>
  //       {user.name}
  //     </button>
  //   ));
  //   return <div className="button-group">{buttonList}</div>;
  // }

  // function addNewUser(e) {
  //   e.preventDefault();
  //   setError(null);

  //   const userName = document.addUserToListForm.name.value;
  //   if (!userName) {
  //     setError("user-name-required");
  //     return;
  //   }

  //   if (users.find((user) => user.name === userName)) {
  //     onSelectUser(userName);
  //   } else {
  //     FirestoreService.addUserToroom(userName, roomId, userId)
  //       .then(() => onSelectUser(userName))
  //       .catch(() => setError("add-user-to-list-error"));
  //   }
  // }

  function openUserRoom(existingUserId) {
    navigate(`/room/${roomId}/user/${existingUserId}/bowl`);
  }

  return (
    <BlueBackground>
      <MobileWidthWrapper>
        <WhiteFadeBackground>
          <WhiteBackground>
            <HeartworkLogoBig />
            <SwatchHeading>
              Join heartwork
              <br />
              🐠Fishbowl Game🐠
            </SwatchHeading>
            <br />
            <br />
            <NarrowCenterText>Rejoin as:</NarrowCenterText>
            {room.users.map((user) => {
              return (
                <ButtonWithText onClick={() => openUserRoom(user.userId)}>
                  {user.name}
                </ButtonWithText>
              );
            })}
            <br />
            <NarrowCenterText>or join as a new player</NarrowCenterText>
            <CenterForm name="create-room" onSubmit={joinRoom}>
              <NameTextField
                autoFocus={true}
                autoComplete="off"
                label="Your name"
                type="text"
                name="userName"
                placeholder="Your name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              {wordPhraseIndexes.map((i) => {
                return (
                  <NameTextField
                    key={i}
                    autoComplete="off"
                    required={true}
                    label="Your name"
                    type="text"
                    name="userName"
                    placeholder={`word / phrase ${i + 1}`}
                    value={wordPhrases[i]}
                    onChange={(e) =>
                      setWordPhrases({ ...wordPhrases, [i]: e.target.value })
                    }
                  />
                );
              })}
              <br />
              {error && <Error>{error}</Error>}{" "}
            </CenterForm>
            <NavigationButtons>
              <NavigationText>Next:&nbsp;&nbsp;&nbsp;Go to game</NavigationText>
              <Button onClick={joinRoom}>
                <RightArrowIcon />
              </Button>
            </NavigationButtons>
          </WhiteBackground>
        </WhiteFadeBackground>
        <Footer />
      </MobileWidthWrapper>
    </BlueBackground>
    //     {/* <p>Select your name if you're returning...</p>
    //     {getUserButtonList()}
  );
}

export default JoinRoom;
