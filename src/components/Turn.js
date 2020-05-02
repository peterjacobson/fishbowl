import React from "react";
import _ from "lodash";

import * as FirestoreService from "../services/firestore";
import { ButtonWithText } from "./styledComponents";

export default function Turn({ room, iAmTurnPlayer, iAmTurnTeam }) {
  const myTurn = (
    <>
      Express this to your team:
      <br />
      <h3>
        <b>{_.get(room, ["roundWordPhrasesLeft", 0])}</b>
      </h3>
      <ButtonWithText>DONE - NEXT!</ButtonWithText>
    </>
  );

  const myTeamsTurn = (
    <h3>
      <b>Guess the Word/Phrase!!!</b>
    </h3>
  );
  const otherTeamsTurn = (
    <p>
      <b>Relax</b>, just keep the other team honest ;)
    </p>
  );

  if (iAmTurnPlayer) {
    return myTurn;
  } else if (iAmTurnTeam) {
    return myTeamsTurn;
  } else {
    return otherTeamsTurn;
  }
}
