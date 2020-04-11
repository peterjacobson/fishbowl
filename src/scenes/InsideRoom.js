import React, { useEffect, useState } from "react";
import * as FirestoreService from "../services/firestore";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import { CopyToClipboard } from "react-copy-to-clipboard";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import styled from "styled-components";
import { scrollTo } from "scroll-js";
import chunk from "lodash.chunk";
import {
  IoIosAddCircleOutline,
  IoIosArrowDropdown,
  IoIosArrowDropup,
  IoIosRemoveCircleOutline,
} from "react-icons/io";

import { FiCheckCircle, FiCircle } from "react-icons/fi";
import "react-awesome-slider/dist/styles.css";
import EasyTimer from "../components/EasyTimer";
import needs from "../data/needs";
import greenFeelings from "../data/greenFeelings";
import peachFeelings from "../data/peachFeelings";
import room4 from "../img/room4.jpg";
import clarePeter from "../img/clarepete.jpg";
import converter from "number-to-words";
import { Accordion, AccordionItem } from "react-sanfona";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

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
`;

const ConfigContainer = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: 20px;
  -webkit-box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.75);
`;

const VocabContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const AllNeedsContainer = styled(VocabContainer)`
  background: linear-gradient(
    to bottom right,
    ${colors.need[0]},
    ${colors.need[1]}
  );
`;
const AllGreenContainer = styled(VocabContainer)`
  background: linear-gradient(
    to bottom right,
    ${colors.green[0]},
    ${colors.green[1]}
  );
`;
const AllPeachContainer = styled(VocabContainer)`
  background: linear-gradient(
    to bottom right,
    ${colors.peach[0]},
    ${colors.peach[1]}
  );
`;

const VocabColumn = styled.div`
  width: 100%;
  max-width: 200px;
  margin: 0;
  padding: 0;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
`;

const VocabWord = styled.p`
  color: white;
  margin: 0px;
  margin-bottom: 3px;
  font-size: 1.2em;
  display: inline-block;
`;

const WidthWrapper = styled.div`
  max-width: 440px;
`;

const Prompt = styled.h2`
  margin-bottom: 2px;
`;

const StyledSlide = styled(Slide)`
  padding: 25px;
`;

const LittleButton = styled.button`
  font-size: 1em;
  display: inline-block;
`;

const CopyToClipboardSpan = styled(CopyToClipboard)`
  display: inline-block;
`;

const Intro = styled.p`
  max-width: 440px;
`;

const CheckInItemRow = styled.div`
  width: 100%;
`;

const StyledBackButton = styled(ButtonBack)`
  background: none;
  color: black;
  text-decoration: underline;
  box-shadow: none;
`;

const CheckInItem = styled.div`
  margin-right: 5px;
  margin-bottom: 5px;
  border-radius: 3px;
  padding: 10px 20px;
  font-size: 1.3em;
  color: white;
  display: inline-block;
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

const ClarePeterPhoto = styled.img`
  align-self: center;
  max-width: 220px;
  display: block;
`;

const FocusBackground = styled.div`
  position: absolute;
  height: 100%;
  max-width: 660px;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 30;
`;

const Panel = styled(AccordionItem)``;

const CollapseWrapper = styled.div`
  margin-top: 10px;
`;

const AddIcon = styled(IoIosAddCircleOutline)`
  font-size: 1.25em;
  cursor: pointer;
`;
const RemoveIcon = styled(IoIosRemoveCircleOutline)`
  font-size: 1.25em;
  cursor: pointer;
`;

const DropdownIcon = styled(IoIosArrowDropdown)`
  font-size: 1.25em;
`;
const DropupIcon = styled(IoIosArrowDropup)`
  font-size: 1.25em;
`;

const UncheckedIcon = styled(FiCircle)``;

const CheckedIcon = styled(FiCheckCircle)``;

const Completion = styled.span`
  margin-right: 10px;
`;

const DropdownWrap = styled(ConfigContainer)`
  color: white;
  background: linear-gradient(
    130deg,
    ${(props) => colors[props.type][0]},
    ${(props) => colors[props.type][1]}
  ) !important;
`;

const StyledCard = styled.div`
  border-radius: 20px;
  padding: 4px 20px;
  background-color: ${(props) =>
    props.on ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0)"};
  color: white;
  font-size: 1.4em;
  -webkit-box-shadow: -1px -2px 5px -2px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: -1px -2px 5px -2px rgba(0, 0, 0, 0.25);
  box-shadow: -1px -2px 5px -2px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

