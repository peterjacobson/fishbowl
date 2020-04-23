import React, { useEffect, useState } from "react";

import { startTimer, stopTimer } from "../services/firestore";

const getNextStep = (currentTimeStamp, stopTimeStamp) =>
  Math.floor(Math.max(0, stopTimeStamp - currentTimeStamp) / 1000);

const tick = (nextStep, setTime) => setTimeout(() => setTime(nextStep), 1000);

export default function CheckInTimer({
  checkInTime,
  roomId,
  roomTimer,
  userId,
  userName,
}) {
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    if (!roomTimer) {
      return;
    }

    // NOTE: sometimes the timer goes away before we've finished counting down!
    // TODO: this also makes the username disappear...
    if (!roomTimer.stopTimeStamp && timeRemaining > 0) {
      tick(timeRemaining - 1, setTimeRemaining);
      return;
    }

    const nextStep = getNextStep(Date.now(), roomTimer.stopTimeStamp);
    if (nextStep > 0) {
      tick(nextStep, setTimeRemaining);
      return;
    }

    if (roomTimer.userId === userId) {
      stopTimer(roomId);
    }
  }, [roomId, roomTimer, setTimeRemaining, timeRemaining, userId]);

  const startCheckIn = () => {
    startTimer(
      Date.now(),
      Date.now() + checkInTime * 1000,
      roomId,
      userId,
      userName
    );
    setTimeRemaining(checkInTime);
  };

  return timeRemaining > 0 ? (
    <h3>
      {roomTimer &&
        roomTimer.userName &&
        `${roomTimer.userName} is checking in: `}
      {timeRemaining}s
    </h3>
  ) : (
    <button onClick={startCheckIn}>Start My Check-in</button>
  );
}
