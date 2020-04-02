import React, { useState, useEffect } from "react";
import { Line } from "rc-progress";

export default function EasyTimer(props) {
  const [timeRemaining, setTimeRemaining] = useState(undefined);
  const timerLength = 60 * 1000; // ms

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

  return timeRemaining == undefined ? null : timeRemaining > 0 ? (
    <>
      {/* <Line
        percent={(1 - timeRemaining / timerLength) * 100}
        strokeColor={["#88C072", "#85D262", "#FE8C6A"]}
        trailColor={["#eef"]}
      /> */}

      <p>{`${props.timer.userName} is checking in for another ${Math.round(
        timeRemaining / 1000
      )} seconds`}</p>
    </>
  ) : (
    <button onClick={props.startTimerNow}>
      Start my {timerLength / 1000} second checkin
    </button>
  );
}
