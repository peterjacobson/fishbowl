import React from "react";
import _ from "lodash";

import { WhiteBackground, FullWidth, ButtonWithText } from "./styledComponents";
import { rounds } from "../data/roundData";

export function Rounds({ room, iAmCreator, creatorName }) {
  const preRound = (
    <>
      {iAmCreator ? (
        <ButtonWithText>START ROUND</ButtonWithText>
      ) : (
        `${creatorName} will start the round when ya'll are ready!`
      )}
    </>
  );

  return (
    <FullWidth>
      <WhiteBackground>
        Round {room.round + 1}: {_.get(rounds, [room.round, "name"], null)}
        <br />
        {room.roundActive ? "TURNS" : preRound}
      </WhiteBackground>
      ;
    </FullWidth>
  );
}
