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
  HeartworkLogoBig,
  NameTextField,
  Centerer,
  CenterForm,
  Button,
  NavigationButtons,
  NavigationText,
  Error,
  RightArrowIcon,
} from "../components/styledComponents";

function CreateList() {
  const [userName, setUserName] = useState("");
  const [error, setError] = useState();
  const wordPhraseIndexes = [0, 1, 2];
  const initialWordPhraseState = wordPhraseIndexes.reduce((obj, i) => {
    return { ...obj, [i]: "" };
  }, {});
  const [wordPhrases, setWordPhrases] = useState(initialWordPhraseState);
  const unfilledWordPhrases = _.find(wordPhrases, (word) => word === "");

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

  return (
    <BlueBackground>
      <MobileWidthWrapper>
        <HeartworkLogoBig />
        <SwatchHeading>
          Create your heartwork
          <br />
          🐠Fishbowl Game🐠
        </SwatchHeading>
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
                placeholder={`word / phrase ${i + 1}`}
                value={wordPhrases[i]}
                onChange={(e) =>
                  setWordPhrases({ ...wordPhrases, [i]: e.target.value })
                }
              />
            );
          })}
          <br />
          {error && <Error>{error}</Error>}
        </CenterForm>
        <NavigationButtons>
          <NavigationText>Next:&nbsp;&nbsp;&nbsp;Go to game</NavigationText>
          <Button onClick={createRoom}>
            <RightArrowIcon />
          </Button>
        </NavigationButtons>
        <Footer />
      </MobileWidthWrapper>
    </BlueBackground>
  );
}

export default CreateList;
