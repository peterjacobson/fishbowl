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
  WhiteCircle,
  VertSpacer,
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

  function openUserRoom(existingUserId) {
    navigate(`/room/${roomId}/user/${existingUserId}/bowl`);
  }

  return (
    <BlueBackground>
      <MobileWidthWrapper>
        <WhiteFadeBackground>
          <WhiteCircle />
          <WhiteBackground>
            <HeartworkLogoBig />
            <SwatchHeading>
              Join heartwork
              <br />
              🐠Fishbowl Game🐠
            </SwatchHeading>
            <NarrowCenterText>Rejoin as:</NarrowCenterText>
            {room.users.map((user) => {
              return (
                <>
                  <ButtonWithText onClick={() => openUserRoom(user.userId)}>
                    {user.name}
                  </ButtonWithText>
                  <VertSpacer />
                  <VertSpacer />
                </>
              );
            })}
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
                    placeholder={`word or phrase ${i + 1}`}
                    value={wordPhrases[i]}
                    onChange={(e) =>
                      setWordPhrases({ ...wordPhrases, [i]: e.target.value })
                    }
                  />
                );
              })}
              {error && <Error>{error}</Error>} <br />
              <p>
                the words/phrases can be things like "chair", "running", "set
                free", "falling in love", "Italy" or "Lady Gaga"
              </p>
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
