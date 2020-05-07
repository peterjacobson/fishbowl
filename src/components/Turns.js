import React from "react";
import _ from "lodash";
import * as FirestoreService from "../services/firestore";

import Turn from "./Turn";
import {
  ButtonWithText,
  TeamColorBackground,
  VertSpacer,
  AdminButton,
  Padding,
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
    turnTime,
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
      Get ready to guess {turnPlayer.name}'s words and phrases
      <br />
      <i>Pin {turnPlayer.name}'s video!</i>
    </p>
  );

  const preTurnInactiveTeamMessage = (
    <p>
      <Confetti recycle={false} />
      Sit back and enjoy the show. Oh, and make sure they don't cheat!
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
      <p>Get your team to guess as many words and phrases as possible in {turnTime}s</p>
      <VertSpacer />
      <VertSpacer />
      <AdminButton onClick={skipMyTurn}>Pass to next teamie</AdminButton>
    </>
  ) : (
    <>
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
        <Padding>
          {iAmTurnPlayer
            ? "My Turn!"
            : iAmTurnTeam
            ? "Our Turn!"
            : "Their Turn"}
          <br />
          <b>Team {teamNames[currentTeam]}</b>
          <h2>
            <b>{turnPlayer.name}</b>
          </h2>
          <VertSpacer />
          {turnActive ? (
            <Turn {...{ room, iAmTurnPlayer, iAmTurnTeam }} />
          ) : (
            preTurn
          )}
        </Padding>
      </TeamColorBackground>
    </>
  );
}
