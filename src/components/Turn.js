import React from "react";
import _ from "lodash";

import * as FirestoreService from "../services/firestore";
import {
  ButtonWithText,
  VertSpacer,
  SmallText,
  AdminButton,
} from "./styledComponents";
import EasyTimer from "./EasyTimer";

export default function Turn({ room, iAmTurnPlayer, iAmTurnTeam }) {
  const userId =
    window.location.pathname.match(/user\/(.*?)\//g)[0].slice(5, -1) || "";
  const roomId =
    window.location.pathname.match(/room\/(.*?)\//g)[0].slice(5, -1) || "";

  const {
    round,
    team0,
    team1,
    usedWordPhrases,
    roundWordPhrasesLeft,
    currentTeam,
    points,
    currentPlayers,
    turnStartTime,
  } = room;
  const teams = [team0, team1];
  console.log("roundWordPhrasesLeft: ", roundWordPhrasesLeft);

  const roundIsEnded = roundWordPhrasesLeft.length <= 1;

  function teamGotIt() {
    const nextPoints = points.map((points, team) =>
      team === currentTeam ? points + 1 : points
    );

    if (roundIsEnded) {
      // end round
      // end turn
      // update points
      // update currentPlayers
      // update currentTeam
      const nextRoundWordPhrasesLeft = _.shuffle(usedWordPhrases);
      const nextRound = round + 1;
      const nextCurrentPlayers = currentPlayers.map((player, i) =>
        i === currentTeam ? (player + 1) % teams[i].length : player
      );
      const nextTeam = currentTeam === 0 ? 1 : 0;
      FirestoreService.teamGotItOuttaWords(
        roomId,
        nextRoundWordPhrasesLeft,
        nextPoints,
        nextRound,
        nextCurrentPlayers,
        nextTeam
      );
    } else {
      const nextRoundWordPhrasesLeft = _.shuffle(roundWordPhrasesLeft.slice(1));
      FirestoreService.teamGotIt(roomId, nextRoundWordPhrasesLeft, nextPoints);
    }
  }

  function cheated() {
    if (roundWordPhrasesLeft.length === 1) {
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
    } else {
      const nextRoundWordPhrasesLeft = _.shuffle(roundWordPhrasesLeft);
      FirestoreService.cheated(roomId, nextRoundWordPhrasesLeft);
    }
  }

  const myTurn = (
    <>
      <SmallText>Make your team guess:</SmallText>
      <VertSpacer />
      <h3>
        <b>{_.get(roundWordPhrasesLeft, 0, "loading...")}</b>
      </h3>
      <VertSpacer />
      <ButtonWithText onClick={teamGotIt}>DONE - NEXT!</ButtonWithText>
      <VertSpacer />
      <EasyTimer {...{ turnStartTime, room, iAmTurnPlayer }} />
      <VertSpacer />
      <VertSpacer />
      <VertSpacer />
      <VertSpacer />
      <AdminButton onClick={cheated}>☠️Cheated☠️ next</AdminButton>
    </>
  );

  const myTeamsTurn = (
    <>
      <h3>
        <b>Guess the Word/Phrase!!!</b>
      </h3>
      <EasyTimer {...{ turnStartTime, room, iAmTurnPlayer }} />
    </>
  );
  const otherTeamsTurn = (
    <>
      <p>
        <b>Relax</b>, just keep the other team honest ;)
      </p>
      <EasyTimer {...{ turnStartTime, room, iAmTurnPlayer }} />
    </>
  );

  if (iAmTurnPlayer) {
    return myTurn;
  } else if (iAmTurnTeam) {
    return myTeamsTurn;
  } else {
    return otherTeamsTurn;
  }
}
