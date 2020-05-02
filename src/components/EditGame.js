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

export default function EditGame({ room, roomId, teamsFormed }) {
  const {
    currentPlayers,
    currentTeam,
    team0,
    team1,
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
    console.log("teams: ", teams);
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

  function editTeams() {
    return (
      <FullWidth>
        <TeamColorBackground team={0}>
          {removePlayerList(team0, 0)}
        </TeamColorBackground>
        <TeamColorBackground team={1}>
          {removePlayerList(team1, 1)}
        </TeamColorBackground>
      </FullWidth>
    );
  }

  function removePlayer(team, userId) {
    //
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
    </WhiteBackground>
  );
}
