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
import { scrollTo } from "scroll-js";
import { FaQuestionCircle } from "react-icons/fa";
import "pure-react-carousel/dist/react-carousel.es.css";
import ReactSlider from "react-slider";
import Modal from "styled-react-modal";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

import room4 from "../img/room4.jpg";

const colors = {
  peach: ["#E88FA2", "#EB9B81"],
  green: ["#1696A0", "#88C072"],
  need: ["#2A3076", "#1792C8"],
  strategy: ["#d62346", "#f0aa71"],
};

const Background = styled.div`
  height: 100vh;
  background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.3)
    ),
    url(${room4});
  background-size: cover;
`;

const InputName = styled.input`
  border: none;
  border-bottom: 3px solid #d62346;
  font-size: 3em;
  background: none;
`;

const RoomConfig = styled.div`
  max-width: 440px;
  height: 100vh;
`;

const StyledSlider = styled(ReactSlider)`
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

const Question = styled.p`
  margin-top: 0;
  margin-bottom: 2px;
  padding: 5px 20px;
  color: white;
  border-radius: 5px;
`;

const CheckinQuestions = styled.div`
  /* margin-left: 20px; */
  /* padding: 10px; */
`;

const StyledSlide = styled(Slide)`
  padding: 25px;
`;

const StyledBackButton = styled(ButtonBack)`
  background: none;
  color: black;
  text-decoration: underline;
  box-shadow: none;
`;

const StyledCheckbox = styled.input`
  margin-left: 0px;
  cursor: pointer;
`;

const StyledLabel = styled.label`
  cursor: pointer;
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

const StyledGreenTrack = styled.div`
  top: 0;
  bottom: 0;
  background: ${(props) =>
    props.index === 1
      ? "#ddd"
      : `linear-gradient(
      to bottom right,
      ${colors.green[0]},
      ${colors.green[1]}
    )`};
  border-radius: 999px;
`;
const StyledPeachTrack = styled.div`
  top: 0;
  bottom: 0;
  background: ${(props) =>
    props.index === 1
      ? "#ddd"
      : `linear-gradient(
      to bottom right,
      ${colors.peach[0]},
      ${colors.peach[1]}
    )`};
  border-radius: 999px;
`;
const StyledNeedTrack = styled.div`
  top: 0;
  bottom: 0;
  background: ${(props) =>
    props.index === 1
      ? "#ddd"
      : `linear-gradient(
      to bottom right,
      ${colors.need[0]},
      ${colors.need[1]}
    )`};
  border-radius: 999px;
`;

const SpokenCheckin = styled.div`
  margin-bottom: 5px;
`;

const HelpText = styled.p`
  margin-left: 10px;
  color: #333;
`;

const ConfigContainer = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: 20px;
  -webkit-box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.75);
`;

const ConfigH2 = styled.h3`
  margin-top: 10px;
  margin-bottom: 5px;
`;
const ConfigH3 = styled.h3`
  margin-top: 10px;
  margin-bottom: 5px;
`;

const InlineH1 = styled.p`
  margin-top: 10px;
  margin-bottom: 5px;
  display: inline-block;
  font-size: 2em;
`;

const StyledModal = Modal.styled`
  max-width: 660px;
  margin-left: auto;
  margin-right: auto;
`;

const ModalInner = styled.div`
  padding: 20px 30px;
  background-color: white;
  max-width: 440px;
  margin-left: auto;
  margin-right: auto;
`;

const HelpButton = styled(FaQuestionCircle)`
  color: ${colors.green[1]};
  cursor: pointer;
