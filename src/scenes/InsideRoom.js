import React, { useEffect, useState } from "react";
import * as FirestoreService from "../services/firestore";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import Select from "react-select";
import { CopyToClipboard } from "react-copy-to-clipboard";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import styled from "styled-components";
import { Line } from "rc-progress";
import Timer from "react-compound-timer";
import needs from "../data/needs";
import greenFeelings from "../data/greenFeelings";
import peachFeelings from "../data/peachFeelings";
import room4 from "../img/room4.jpg";
import clarePeter from "../img/clarepete.jpg";

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
  display: inline-block;
`;

const SpanH2 = styled.h2`
  display: inline-block;
  margin-bottom: 4px;
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
  const { users, roomId, user, onCloseroom, userId } = props;
  const [roomUsers, setRoomUsers] = useState([]);
  const [checkIn, setCheckIn] = useState({});
  const [checkIns, setCheckIns] = useState([]);
  const [error, setError] = useState();
  const { width, height } = useWindowSize();
  const [linkCopied, setLinkCopied] = useState(false);
  const [timer, setTimer] = useState({});

  useEffect(() => {
    const unsubscribe = FirestoreService.streamRoom(roomId, {
      next: querySnapshot => {
        setRoomUsers(querySnapshot.data().users);
      },
      error: () => setError("grocery-list-item-get-fail")
    });
    return unsubscribe;
  }, [roomId, setRoomUsers]);

  useEffect(() => {
    const unsubscribe = FirestoreService.streamRoom(roomId, {
      next: querySnapshot => {
        setTimer(querySnapshot.data().timer);
      },
      error: () => setError("grocery-list-item-get-fail")
    });
    return unsubscribe;
  }, [roomId, setTimer]);

  useEffect(() => {
    const unsubscribe = FirestoreService.streamRoomCheckIns(roomId, {
      next: querySnapshot => {
        setCheckIns(querySnapshot.docs.map(docSnapshot => docSnapshot.data()));
      },
      error: () => setError("grocery-list-item-get-fail")
    });
    return unsubscribe;
  }, [roomId, setCheckIns]);

  function startTimerNow() {
    FirestoreService.startTimer(Date.now(), roomId, userId, user);
    // setTimer(Date.now());
  }

  function convertToOptions(array) {
    return array.map(item => {
      return { value: item, label: item };
    });
  }

  function updateMyCheckIn(option, action) {
    const updatedField = { [action.name]: option.value };
    FirestoreService.updateCheckIn(updatedField, roomId, userId);
  }

  const othersCheckIns = roomUsers
    // .filter(user => user.userId !== userId)
    .map(user => {
      return {
        ...user,
        ...checkIns.find(checkIn => {
          return checkIn.userId === user.userId;
        })
      };
    });

  function rotateStyle() {
    const angleDeg = (Math.random() - 0.5) * 4;
    return { transform: `rotate(${angleDeg}deg)` };
  }

  const allCheckinNeeds = checkIns
    .map(checkin => [checkin.need1, checkin.need2, checkin.need3])
    .flat()
    .filter(el => el !== undefined)
    .sort();

  const allCheckinNeedsElements = allCheckinNeeds.map(need => (
    <Need style={rotateStyle()}>{need}</Need>
  ));

  const othersCheckInsElements = othersCheckIns.map(anotherUser => (
    <>
      <h2>
        {anotherUser.userId === userId ? "My" : `${anotherUser.name}'s`}{" "}
        check-in:
      </h2>
      <CheckInItemRow>
        {anotherUser.greenFeeling ? (
          <GreenFeeling style={rotateStyle()}>
            {anotherUser.greenFeeling}
          </GreenFeeling>
        ) : null}
        {anotherUser.peachFeeling ? (
          <PeachFeeling style={rotateStyle()}>
            {anotherUser.peachFeeling}
          </PeachFeeling>
        ) : null}
      </CheckInItemRow>
      <CheckInItemRow>
        {anotherUser.need1 ? (
          <Need style={rotateStyle()}>{anotherUser.need1}</Need>
        ) : null}
        {anotherUser.need2 ? (
          <Need style={rotateStyle()}>{anotherUser.need2}</Need>
        ) : null}
        {anotherUser.need3 ? (
          <Need style={rotateStyle()}>{anotherUser.need3}</Need>
        ) : null}
      </CheckInItemRow>
    </>
  ));

  const otherUsers = users
    .filter(user => user.userId !== userId)
    .map(user => user.name);

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
        marginBottom: -4,
        fontSize: "1.3em",
        maxWidth: 440,
        zIndex: z
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
        inputProps={{ readOnly: true }}
        name={select.name}
        placeholder={select.placeholder}
        options={convertToOptions(select.options)}
        // maxMenuHeight={9000}
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

  const timerLength = 60 * 1000; // ms
  const timeDelayFromTimerStartedToStartTimeRecieved =
    (Date.now() - timer.startTime) / 100; // ms
  const timeRemaining =
    timerLength - timeDelayFromTimerStartedToStartTimeRecieved;
  console.log("------------------");
  console.log("timer.startTime: ", timer.startTime);
  // console.log("date.now(): ", Date.now());
  // console.log("Date.now() - timer.startTime: ", Date.now() - timer.startTime);
  console.log("Date.now(): ", Date.now());
  console.log(
    "timeDelayFromTimerStartedToStartTimeRecieved: ",
    timeDelayFromTimerStartedToStartTimeRecieved
  );
  console.log("timerLength: ", timerLength);
  console.log("timeRemaining: ", timeRemaining);
  console.log("------------------");

  return (
    <>
      <LoungeImageTop source={room4} />
      <Confetti width={width} height={height} recycle={false} />
      <SpanH2>👋 Welcome {user} 😌</SpanH2>
      <Intro>
        You're jumping into a call with some other people. Getting clear on your
        and their needs and connecting authentically can help you get the most
        out of your meeting, so you all walk away feeling clear and maybe even
        nourished.
      </Intro>
      <Intro>
        This is a quick way to <strong>connect with authenticity</strong> and{" "}
        <strong>surface the highest priority needs</strong> in this call.
      </Intro>
      <Intro>{otherUserNameList}</Intro>
      <Intro>
        All feelings are precious - all sensations people experience point to
        beautiful universal human needs, met or unmet.
      </Intro>
      <LoungeImageCenter />
      <h3>
        <em>
          <strong>Step #1</strong>
        </em>{" "}
        Get everyone in the room! You can invite people by pasting the link to
        this room into your zoom chat, email, slack, whatsapp or whatever:{" "}
      </h3>
      <CopyToClipboardSpan
        text={`${window.location.origin}/?listId=${roomId}`}
        onCopy={() => setLinkCopied(true)}
      >
        <LittleButton>Copy link to this room</LittleButton>
      </CopyToClipboardSpan>
      <span>{linkCopied ? "Link Copied 🙌" : null}</span>
      <h3>
        <em>
          <strong>Step #2</strong>
        </em>{" "}
        choose my check-in feelings and universal human needs
      </h3>
      <h2>My check-in</h2>
      <p>
        Green & Peach feelings in last 24hrs + three needs I'd love to meet in
        this call:
      </p>
      <form name="myCheckIn">{selectElements}</form>
      <ErrorMessage errorCode={error}></ErrorMessage>
      <h3>
        <em>
          <strong>Step #3</strong>
        </em>{" "}
        when everyone else has chosen their check-in feelings and needs, take 1
        min for each person to speak to the words they chose
      </h3>
      <button onClick={startTimerNow}>Start my 1min checkin</button>
      <button disabled>Peter checkin</button>
      <div>
        {timeDelayFromTimerStartedToStartTimeRecieved ? (
          <>
            <p>{timeRemaining}</p>
            <Timer initialTime={timeRemaining} direction="backward">
              {() => (
                <>
                  {timer.userName} is checking in for
                  <Timer.Seconds />
                  more seconds
                </>
              )}
            </Timer>
          </>
        ) : null}
      </div>
      {othersCheckInsElements}
      <h3>
        <em>
          <strong>Step #4</strong>
        </em>{" "}
        Check at the end of the meeting if you met these checkin needs. How
        might you meet more needs together?
      </h3>
      <CheckInItemRow>{allCheckinNeedsElements}</CheckInItemRow>
      <br />
      <LoungeImageBottom />
      <br />
      <a href="/" target="_blank">
        <LittleButton>
          create a new private Heartwork check-in room
        </LittleButton>
      </a>
      <ClarePeterPhoto src={clarePeter} />
      <Intro>
        We're Clare and Peter. We made this in to support people around the
        world to meet their needs for social connection during COVID. We live in
        Te Whanganui-a-Tara (Wellington), Aotearoa (New Zealand). We're
        committed to helping people #chooselove and creating the more beautiful
        world our hearts know is possible.
      </Intro>
      <a
        href="https://www.heartwork.co.nz/checkout/subscribe?cartToken=j-7gFqjxXqJ7BmTm9Yt2L2sI1Kb1p_mtD_enWqAV"
        target="_blank"
      >
        <LittleButton>support us with a weekly coffee - $4.50</LittleButton>
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
      {/* <button onClick={() => console.log(roomUsers)}>users</button>
      <button onClick={() => console.log(checkIns)}>checkIns</button> */}
    </>
  );
}

export default InsideRoom;
