import { navigate } from "@reach/router";
import React, { useContext, useEffect, useState } from "react";
import CheckinSelector from "../components/CheckinSelector";
import CheckInSmall from "../components/CheckInSmall";
import { AuthContext } from "../services/auth";
import { updateCheckIn } from "../services/firestore";
import { RoomContext } from "../services/room";

export default function MyCheckin({ roomId, userId }) {
  const [myCheckIn, setMyCheckIn] = useState([]);

  const auth = useContext(AuthContext);
  const room = useContext(RoomContext);

  useEffect(() => {
    if (!room.roomData) {
      room.setRoomId(roomId);
    }
  }, [room, roomId]);

  if (!auth.user || !room.roomData) {
    return "LOADING...";
  }

  // TODO: ugly!
  if (auth.user.user.uid !== userId) {
    navigate("/");
  }

  const addCheckinWord = (type, word) => {
    const nextCheckin = [...myCheckIn, { type, word }];
    setMyCheckIn(nextCheckin);
    updateCheckIn(nextCheckin, roomId, userId);
  };

  const removeCheckInWord = (word) => {
    const nextCheckin = myCheckIn.filter((item) => item.word !== word);
    setMyCheckIn(nextCheckin);
    updateCheckIn(nextCheckin, roomId, userId);
  };

  const { numGreenFeelings, numPeachFeelings, numNeeds } = room.roomData.config;

  return (
    <>
      <h1>Select my check-in</h1>

      {numGreenFeelings > 0 && (
        <>
          <span>A feeling I've felt in the last 24 hrs</span>
          <CheckinSelector
            itemType="green"
            {...{ addCheckinWord, myCheckIn, removeCheckInWord }}
          />
        </>
      )}
      {numPeachFeelings > 0 && (
        <>
          <span>A feeling I've felt in the last 24 hrs</span>
          <CheckinSelector
            itemType="peach"
            {...{ addCheckinWord, myCheckIn, removeCheckInWord }}
          />
        </>
      )}
      {numNeeds > 0 && (
        <>
          <span>A need I'd love to meet</span>
          <CheckinSelector
            itemType="need"
            {...{ addCheckinWord, myCheckIn, removeCheckInWord }}
          />
        </>
      )}
      <>
        <span>A strategy to meet a need of mine</span>
        <CheckinSelector
          itemType="strategy"
          {...{ addCheckinWord, myCheckIn, removeCheckInWord }}
        />
      </>
      <CheckInSmall
        checkIn={myCheckIn}
        removeCheckInWord={removeCheckInWord}
        showRemoveIcon={true}
      />

      {/* TODO: checks before proceed */}
      <button onClick={() => navigate(`/room/${roomId}`)}>I'm Ready</button>
    </>
  );
}
