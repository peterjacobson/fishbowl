import React, { useState, useEffect } from "react";

export default function EasyTimer(props) {
  const [now, setNow] = useState(Date.now());

  function ticker() {
    return setInterval(() => {
      setNow(Date.now());
    }, 1000);
  }

  useEffect(() => {
    const activeTicker = ticker();
    return () => {
      clearInterval(activeTicker);
    };
  }, [props.timer]);

  const timerLength = 60 * 1000; // ms
  const timeDelayFromTimerStartedToStartTimeRecieved =
    (Date.now() - props.timer.startTime) / 100; // ms
  // const timeRemaining =
  //   timerLength - timeDelayFromTimerStartedToStartTimeRecieved;
  const timeRemaining = now - props.timer.startTime;

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
