import React, { useState } from "react";
import * as FirestoreService from "../services/firestore";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import styled from "styled-components";
import Select from "react-select";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import ReactSlider from "react-slider";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

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

const RoomConfig = styled.input`
  width: 440px;
  height: 100vh;
`;

const StyledSlider = styled(ReactSlider)`
  width: 100%;
  height: 30px;
`;

const ZoomTimeStyledSlider = styled(StyledSlider)`
  display: inline-block;
  width: 100%;
  height: 30px;
`;

const StyledThumb = styled.div`
  height: 30px;
  line-height: 30px;
  width: 100px;
  text-align: center;
  background-color: #000;
  color: #fff;
  font-size: 20px;
  border-radius: 15px;
  cursor: grab;
`;

const StyledTimerThumb = styled(StyledThumb)`
  width: 140px;
`;
const StyledSavvyThumb = styled(StyledThumb)`
  width: 170px;
`;

const RightSpan = styled.span`
  float: right;
`;

const Thumb = (props, state) => (
  <StyledThumb {...props}>{state.valueNow} people</StyledThumb>
);
const SavvyThumb = (props, state) => (
  <StyledSavvyThumb {...props}>{state.valueNow}/10 tech savvy</StyledSavvyThumb>
);
const TimerThumb = (props, state) => (
  <StyledTimerThumb {...props}>
    {state.valueNow < 60
      ? `00:${state.valueNow}s pp`
      : moment.duration(state.valueNow, "seconds").format("m:ss") + " mins pp"}
  </StyledTimerThumb>
);

const StyledTrack = styled.div`
  top: 0;
  bottom: 0;
  background: ${props => (props.index === 1 ? "#ddd" : "pink")};
  border-radius: 999px;
`;

const Track = (props, state) => <StyledTrack {...props} index={state.index} />;

const checkinQuestionsetOptions = [
  {
    label: "family / smaller team",
    checkInGuide:
      "een & Peach feelings I've felt in last 24hrs + three needs I'd love to meet in this call:",
    checkinFormat: [
      { type: "green", prompt: "A feeling I've felt in the last 24hrs" },
      { type: "peach", prompt: "A feeling I've felt in the last 24hrs" },
      { type: "need", prompt: "1st need I'd love to meet in this meeting " },
      { type: "need", prompt: "2nd need I'd love to meet in this meeting " },
      { type: "need", prompt: "3rd need I'd love to meet in this meeting " }
    ],
    minTimePerPerson: 120
  },
  {
    label: "close friends",
    checkInGuide:
      "Green & Peach feelings in last 24hrs + five needs that feel alive for me at the moment",
    checkinFormat: [
      { type: "green", prompt: "A feeling I've felt in the last 24hrs" },
      { type: "green", prompt: "A feeling I've felt in the last 24hrs" },
      { type: "peach", prompt: "A feeling I've felt in the last 24hrs" },
      { type: "peach", prompt: "A feeling I've felt in the last 24hrs" },
      { type: "need", prompt: "1st need I'm yearning to meet right now" },
      { type: "need", prompt: "2nd need I'm yearning to meet right now" },
      { type: "need", prompt: "3rd need I'm yearning to meet right now" },
      { type: "need", prompt: "4th need I'm yearning to meet right now" }
    ],
    minTimePerPerson: 240
  },
  {
    label: "quick meeting checkin",
    checkInGuide:
      "A feeling I've felt in the last 24hrs + two needs I'd love to meet in this meeting",
    checkinFormat: [
      { type: "green", prompt: "A feeling I've felt in the last 24hrs" },
      { type: "need", prompt: "1st need I'd love to meet in this meeting " },
      { type: "need", prompt: "2nd need I'd love to meet in this meeting " }
    ],
    minTimePerPerson: 30
  }
];

function CreateList(props) {
  const { onCreate, userId } = props;
  const [userName, setUserName] = useState("");
  const [sliderScreen, setSliderScreen] = useState(0);
  const [error, setError] = useState();
  const [peopleInRoom, setPeopleInRoom] = useState(4);
  const [checkinTime, setCheckinTime] = useState(60);
  const [zoomConfidence, setZoomConfidence] = useState(5);
  const [checkinQuestionSet, setCheckinQuestionSet] = useState(
    checkinQuestionsetOptions[0]
  );

  function createroom(e) {
    e.preventDefault();
    setError(null);

    if (!userName) {
      setError("user-name-required");
      return;
    }
    FirestoreService.createroom(
      userName,
      userId,
      checkinTime,
      checkinQuestionSet
    )
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
    name: "createRoom",
    fillParent: true,
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
              value={userName}
              onChange={e => setUserName(e.target.value)}
            />
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
        <RoomConfig>
          <h1>Room Setup</h1>
          <h2>Type of check-in</h2>
          {checkinQuestionsetOptions.map((checkin, index) => {
            return (
              <>
                <input
                  type="radio"
                  id="{checkin.label}"
                  name="roomSetup"
                  value="index"
                  defaultChecked={index === 0}
                  onClick={() =>
                    setCheckinQuestionSet(checkinQuestionsetOptions[index])
                  }
                />
                <label htmlFor="{checkin.label}">{checkin.label}</label>
                <br />
              </>
            );
          })}
          <h2>Check-in timing</h2>
          <span>Expected people in room</span>

          <StyledSlider
            min={2}
            max={50}
            renderTrack={Track}
            renderThumb={Thumb}
            value={peopleInRoom}
            onChange={setPeopleInRoom}
          />
          <br />
          <span>
            Check-in time per person:{" "}
            {checkinTime < 60
              ? `00:${checkinTime}`
              : moment.duration(checkinTime, "seconds").format("mm:ss")}
          </span>

          <StyledSlider
            min={checkinQuestionSet.minTimePerPerson}
            max={300}
            renderTrack={Track}
            renderThumb={TimerThumb}
            value={checkinTime}
            onChange={setCheckinTime}
          />
          <br />
          <span>Group tech savvyness: {zoomConfidence}/10</span>

          <StyledSlider
            min={0}
            max={10}
            renderTrack={Track}
            renderThumb={SavvyThumb}
            value={zoomConfidence}
            onChange={setZoomConfidence}
          />
          <span>What's zoom?</span>
          <RightSpan>we're waiting on you</RightSpan>
          <br />
          <br />
          <ErrorMessage errorCode={error}></ErrorMessage>
          {/* <input
            type="checkbox"
            id="vehicle1"
            name="vehicle1"
            value="Bike"
          ></input> */}
          <br />

          <h2>
            Estimated Checkin Duration:{" "}
            {moment
              .duration(
                120 +
                  checkinTime * peopleInRoom * (1 + (10 - zoomConfidence) / 20),
                "seconds"
              )
              .format("mm:ss")}
            {/* 10 - 1   0 - 1.5 */}
          </h2>
          <button onClick={createroom}>Open Room</button>
          <div>
            <a
              onClick={e => {
                e.preventDefault();
                setSliderScreen(0);
              }}
              href="#"
            >
              Back
            </a>
          </div>
        </RoomConfig>
      </AwesomeSlider>
    </Background>
  );
}

export default CreateList;
