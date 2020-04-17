import moment from "moment";

import { ButtonNext, CarouselProvider, Slider } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import React, { useState, useEffect } from "react";
import { scrollTo } from "scroll-js";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import Footer from "../components/Footer";
import {
  Background,
  CheckinQuestions,
  HelpText,
  InputName,
  Question,
  RoomConfig,
  SpokenCheckin,
  StyledBackButton,
  StyledCheckbox,
  StyledGreenTrack,
  StyledLabel,
  StyledNeedTrack,
  StyledPeachTrack,
  StyledSavvyThumb,
  StyledSlide,
  StyledSlider,
  StyledThumb,
  StyledTimerThumb,
  StyledTrack,
  ConfigContainer,
  ConfigH2,
  ConfigH3,
  InlineH1,
  StyledModal,
  ModalInner,
  HelpButton,
  Text,
} from "../components/styledComponents";
import { anonAuthenticate } from "../services/effects";
import * as FirestoreService from "../services/firestore";

import { colors } from "../colours";

const Thumb = (props, state) => (
  <StyledThumb {...props}>{state.valueNow} people</StyledThumb>
);
const SavvyThumb = (props, state) => (
  <StyledSavvyThumb {...props}>{state.valueNow}/10 tech savvy</StyledSavvyThumb>
);

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

function backgroundColor(type) {
  return {
    background: `linear-gradient(
      to bottom right,
      ${colors[type][0]},
      ${colors[type][1]}
    )`,
  };
}

// Click GO at end of this form
//    Create a room in firebase
//    Add me as a user to that room
//    Sets config of room
//    Redirects me to that room

function CreateList() {
  // no longer from props
  // const { onCreate, userId } = props;
  const [checkinTime, setCheckinTime] = useState(30);

  const [userName, setUserName] = useState("");
  const [error, setError] = useState();
  const [peopleInRoom, setPeopleInRoom] = useState(4);
  const [hasSpokenCheckin, setHasSpokenCheckin] = useState(true);
  const [showingSpokenCheckinHelp, setShowingSpokenCheckinHelp] = useState(
    false
  );
  const [showingFeelingHelp, setShowingFeelingHelp] = useState(false);
  const [showingGreenHelp, setShowingGreenHelp] = useState(false);
  const [showingPeachHelp, setShowingPeachHelp] = useState(false);
  const [showingNeedsHelp, setShowingNeedsHelp] = useState(false);

  const [zoomConfidence, setZoomConfidence] = useState(5);
  const [numGreenFeelings, setNumGreenFeelings] = useState(1);
  const [numPeachFeelings, setNumPeachFeelings] = useState(1);
  const [numNeeds, setNumNeeds] = useState(1);
  const [showConfig, setShowConfig] = useState(false);
  const [roomId, setRoomId] = useState(null);
  const [room, setRoom] = useState(null);
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState({});

  // Create the room
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

  // Authenticate
  useEffect(() => {
    FirestoreService.authenticateAnonymously()
      .then((userCredential) => {
        setUserId(userCredential.user.uid);
        if (roomId) {
          FirestoreService.getroom(roomId)
            .then((room) => {
              if (room.exists) {
                setError(null);
                setRoom(room.data());
              } else {
                setError("grocery-list-not-found");
                setRoomId();
              }
            })
            .catch(() => setError("grocery-list-get-fail"));
        }
      })
      .catch(() => setError("anonymous-auth-failed"));
  }, []);

  function onCreate(roomId, userName) {
    setRoomId(roomId);
    setUser(userName);
  }

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

  function checkName(e) {
    if (userName) setError(null);
  }

  const numQuestions = numNeeds + numPeachFeelings + numGreenFeelings + 1; //1 strategy question

  function EstCheckinDuration() {
    const techProblemsFactor = 1 + (10 - zoomConfidence) / 20;
    const timeGettingIntoRoom = 120 * techProblemsFactor; //s
    const avgTimeToSelectQuestion = 10; //s
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
            <Footer />
          </StyledSlide>
          <StyledSlide index={1}>
            <RoomConfig>
              <h1>Room Setup</h1>
              <h2>Welcome {userName}🙌</h2>
              <Text>You’re jumping into a call with some other people.</Text>
              <Text>
                This is a quick way to surface what is most alive for people
                right now and what you all need. In doing so, we hope you and
                the people you’re meeting with will find ways to get what you
                need quicker, so you can spend more time doing what matters.
              </Text>

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
                      min={30}
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
                  <span>Number of green (comfortable) feelings to select</span>
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
                    Number of peach (uncomfortable) feelings to select
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
                        Something (comfortable) I've felt in the last 24hrs
                      </Question>
                    ))}
                    {new Array(numPeachFeelings).fill("woo").map(() => (
                      <Question style={backgroundColor("peach")}>
                        Something (uncomfortable) I've felt in the last 24hrs
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
                          Something (comfortable) I've felt in the last 24hrs
                        </Question>
                      ))}
                    {new Array(numPeachFeelings)
                      .fill("woo")
                      .map((item, index) => (
                        <Question key={index} style={backgroundColor("peach")}>
                          Something (uncomfortable) I've felt in the last 24hrs
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
            <Footer />
          </StyledSlide>
        </Slider>
      </CarouselProvider>
    </Background>
  );
}

export default CreateList;
