import React, { useEffect, useState } from "react";
import * as FirestoreService from "../services/firestore";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import Select from "react-select";
import { CopyToClipboard } from "react-copy-to-clipboard";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import styled from "styled-components";
import { scrollTo } from "scroll-js";
import chunk from "lodash.chunk";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import EasyTimer from "../components/EasyTimer";
import needs from "../data/needs";
import greenFeelings from "../data/greenFeelings";
import peachFeelings from "../data/peachFeelings";
import room4 from "../img/room4.jpg";
import clarePeter from "../img/clarepete.jpg";
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
  /* padding-top: 20px;
  padding-left: 30px; */
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
  /* display: flex; */
  /* flex-direction: row; */
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

function InsideRoom(props) {
  const timerLength = 30;
  const defaultTimer = { startTime: 10000 };
  const checkinQuestions = ["green", "peach", "need", "need", "need"];
  const { users, roomId, user, onCloseroom, userId } = props;
  const [roomUsers, setRoomUsers] = useState([]);
  const [roomConfig, setRoomConfig] = useState(null);
  const [checkIn, setCheckIn] = useState({});
  const [myCheckIn, setMyCheckIn] = useState(
    new Array(10).fill({ type: "", word: "" })
  );
  const [checkIns, setCheckIns] = useState([]);
  const [error, setError] = useState();
  const { width, height } = useWindowSize();
  const [linkCopied, setLinkCopied] = useState(false);
  const [timer, setTimer] = useState(defaultTimer);
  const [sliderScreen, setSliderScreen] = useState(0);

  // Two cases:
  // user not yet checked in
  // user checked in already

  useEffect(() => {
    const unsubscribe = FirestoreService.streamRoom(roomId, {
      next: (querySnapshot) => {
        setRoomUsers(querySnapshot.data().users);
        setTimer(querySnapshot.data().timer || defaultTimer);
        setRoomConfig(querySnapshot.data().config);
        setMyCheckIn(
          querySnapshot.data().config.checkinFormat.map((checkinItem) => {
            return { type: checkinItem.type, word: "" };
          })
        );
      },
      error: () => setError("grocery-list-item-get-fail"),
    });
    return unsubscribe;
  }, [roomId, setRoomUsers, setRoomConfig, setTimer, setMyCheckIn]);

  // useEffect(() => {
  //   const unsubscribe = FirestoreService.streamRoom(roomId, {
  //     next: querySnapshot => {
  //       setTimer(querySnapshot.data().timer || defaultTimer);
  //     },
  //     error: () => setError("grocery-list-item-get-fail")
  //   });
  //   return unsubscribe;
  // }, [roomId, setTimer]);

  useEffect(() => {
    const unsubscribe = FirestoreService.streamRoomCheckIns(roomId, {
      next: (querySnapshot) => {
        setCheckIns(
          querySnapshot.docs.map((docSnapshot) => docSnapshot.data())
        );
      },
      error: () => setError("grocery-list-item-get-fail"),
    });
    return unsubscribe;
  }, [roomId, setCheckIns]);

  function startTimerNow() {
    FirestoreService.startTimer(Date.now(), roomId, userId, user);
    // setTimer(Date.now());
  }

  function convertToOptions(array) {
    return array.map((item) => {
      return { value: item, label: item };
    });
  }

  function updateMyCheckIn(option, action, checkinIndex) {
    console.log("roomUsers: ", roomUsers);
    const myNextCheckin = myCheckIn.map((checkin, index) => {
      return index === checkinIndex
        ? { ...checkin, word: option.value }
        : checkin;
    });
    setMyCheckIn(myNextCheckin);
    FirestoreService.updateCheckIn(myNextCheckin, roomId, userId);
  }

  const othersCheckIns = roomUsers
    // .filter(user => user.userId !== userId)
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
      <h2>
        {userCheckin.userId === userId ? "My" : `${userCheckin.name}'s`}{" "}
        check-in:
      </h2>
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
        {chunk(needs, columnLength).map((column) => (
          <VocabColumn>
            {column.map((need) => (
              <VocabWord style={rotateStyle()}>{need}</VocabWord>
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

  function customStyles(colors, tilt, shunt, z) {
    return {
      container: (base, state) => ({
        ...base,
        // transform: `rotate(${tilt}deg)`,
        // marginLeft: shunt,
        // marginBottom: -4,
        fontSize: "1.3em",
        maxWidth: 440,
        zIndex: z,
      }),
      control: (base, state) => ({
        ...base,
        height: 70,
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
        },
      }),
      singleValue: (base) => ({
        paddingLeft: 60,
        color: "white",
      }),
      menu: (base) => ({
        ...base,
        // override border radius to match the box
        // borderRadius: 0,
        // kill the gap
        marginTop: 0,
        paddingLeft: 60,
        color: "white",
        backgroundImage: `linear-gradient(to bottom right, ${colors[0]}, ${colors[1]})`,
      }),
      menuList: (base) => ({
        ...base,
        // kill the white space on first and last option
        padding: 0,
      }),
      placeholder: (base) => ({
        ...base,
        color: "#eee",
      }),
    };
  }

  const selectSetup = {
    green: {
      name: "greenFeeling",
      // value: checkIn.greenFeeling,
      placeholder: "...",
      options: greenFeelings,
      colors: colors.green,
      z: 100,
    },
    peach: {
      name: "peachFeeling",
      // value: checkIn.peachFeeling,
      placeholder: "...",
      options: peachFeelings,
      colors: colors.peach,
      z: 99,
    },
    need: {
      name: "need",
      // value: checkIn.need1,
      placeholder: "...",
      options: needs,
      colors: colors.need,
      z: 98,
    },
  };

  const selectElements = roomConfig
    ? roomConfig.checkinFormat.map((select, index) => {
        console.log("select: ", select);
        const tilt = Math.random() - 0.5;
        const shunt = (Math.random() - 0.5) * 2;
        const currentValue =
          myCheckIn[index].word === ""
            ? undefined
            : { value: myCheckIn[index].word, label: myCheckIn[index].word };
        return (
          <>
            <Prompt>{select.prompt}</Prompt>
            <Select
              value={currentValue}
              inputProps={{ readOnly: true }}
              name={selectSetup[select.type].name}
              placeholder={selectSetup[select.type].placeholder}
              options={convertToOptions(selectSetup[select.type].options)}
              // maxMenuHeight={9000}
              onChange={(option, action) =>
                updateMyCheckIn(option, action, index)
              }
              styles={
                checkIn.greenFeeling === ""
                  ? null
                  : customStyles(
                      selectSetup[select.type].colors,
                      tilt,
                      shunt,
                      100 - index
                    )
              }
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary25: "rgba(0, 0, 0, 0.4)",
                  primary: "rgba(0, 0, 0, 0.8)",
                },
              })}
            />
          </>
        );
      })
    : "loading";

  const awesomeSliderConfig = {
    name: "insideRoom",
    // fillParent: true,
    infinite: false,
    organicArrows: false,
    bullets: false,
    mobileTouch: true,
  };

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
        <br />
        <br />
        <StyledBackButton onClick={scrollToTop}>Back</StyledBackButton>
        <ButtonNext onClick={scrollToTop}>{nextText}</ButtonNext>
      </>
    );
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
            <p>You're jumping into a call with some other people.</p>
            <p>
              Getting clear on your and their needs and connecting authentically
              can help you get the most out of your meeting, so you all walk
              away feeling clear and maybe even nourished.
            </p>
            <p>
              This is a quick way to <strong>connect with authenticity</strong>{" "}
              and <strong>surface the highest priority needs</strong> in this
              call.
            </p>
            <p>
              All feelings are precious - all sensations people experience point
              to beautiful universal human needs, met or unmet.
            </p>
            <p>{otherUserNameList}</p>
            <p>
              Get everyone in this room by sending folk the invite link below{" "}
            </p>
            <CopyToClipboardSpan
              text={`${window.location.origin}/?listId=${roomId}`}
              onCopy={() => setLinkCopied(true)}
            >
              <LittleButton>Copy link to this room</LittleButton>
            </CopyToClipboardSpan>
            <span>{linkCopied ? "Link Copied 🙌" : null}</span>
            {navButtons(2, "Next", 0)}
            <br />
            <br />
            <br />
            <br />
            <br />
            <WidthWrapper>
              <h2>
                What if someone needs more care/support than I can or know how
                to provide?
              </h2>
              <p>
                If someone is in deeper distress than you feel you have the
                resources to navigate togther, they can get professional help...
              </p>
              <h2>...in Aotearoa New Zealand</h2>
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
            <Intro>Choose my check-in feelings and universal human needs</Intro>
            {/* <p>{roomConfig ? roomConfig.checkInGuide : "loading"}</p> */}
            <form name="myCheckIn">{selectElements}</form>
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
    </Background>
  );
}

export default InsideRoom;
