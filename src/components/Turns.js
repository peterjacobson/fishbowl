import React from "react";
import _ from "lodash";
import styled from "styled-components";

import { rounds } from "../data/roundData";
import { ButtonWithText } from "./styledComponents";

export function Turns({ room }) {
  const userId =
    window.location.pathname.match(/(?<=(user\/))(.*?)(?=(\/bowl))/g)[0] || "";
  const {
    teamNames,
    currentTeam,
    team0,
    team1,
    currentPlayers,
    round,
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
    <>
      <b>GET READY TO GUESS</b> {turnPlayer.name}'s words/phrases
      <br />
      <br />
      <b>Pin {turnPlayer.name}'s video so you don't lose them!</b>
    </>
  );

  const preTurnInactiveTeamMessage =
    "Relax and prepare to enjoy some silliness";

  const preTurn = iAmTurnPlayer ? (
    <ButtonWithText>START MY TURN</ButtonWithText>
  ) : (
    <>
      Waiting for {turnPlayer.name} to start their turn
      <br />
      <br />
      {iAmTurnPlayer
        ? null
        : iAmTurnTeam
        ? preTurnActiveTeamMessage
        : preTurnInactiveTeamMessage}
    </>
  );

  const duringTurn = "DURINGTURN";

  return (
    <>
      <br />
      Turn: {teamNames[currentTeam]}
      <br />
      <br />
      Player: {turnPlayer.name}
      <br />
      <br />
      {rounds[round].rules}
      <br />
      <br />
      {turnActive ? duringTurn : preTurn}
    </>
  );
}
