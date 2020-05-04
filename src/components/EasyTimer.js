import React, { useState, useEffect } from "react";
import { prototype } from "react-copy-to-clipboard";
import _ from "lodash";

import * as FirestoreService from "../services/firestore";

export default function EasyTimer({ turnStartTime, room, iAmTurnPlayer }) {
  const {
    roundWordPhrasesLeft,
    currentPlayers,
    currentTeam,
    team0,
    team1,
  } = room;
  const teams = [team0, team1];
  const userId =
    window.location.pathname.match(/user\/(.*?)\//g)[0].slice(5, -1) || "";
  const roomId =
    window.location.pathname.match(/room\/(.*?)\//g)[0].slice(5, -1) || "";
  const [timeRemaining, setTimeRemaining] = useState(60);
  const timerLength = 60 * 1000; // ms

  function ticker() {
    return setInterval((roundWordPhrasesLeft) => {
      const timeDelayFromTimerStartedToStartTimeRecieved =
        Date.now() - turnStartTime; // ms
      const timeRemaining = Math.floor(
        (timerLength - timeDelayFromTimerStartedToStartTimeRecieved) / 1000
      );
      if (timeRemaining < 0 && iAmTurnPlayer) {
        const nextRoundWordPhrasesLeft = _.shuffle(roundWordPhrasesLeft);
        const nextCurrentPlayers = currentPlayers.map((player, i) =>
          i === currentTeam ? (player + 1) % teams[i].length : player
        );
        const nextCurrentTeam = currentTeam === 0 ? 1 : 0;
        FirestoreService.endTurn(
          roomId,
          nextCurrentPlayers,
          nextCurrentTeam,
          nextRoundWordPhrasesLeft,
          roundWordPhrasesLeft
        );
        return;
      }
      setTimeRemaining(timeRemaining);
    }, 1000);
  }

  // function endTurn() {
  //   //update turnActive
  //   //update currentPlayers
  //   //update currentTeam
  //   //shuffle wordsleft
  //   const nextRoundWordPhrasesLeft = _.shuffle(roundWordPhrasesLeft);
  //   const nextCurrentPlayers = currentPlayers.map((player, i) =>
  //     i === currentTeam ? (player + 1) % teams[i].length : player
  //   );
  //   const nextCurrentTeam = currentTeam === 0 ? 1 : 0;
  //   FirestoreService.endTurn(
  //     roomId,
  //     nextCurrentPlayers,
  //     nextCurrentTeam,
  //     nextRoundWordPhrasesLeft,
  //     roundWordPhrasesLeft
  //   );
  // }

  useEffect(() => {
    const activeTicker = ticker();
    return () => {
      clearInterval(activeTicker);
    };
  }, []);

  return timeRemaining === undefined ? null : timeRemaining > 0 ? (
    <h2>{timeRemaining}</h2>
  ) : null;
}
