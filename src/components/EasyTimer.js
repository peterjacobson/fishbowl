import React, { useState, useEffect } from "react";
import { Line } from "rc-progress";
import moment from "moment";
import styled from "styled-components";

const ConfigContainer = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: 20px;
  -webkit-box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.75);
`;

const LinkClick = styled.span`
  background: none;
  color: black;
  text-decoration: underline;
  box-shadow: none;
`;

export default function EasyTimer(props) {
  const [timeRemaining, setTimeRemaining] = useState(undefined);
  const timerLength = props.timerLength * 1000; // ms
  const timerLengthHR =
    props.timerLength < 60
      ? `00:${props.timerLength}s pp`
      : moment.duration(props.timerLength, "seconds").format("m:ss") +
        " mins pp";
  const timeRemainingS = Math.round(timeRemaining / 1000);
  const timeRemainingHR =
    timeRemainingS < 60
      ? `00:${timeRemainingS}s`
      : moment.duration(timeRemainingS, "seconds").format("m:ss");

  function ticker() {
    // const timeRemaining =
    //   timerLength - timeDelayFromTimerStartedToStartTimeRecieved;
    return setInterval(() => {
      const timeDelayFromTimerStartedToStartTimeRecieved =
        Date.now() - props.timer.startTime; // ms
      const timeRemaining =
        timerLength - timeDelayFromTimerStartedToStartTimeRecieved;
      setTimeRemaining(timeRemaining);
    }, 1000);
  }

  useEffect(() => {
    const activeTicker = ticker();
    return () => {
      clearInterval(activeTicker);
    };
  }, [props.timer]);

  return timeRemaining == undefined ? null : timeRemaining > 0 &&
    props.timer.userName ? (
    <ConfigContainer>
      {/* <Line
        percent={(1 - timeRemaining / timerLength) * 100}
        strokeColor={["#88C072", "#85D262", "#FE8C6A"]}
        trailColor={["#eef"]}
      /> */}
      <h1>{`${props.timer.userName} is checking in for another ${timeRemainingHR}`}</h1>
      <LinkClick onClick={props.stopTimerNow}>end timer now</LinkClick>
    </ConfigContainer>
  ) : (
    <ConfigContainer>
      <button onClick={props.startTimerNow}>
        Start my {timerLength / 1000} second checkin
      </button>
    </ConfigContainer>
  );
}
