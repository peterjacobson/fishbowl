import React from "react";
import _ from "lodash";

import * as FirestoreService from "../services/firestore";
import { ButtonWithText } from "./styledComponents";

export default function Turn({ room, iAmTurnPlayer, iAmTurnTeam }) {
  const userId =
    window.location.pathname.match(/(?<=(user\/))(.*?)(?=(\/bowl))/g)[0] || "";
  const roomId =
    window.location.pathname.match(/(?<=(room\/))(.*?)(?=(\/user))/g)[0] || "";

  const {
    round,
    team0,
    team1,
    wordPhrases,
    roundWordPhrasesLeft,
    currentTeam,
    points,
    currentPlayers,
  } = room;
  const teams = [team0, team1];

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
      const nextRoundWordPhrasesLeft = _.shuffle(wordPhrases);
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

  const myTurn = (
    <>
      Express this to your team:
      <br />
      <h3>
        <b>{_.get(roundWordPhrasesLeft, 0, "loading...")}</b>
      </h3>
      <ButtonWithText onClick={teamGotIt}>DONE - NEXT!</ButtonWithText>
    </>
  );

  const myTeamsTurn = (
    <h3>
      <b>Guess the Word/Phrase!!!</b>
    </h3>
  );
  const otherTeamsTurn = (
    <p>
      <b>Relax</b>, just keep the other team honest ;)
    </p>
  );

  if (iAmTurnPlayer) {
    return myTurn;
  } else if (iAmTurnTeam) {
    return myTeamsTurn;
  } else {
    return otherTeamsTurn;
  }
}
