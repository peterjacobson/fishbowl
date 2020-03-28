import React, { useState } from "react";
import * as FirestoreService from "../services/firestore";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import styled from "styled-components";
import buildRoom from "../img/buildroom.jpg";

const Background = styled.div`
  height: 100vh;
  background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.3)
    ),
    url(${buildRoom});
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
      <h1>new check-in room</h1>
      <form name="createListForm">
        <InputName
          autofocus="true"
          type="text"
          name="userName"
          placeholder="My name is..."
        />
        <ErrorMessage errorCode={error}></ErrorMessage>
        <button onClick={createroom}>[Enter] Build my room</button>
      </form>
    </Background>
  );
}

export default CreateList;
