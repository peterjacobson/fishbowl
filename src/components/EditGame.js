import React, { useState } from "react";
import _ from "lodash";

import * as FirestoreService from "../services/firestore";
import {
  AdminButton,
  WhiteBackground,
  FullWidth,
  TeamColorBackground,
  LowKeyButtonWrapper,
} from "./styledComponents";
import { CopyInviteUrl } from "./CopyInviteUrl";
import { firstTeamWords, secondTeamWords } from "../data/teamNameWords";

export default function EditGame({ room, roomId, teamsFormed }) {
  const {
    currentPlayers,
    currentTeam,
    team0,
    team1,
    users,
    roundWordPhrasesLeft,
    points,
  } = room;
  const teams = [team0, team1];

  const [editingTeams, setEditingTeams] = useState(false);
  const [editingPoints, setEditingPoints] = useState(false);

  function endTurn() {
    //update turnActive
    //update currentPlayers
    //update currentTeam
    //shuffle wordsleft
    const nextRoundWordPhrasesLeft = _.shuffle(roundWordPhrasesLeft.slice(1));
    const nextCurrentPlayers = currentPlayers.map((player, i) =>
      i === currentTeam ? (player + 1) % teams[i].length : player
    );
    const nextCurrentTeam = currentTeam === 0 ? 1 : 0;
    FirestoreService.endTurn(
      roomId,
      nextCurrentPlayers,
      nextCurrentTeam,
      nextRoundWordPhrasesLeft
    );
  }

  const playersWithoutTeams = teamsFormed
    ? users.filter(
        (user) =>
          !_.find(_.flatten(teams), (teamie) => teamie.userId === user.userId)
      )
    : [];

  function editTeams() {
    return (
      <FullWidth>
        <TeamColorBackground team={0}>
          {removePlayerList(team0, 0)}
        </TeamColorBackground>
        <TeamColorBackground team={1}>
          {removePlayerList(team1, 1)}
        </TeamColorBackground>
        <TeamColorBackground>
          {addPlayerList(playersWithoutTeams)}
        </TeamColorBackground>
      </FullWidth>
    );
  }

  function removePlayer(team, userId) {
    const updatedTeam = {
      [`team${team}`]: teams[team].filter((user) => user.userId !== userId),
    };
    FirestoreService.updateRoom(roomId, updatedTeam);
  }

  function addPlayer(team, user) {
    const updatedTeam = {
      [`team${team}`]: [...teams[team], user],
    };
    FirestoreService.updateRoom(roomId, updatedTeam);
  }

  function randomiseTeamNames() {
    const firstWords = _.shuffle(firstTeamWords).slice(0, 2);
    const secondWords = _.shuffle(secondTeamWords).slice(0, 2);
    const teamNames = {
      teamNames: [0, 1].map((i) => firstWords[i] + " " + secondWords[i]),
    };
    FirestoreService.updateRoom(roomId, teamNames);
  }

  function endRound() {
    const roomUpdate = {
      round: room.round + 1,
      roundActive: false,
      turnActive: false,
      roundWordPhrasesLeft: _.shuffle(room.wordPhrases),
    };
    FirestoreService.updateRoom(roomId, roomUpdate);
  }

  function goBackARound() {
    const roomUpdate = {
      round: room.round - 1,
      roundActive: false,
      turnActive: false,
      roundWordPhrasesLeft: _.shuffle(room.wordPhrases),
    };
    FirestoreService.updateRoom(roomId, roomUpdate);
  }

  function setAdmin(userId) {
    const roomUpdate = {
      createdBy: userId,
    };
    FirestoreService.updateRoom(roomId, roomUpdate);
  }

  function removePlayerList(players, team) {
    return players
      ? players.map((player, i) => (
          <TeamColorBackground team={team} key={i}>
            {player.name}{" "}
            <AdminButton onClick={() => removePlayer(team, player.userId)}>
              remove
            </AdminButton>
            <AdminButton onClick={() => setAdmin(player.userId)}>
              setAdmin
            </AdminButton>
            <br />
          </TeamColorBackground>
        ))
      : null;
  }

  function addPlayerList(players) {
    return players
      ? players.map((player, i) => (
          <div key={i}>
            {player.name}{" "}
            <AdminButton onClick={() => addPlayer(0, player)}>
              add blue
            </AdminButton>
            <AdminButton onClick={() => addPlayer(1, player)}>
              add green
            </AdminButton>
            <br />
          </div>
        ))
      : null;
  }

  function updatePoints(team, increment) {
    const roomUpdate = {
      points: points.map((fish, i) => (i === team ? fish + increment : fish)),
    };
    FirestoreService.updateRoom(roomId, roomUpdate);
  }

  function editPoints() {
    return (
      <>
        <AdminButton onClick={() => updatePoints(0, -1)}>
          blue remove
        </AdminButton>
        <AdminButton onClick={() => updatePoints(0, 1)}>blue add</AdminButton>
        <AdminButton onClick={() => updatePoints(1, -1)}>
          green remove
        </AdminButton>
        <AdminButton onClick={() => updatePoints(1, 1)}>green add</AdminButton>
      </>
    );
  }

  return (
    <LowKeyButtonWrapper>
      {teamsFormed ? (
        <>
          <CopyInviteUrl admin />
          <AdminButton onClick={endTurn}>End Turn</AdminButton>
          <AdminButton onClick={() => setEditingPoints(!editingPoints)}>
            Edit Points
          </AdminButton>
          {editingPoints ? editPoints() : null}
          <AdminButton onClick={() => setEditingTeams(!editingTeams)}>
            EDIT Teams
          </AdminButton>
          {editingTeams ? editTeams() : null}
          <AdminButton onClick={randomiseTeamNames}>
            Reset Team Names
          </AdminButton>
          <AdminButton onClick={endRound}>End Round</AdminButton>
          <AdminButton onClick={goBackARound}>Go Back a Round</AdminButton>
        </>
      ) : null}
    </LowKeyButtonWrapper>
  );
}
