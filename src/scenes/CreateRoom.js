import React, { useState } from "react";
import * as FirestoreService from "../services/firestore";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import styled from "styled-components";
import Select from "react-select";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";

import room4 from "../img/room4.jpg";

const colors = {
  peach: ["#E88FA2", "#EB9B81"],
  green: ["#1696A0", "#88C072"],
  need: ["#2A3076", "#1792C8"]
};

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
  const [sliderScreen, setSliderScreen] = useState(0);
  const [error, setError] = useState();
  const [roomConfig, setRoomConfig] = useState({
    timerLength: 60, //s
    checkInFormat: ["green", "peach", "need", "need", "need"]
  });

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

  function customStyles(colors, z) {
    return {
      container: (base, state) => ({
        ...base,
        marginBottom: -4,
        fontSize: "1.3em",
        maxWidth: 440,
        zIndex: z
      }),
      control: (base, state) => ({
        ...base,
        height: 70,
        backgroundImage: `linear-gradient(to bottom right, ${colors[0]}, ${colors[1]}) !important`,
        border: "none",
        boxShadow: state.isFocused ? null : null
      }),
      singleValue: base => ({
        paddingLeft: 60,
        color: "white"
      }),
      menu: base => ({
        ...base,
        marginTop: 0,
        paddingLeft: 60,
        color: "white",
        backgroundImage: `linear-gradient(to bottom right, ${colors[0]}, ${colors[1]})`
      }),
      menuList: base => ({
        ...base,
        padding: 0
      }),
      placeholder: base => ({
        ...base,
        color: "#eee"
      })
    };
  }

  function convertToOptions(array) {
    return array.map(item => {
      return { label: item[0], value: item[1] };
    });
  }

  // get approx number of people in meeting
  // everybody get into zoom + check-in rooms
  // everybody does self reflection
  // sharing per person
  // extra time to dive deeper

  const meetingConfigOptions = [
    "Family Check-in",
    "Energising quick work check-in",
    "Tension at work check-in",
    "Lover Check-in",
    "Small group unblocking check-in"
  ];

  const awesomeSliderConfig = {
    // fillParent: true,
    infinite: false,
    organicArrows: false,
    bullets: false
  };

  return (
    <Background>
      <AwesomeSlider selected={sliderScreen} {...awesomeSliderConfig}>
        <>
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
            {/* <Select
          inputProps={{ readOnly: true }}
          name="meetingConfig"
          placeholder="Pick the meeting check-in you'd love!"
          options={convertToOptions(meetingConfigOptions)}
          // onChange={updateMyCheckIn}
          styles={customStyles(colors.need, 100)}
          theme={theme => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary25: "rgba(0, 0, 0, 0.4)",
              primary: "rgba(0, 0, 0, 0.8)"
            }
          })}
        /> */}
            <ErrorMessage errorCode={error}></ErrorMessage>
            <button
              onClick={e => {
                e.preventDefault();
                setSliderScreen(1);
              }}
            >
              Start
            </button>
          </form>
        </>
        <>
          <h1>Room Setup</h1>
          <button onClick={createroom}>Open Room</button>
          <div>
            <button
              onClick={e => {
                e.preventDefault();
                setSliderScreen(0);
              }}
            >
              Back
            </button>
          </div>
        </>
      </AwesomeSlider>
    </Background>
  );
}

export default CreateList;
