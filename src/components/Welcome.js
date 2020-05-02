import React, { useEffect, useState } from "react";

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
      <WhiteBackground>Welcome {playerName}</WhiteBackground>
    </FullWidth>
  );

  const postTeams = (
    <FullWidth>
      <TeamColorBackground team={playerTeamId}>
        Hi {playerName}, you're team {playerTeamName}
      </TeamColorBackground>
    </FullWidth>
  );

  console.log("playerTeamName: ", playerTeamName);

  return <>{teamsFormed ? postTeams : preTeams}</>;
}
