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

export function Rounds({ room, iAmCreator, creatorName, roomId, teamsFormed }) {
  function startRound() {
    const roundWordPhrases = _.shuffle(room.wordPhrases);
    FirestoreService.startRound(roomId, roundWordPhrases);
  }

  const preRound = (
    <>
      {iAmCreator ? (
        <ButtonWithText onClick={startRound}>START ROUND</ButtonWithText>
      ) : (
        `${creatorName} will start the round when ya'll are ready!`
      )}
    </>
  );

  const roundContent = (
    <>
      Round {room.round + 1}: {_.get(rounds, [room.round, "name"], null)}
      {_.get(rounds, [room.round, "rules"], "")}
      <VertSpacer />
      <VertSpacer />
      {room.roundActive ? <Turns {...{ room }} /> : preRound}
    </>
  );

  function RoundWrapper(props) {
    return room.roundActive ? (
      <TeamColorBackground team={room.currentTeam} children={props.children} />
    ) : (
      <WhiteBackground {...{ ...props }} />
    );
  }

  return teamsFormed ? (
    <FullWidth>
      <WhiteBackground>{roundContent}</WhiteBackground>
    </FullWidth>
  ) : null;
}
