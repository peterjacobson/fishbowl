import React, { useState } from "react";
import * as FirestoreService from "../services/firestore";
import { navigate } from "@reach/router";

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
} from "../components/styledComponents";
import Footer from "../components/Footer";

function JoinRoom(props) {
  const roomId = props.location.pathname.substr(11);
  const [userName, setUserName] = useState("");
  const [error, setError] = useState();
  function joinRoom(e) {
    e.preventDefault();
    if (!userName) {
      setError("user-name-required");
      return;
    }
    setError(null);

    FirestoreService.authenticateAnonymously()
      .then((userCredential) => {
        const userId = userCredential.user.uid;
        FirestoreService.addUserToroom(userName, roomId, userId).then(() => {
          navigate(`/room/${roomId}/user/${userId}/my-check-in`);
        });
      })
      .catch((e) => {
        console.error(e);
        setError("anonymous-auth-failed");
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

  return (
    <BlueBackground>
      <MobileWidthWrapper>
        <HeartworkLogoBig />
        <SwatchHeading>Join private heartwork check-in room</SwatchHeading>
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
          {error && <Error>{error}</Error>}{" "}
        </CenterForm>
        <NavigationButtons>
          <NavigationText>Next:&nbsp;&nbsp;&nbsp;Go to room</NavigationText>
          <Button onClick={joinRoom}>
            <RightArrowIcon />
          </Button>
        </NavigationButtons>
        <Footer />
      </MobileWidthWrapper>
    </BlueBackground>
    //     {/* <p>Select your name if you're returning...</p>
    //     {getUserButtonList()}
  );
}

export default JoinRoom;