const AccordionHeader = styled.div`
  vertical-align: middle;
  font-size: 1.2em;
  cursor: pointer;
`;

const RightSpan = styled.div`
  float: right;
`;

const CheckinName = styled.h3`
  margin-bottom: 4px;
`;

function InsideRoom(props) {
  const defaultTimer = { startTime: 10000 };
  const checkinQuestions = ["green", "peach", "need", "need", "need"];
  const { users, roomId, user, onCloseroom, userId } = props;
  const [roomUsers, setRoomUsers] = useState([]);
  const [roomConfig, setRoomConfig] = useState(null);
  const [checkIn, setCheckIn] = useState({});
  const [myCheckIn, setMyCheckIn] = useState([]);
  const [checkIns, setCheckIns] = useState([]);
  const [error, setError] = useState();
  const { width, height } = useWindowSize();
  const [linkCopied, setLinkCopied] = useState(false);
  const [timer, setTimer] = useState(defaultTimer);
  const [sliderScreen, setSliderScreen] = useState(0);
  const [myGreenFeels, setMyGreenFeels] = useState([]);
  const [openAccordion, setOpenAccordion] = useState(null);

  function Card(props) {
    const isSelected = myCheckIn.find((item) => item.word === props.word);
    return (
      <StyledCard
        type={props.type}
        on={isSelected}
        onClick={() =>
          isSelected
            ? removeCheckinWord(props.type, props.word)
            : addCheckinWord(props.type, props.word)
        }
      >
        {props.word}
        <RightSpan>{isSelected ? <RemoveIcon /> : <AddIcon />}</RightSpan>
      </StyledCard>
    );
  }

  useEffect(() => {
    const unsubscribe = FirestoreService.streamRoom(roomId, {
      next: (querySnapshot) => {
        setRoomUsers(querySnapshot.data().users);
        setTimer(querySnapshot.data().timer || defaultTimer);
        setRoomConfig(querySnapshot.data().config);
      },
      error: () => setError("grocery-list-item-get-fail"),
    });
    return unsubscribe;
  }, [roomId, setRoomUsers, setRoomConfig, setTimer, setMyCheckIn]);

  useEffect(() => {
    const unsubscribe = FirestoreService.streamRoomCheckIns(roomId, {
      next: (querySnapshot) => {
        const nextCheckins = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        );
        setCheckIns(nextCheckins);
        const myNextCheckIn = nextCheckins.find((checkin) => {
          return checkin.userId === userId;
        });
        if (myNextCheckIn) setMyCheckIn(myNextCheckIn.checkInWords);
      },
      error: () => setError("grocery-list-item-get-fail"),
    });
    return unsubscribe;
  }, [roomId, setCheckIns, setMyCheckIn, userId]);

  function startTimerNow() {
    FirestoreService.startTimer(Date.now(), roomId, userId, user);
  }

  function convertToOptions(array) {
    return array.map((item) => {
      return { value: item, label: item };
    });
  }

  function updateMyCheckIn(option, action, checkinIndex) {
    const myNextCheckin = myCheckIn.map((checkin, index) => {
      return index === checkinIndex
        ? { ...checkin, word: option.value }
        : checkin;
    });
    setMyCheckIn(myNextCheckin);
    FirestoreService.updateCheckIn(myNextCheckin, roomId, userId);
  }

  const othersCheckIns = roomUsers
    .filter((user) => user.userId !== userId)
    .map((user) => {
      return {
        ...user,
        ...checkIns.find((checkIn) => {
          return checkIn.userId === user.userId;
        }),
      };
    });

  function rotateStyle() {
    const angleDeg = (Math.random() - 0.5) * 4;
    return { transform: `rotate(${angleDeg}deg)` };
  }

  const allCheckinNeeds = checkIns
    .map((checkin) => [checkin.need1, checkin.need2, checkin.need3])
    .flat()
    .filter((el) => el !== undefined)
    .sort();

  const allCheckinNeedsElements = allCheckinNeeds.map((need) => (
    <Need style={rotateStyle()}>{need}</Need>
  ));

  const othersCheckInsElements = othersCheckIns.map((userCheckin) => (
    <>
      <CheckinName>{`${userCheckin.name}'s check-in:`}</CheckinName>
      {userCheckin.checkInWords ? (
        <CheckInItemRow>
          {userCheckin.checkInWords
            .filter((word) => word.word !== "")
            .map((word) => {
              switch (word.type) {
                case "green":
                  return (
                    <GreenFeeling style={rotateStyle()}>
                      {word.word}
                    </GreenFeeling>
                  );
                  break;
                case "peach":
                  return (
                    <PeachFeeling style={rotateStyle()}>
                      {word.word}
                    </PeachFeeling>
                  );
                  break;
                case "need":
                  return <Need style={rotateStyle()}>{word.word}</Need>;
                  break;

                default:
                  break;
              }
            })}
        </CheckInItemRow>
      ) : null}
    </>
  ));

  function allNeeds() {
    const columns = 2;
    const columnLength = Math.ceil(needs.length / columns);
    return (
      <AllNeedsContainer>
        {chunk(needs, columnLength).map((column, index) => (
          <VocabColumn key={index}>
            {column.map((need, index) => (
              <VocabWord style={rotateStyle()} key={index}>
                {need}
              </VocabWord>
            ))}
          </VocabColumn>
        ))}
      </AllNeedsContainer>
    );
  }
  function allPeach() {
    const columns = 2;
    const columnLength = Math.ceil(
      peachFeelings.slice(1, peachFeelings.length + 1).length / columns
    );
    return (
      <AllPeachContainer>
        {chunk(
          peachFeelings.slice(1, peachFeelings.length + 1),
          columnLength
        ).map((column) => (
          <VocabColumn>
            {column.map((peach) => (
              <VocabWord style={rotateStyle()}>{peach}</VocabWord>
            ))}
          </VocabColumn>
        ))}
      </AllPeachContainer>
    );
  }
  function allGreen() {
    const columns = 2;
    const columnLength = Math.ceil(
      greenFeelings.slice(1, greenFeelings.length + 1).length / columns
    );
    return (
      <AllGreenContainer>
        {chunk(
          greenFeelings.slice(1, greenFeelings.length + 1),
          columnLength
        ).map((column) => (
          <VocabColumn>
            {column.map((green) => (
              <VocabWord style={rotateStyle()}>{green}</VocabWord>
            ))}
          </VocabColumn>
        ))}
      </AllGreenContainer>
    );
  }

  function generateCheckinElements(title, checkin) {
    return (
      <>
        <h2>{title}</h2>
        <CheckInItemRow>
          {checkin.map((item) => {
            return item.word === "" ? null : (
              <CheckInItem type={item.type} style={rotateStyle()}>
                item.word
              </CheckInItem>
            );
          })}
        </CheckInItemRow>
      </>
    );
  }

  const otherUsers = users
    .filter((user) => user.userId !== userId)
    .map((user) => user.name);

  const otherUserNameList =
    otherUsers.length === 0
      ? "This is a private room, you're the only one here so far. Invite people by sharing the link"
      : otherUsers.length === 1
      ? "You're in this private room with " + otherUsers[0]
      : otherUsers.length === 2
      ? "You're in this private room with " +
        otherUsers[0] +
        " and " +
        otherUsers[1]
      : "You're in this private room with " +
        otherUsers.slice(0, -1).join(", ") +
        " and " +
        otherUsers.slice(-1);

  const questionSet = roomConfig
    ? [
        ...new Array(roomConfig.numGreenFeelings).fill({
          type: "green",
          prompt: "Something I've felt in the last 24hrs",
        }),
        ...new Array(roomConfig.numPeachFeelings).fill({
          type: "peach",
          prompt: "Something I've felt in the last 24hrs",
        }),
        ...new Array(roomConfig.numNeeds).fill({
          type: "need",
          prompt: "A need that's alive in me now",
        }),
      ]
    : [];

  function toggleAccordianOpen(id) {
    setOpenAccordion(openAccordion === id ? null : id);
  }

  const accordionAnimation = {
    duration: 300,
    easing: "cubic-bezier(0.420, 0.000, 0.580, 1.000)",
  };

  function CompletionChecks(props) {
    const selectedOfType = myCheckIn.filter((item) => item.type === props.type);
    if (props.numRequired) {
      return (
        <Completion>
          {selectedOfType.length > 0
            ? new Array(selectedOfType.length)
                .fill("")
                .map(() => <CheckedIcon />)
            : null}
          {selectedOfType.length > props.numRequired
            ? null
            : new Array(props.numRequired - selectedOfType.length)
                .fill("")
                .map(() => <UncheckedIcon />)}
        </Completion>
      );
    } else {
      return null;
    }
  }

  const selectElements = (
    <Accordion allowMultiple={false}>
      {roomConfig ? (
        <>
          {roomConfig.numGreenFeelings > 0 ? (
            <DropdownWrap type="green">
              <Panel
                title={
                  <AccordionHeader onClick={() => toggleAccordianOpen(2)}>
                    <CompletionChecks
                      type="green"
                      numRequired={roomConfig.numGreenFeelings}
                    />
                    {roomConfig.numGreenFeelings === 1
                      ? "Something I've felt in the last 24hrs"
                      : `${converter.toWords(
                          roomConfig.numGreenFeelings
                        )} things I've felt in the last 24hrs`}
                    <RightSpan>
                      {openAccordion === 0 ? <DropupIcon /> : <DropdownIcon />}
                    </RightSpan>
                  </AccordionHeader>
                }
                key="1"
                {...accordionAnimation}
                onClick={() => toggleAccordianOpen(0)}
                expanded={openAccordion === 0}
              >
                <CollapseWrapper>
                  {greenFeelings.map((word, index) => (
                    <Card type={"green"} word={word} key={index} />
                  ))}
                </CollapseWrapper>
              </Panel>
            </DropdownWrap>
          ) : null}
          {roomConfig.numPeachFeelings > 0 ? (
            <DropdownWrap type="peach">
              <AccordionItem
                title={
                  <AccordionHeader onClick={() => toggleAccordianOpen(2)}>
                    <CompletionChecks
                      type="peach"
                      numRequired={roomConfig.numPeachFeelings}
                    />
                    {roomConfig.numPeachFeelings === 1
                      ? "Something I've felt in the last 24hrs"
                      : `${converter.toWords(
                          roomConfig.numPeachFeelings
                        )} things I've felt in the last 24hrs`}
                    <RightSpan>
                      {openAccordion === 1 ? <DropupIcon /> : <DropdownIcon />}
                    </RightSpan>
                  </AccordionHeader>
                }
                key="2"
                {...accordionAnimation}
                onClick={() => toggleAccordianOpen(1)}
                expanded={openAccordion === 1}
              >
                <CollapseWrapper>
                  {peachFeelings.map((word, index) => (
                    <Card type={"peach"} word={word} key={index} />
                  ))}
                </CollapseWrapper>
              </AccordionItem>
            </DropdownWrap>
          ) : null}
          {roomConfig.numNeeds > 0 ? (
            <DropdownWrap type="need">
              <AccordionItem
                title={
                  <AccordionHeader onClick={() => toggleAccordianOpen(2)}>
                    <CompletionChecks
                      type="need"
                      numRequired={roomConfig.numNeeds}
                    />
                    {roomConfig.numNeeds === 1
                      ? "A need that's alive in me"
                      : `${converter.toWords(
                          roomConfig.numNeeds
                        )} needs that are
                    alive in me`}
                    <RightSpan>
                      {openAccordion === 2 ? <DropupIcon /> : <DropdownIcon />}
                    </RightSpan>
                  </AccordionHeader>
                }
                key="3"
                {...accordionAnimation}
                onClick={() => toggleAccordianOpen(2)}
                expanded={openAccordion === 2}
              >
                <CollapseWrapper>
                  {needs.map((word, index) => (
                    <Card type={"need"} word={word} key={index} />
                  ))}
                </CollapseWrapper>
              </AccordionItem>
            </DropdownWrap>
          ) : null}
        </>
      ) : null}
    </Accordion>
  );

  function scrollToTop() {
    scrollTo(document.getElementsByClassName("carousel__slider")[0], {
      top: 0,
      left: 0,
      easing: "ease-in-out",
      duration: 500,
    });
  }

  function navButtons(nextSlideIndex, nextText, lastSlideIndex) {
    return (
      <>
        <br />
        <br />
        <StyledBackButton onClick={scrollToTop}>Back</StyledBackButton>
        <ButtonNext onClick={scrollToTop}>{nextText}</ButtonNext>
      </>
    );
  }

  function addCheckinWord(type, word) {
    const nextCheckin = [...myCheckIn, { type: type, word: word }];
    setMyCheckIn(nextCheckin);
    FirestoreService.updateCheckIn(nextCheckin, roomId, userId);
  }
  function removeCheckinWord(type, word) {
    const nextCheckin = myCheckIn.filter((item) => item.word !== word);
    setMyCheckIn(nextCheckin);
    FirestoreService.updateCheckIn(nextCheckin, roomId, userId);
  }

  const myCheckinSmall = (
    <>
      <CheckinName>My check-in:</CheckinName>
      {printCheckinItemsSmall(myCheckIn)}
    </>
  );

  function printCheckinItemsSmall(items) {
    const sortOrder = ["green", "peach", "need"];
    return items
      .slice()
      .sort((a, b) => sortOrder.indexOf(a.type) - sortOrder.indexOf(b.type))
      .map((item) => {
        switch (item.type) {
          case "green":
            return (
              <GreenFeeling style={rotateStyle()}>
                {item.word}{" "}
                <RemoveIcon
                  onClick={() => removeCheckinWord(item.type, item.word)}
                />
              </GreenFeeling>
            );
            break;
          case "peach":
            return (
              <PeachFeeling style={rotateStyle()}>
                {item.word}{" "}
                <RemoveIcon
                  onClick={() => removeCheckinWord(item.type, item.word)}
                />
              </PeachFeeling>
            );
            break;
          case "need":
            return (
              <Need style={rotateStyle()}>
                {item.word}{" "}
                <RemoveIcon
                  onClick={() => removeCheckinWord(item.type, item.word)}
                />
              </Need>
            );
            break;

          default:
            break;
        }
      });
  }

  return (
    <Background>
      <Confetti width={width} height={height} recycle={false} />
      <CarouselProvider
        totalSlides={5}
        naturalSlideWidth={10000}
        naturalSlideHeight={10000}
        isIntrinsicHeight={true}
        touchEnabled={false}
        dragEnabled={false}
      >
        <Slider>
          <StyledSlide index={0}>
            <h1>👋 Welcome {user}</h1>

            <br />
            <p>You're jumping into a call with some other people.</p>
            <p>
              This is a quick way to surface what is most alive for people right
              now and what you all need. In doing so, we hope you and the people
              you’re meeting with will find ways to get what you need quicker,
              so you can spend more time doing what matters.
            </p>
            <ConfigContainer>
              <p>{otherUserNameList}</p>
              <CopyToClipboardSpan
                text={`${window.location.origin}/?listId=${roomId}`}
                onCopy={() => setLinkCopied(true)}
              >
                <LittleButton>Copy invite link to this room</LittleButton>
              </CopyToClipboardSpan>
              <p>{linkCopied ? "Link Copied 🙌" : null}</p>
            </ConfigContainer>
            <br />
            <br />
            <ButtonNext>Next</ButtonNext>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <WidthWrapper>
              <h3>
                What if someone needs more care/support than I can or know how
                to provide?
              </h3>
              <p>
                If someone is in deeper distress than you feel you have the
                resources to navigate togther, they can get professional help...
              </p>
              <h3>...in Aotearoa New Zealand</h3>
              <p>by calling National helplines</p>
              <p>
                Need to talk? Free call or text
                <a href="https://1737.org.nz/">
                  &nbsp;<strong>1737</strong>
                </a>
                &nbsp;any time for support from a trained counsellor&nbsp;
              </p>
              <p>
                <a href="https://www.lifeline.org.nz/" target="_blank">
                  <strong>Lifeline</strong>
                </a>
                &ndash; 0800 543 354 (0800 LIFELINE) or free text 4357 (HELP)
              </p>
              <p>
                <a href="https://www.lifeline.org.nz/suicide-crisis-helpline">
                  <strong>Suicide Crisis Helpline</strong>
                </a>
                &nbsp;&ndash; 0508 828 865 (0508 TAUTOKO)
              </p>
              <p>
                <a
                  href="http://www.health.govt.nz/your-health/services-and-support/health-care-services/healthline"
                  target="_blank"
                >
                  <strong>Healthline</strong>
                </a>
                &nbsp;&ndash; 0800 611 116
              </p>
              <p>
                <a href="http://samaritans.org.nz/" target="_blank">
                  <strong>Samaritans</strong>
                </a>
                &nbsp;&ndash; 0800 726 666&nbsp;
              </p>
              <p>
                More here:{" "}
                <a
                  href="https://www.mentalhealth.org.nz/get-help/in-crisis/helplines/"
                  target="_blank"
                >
                  <strong>MentalHealth.org.nz helplines</strong>
                </a>
              </p>
            </WidthWrapper>
          </StyledSlide>
          <StyledSlide index={1}>
            <h1>Step 1: Pick my check-in</h1>
            {myCheckinSmall}
            {selectElements}
            {othersCheckInsElements}
            {navButtons(3, "Done", 1)}
            <br />
            <br />
            <br />
            {/* <ErrorMessage errorCode={error}></ErrorMessage> */}
          </StyledSlide>
          <StyledSlide index={2}>
            <h1>Step 2: Check-in together</h1>
            <Intro>
              Each person check-in - you have a little time to speak to the
              words you chose. Everyone else shut up and listen with curiosity,
              trust, attention and aroha 😉
            </Intro>
            <Intro>
              Once one person has finished their check-in there is no need for
              immediate response - the next person just starts their check-in.{" "}
              <br />
              Trust that any responses can wait until everyone has checked in
              (you can just do another round if it's feeling called for)
            </Intro>
            <EasyTimer
              timer={timer}
              startTimerNow={startTimerNow}
              timerLength={roomConfig ? roomConfig.timerLength : 60}
            />
            {othersCheckInsElements}
            {navButtons(4, "We've all checked-in", 2)}
          </StyledSlide>
          <StyledSlide index={3}>
            <h1>Keep deeply listening to each other</h1>
            <p>
              A powerful form of empathy is listening for a persons feelings and
              universal human needs.
            </p>
            <p>
              Every action word spoken is strategy to meet a beautiful need.
              Sometimes these strategies can be tragic - they may seem violent
              or defensive. But there is always a beautiful need underneath.
            </p>
            <h2>Some Universal Human Needs</h2>
            {allNeeds()}
            <p>
              Name it to tame it - naming feelings is a proven way to help
              someone come back to their senses from a freeze/fight/flight
              response.
            </p>
            {allPeach()}
            <p>
              How would you love the others to feel? How would you love to feel?
            </p>
            {allGreen()}
            {navButtons(5, "We finished our meeting", 3)}
            <br />
            <br />
            <br />
            <br />
            <br />
          </StyledSlide>
          <StyledSlide index={4}>
            <br />
            <a href="/" target="_blank">
              <LittleButton>
                create a new private Heartwork check-in room
              </LittleButton>
            </a>
            <br />
            <br />
            <br />
            <ClarePeterPhoto src={clarePeter} />
            <Intro>
              We're Clare and Peter. We made this in to support people around
              the world to meet their needs for social connection during COVID.
              We live in Te Whanganui-a-Tara (Wellington), Aotearoa (New
              Zealand). We're committed to helping people #chooselove and
              creating the more beautiful world our hearts know is possible.
            </Intro>
            <a
              href="https://www.heartwork.co.nz/checkout/subscribe?cartToken=j-7gFqjxXqJ7BmTm9Yt2L2sI1Kb1p_mtD_enWqAV"
              target="_blank"
            >
              <LittleButton>
                support us with a weekly coffee - $4.50
              </LittleButton>
            </a>
            <a
              href="https://www.heartwork.co.nz/checkout/subscribe?cartToken=AqsVsyGxX5pj_eiztgD9mKwRRwlTNg-o0mrSM4a3"
              target="_blank"
            >
              <LittleButton>
                support us with a weekly beer at your local - $11
              </LittleButton>
            </a>
            <a
              href="https://www.heartwork.co.nz/checkout/subscribe?cartToken=Y65SCIbzcDHc-yVcClx9zcdvwESJc-kP6EjZuhKm"
              target="_blank"
            >
              <LittleButton>support us a weekly pizza - $23</LittleButton>
            </a>
            <div>
              <StyledBackButton>Back</StyledBackButton>
            </div>
          </StyledSlide>
        </Slider>
      </CarouselProvider>
      <FocusBackground
        style={{ display: openAccordion === null ? "none" : "inherit" }}
      />
    </Background>
  );
}

export default InsideRoom;
