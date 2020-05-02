import React, { useState, useEffect } from "react";
import { prototype } from "react-copy-to-clipboard";

export default function EasyTimer(props) {
  const [timeRemaining, setTimeRemaining] = useState(60);
  const timerLength = 60 * 1000; // ms

  function ticker() {
    return setInterval(() => {
      const timeDelayFromTimerStartedToStartTimeRecieved =
        Date.now() - props.turnStartTime; // ms
      const timeRemaining = Math.floor(
        (timerLength - timeDelayFromTimerStartedToStartTimeRecieved) / 1000
      );
      if (timeRemaining < 0) return props.endTurn();
      setTimeRemaining(timeRemaining);
    }, 1000);
  }

  useEffect(() => {
    const activeTicker = ticker();
    return () => {
      clearInterval(activeTicker);
    };
  }, []);

  // return (
  //   <>
  //     {timeRemaining}
  //     {Date.now() - props.turnStartTime}
  //   </>
  // );

  return timeRemaining === undefined ? null : timeRemaining > 0 ? (
    <h2>{timeRemaining}</h2>
  ) : null;
}
