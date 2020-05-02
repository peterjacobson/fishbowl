import React from "react";
import _ from "lodash";
import styled from "styled-components";
import { rounds } from "../data/roundData";

export function Turns({ room }) {
  const { teamNames, currentTeam, team0, team1, currentPlayers, round } = room;
  const teams = [team0, team1];

  return (
    <>
      <br />
      Turn: {teamNames[currentTeam]}
      <br />
      <br />
      Player:{" "}
      {_.get(teams, [currentTeam, currentPlayers[currentTeam]], {}).name}
      <br />
      <br />
      {rounds[round].rules}
    </>
  );
}
