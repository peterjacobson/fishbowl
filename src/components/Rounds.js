import React from "react";
import _ from "lodash";
import { navigate } from "@reach/router";

import * as FirestoreService from "../services/firestore";
import {
  WhiteBackground,
  FullWidth,
  ButtonWithText,
  VertSpacer,
  TeamColorBackground,
} from "./styledComponents";
import { rounds } from "../data/roundData";
import { Turns } from "./Turns";
import Confetti from "react-confetti";

export function Rounds({ room, iAmCreator, creatorName, roomId, teamsFormed }) {
  const { round, points, roundActive, teamNames, team0, team1 } = room;
  const teams = [team0, team1];
  const userId =
    window.location.pathname.match(/user\/(.*?)\//g)[0].slice(5, -1) || "";

  function startRound() {
    const roundWordPhrases = _.shuffle(room.wordPhrases);
    FirestoreService.startRound(roomId, roundWordPhrases);
  }

  const endGame = round > 4;

  const preRound = (
    <>
      <Confetti recycle={false} />
      {iAmCreator ? (
        <ButtonWithText onClick={startRound}>START ROUND</ButtonWithText>
      ) : (
        <p>
          <b>{creatorName}</b> will start the round when ya'll are ready!
        </p>
      )}
    </>
  );

  const roundContent = (
    <>
      <p>
        Round {round + 1}: <b>{_.get(rounds, [round, "name"], null)}</b>
      </p>
      {_.get(rounds, [round, "rules"], "")}
      <VertSpacer />
      {roundActive ? <Turns {...{ room }} /> : preRound}
    </>
  );

  const winningTeam = points ? (points[0] > points[1] ? 0 : 1) : 0;
  const iAmOnWinningTeam = _.find(
    teams[winningTeam],
    (player) => player.userId === userId
  );

  const winningTeamMessage =
    "Nice work team! You're so in sync you could be a boy band";
  const losingTeamMessage =
    "Nice try! It's all about practice. Actually it's all about connecting. But if you want the GLORY, try again...";

  function startNewGame() {
    navigate("/");
  }

  const endGameContent = (
    <>
      <h2>GAME OVER</h2>
      <TeamColorBackground team={winningTeam}>
        <h1>
          <b>{teamNames ? teamNames[winningTeam] : null} WIN</b>
        </h1>
      </TeamColorBackground>
      {iAmOnWinningTeam ? winningTeamMessage : losingTeamMessage}
      <VertSpacer />
      <ButtonWithText onClick={startNewGame}>START A NEW GAME</ButtonWithText>
    </>
  );

  return teamsFormed ? (
    <FullWidth>
      <WhiteBackground>
        {endGame ? endGameContent : roundContent}
      </WhiteBackground>
    </FullWidth>
  ) : null;
}
