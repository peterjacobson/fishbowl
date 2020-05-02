import React from "react";
import _ from "lodash";

import * as FirestoreService from "../services/firestore";
import {
  WhiteBackground,
  TeamColorBackground,
  FullWidth,
  ButtonWithText,
  VertSpacer,
} from "./styledComponents";
import { rounds } from "../data/roundData";
import { Turns } from "./Turns";
import Confetti from "react-confetti";

export function Rounds({ room, iAmCreator, creatorName, roomId, teamsFormed }) {
  function startRound() {
    const roundWordPhrases = _.shuffle(room.wordPhrases);
    FirestoreService.startRound(roomId, roundWordPhrases);
  }

  const preRound = (
    <>
      <Confetti recycle={false} />
      {iAmCreator ? (
        <ButtonWithText onClick={startRound}>START ROUND</ButtonWithText>
      ) : (
        `${creatorName} will start the round when ya'll are ready!`
      )}
    </>
  );

  const roundContent = (
    <>
      <p>
        Round {room.round + 1}:{" "}
        <b>{_.get(rounds, [room.round, "name"], null)}</b>
      </p>
      {_.get(rounds, [room.round, "rules"], "")}
      <VertSpacer />
      <VertSpacer />
      {room.roundActive ? <Turns {...{ room }} /> : preRound}
    </>
  );

  return teamsFormed ? (
    <FullWidth>
      <WhiteBackground>{roundContent}</WhiteBackground>
    </FullWidth>
  ) : null;
}