`;

const Track = (props, state) => <StyledTrack {...props} index={state.index} />;
const GreenTrack = (props, state) => (
  <StyledGreenTrack {...props} index={state.index} />
);
const PeachTrack = (props, state) => (
  <StyledPeachTrack {...props} index={state.index} />
);
const NeedTrack = (props, state) => (
  <StyledNeedTrack {...props} index={state.index} />
);

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
  const [hasSpokenCheckin, setHasSpokenCheckin] = useState(true);
  const [showingSpokenCheckinHelp, setShowingSpokenCheckinHelp] = useState(
    false
  );
  const [showingFeelingHelp, setShowingFeelingHelp] = useState(false);
  const [showingGreenHelp, setShowingGreenHelp] = useState(false);
  const [showingPeachHelp, setShowingPeachHelp] = useState(false);
  const [showingNeedsHelp, setShowingNeedsHelp] = useState(false);

  const [zoomConfidence, setZoomConfidence] = useState(5);
  const [checkinQuestionSet, setCheckinQuestionSet] = useState(
    checkinQuestionsetOptions[0]
  );
  const [numGreenFeelings, setNumGreenFeelings] = useState(1);
  const [numPeachFeelings, setNumPeachFeelings] = useState(1);
  const [numNeeds, setNumNeeds] = useState(1);
  const [showConfig, setShowConfig] = useState(false);

  const TimerThumb = (props, state) => (
    <StyledTimerThumb {...props}>
      {setCheckinTime(state.valueNow)}
      {state.valueNow < 60
        ? `00:${state.valueNow}s pp`
        : moment.duration(state.valueNow, "seconds").format("m:ss") +
          " mins pp"}
    </StyledTimerThumb>
  );

  const GreenThumb = (props, state) => (
    <StyledTimerThumb {...props}>{state.valueNow} green</StyledTimerThumb>
  );
  const PeachThumb = (props, state) => (
    <StyledTimerThumb {...props}>{state.valueNow} peach</StyledTimerThumb>
  );
  const NeedThumb = (props, state) => (
    <StyledTimerThumb {...props}>
      {state.valueNow === 1
        ? `${state.valueNow} need`
        : `${state.valueNow} needs`}
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
      {
        numGreenFeelings: numGreenFeelings,
        numPeachFeelings: numPeachFeelings,
        numNeeds: numNeeds,
      },
      hasSpokenCheckin
    )
      .then((docRef) => {
        onCreate(docRef.id, userName);
      })
      .catch((reason) => {
        setError("create-list-error");
      });
  }

  function checkName(e) {
    if (userName) setError(null);
  }

  const numQuestions = numNeeds + numPeachFeelings + numGreenFeelings + 1; //1 strategy question

  function EstCheckinDuration() {
    const techProblemsFactor = 1 + (10 - zoomConfidence) / 20;
    const timeGettingIntoRoom = 120 * techProblemsFactor; //s
    const avgTimeToSelectQuestion = 20; //s
    const timeSelectingCheckins = numQuestions * avgTimeToSelectQuestion;
    const timeBetweenSpokenCheckiners = 5; //s
    const spokenCheckinTime = hasSpokenCheckin
      ? (checkinTime + timeBetweenSpokenCheckiners) * peopleInRoom
      : 0;
    return Math.ceil(
      (timeGettingIntoRoom + timeSelectingCheckins + spokenCheckinTime) / 60
    );
  }

  function toggleHasSpokenCheckin() {
    setHasSpokenCheckin(hasSpokenCheckin ? false : true);
  }
  function toggleCheckInHelp() {
    setShowingSpokenCheckinHelp(showingSpokenCheckinHelp ? false : true);
  }
  function toggleFeelingHelp() {
    setShowingFeelingHelp(showingFeelingHelp ? false : true);
  }
  function toggleGreenHelp() {
    setShowingGreenHelp(showingGreenHelp ? false : true);
  }
  function togglePeachHelp() {
    setShowingPeachHelp(showingPeachHelp ? false : true);
  }
  function toggleNeedsHelp() {
    setShowingNeedsHelp(showingNeedsHelp ? false : true);
  }
  function toggleShowCustomise() {
    if (showConfig) {
      setNumGreenFeelings(1);
      setNumPeachFeelings(1);
      setNumNeeds(1);
      setShowConfig(false);
    } else {
      setShowConfig(true);
    }
  }

  function handleNameSubmitPage1(e) {
    e.preventDefault();
    checkName();
    // move to room config slide
  }

  function scrollToTop() {
    scrollTo(document.getElementsByClassName("carousel__slider")[0], {
      top: 0,
      left: 0,
      easing: "ease-in-out",
      duration: 500,
    });
  }

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
            <form name="createListForm" onSubmit={handleNameSubmitPage1}>
              <InputName
                autoFocus={true}
                type="text"
                name="userName"
                placeholder="My name is..."
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <ButtonNext onClick={checkName}>Start</ButtonNext>
            </form>
          </StyledSlide>
          <StyledSlide index={1}>
            <RoomConfig>
              <h1>Room Setup</h1>
              <h2>Welcome {userName}🙌</h2>
              <p>You’re jumping into a call with some other people.</p>
              <p>
                This is a quick way to surface what is most alive for people
                right now and what you all need. In doing so, we hope you and
                the people you’re meeting with will find ways to get what you
                need quicker, so you can spend more time doing what matters.
              </p>

              <ConfigContainer>
                <ConfigH2>Check-in timing</ConfigH2>
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
                <SpokenCheckin>
                  <StyledCheckbox
                    type="checkbox"
                    name="hasSpokenCheckin"
                    onChange={toggleHasSpokenCheckin}
                    checked={hasSpokenCheckin}
                  />
                  <StyledLabel
                    onClick={toggleHasSpokenCheckin}
                    htmlFor="hasSpokenCheckin"
                  >
                    Spoken check-in?
                  </StyledLabel>
                  <HelpButton onClick={toggleCheckInHelp} />
                  <StyledModal
                    isOpen={showingSpokenCheckinHelp}
                    onBackgroundClick={toggleCheckInHelp}
                    onEscapeKeydown={toggleCheckInHelp}
                  >
                    <ModalInner>
                      <HelpText>
                        You can set up your check-in room with or without the
                        spoken step.
                      </HelpText>
                      <HelpText>
                        <b>Without spoken step:</b> If you choose without the
                        spoken step, everyone will have the opportunity to input
                        their check-in and it will show up on the shared screen,
                        but people won’t go around speaking their check-in to
                        the group. This is useful if you have less time, and
                        still want to give people an opportunity to connect with
                        themselves.{" "}
                      </HelpText>
                      <HelpText>
                        <b>With spoken step:</b> If you choose to include the
                        spoken step, each person will have the amount of time
                        you choose to speak to what they’ve inputted”
                      </HelpText>
                    </ModalInner>
                  </StyledModal>
                </SpokenCheckin>
                {hasSpokenCheckin ? (
                  <>
                    <span>Speaking time per person</span>
                    <StyledSlider
                      min={checkinQuestionSet.minTimePerPerson}
                      step={10}
                      max={300}
                      renderTrack={Track}
                      renderThumb={TimerThumb}
                      value={checkinTime}
                      onChange={setCheckinTime}
                    />
                  </>
                ) : null}
                <br />
                <span>Group tech savvyness</span>

                <StyledSlider
                  min={0}
                  max={10}
                  renderTrack={Track}
                  renderThumb={SavvyThumb}
                  value={zoomConfidence}
                  onChange={setZoomConfidence}
                  s
                />
                {showConfig ? null : (
                  <ConfigH2>
                    <InlineH1>
                      ~{EstCheckinDuration()}
                      mins
                    </InlineH1>{" "}
                    total check-in time
                  </ConfigH2>
                )}
              </ConfigContainer>
              {/* <ConfigH2>Customise check-in configuration</ConfigH2> */}
              {showConfig ? (
                <ConfigContainer>
                  <ConfigH2>Customise check-in question set</ConfigH2>
                  <ConfigH3>
                    Feelings
                    <HelpButton onClick={toggleFeelingHelp} />
                  </ConfigH3>
                  <StyledModal
                    isOpen={showingFeelingHelp}
                    onBackgroundClick={toggleFeelingHelp}
                    onEscapeKeydown={toggleFeelingHelp}
                  >
                    <ModalInner>
                      <HelpText>
                        Sometimes “feelings” can be a turn off. So you can
                        choose to setup this check-in with or without feelings.
                      </HelpText>
                      <HelpText>
                        <b>The value of including feelings</b> is that our
                        feelings are a useful gauge for our underlying human
                        needs. Knowing where people are really at can also help
                        a group make better decisions about how and where to
                        spend their energy.
                      </HelpText>
                      <HelpText>
                        So it’s up to you whether you include them - just
                        remember that if you do, some people may not want to
                        share or speak to what’s real for them, and that’s okay
                        too.
                      </HelpText>
                    </ModalInner>
                  </StyledModal>
                  <span>Number of green feelings to select (comfortable)</span>
                  <HelpButton onClick={toggleGreenHelp} />
                  <StyledModal
                    isOpen={showingGreenHelp}
                    onBackgroundClick={toggleGreenHelp}
                    onEscapeKeydown={toggleGreenHelp}
                  >
                    <ModalInner>
                      <HelpText>
                        Sometimes we can be focussed on what’s not working - so
                        much so we can miss the delight and forget what is
                        working really well.{" "}
                        <b>
                          We find naming green feelings can be energising and an
                          opportunity for celebration.
                        </b>
                      </HelpText>
                    </ModalInner>
                  </StyledModal>

                  <StyledSlider
                    min={0}
                    max={4}
                    renderTrack={GreenTrack}
                    renderThumb={GreenThumb}
                    value={numGreenFeelings}
                    onChange={setNumGreenFeelings}
                  />
                  <br />
                  <span>
                    Number of peach feelings to select (uncomfortable)
                  </span>
                  <HelpButton onClick={togglePeachHelp} />
                  <StyledModal
                    isOpen={showingPeachHelp}
                    onBackgroundClick={togglePeachHelp}
                    onEscapeKeydown={togglePeachHelp}
                  >
                    <ModalInner>
                      <HelpText>
                        Sometimes it can be hard for people to talk about and
                        name uncomfortable feelings, which is totally
                        understandable given the world many of us were raised
                        in.
                      </HelpText>
                      <HelpText>
                        <b>The value in including uncomfortable feelings</b> in
                        a check-in, is it can help people to get really clear on
                        what they need and take action, which may or may not
                        include asking the group for support of some kind.
                      </HelpText>
                      <HelpText>
                        Also, there’s an expression that goes “name it to tame
                        it”. In other words, sometimes just naming feelings is
                        all we need to dissolve them. Like acknowledging “I felt
                        angry” and then realising you’re need was just to
                        acknowledge it.
                      </HelpText>
                    </ModalInner>
                  </StyledModal>
                  <StyledSlider
                    min={0}
                    max={4}
                    renderTrack={PeachTrack}
                    renderThumb={PeachThumb}
                    value={numPeachFeelings}
                    onChange={setNumPeachFeelings}
                  />
                  <ConfigH3>
                    Needs
                    <HelpButton onClick={toggleNeedsHelp} />
                  </ConfigH3>
                  <StyledModal
                    isOpen={showingNeedsHelp}
                    onBackgroundClick={toggleNeedsHelp}
                    onEscapeKeydown={toggleNeedsHelp}
                  >
                    <ModalInner>
                      <HelpText>
                        <b>
                          All human behaviour can be viewed as attempts to meet
                          universal human needs.
                        </b>
                      </HelpText>
                      <HelpText>
                        <b>The most important thing</b> is for each person to
                        know what their needs are. Often clarity on a need is
                        enough for a person to meet that need themselves.
                      </HelpText>
                      <HelpText>
                        <b>Knowing other people’s needs helps us</b> best create
                        with them. If I know you’re yearning for agency, I’ll
                        approach you differently than if I know you’re yearning
                        for collaboration.
                      </HelpText>
                      <HelpText>
                        It’s hard to know what someone else’s needs are at any
                        given moment so it can be valuable to let each person
                        reflect and speak for themselves.
                      </HelpText>
                      <HelpText>
                        <i>
                          I might be silent in a meeting as a strategy to meet
                          any number of different needs: perhaps I have a need
                          for peace, perhaps I want to contribute as a leader
                          and be effective and so I want to give others space to
                          speak, perhaps I’m exhausted and have a need for rest,
                          or something else entirely.
                        </i>
                      </HelpText>
                    </ModalInner>
                  </StyledModal>
                  <span>Number of needs to select</span>
                  <StyledSlider
                    min={1}
                    max={10}
                    renderTrack={NeedTrack}
                    renderThumb={NeedThumb}
                    value={numNeeds}
                    onChange={setNumNeeds}
                  />
                  <br />
                  <br />
                  <CheckinQuestions>
                    Question set{" "}
                    <a href="#" onClick={toggleShowCustomise}>
                      <b>{showConfig ? "Reset to Default" : "Customise"}</b>
                    </a>
                    {new Array(numGreenFeelings).fill("woo").map(() => (
                      <Question style={backgroundColor("green")}>
                        Something I've felt in the last 24hrs
                      </Question>
                    ))}
                    {new Array(numPeachFeelings).fill("woo").map(() => (
                      <Question style={backgroundColor("peach")}>
                        Something I've felt in the last 24hrs
                      </Question>
                    ))}
                    {new Array(numNeeds).fill("woo").map(() => (
                      <Question style={backgroundColor("need")}>
                        A need that's alive in me
                      </Question>
                    ))}
                    <Question style={backgroundColor("strategy")}>
                      A strategy to meet a need of mine
                    </Question>
                  </CheckinQuestions>
                  {hasSpokenCheckin
                    ? numQuestions > 4 && checkinTime < 40
                      ? "You may want to add more speaking time per person"
                      : numQuestions > 7 && checkinTime < 120
                      ? "You may want to add more speaking time per person"
                      : numQuestions > 10 && checkinTime < 240
                      ? "You may want to add more speaking time per person"
                      : null
                    : null}
                  {/* {checkinQuestionsetOptions.map((checkin, index) => {
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
              })} */}
                  <ConfigH2>
                    <InlineH1>
                      ~{EstCheckinDuration()}
                      mins
                    </InlineH1>{" "}
                    total check-in time
                  </ConfigH2>
                </ConfigContainer>
              ) : (
                <>
                  <br />
                  <CheckinQuestions>
                    Question set{" "}
                    <a href="#" onClick={toggleShowCustomise}>
                      <b>{showConfig ? "Reset to Default" : "Customise"}</b>
                    </a>
                    {new Array(numGreenFeelings)
                      .fill("woo")
                      .map((item, index) => (
                        <Question key={index} style={backgroundColor("green")}>
                          Something I've felt in the last 24hrs
                        </Question>
                      ))}
                    {new Array(numPeachFeelings)
                      .fill("woo")
                      .map((item, index) => (
                        <Question key={index} style={backgroundColor("peach")}>
                          Something I've felt in the last 24hrs
                        </Question>
                      ))}
                    {new Array(numNeeds).fill("woo").map((item, index) => (
                      <Question key={index} style={backgroundColor("need")}>
                        A need that's alive in me
                      </Question>
                    ))}
                    <Question style={backgroundColor("strategy")}>
                      A strategy to meet a need of mine
                    </Question>
                  </CheckinQuestions>
                  {hasSpokenCheckin
                    ? numQuestions > 4 && checkinTime < 40
                      ? "You may want to add more speaking time per person"
                      : numQuestions > 7 && checkinTime < 120
                      ? "You may want to add more speaking time per person"
                      : numQuestions > 10 && checkinTime < 240
                      ? "You may want to add more speaking time per person"
                      : null
                    : null}
                </>
              )}
              <br />
              <br />
              <ErrorMessage errorCode={error}>
                <InputName
                  autoFocus={true}
                  type="text"
                  name="userName"
                  placeholder="My name is..."
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </ErrorMessage>

              <button onClick={createroom}>Open Room</button>
              <div>
                <StyledBackButton onClick={scrollToTop}>Back</StyledBackButton>
              </div>
              <br />
              <br />
              <br />
              <br />
            </RoomConfig>
          </StyledSlide>
        </Slider>
      </CarouselProvider>
    </Background>
  );
}

export default CreateList;
