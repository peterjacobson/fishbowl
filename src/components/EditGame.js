import React, { useState } from "react";
import _ from "lodash";

import * as FirestoreService from "../services/firestore";
import {
  AdminButton,
  WhiteBackground,
  FullWidth,
  TeamColorBackground,
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
  } = room;
  const teams = [team0, team1];

  const [editingTeams, setEditingTeams] = useState(false);

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

  const playersWithoutTeams = users.filter(
    (user) =>
      !_.find(_.flatten(teams), (teamie) => teamie.userId === user.userId)
  );

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

  function removePlayerList(players, team) {
    return players
      ? players.map((player, i) => (
          <div key={i}>
            {player.name}{" "}
            <AdminButton onClick={() => removePlayer(team, player.userId)}>
              remove
            </AdminButton>
            <br />
          </div>
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

  return (
    <WhiteBackground>
      <CopyInviteUrl admin />
      {teamsFormed ? (
        <AdminButton onClick={endTurn}>End Turn</AdminButton>
      ) : null}
      {teamsFormed ? (
        <AdminButton onClick={() => setEditingTeams(!editingTeams)}>
          EDIT Teams
        </AdminButton>
      ) : null}
      {editingTeams ? editTeams() : null}
      <AdminButton onClick={randomiseTeamNames}>
        Randomise Team Names
      </AdminButton>
    </WhiteBackground>
  );
}
