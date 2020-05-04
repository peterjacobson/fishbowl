import React from "react";
import _ from "lodash";
import styled from "styled-components";

import * as FirestoreService from "../services/firestore";
import {
  TeamColorFill,
  VertSpacer,
  Centerer,
  TeamNames,
} from "../components/styledComponents";
import { CopyInviteUrl } from "./CopyInviteUrl";
import { firstTeamWords, secondTeamWords } from "../data/teamNameWords";
import {
  WhiteBackground,
  ButtonWithText,
  RowWrapper,
  teamColors,
  BigText,
} from "./styledComponents";

const Points = styled.div`
  border-radius: 100%;
  border-color: ${(props) => teamColors[props.team]};
  border-style: solid;
  border-width: 6px;
  height: 30px;
  width: 30px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  line-height: 30px;
  margin-top: -20px;
  background: white;
  color: black;
`;

const ColWidth = styled.div`
  margin: 0px 5px;
  width: 50%;
`;

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
  userId,
}) {
  function playerList(players) {
    return players
      ? players.map((player, i) => (
          <p key={i}>
            {player.userId === userId ? <b>Me~{player.name}</b> : player.name}
            <br />
          </p>
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
      <p>
        Ideally you'll have <b>6-12 players</b> in the game!
      </p>
      <VertSpacer />
      <VertSpacer />
      <VertSpacer />
      <p>
        <BigText>{players ? players.length : null} players</BigText> in the
        room:
      </p>
      <VertSpacer />
      {playerList(players)}
      <br />
      <CopyInviteUrl />
      <br />
      Once all the players are here, {creatorName} will make the teams
      <br />
      {iAmCreator ? (
        <>
          <VertSpacer />
          <VertSpacer />

          <VertSpacer />
          <ButtonWithText onClick={createTeams}>Create Teams</ButtonWithText>
        </>
      ) : null}
    </WhiteBackground>
  );

  const postTeams = (
    <Centerer>
      <RowWrapper>
        {teamNames
          ? [0, 1].map((i) => (
              <ColWidth key={i}>
                <TeamColorFill team={i}>
                  <Points team={i}>{points ? points[i] : null}</Points>
                  <TeamNames team={i}>
                    Team
                    <br />
                    {teamNames[i]}
                  </TeamNames>
                  {playerList(teams[i])}
                </TeamColorFill>
              </ColWidth>
            ))
          : null}
      </RowWrapper>
    </Centerer>
  );

  return <>{teamsFormed ? postTeams : preTeams}</>;
}
