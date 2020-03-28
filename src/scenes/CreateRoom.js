import React, { useState } from "react";
import * as FirestoreService from "../services/firestore";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";

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
    <div>
      <form name="createListForm">
        <p>
          <label>What is your name?</label>
        </p>
        <p>
          <input type="text" name="userName" />
        </p>
        <ErrorMessage errorCode={error}></ErrorMessage>
        <p>
          <button onClick={createroom}>
            New private Heartwork check-in room
          </button>
        </p>
      </form>
    </div>
  );
}

export default CreateList;
