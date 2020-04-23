import React, { useState } from "react";
import { navigate } from "@reach/router";

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

  // Create the room
  function createRoom(e) {
    e.preventDefault();
    if (!userName) {
      setError("user-name-required");
      return;
    }
    setError(null);

    FirestoreService.authenticateAnonymously()
      .then((userCredential) => {
        const userId = userCredential.user.uid;
        FirestoreService.createroom(userName, userId)
          .then((docRef) => {
            const roomId = docRef.id;
            navigate(`/room/${roomId}/user/${userId}/my-check-in`);
          })
          .catch((reason) => {
            setError("create-list-error");
          });
      })
      .catch((e) => {
        console.error(e);
        setError("anonymous-auth-failed");
      });
  }

  return (
    <BlueBackground>
      <MobileWidthWrapper>
        <HeartworkLogoBig />
        <SwatchHeading>Create your heartwork check-in room</SwatchHeading>
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
          {error && <Error>{error}</Error>}
        </CenterForm>
        <NavigationButtons>
          <NavigationText>Next:&nbsp;&nbsp;&nbsp;Go to room</NavigationText>
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
