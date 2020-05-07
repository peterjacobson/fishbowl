import React, { useState } from "react";
import { navigate } from "@reach/router";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

import * as FirestoreService from "../services/firestore";
import Footer from "../components/Footer";
import {
  BlueBackground,
  MobileWidthWrapper,
  SwatchHeading,
  NegativeSpacer,
  WhiteCircle,
  HeartworkLogoBig,
  NameTextField,
  CenterForm,
  Button,
  NavigationButtons,
  NavigationText,
  Error,
  RightArrowIcon,
  WhiteFadeBackground,
  WhiteBackground,
  UnsplashCredit,
  VertSpacer,
  ButtonWithText,
} from "../components/styledComponents";
import WhatIsFishbowl from "../components/WhatIsFishbowl";
import { Needs } from "../components/Needs";

function CreateList() {
  const [userName, setUserName] = useState("");
  const [error, setError] = useState();
  const wordPhraseIndexes = [0, 1, 2];
  const initialWordPhraseState = wordPhraseIndexes.reduce((obj, i) => {
    return { ...obj, [i]: "" };
  }, {});
  const [wordPhrases, setWordPhrases] = useState(initialWordPhraseState);
  const unfilledWordPhrases = _.find(wordPhrases, (word) => word === "") === "";

  // Create the room
  function createRoom(e) {
    e.preventDefault();
    if (!userName || unfilledWordPhrases) {
      setError("all-fields-required");
      return;
    }
    setError(null);

    const userId = uuidv4();
    const wordPhrasesList = _.values(wordPhrases);

    FirestoreService.createroom(userName, userId, wordPhrasesList)
      .then((docRef) => {
        const roomId = docRef.id;
        navigate(`/room/${roomId}/user/${userId}/bowl`);
      })
      .catch((reason) => {
        setError("create-list-error");
      });
  }

  const needs = [
    "contribution",
    "play",
    "connection",
    "humour",
    "vitality",
    "sponteneity",
    "creativity",
    "growth",
    "communication",
    "belonging",
    "+more",
  ];

  return (
    <BlueBackground>
      <MobileWidthWrapper>
        <WhiteFadeBackground>
          <NegativeSpacer />
          <WhiteCircle />
          <WhiteBackground>
            <HeartworkLogoBig />
            <VertSpacer />
            <VertSpacer />
            To meet human needs for
            <br />
            <Needs {...{ needs }} />
            <SwatchHeading>
              Create your
              <br />
              🐠Fishbowl Game
              <br />
            </SwatchHeading>
            For 6-12 players
            <WhatIsFishbowl />
            <CenterForm name="create-room" onSubmit={createRoom}>
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
                    placeholder={`🐠(word or phrase) ${i + 1}`}
                    value={wordPhrases[i]}
                    onChange={(e) =>
                      setWordPhrases({ ...wordPhrases, [i]: e.target.value })
                    }
                  />
                );
              })}
              {error && <Error>{error}</Error>}
              <br />
              <p>
                the 🐠 (words or phrases) can be things like "chair", "running",
                "set free", "falling in love", "Italy" or "Lady Gaga"
              </p>
            </CenterForm>
            <VertSpacer/>
            <ButtonWithText onClick={createRoom}>
              Create Fishbowl Game Room
            </ButtonWithText>
          </WhiteBackground>
          <Footer />
        </WhiteFadeBackground>
      </MobileWidthWrapper>
      <UnsplashCredit />
    </BlueBackground>
  );
}

export default CreateList;
