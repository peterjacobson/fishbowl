import React, { useState } from "react";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import * as FirestoreService from "../services/firestore";
import styled from "styled-components";
import room4 from "../img/room4.jpg";

const Background = styled.div`
  height: calc(100vh - 38px);
  background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 0.9),
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0.3)
    ),
    url(${room4});
  background-size: cover;
  background-position: center;
  padding-top: 20px;
  padding-left: 30px;
`;

const InputName = styled.input`
  border: none;
  border-bottom: 3px solid #d62346;
  font-size: 3em;
  background: none;
`;

function JoinRoom(props) {
  const { users, roomId, onSelectUser, onCloseroom, userId } = props;

  const [error, setError] = useState();

  function addExistingUser(e) {
    e.preventDefault();
    onSelectUser(e.target.innerText);
  }

  function getUserButtonList() {
    const buttonList = users.map((user) => (
      <button key={user.name} onClick={addExistingUser}>
        {user.name}
      </button>
    ));
    return <div className="button-group">{buttonList}</div>;
  }

  function addNewUser(e) {
    e.preventDefault();
    setError(null);

    const userName = document.addUserToListForm.name.value;
    if (!userName) {
      setError("user-name-required");
      return;
    }

    if (users.find((user) => user.name === userName)) {
      onSelectUser(userName);
    } else {
      FirestoreService.addUserToroom(userName, roomId, userId)
        .then(() => onSelectUser(userName))
        .catch(() => setError("add-user-to-list-error"));
    }
  }

  function onCreateListClick(e) {
    e.preventDefault();
    onCloseroom();
  }

  return (
    <Background>
      <div className="join-container">
        <h1>
          You're invited
          <br />
          to a heartwork
          <br />
          check-in 👌
        </h1>
        <p>Select your name if you're returning...</p>
        {getUserButtonList()}
        <form name="addUserToListForm">
          <p>...or enter your name to enter the check-in room...</p>
          <InputName
            type="text"
            name="name"
            autoFocus={true}
            placeholder="My name is..."
          />
          <input
            className="button"
            type="submit"
            value="Join"
            onClick={addNewUser}
          />
          <ErrorMessage errorCode={error}></ErrorMessage>
        </form>
        <p>
          ...or{" "}
          <a href="/" onClick={onCreateListClick}>
            create a new check-in room
          </a>
        </p>
      </div>
    </Background>
  );
}

export default JoinRoom;
