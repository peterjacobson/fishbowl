import React, { useEffect, useState } from "react";
import { navigate } from "@reach/router";
import _ from "lodash";

import * as FirestoreService from "../services/firestore";
import {
  MauveBackground,
  MobileWidthWrapper,
  WhiteFadeBackground,
  AdminButton,
  VertSpacer,
  WhiteBackground,
  VerticalCenterer,
} from "../components/styledComponents";
import { Welcome } from "../components/Welcome";
import { Teams } from "../components/Teams";
import { Rounds } from "../components/Rounds";
import { ChangePlayer } from "../components/ChangePlayer";
import EditGame from "../components/EditGame";

export default function FishBowl(props) {
  const roomId =
    props.location.pathname.match(/room\/(.*?)\//g)[0].slice(5, -1) || "";
  const userId =
    props.location.pathname.match(/user\/(.*?)\//g)[0].slice(5, -1) || "";

  // Some helpful derived state ---------------------
  const [error, setError] = useState(null);
  const [room, setRoom] = useState({});
  const { points, teamNames, currentPlayers } = room;
  const players = room.users;
  const creatorId = room.createdBy;
  const creatorName = _.get(
    _.find(players, (user) => user.userId === creatorId),
    "name"
  );
  const teams = [room.team0, room.team1] || [];
  const iAmCreator = userId === creatorId;
  const playerName = _.get(
    _.find(room.users, (user) => user.userId === userId),
    "name",
    ""
  );
  const teamsFormed = room.team1 === undefined ? false : true;
  const playerTeamId = teams
    ? teams.findIndex((team) =>
        _.find(team, (player) => player.userId === userId)
      )
    : null;
  const playerTeamName = _.get(room, ["teamNames", playerTeamId], null);
  // -------------------------------------------

  useEffect(() => {
    const unsubscribe = FirestoreService.streamRoom(roomId, {
      next: (querySnapshot) => {
        const queryData = querySnapshot.data();
        setRoom(queryData);
      },
      error: () => setError("grocery-list-item-get-fail"),
    });
    return unsubscribe;
  }, [roomId, setRoom]);

  if (!roomId || !userId) {
    navigate("/");
  }

  return (
    <>
      <MauveBackground>
        <MobileWidthWrapper>
          <WhiteFadeBackground>
            <VerticalCenterer>
              <Welcome
                {...{ teamsFormed, playerName, playerTeamName, playerTeamId }}
              />
              <Teams
                {...{
                  points,
                  teams,
                  teamNames,
                  players,
                  currentPlayers,
                  creatorName,
                  iAmCreator,
                  roomId,
                  teamsFormed,
                  userId,
                }}
              />
              <Rounds
                {...{ room, iAmCreator, creatorName, roomId, teamsFormed }}
              />
              <ChangePlayer />
              {iAmCreator ? (
                <EditGame {...{ room, roomId, teamsFormed }} />
              ) : null}
            </VerticalCenterer>
          </WhiteFadeBackground>
        </MobileWidthWrapper>
      </MauveBackground>
    </>
  );
}
