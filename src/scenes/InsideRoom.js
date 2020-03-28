import React, { useEffect, useState } from "react";
import get from "lodash.get";
import * as FirestoreService from "../services/firestore";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import Select from "react-select";
import needs from "../data/needs";
import greenFeelings from "../data/greenFeelings";
import peachFeelings from "../data/peachFeelings";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

function InsideRoom(props) {
  const { users, roomId, user, onCloseroom, userId } = props;
  const [roomUsers, setRoomUsers] = useState([]);
  const [checkIn, setCheckIn] = useState({});
  const [checkIns, setCheckIns] = useState([]);
  const [error, setError] = useState();
  const { width, height } = useWindowSize();

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

  useEffect(() => {
    const unsubscribe = FirestoreService.streamRoomCheckIns(roomId, {
      next: querySnapshot => {
        setCheckIns(querySnapshot.docs.map(docSnapshot => docSnapshot.data()));
      },
      error: () => setError("grocery-list-item-get-fail")
    });
    return unsubscribe;
  }, [roomId, setCheckIns]);

  function convertToOptions(array) {
    return array.map(item => {
      return { value: item, label: item };
    });
  }

  function updateMyCheckIn(option, action) {
    const updatedField = { [action.name]: option.value };
    FirestoreService.updateCheckIn(updatedField, roomId, userId);
  }

  const othersCheckIns = users
    .filter(user => user.userId !== userId)
    .map(user => {
      return {
        ...user,
        ...checkIns.find(checkIn => {
          return checkIn.userId === user.userId;
        })
      };
    });

  const othersCheckInsElements = othersCheckIns.map(otherRoomUser => (
    <div>
      <p>{otherRoomUser.name}</p>
      <ul>
        <li>{otherRoomUser.greenFeeling}</li>
        <li>{otherRoomUser.peachFeeling}</li>
        <li>{otherRoomUser.need1}</li>
        <li>{otherRoomUser.need2}</li>
        <li>{otherRoomUser.need3}</li>
      </ul>
    </div>
  ));

  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundImage: "linear-gradient(to bottom right, #1696A0, #88C072)",
      // // match with the menu
      // borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
      // // Overwrittes the different states of border
      // borderColor: state.isFocused ? "yellow" : "green",
      // // Removes weird border around container
      // boxShadow: state.isFocused ? null : null,
      "&:hover": {
        // Overwrittes the different states of border
        // borderColor: state.isFocused ? "red" : "blue"
      }
    }),
    menu: base => ({
      ...base,
      // override border radius to match the box
      // borderRadius: 0,
      // // kill the gap
      // marginTop: 0,
      backgroundImage: "linear-gradient(to bottom right, #1696A0, #88C072)"
    }),
    menuList: base => ({
      ...base
      // kill the white space on first and last option
      // padding: 0
    })
  };

  return (
    <div>
      <Confetti width={width} height={height} recycle={false} />
      <header className="app-header">
        <h1>Heartwork Private Check-in room</h1>
        <p>
          <strong>Hi {user}!</strong>
        </p>
      </header>
      <form name="myCheckIn">
        <Select
          name="greenFeeling"
          placeholder="select a green feeling you had in the last 24hrs"
          options={convertToOptions(greenFeelings)}
          maxMenuHeight={9000}
          onChange={updateMyCheckIn}
          styles={checkIn.greenFeeling === "" ? null : customStyles}
        />
        <Select
          name="peachFeeling"
          placeholder="select an peach feeling you had in the last 24hrs"
          options={convertToOptions(peachFeelings)}
          maxMenuHeight={9000}
          onChange={updateMyCheckIn}
        />
        <Select
          name="need1"
          placeholder="select a need you'd love to meet in this meeting"
          options={convertToOptions(needs)}
          maxMenuHeight={1000}
          onChange={updateMyCheckIn}
        />
        <Select
          name="need2"
          placeholder="select another need you'd love to meet in this meeting"
          options={convertToOptions(needs)}
          maxMenuHeight={1000}
          onChange={updateMyCheckIn}
        />
        <Select
          name="need3"
          placeholder="select another need you'd love to meet in this meeting"
          options={convertToOptions(needs)}
          maxMenuHeight={1000}
          onChange={updateMyCheckIn}
        />
      </form>

      <div>
        <ErrorMessage errorCode={error}></ErrorMessage>
        {othersCheckInsElements}
        {/*         
        <div>{roomUserElements}</div>
        <div>
          {checkIns.map(checkIn => (
            <div>{JSON.stringify(checkIn)}</div>
          ))}
        </div> */}
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
