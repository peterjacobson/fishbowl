import React from "react";
import "./EditList.css";
import AddItem from "./AddItem/AddItem";
import ItemList from "./ItemList/ItemList";

function EditList(props) {
  const { roomId, user, onCloseroom, userId } = props;

  function onCreateListClick(e) {
    e.preventDefault();
    onCloseroom();
  }

  return (
    <div>
      <header className="app-header">
        <h1>Private check-in room</h1>
        <p>
          <strong>Hi {user}!</strong>
        </p>
      </header>
      <div className="edit-container">
        <div className="add-item-column">
          <AddItem {...{ roomId, userId }}></AddItem>
        </div>
        <div className="list-column">
          <ItemList {...{ roomId }}></ItemList>
        </div>
      </div>
      <footer className="app-footer">
        <p>
          Share your list with others using{" "}
          <a
            href={`/?listId=${roomId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            this link
          </a>{" "}
          or{" "}
          <a href="/" onClick={onCreateListClick}>
            create a new grocery list
          </a>
          .
        </p>
      </footer>
    </div>
  );
}

export default EditList;
