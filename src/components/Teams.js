import React from "react";
import _ from "lodash";
import styled from "styled-components";

import * as FirestoreService from "../services/firestore";
import {
  TeamColorBackground,
  VertSpacer,
  Centerer,
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
  margin-top: -30px;
  background: white;
`;

const ColWidth = styled.div`
  /* flex-grow: 1; */
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
                <TeamColorBackground team={i}>
                  <Points team={i}>{points ? points[i] : null}</Points>
                  <b>{teamNames[i]}</b>
                  {playerList(teams[i])}
                </TeamColorBackground>
              </ColWidth>
            ))
          : null}
      </RowWrapper>
    </Centerer>
  );

  return <>{teamsFormed ? postTeams : preTeams}</>;
}
