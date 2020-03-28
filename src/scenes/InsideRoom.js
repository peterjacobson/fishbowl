import React, { useEffect, useState } from "react";
import * as FirestoreService from "../services/firestore";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import Select from "react-select";
import { CopyToClipboard } from "react-copy-to-clipboard";
import needs from "../data/needs";
import greenFeelings from "../data/greenFeelings";
import peachFeelings from "../data/peachFeelings";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import styled from "styled-components";
import room4 from "../img/room4.jpg";

const colors = {
  peach: ["#E88FA2", "#EB9B81"],
  green: ["#1696A0", "#88C072"],
  need: ["#2A3076", "#1792C8"]
};

const LoungeImage = styled.div`
  width: 100%;
  height: 100px;
  background: url(${room4});
  background-size: cover;
`;

const LoungeImageTop = styled(LoungeImage)`
  background-position: top;
`;
const LoungeImageCenter = styled(LoungeImage)`
  background-position: center;
`;
const LoungeImageBottom = styled(LoungeImage)`
  background-position: bottom;
  height: 300px;
`;

const LittleButton = styled.button`
  font-size: 1em;
  display: inline block;
`;

const SpanH2 = styled.h2`
  display: inline block;
`;

const Intro = styled.p`
  max-width: 440px;
`;

const CheckInItemRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const CheckInItem = styled.div`
  margin-right: 5px;
  margin-bottom: 5px;
  border-radius: 3px;
  padding: 10px 20px;
  font-size: 1.3em;
  color: white;
`;

const PeachFeeling = styled(CheckInItem)`
  background: linear-gradient(
    to bottom right,
    ${colors.peach[0]},
    ${colors.peach[1]}
  );
`;
const GreenFeeling = styled(CheckInItem)`
  background: linear-gradient(
    to bottom right,
    ${colors.green[0]},
    ${colors.green[1]}
  );
`;
const Need = styled(CheckInItem)`
  background: linear-gradient(
    to bottom right,
    ${colors.need[0]},
    ${colors.need[1]}
  );
`;

function InsideRoom(props) {
  const { users, roomId, user, onCloseroom, userId, enqueueSnackbar } = props;
  const [roomUsers, setRoomUsers] = useState([]);
  const [checkIn, setCheckIn] = useState({});
  const [checkIns, setCheckIns] = useState([]);
  const [error, setError] = useState();
  const { width, height } = useWindowSize();

  console.log("enqueueSnackbar: ", enqueueSnackbar);

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

  console.log("othersCheckIns: ", othersCheckIns);

  const othersCheckInsElements = othersCheckIns.map(anotherUser => (
    <>
      <h2>{anotherUser.name}'s check-in:</h2>
      <CheckInItemRow>
        {anotherUser.peachFeeling ? (
          <PeachFeeling>{anotherUser.peachFeeling}</PeachFeeling>
        ) : null}
        {anotherUser.greenFeeling ? (
          <GreenFeeling>{anotherUser.greenFeeling}</GreenFeeling>
        ) : null}
      </CheckInItemRow>
      <CheckInItemRow>
        {anotherUser.need1 ? <Need>{anotherUser.need1}</Need> : null}
        {anotherUser.need2 ? <Need>{anotherUser.need2}</Need> : null}
        {anotherUser.need3 ? <Need>{anotherUser.need3}</Need> : null}
      </CheckInItemRow>
    </>
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
        paddingLeft: 60,
        color: "white"
      }),
      menu: base => ({
        ...base,
        // override border radius to match the box
        // borderRadius: 0,
        // kill the gap
        marginTop: 0,
        paddingLeft: 60,
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

  const selectSetup = [
    {
      name: "greenFeeling",
      // value: checkIn.greenFeeling,
      placeholder: "[last 24hrs] A feeling I had",
      options: greenFeelings,
      colors: colors.green,
      z: 100
    },
    {
      name: "peachFeeling",
      // value: checkIn.peachFeeling,
      placeholder: "[last 24hrs] A feeling I had",
      options: peachFeelings,
      colors: colors.peach,
      z: 99
    },
    {
      name: "need1",
      // value: checkIn.need1,
      placeholder: "[this meeting] A need I'd love to meet",
      options: needs,
      colors: colors.need,
      z: 98
    },
    {
      name: "need2",
      // value: checkIn.need2,
      placeholder: "[this meeting] A need I'd love to meet",
      options: needs,
      colors: colors.need,
      z: 97
    },
    {
      name: "need3",
      // value: checkIn.greenFeeling,
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
        // value={select.value}
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
        theme={theme => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary25: "rgba(0, 0, 0, 0.4)",
            primary: "rgba(0, 0, 0, 0.8)"
          }
        })}
      />
    );
  });

  return (
    <>
      <LoungeImageTop source={room4} />
      <Confetti width={width} height={height} recycle={false} />
      <SpanH2>👋 Welcome {user} 😌</SpanH2>
      <CopyToClipboard text={`${window.location.origin}/?listId=${roomId}`}>
        <LittleButton>Copy link to this room</LittleButton>
      </CopyToClipboard>
      <Intro>
        You're jumping into a call with some other people! Why?
        <br />
        This is a quick way to <strong>
          connect with authenticity
        </strong> and <strong>surface the highest priority needs</strong> in
        this call.
      </Intro>
      <Intro>
        You're in this private room with <strong>{otherUserNameList}</strong>.
      </Intro>
      <Intro>
        All feelings are precious - all sensations people experience point to
        beautiful universal human needs, met or unmet.
      </Intro>
      <LoungeImageCenter />
      <h3>
        <strong>Step #1:</strong> choose my check-in feelings and universal
        human needs
      </h3>
      <h2>My check-in</h2>
      <p>
        Green & Peach feelings in last 24hrs + three needs I'd love to meet in
        this call:
      </p>
      <form name="myCheckIn">{selectElements}</form>
      <ErrorMessage errorCode={error}></ErrorMessage>
      <h3>
        <strong>Step #2:</strong> when everyone else has chosed their check-in
        feelings and needs, take 1 min for each person to speak to the words
        they chose
      </h3>
      {othersCheckInsElements}
      <br />
      <LoungeImageBottom />
      <br />

      <a
        href="/"
        target="_blank"
        // onClick={onCreateListClick}
      >
        <LittleButton>
          create a new private Heartwork check-in room
        </LittleButton>
      </a>
    </>
  );
}

export default InsideRoom;
