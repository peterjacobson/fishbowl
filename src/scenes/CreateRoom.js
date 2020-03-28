import React, { useState } from "react";
import * as FirestoreService from "../services/firestore";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import styled from "styled-components";
import buildRoom from "../img/buildroom.jpg";
import room4 from "../img/room4.jpg";

const Background = styled.div`
  height: calc(100vh - 38px);
  background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.3)
    ),
    url(${room4});
  background-size: cover;
  padding-top: 20px;
  padding-left: 30px;
`;

const InputName = styled.input`
  border: none;
  border-bottom: 3px solid #d62346;
  font-size: 3em;
  background: none;
`;

function CreateList(props) {
  const { onCreate, userId } = props;

  const [error, setError] = useState();

  function createroom(e) {
    e.preventDefault();
    setError(null);

    const userName = document.createListForm.userName.value;
    if (!userName) {
      setError("user-name-required");
      return;
    }
    FirestoreService.createroom(userName, userId)
      .then(docRef => {
        onCreate(docRef.id, userName);
      })
      .catch(reason => {
        setError("create-list-error");
      });
  }

  return (
    <Background>
      <h1>
        Open a new
        <br />
        Heartwork
        <br />
        check-in room
      </h1>
      <form name="createListForm">
        <InputName
          autoFocus={true}
          type="text"
          name="userName"
          placeholder="My name is..."
        />
        <ErrorMessage errorCode={error}></ErrorMessage>
        <button onClick={createroom}>Go</button>
      </form>
    </Background>
  );
}

export default CreateList;
