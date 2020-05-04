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
} from "../components/styledComponents";

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

  return (
    <BlueBackground>
      <MobileWidthWrapper>
        <WhiteFadeBackground>
          <NegativeSpacer />
          <WhiteCircle />
          <WhiteBackground>
            <HeartworkLogoBig />
            <SwatchHeading>
              Create your Heartwork
              <br />
              🐠Fishbowl Game🐠
              <br />
              For 6-12 players
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
                    placeholder={`word or phrase ${i + 1}`}
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
                the words/phrases can be things like "chair", "running", "set
                free", "falling in love", "Italy" or "Lady Gaga"
              </p>
            </CenterForm>
            <NavigationButtons>
              <NavigationText>Next:&nbsp;Go to game</NavigationText>
              <Button onClick={createRoom}>
                <RightArrowIcon />
              </Button>
            </NavigationButtons>
          </WhiteBackground>
          <Footer />
        </WhiteFadeBackground>
      </MobileWidthWrapper>
    </BlueBackground>
  );
}

export default CreateList;
