import React, { useState } from "react";
import * as FirestoreService from "../services/firestore";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import styled from "styled-components";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import ReactSlider from "react-slider";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

import room4 from "../img/room4.jpg";

const colors = {
  peach: ["#E88FA2", "#EB9B81"],
  green: ["#1696A0", "#88C072"],
  need: ["#2A3076", "#1792C8"],
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

const RoomConfig = styled.div`
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

const Question = styled.p`
  margin-top: 0;
  margin-bottom: 2px;
  padding: 5px 20px;
  color: white;
  border-radius: 5px;
`;

const CheckinQuestions = styled.div`
  margin-left: 20px;
  padding: 10px;
`;

const Thumb = (props, state) => (
  <StyledThumb {...props}>{state.valueNow} people</StyledThumb>
);
const SavvyThumb = (props, state) => (
  <StyledSavvyThumb {...props}>{state.valueNow}/10 tech savvy</StyledSavvyThumb>
);

const StyledTrack = styled.div`
  top: 0;
  bottom: 0;
  background: ${(props) => (props.index === 1 ? "#ddd" : "pink")};
  border-radius: 999px;
`;

const Track = (props, state) => <StyledTrack {...props} index={state.index} />;

const checkinQuestionsetOptions = [
  {
    label: "quick meeting checkin",
    checkInGuide:
      "A feeling I've felt in the last 24hrs + two needs I'd love to meet in this meeting",
    checkinFormat: [
      { type: "green", prompt: "A feeling I've felt in the last 24hrs" },
      { type: "peach", prompt: "A feeling I've felt in the last 24hrs" },
      { type: "need", prompt: "A need I'd love to meet" },
    ],
    minTimePerPerson: 30,
  },

  {
    label: "family / smaller team, meeting 40mins +",
    checkInGuide:
      "een & Peach feelings I've felt in last 24hrs + three needs I'd love to meet in this call:",
    checkinFormat: [
      { type: "green", prompt: "A feeling I've felt in the last 24hrs" },
      { type: "peach", prompt: "A feeling I've felt in the last 24hrs" },
      { type: "need", prompt: "1st need I'd love to meet in this gathering" },
      { type: "need", prompt: "2nd need I'd love to meet in this gathering" },
      { type: "need", prompt: "3rd need I'd love to meet in this gathering" },
    ],
    minTimePerPerson: 120,
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
      { type: "need", prompt: "4th need I'm yearning to meet right now" },
    ],
    minTimePerPerson: 240,
  },
  {
    label: "what do people in our organisation need? (1hr-1wk)",
    checkInGuide:
      "Green & Peach feelings in last 24hrs + five needs that feel alive for me at the moment",
    checkinFormat: [
      { type: "need", prompt: "1st need I'd love to meet here" },
      { type: "need", prompt: "2nd need I'd love to meet here" },
      { type: "need", prompt: "3rd need I'd love to meet here" },
    ],
    minTimePerPerson: 240,
  },
];

function backgroundColor(type) {
  return {
    background: `linear-gradient(
      to bottom right,
      ${colors[type][0]},
      ${colors[type][1]}
    )`,
  };
}

function CreateList(props) {
  const initialConfig = checkinQuestionsetOptions[0];
  const { onCreate, userId } = props;
  const [userName, setUserName] = useState("");
  const [error, setError] = useState();
  const [peopleInRoom, setPeopleInRoom] = useState(4);
  const [checkinTime, setCheckinTime] = useState(
    initialConfig.minTimePerPerson
  );
  const [zoomConfidence, setZoomConfidence] = useState(5);
  const [checkinQuestionSet, setCheckinQuestionSet] = useState(
    checkinQuestionsetOptions[0]
  );

  const TimerThumb = (props, state) => (
    <StyledTimerThumb {...props}>
      {setCheckinTime(state.valueNow)}
      {state.valueNow < 60
        ? `00:${state.valueNow}s pp`
        : moment.duration(state.valueNow, "seconds").format("m:ss") +
          " mins pp"}
    </StyledTimerThumb>
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
      .then((docRef) => {
        onCreate(docRef.id, userName);
      })
      .catch((reason) => {
        setError("create-list-error");
      });
  }

  function checkName(e) {
    setError(null);
    if (!userName) {
      setError("user-name-required");
      throw "";
    }
  }

  const StyledSlide = styled(Slide)`
    padding: 25px;
  `;

  const StyledBackButton = styled(ButtonBack)`
    background: none;
    color: black;
    text-decoration: underline;
    box-shadow: none;
  `;

  return (
    <Background>
      <CarouselProvider
        totalSlides={2}
        naturalSlideWidth={10000}
        naturalSlideHeight={10000}
        isIntrinsicHeight={true}
        touchEnabled={false}
        dragEnabled={false}
      >
        <Slider>
          <StyledSlide index={0}>
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
                onChange={(e) => setUserName(e.target.value)}
              />
              <ErrorMessage errorCode={error}></ErrorMessage>
              <ButtonNext onClick={checkName}>Start</ButtonNext>
              {/* <button
                onClick={(e) => {
                  e.preventDefault();
                  setSliderScreen(1);
                }}
              >
                Start
              </button> */}
            </form>
          </StyledSlide>
          <StyledSlide index={1}>
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
              <CheckinQuestions>
                Question set
                {checkinQuestionSet.checkinFormat.map((format) => (
                  <Question style={backgroundColor(format.type)}>
                    {format.prompt}
                  </Question>
                ))}
              </CheckinQuestions>
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
              <span>Check-in time per person</span>

              <StyledSlider
                min={checkinQuestionSet.minTimePerPerson}
                max={300}
                renderTrack={Track}
                renderThumb={TimerThumb}
                value={checkinTime}
                onChange={setCheckinTime}
              />
              <br />
              <span>Group tech savvyness</span>

              <StyledSlider
                min={0}
                max={10}
                renderTrack={Track}
                renderThumb={SavvyThumb}
                value={zoomConfidence}
                onChange={setZoomConfidence}
              />
              <br />
              <br />
              <ErrorMessage errorCode={error}></ErrorMessage>
              <br />

              <h2>
                Estimated Checkin Duration:{" "}
                {moment
                  .duration(
                    120 +
                      checkinTime *
                        peopleInRoom *
                        (1 + (10 - zoomConfidence) / 20),
                    "seconds"
                  )
                  .format("mm:ss")}
                {/* 10 - 1   0 - 1.5 */}
              </h2>
              <button onClick={createroom}>Open Room</button>
              <div>
                <StyledBackButton>Back</StyledBackButton>
              </div>
            </RoomConfig>
          </StyledSlide>
        </Slider>
      </CarouselProvider>
    </Background>
  );
}

export default CreateList;
