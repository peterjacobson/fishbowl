import React, { useEffect, useState } from "react";
import get from "lodash.get";
import * as FirestoreService from "../services/firestore";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import Select from "react-select";
import needs from "../data/needs";
import greenFeelings from "../data/greenFeelings";
import peachFeelings from "../data/peachFeelings";

function InsideRoom(props) {
  const { users, roomId, user, onCloseroom, userId } = props;
  const [roomUsers, setRoomUsers] = useState([]);
  const [checkIn, setCheckIn] = useState({});
  // const [greenFeeling, setGreenFeeling] = useState("");
  // const [peachFeeling, setPeachFeeling] = useState("");
  // const [topNeeds, setTopNeeds] = useState([]);
  const [error, setError] = useState();
  console.log("checkIn after init: ", checkIn);

  function onCreateListClick(e) {
    e.preventDefault();
    onCloseroom();
  }

  useEffect(() => {
    const unsubscribe = FirestoreService.streamRoomUsers(roomId, {
      next: querySnapshot => {
        setRoomUsers(querySnapshot.data().users);
      },
      error: () => setError("grocery-list-item-get-fail")
    });
    return unsubscribe;
  }, [roomId, setRoomUsers]);

  const roomUserElements = roomUsers.map((user, i) => (
    <div key={i}>
      <p>{user.name}</p>
      <ul>
        <li>{user.peachFeeling}</li>
        <li>{user.greenFeeling}</li>
      </ul>
      {roomUserNeedElements(get(user, "mapValue.fields.needs.arrayValue"))}
    </div>
  ));

  function roomUserNeedElements(needs) {
    console.log("needs from stream: ", needs);
    return null; //needs.map((need, i) => <div>{need.stringValue}</div>);
  }

  function convertToOptions(array) {
    return array.map(item => {
      return { value: item, label: item };
    });
  }

  function updateMyCheckIn(option, action) {
    console.log("user: ", user);
    const updatedField = { [action.name]: option.value };
    FirestoreService.updateCheckIn(updatedField, roomId, userId);
    // console.log("user: ", user);
    // console.log("users: ", users);
    // console.log("updatedField: ", updatedField);
    // console.log("checkIn: ", checkIn);
    // setCheckIn({ ...checkIn, updatedField });
    // console.log("checkIn: ", checkIn);
    // const userWithCheckin = { userName: user, userId: userId, ...checkIn };
    // console.log("userWithCheckin: ", userWithCheckin);
    // const userIndex = 1;
    // FirestoreService.updateRoomUser(roomId, userIndex, userWithCheckin);
  }

  return (
    <div>
      <header className="app-header">
        <h1>Private check-in room</h1>
        <p>
          <strong>Hi {user}!</strong>
        </p>
      </header>
      <form name="myCheckIn">
        <Select
          name="greenFeeling"
          options={convertToOptions(greenFeelings)}
          maxMenuHeight={9000}
          onChange={updateMyCheckIn}
        />
        <Select
          name="peachFeeling"
          options={convertToOptions(peachFeelings)}
          maxMenuHeight={9000}
          onChange={updateMyCheckIn}
        />
        <Select
          name="need1"
          options={convertToOptions(needs)}
          maxMenuHeight={1000}
          onChange={updateMyCheckIn}
        />
        <Select
          name="need2"
          options={convertToOptions(needs)}
          maxMenuHeight={1000}
          onChange={updateMyCheckIn}
        />
        <Select
          name="need3"
          options={convertToOptions(needs)}
          maxMenuHeight={1000}
          onChange={updateMyCheckIn}
        />
      </form>

      <div>
        <ErrorMessage errorCode={error}></ErrorMessage>
        <div>{roomUserElements}</div>
      </div>
      <footer className="app-footer">
        <p>
          Share this private room with others using{" "}
          <a
            href={`/?listId=${roomId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            this link
          </a>{" "}
          or{" "}
          <a href="/" onClick={onCreateListClick}>
            create a new private Heartwork check-in room
          </a>
          .
        </p>
      </footer>
    </div>
  );
}

export default InsideRoom;
