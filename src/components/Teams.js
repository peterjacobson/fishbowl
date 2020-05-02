import React, { useEffect, useState } from "react";
import {
  WhiteBackground,
  ButtonWithText,
  RowWrapper,
} from "./styledComponents";
import _ from "lodash";

import * as FirestoreService from "../services/firestore";
import { TeamColorBackground } from "../components/styledComponents";
import { CopyInviteUrl } from "./CopyInviteUrl";
import { firstTeamWords, secondTeamWords } from "../data/teamNameWords";

export function Teams({
  points,
  teams,
  teamNames,
  players,
  currentPlayers,
  creatorName,
  iAmCreator,
  roomId,
  teamsFormed,
}) {
  function playerList(players) {
    return players
      ? players.map((player, i) => (
          <div key={i}>
            {player.name}
            <br />
          </div>
        ))
      : null;
  }

  function createTeams() {
    const teams = _.chunk(_.shuffle(players), Math.ceil(players.length / 2));
    const firstWords = _.shuffle(firstTeamWords).slice(0, 2);
    const secondWords = _.shuffle(secondTeamWords).slice(0, 2);
    const teamNames = [0, 1].map((i) => firstWords[i] + " " + secondWords[i]);
    FirestoreService.createTeams(roomId, teams, teamNames);
  }

  const preTeams = (
    <WhiteBackground>
      Players in the room:
      <br />
      {playerList(players)}
      <br />
      <CopyInviteUrl />
      <br />
      Once all the players are here, {creatorName} will make the teams
      <br />
      {iAmCreator ? (
        <ButtonWithText onClick={createTeams}>Create Teams</ButtonWithText>
      ) : null}
    </WhiteBackground>
  );

  const postTeams = (
    <RowWrapper>
      {teamNames
        ? [0, 1].map((i) => (
            <TeamColorBackground team={i}>
              {teamNames[i]}
              <br />
              {playerList(teams[i])}
            </TeamColorBackground>
          ))
        : null}
    </RowWrapper>
  );

  return <>{teamsFormed ? postTeams : preTeams}</>;
}
