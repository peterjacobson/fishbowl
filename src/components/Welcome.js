import React from "react";

import {
  WhiteBackground,
  FullWidth,
  TeamColorBackground,
} from "./styledComponents";

export function Welcome({
  teamsFormed,
  playerName,
  playerTeamName,
  playerTeamId,
}) {
  const preTeams = (
    <FullWidth>
      <WhiteBackground>
        Welcome <b>{playerName}</b>
      </WhiteBackground>
    </FullWidth>
  );

  const postTeams = (
    <FullWidth>
      <TeamColorBackground team={playerTeamId}>
        <p>
          Hi <b>{playerName}</b>, you're team <br />
          <b>{playerTeamName}</b>
        </p>
      </TeamColorBackground>
    </FullWidth>
  );

  return <>{teamsFormed ? postTeams : preTeams}</>;
}
