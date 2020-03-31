import React, { useState, useEffect } from "react";

export default function EasyTimer(props) {
  const [timeRemaining, setTimeRemaining] = useState(Date.now());
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

  return (
    <>
      Hi
      <div>
        <p>{props.timer.startTime}</p>
        <p>
          {props.timer.userName} is checking in for {timeRemaining / 1000} more
          seconds
        </p>
      </div>
    </>
  );
}
