import React from "react";
import _ from "lodash";
import * as FirestoreService from "../services/firestore";

import Turn from "./Turn";
import {
  ButtonWithText,
  TeamColorBackground,
  VertSpacer,
  AdminButton,
} from "./styledComponents";
import Confetti from "react-confetti";

export function Turns({ room }) {
  const userId =
    window.location.pathname.match(/user\/(.*?)\//g)[0].slice(5, -1) || "";
  const roomId =
    window.location.pathname.match(/room\/(.*?)\//g)[0].slice(5, -1) || "";

  const {
    teamNames,
    currentTeam,
    team0,
    team1,
    currentPlayers,
    turnActive,
    roundWordPhrasesLeft,
  } = room;
  const teams = [team0, team1];
  const turnPlayer = _.get(
    teams,
    [currentTeam, currentPlayers[currentTeam]],
    {}
  );
  const iAmTurnPlayer = turnPlayer.userId === userId;
  const iAmTurnTeam = _.find(
    teams[currentTeam],
    (player) => player.userId === userId
  );

  const preTurnActiveTeamMessage = (
    <p>
      <b>GET READY TO GUESS</b> {turnPlayer.name}'s words/phrases
      <br />
      <b>Pin {turnPlayer.name}'s video so you don't lose them!</b>
    </p>
  );

  const preTurnInactiveTeamMessage = (
    <p>
      <Confetti recycle={false} />
      <b>RELAX: </b>
      it's the other teams turn next. Sit back and enjoy the show. Oh, and make
      sure they don't cheat!
    </p>
  );

  function startTurn() {
    FirestoreService.startTurn(
      roomId,
      Date.now(),
      _.shuffle(roundWordPhrasesLeft)
    );
  }
  function skipMyTurn() {
    const update = {
      currentPlayers: currentPlayers.map((playerIndex, i) =>
        i === currentTeam ? (playerIndex + 1) % teams[i].length : playerIndex
      ),
    };
    FirestoreService.updateRoom(roomId, update);
  }

  const preTurn = iAmTurnPlayer ? (
    <>
      <ButtonWithText onClick={startTurn}>START MY TURN</ButtonWithText>
      <VertSpacer />
      <VertSpacer />
      <VertSpacer />
      <VertSpacer />
      <VertSpacer />
      <VertSpacer />
      <VertSpacer />
      <AdminButton onClick={skipMyTurn}>Pass to next teamie</AdminButton>
    </>
  ) : (
    <>
      Waiting for {turnPlayer.name} to start their turn.
      <VertSpacer />
      {iAmTurnPlayer
        ? null
        : iAmTurnTeam
        ? preTurnActiveTeamMessage
        : preTurnInactiveTeamMessage}
    </>
  );

  return (
    <>
      <TeamColorBackground team={currentTeam}>
        <b>Turn: {teamNames[currentTeam]}</b>
        <h2>
          <b>Player: {turnPlayer.name}</b>
        </h2>
        <VertSpacer />
        {turnActive ? (
          <Turn {...{ room, iAmTurnPlayer, iAmTurnTeam }} />
        ) : (
          preTurn
        )}
      </TeamColorBackground>
    </>
  );
}
