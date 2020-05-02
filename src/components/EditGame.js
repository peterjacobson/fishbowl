import React from "react";
import _ from "lodash";

import * as FirestoreService from "../services/firestore";
import { ButtonWithText, WhiteBackground } from "./styledComponents";

export default function EditGame({ room, roomId }) {
  const {
    currentPlayers,
    currentTeam,
    team0,
    team1,
    roundWordPhrasesLeft,
  } = room;
  const teams = [team0, team1];

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

  return (
    <WhiteBackground>
      <ButtonWithText onClick={endTurn}>End Turn</ButtonWithText>
    </WhiteBackground>
  );
}
