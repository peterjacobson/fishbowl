import React, { useEffect, useState } from "react";
import * as FirestoreService from "../services/firestore";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import Select from "react-select";
import needs from "../data/needs";
import greenFeelings from "../data/greenFeelings";
import peachFeelings from "../data/peachFeelings";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import styled from "styled-components";
import room4 from "../img/room4.jpg";

const LoungeImage = styled.div`
  width: 100%;
  height: 100px;
  background: url(${room4});
  background-size: cover;
  background-position: center;
`;

const Intro = styled.p`
  max-width: 440px;
`;

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

  const otherUsers = users
    .filter(user => user.userId !== userId)
    .map(user => user.name);

  const otherUserNameList =
    otherUsers.slice(0, -1).join(", ") + " and " + otherUsers.slice(-1);

  function customStyles(colors, tilt, shunt, z) {
    return {
      container: (base, state) => ({
        ...base,
        transform: `rotate(${tilt}deg)`,
        marginLeft: shunt,
        marginBottom: 10,
        fontSize: "1.3em",
        maxWidth: 440,
        zIndex: z
      }),
      control: (base, state) => ({
        ...base,
        height: 50,
        backgroundImage: `linear-gradient(to bottom right, ${colors[0]}, ${colors[1]}) !important`,
        // // match with the menu
        // borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
        // // Overwrittes the different states of border
        // borderColor: state.isFocused ? "yellow" : "green",
        // Removes weird border around container
        border: "none",
        boxShadow: state.isFocused ? null : null,
        "&:hover": {
          // Overwrittes the different states of border
          // borderColor: state.isFocused ? "red" : "blue"
        }
      }),
      singleValue: base => ({
        color: "white"
      }),
      menu: base => ({
        ...base,
        // override border radius to match the box
        // borderRadius: 0,
        // kill the gap
        marginTop: 0,
        color: "white",
        backgroundImage: `linear-gradient(to bottom right, ${colors[0]}, ${colors[1]})`
      }),
      menuList: base => ({
        ...base,
        // kill the white space on first and last option
        padding: 0
      }),
      placeholder: base => ({
        ...base,
        color: "#eee"
      })
    };
  }

  const colors = {
    peach: ["#E88FA2", "#EB9B81"],
    green: ["#1696A0", "#88C072"],
    need: ["#2A3076", "#1792C8"]
  };

  const selectSetup = [
    {
      name: "greenFeeling",
      placeholder: "[last 24hrs] A feeling I had",
      options: greenFeelings,
      colors: colors.green,
      z: 100
    },
    {
      name: "peachFeeling",
      placeholder: "[last 24hrs] A feeling I had",
      options: peachFeelings,
      colors: colors.peach,
      z: 99
    },
    {
      name: "need1",
      placeholder: "[this meeting] A need I'd love to meet",
      options: needs,
      colors: colors.need,
      z: 98
    },
    {
      name: "need2",
      placeholder: "[this meeting] A need I'd love to meet",
      options: needs,
      colors: colors.need,
      z: 97
    },
    {
      name: "need3",
      placeholder: "[this meeting] A need I'd love to meet",
      options: needs,
      colors: colors.need
    }
  ];

  const selectElements = selectSetup.map(select => {
    const tilt = Math.random() - 0.5;
    const shunt = (Math.random() - 0.5) * 2;

    return (
      <Select
        name={select.name}
        placeholder={select.placeholder}
        options={convertToOptions(select.options)}
        maxMenuHeight={9000}
        onChange={updateMyCheckIn}
        styles={
          checkIn.greenFeeling === ""
            ? null
            : customStyles(select.colors, tilt, shunt, select.z)
        }
      />
    );
  });

  return (
    <>
      <LoungeImage source={room4}></LoungeImage>
      <Confetti width={width} height={height} recycle={false} />
      <header className="app-header">
        <h2>👋 Welcome {user} 😌</h2>
        <Intro>
          Why are you connecting? This is a quick way to connect with
          authenticity and surface the highest priority needs in this call.
        </Intro>
        <Intro>
          You're in this private room with <strong>{otherUserNameList}</strong>.
        </Intro>
        <Intro>
          All feelings are precious - all sensations people experience point to
          beautiful universal human needs, met or unmet.
        </Intro>
      </header>
      <form name="myCheckIn">{selectElements}</form>
      <div>
        <ErrorMessage errorCode={error}></ErrorMessage>
        {othersCheckInsElements}
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
    </>
  );
}

export default InsideRoom;
