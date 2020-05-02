import React from "react";
import _ from "lodash";
import * as FirestoreService from "../services/firestore";

import {
  ButtonWithText,
  TeamColorBackground,
  VertSpacer,
} from "./styledComponents";

export function Turns({ room }) {
  const userId =
    window.location.pathname.match(/(?<=(user\/))(.*?)(?=(\/bowl))/g)[0] || "";
  const roomId =
    window.location.pathname.match(/(?<=(room\/))(.*?)(?=(\/user))/g)[0] || "";

  const {
    teamNames,
    currentTeam,
    team0,
    team1,
    currentPlayers,
    turnActive,
  } = room;
  const teams = [team0, team1];
  const turnPlayer = _.get(
    teams,
    [currentTeam, currentPlayers[currentTeam]],
    {}
  );
  const iAmTurnPlayer = turnPlayer.userId === userId;
  const iAmTurnTeam = _.find(
    teams[currentTeam],
    (player) => player.userId === userId
  );

  const preTurnActiveTeamMessage = (
    <p>
      <b>GET READY TO GUESS</b> {turnPlayer.name}'s words/phrases
      <br />
      <b>Pin {turnPlayer.name}'s video so you don't lose them!</b>
    </p>
  );

  const preTurnInactiveTeamMessage = (
    <p>
      <b>RELAX: </b>
      it's the other teams turn next. Sit back and enjoy the show. Oh, and make
      sure they don't cheat!
    </p>
  );

  function startTurn() {
    FirestoreService.startTurn(roomId, Date.now());
  }

  const preTurn = iAmTurnPlayer ? (
    <ButtonWithText onClick={startTurn}>START MY TURN</ButtonWithText>
  ) : (
    <p>
      Waiting for {turnPlayer.name} to start their turn.
      <VertSpacer />
      {iAmTurnPlayer
        ? null
        : iAmTurnTeam
        ? preTurnActiveTeamMessage
        : preTurnInactiveTeamMessage}
    </p>
  );

  const duringTurn = "DURINGTURN";

  return (
    <>
      <TeamColorBackground team={currentTeam}>
        <b>Turn: {teamNames[currentTeam]}</b>
        <h2>
          <b>Player: {turnPlayer.name}</b>
        </h2>
        <VertSpacer />
        <VertSpacer />
        {turnActive ? duringTurn : preTurn}
      </TeamColorBackground>
    </>
  );
}
