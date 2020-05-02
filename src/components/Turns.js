import React from "react";
import _ from "lodash";
import styled from "styled-components";

export function Turns({ room }) {
  const { teamNames, currentTeam, team0, team1, currentPlayers } = room;
  const teams = [team0, team1];
  return (
    <>
      <br />
      Turn: {teamNames[currentTeam]}
      <br />
      <br />
      Player:{" "}
      {_.get(teams, [currentTeam, currentPlayers[currentTeam]], {}).name}
    </>
  );
}
