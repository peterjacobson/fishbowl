import React from "react";
import _ from "lodash";
import styled from "styled-components";

import { ButtonWithText, TeamColorBackground } from "./styledComponents";

export function Turns({ room }) {
  const userId =
    window.location.pathname.match(/(?<=(user\/))(.*?)(?=(\/bowl))/g)[0] || "";
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
      <br />
      <b>Pin {turnPlayer.name}'s video so you don't lose them!</b>
    </p>
  );

  const preTurnInactiveTeamMessage = (
    <p>
      <b>RELAX</b>
      <br />
      it's the other teams turn next. Sit back and enjoy the show.
      <br />
      <br />
      Oh, and make sure they don't cheat!
    </p>
  );

  const preTurn = iAmTurnPlayer ? (
    <ButtonWithText>START MY TURN</ButtonWithText>
  ) : (
    <p>
      Waiting for {turnPlayer.name} to start their turn.
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
        <br />
        {turnActive ? duringTurn : preTurn}
      </TeamColorBackground>
    </>
  );
}
