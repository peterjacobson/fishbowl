import React, { useState } from "react";
import "./AddItem.css";
import * as FirestoreService from "../../../services/firestore";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";

function AddItem(props) {
  const { roomId, userId } = props;

  const [error, setError] = useState("");

  function addItem(e) {
    e.preventDefault();
    setError(null);

    const itemDesc = document.addItemForm.itemDesc.value;
    if (!itemDesc) {
      setError("grocery-item-desc-req");
      return;
    }

    FirestoreService.addroomItem(itemDesc, roomId, userId)
      .then(() => document.addItemForm.reset())
      .catch(reason => {
        if (reason.message === "duplicate-item-error") {
          setError(reason.message);
        } else {
          setError("add-list-item-error");
        }
      });
  }

  return (
    <form name="addItemForm">
      <h3>I want...</h3>
      <input type="text" name="itemDesc" />
      <button type="submit" onClick={addItem}>
        Add
      </button>
      <ErrorMessage errorCode={error}></ErrorMessage>
    </form>
  );
}

export default AddItem;
