import React, { useState } from "react";
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
  BigText,
  Points,
} from "./styledComponents";
import EditRounds from "./EditRounds";
import { getRoomId } from "../services/urlData";

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
  room,
}) {
  const [numPlayers, setNumPlayers] = useState(6);
  const [numRounds, setNumRounds] = useState(5);
  const [numFishPerPlayer, setNumFishPerPlayer] = useState(3);

  const turnTime =
    numFishPerPlayer === 3 ? 60 : numFishPerPlayer === 2 ? 40 : 30;

  const updateFirestore = () => {
    const roomId = getRoomId();
    const usedWordPhrases = _.shuffle(room.wordPhrases).slice(
      (3 - numFishPerPlayer) * (room.wordPhrases.length / 3)
    );
    console.log("usedWordPhrases: ", usedWordPhrases);
    const update = {
      numRounds,
      numFishPerPlayer,
      turnTime,
      usedWordPhrases,
    };
    FirestoreService.updateRoom(roomId, update);
  };

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
    updateFirestore()
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
      <VertSpacer />
      <VertSpacer />
      <VertSpacer />
      {iAmCreator && players.length >= 4 ? (
        <>
          <ButtonWithText onClick={createTeams}>🐠Start Game</ButtonWithText>
          <VertSpacer />
          <VertSpacer />
          <VertSpacer />
        </>
      ) : null}
      {iAmCreator ? (
        <EditRounds
          {...{
            numPlayers,
            setNumPlayers,
            numRounds,
            setNumRounds,
            numFishPerPlayer,
            setNumFishPerPlayer,
          }}
        />
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
                  <Points team={i}>{points ? points[i] : null}🐠</Points>
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
