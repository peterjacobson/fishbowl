import { navigate } from "@reach/router";
import React, { useContext, useEffect, useState } from "react";
import CheckInSmall from "../components/CheckInSmall";
import CheckInTimer from "../components/CheckInTimer";
import { AuthContext } from "../services/auth";
import { RoomContext } from "../services/room";

const CheckInWithTitle = ({ checkIn, userName }) => (
  <>
    <h3>{userName}'s check-in</h3>
    <CheckInSmall checkIn={checkIn} showRemoveIcon={false} />
  </>
);

export default function CheckInTogether({ roomId }) {
  const [myCheckIn, setMyCheckIn] = useState();
  const [otherCheckIns, setOtherCheckIns] = useState();

  const auth = useContext(AuthContext);
  const room = useContext(RoomContext);

  useEffect(() => {
    room.setRoomId(roomId);
  }, [room, roomId]);

  useEffect(() => {
    if (room.checkInData && room.roomData && auth.user) {
      setOtherCheckIns(
        room.checkInData
          .filter((c) => c.userId !== auth.user.user.uid)
          .map((c) => ({
            ...c,
            name: room.roomData.users.find((u) => u.userId === c.userId).name,
          }))
      );
      setMyCheckIn(
        room.checkInData.find((c) => c.userId === auth.user.user.uid)
      );
    }
  }, [auth, room, setMyCheckIn, setOtherCheckIns]);

  if (!room.roomData || !room.checkInData) {
    // TODO: spinner :P
    return "LOADING...";
  }

  const { user } = auth.user;
  const { config, timer, users } = room.roomData;

  const userInRoom = users.find((u) => u.userId === user.uid);
  if (!userInRoom) {
    navigate("/");
  }

  return (
    <>
      <h1>Check-in Together</h1>
      <p>
        You each have a little time to speak to the words you chose. Everyone
        else is called to listen with curiosity, trust, attention and aroha.
      </p>
      <p>
        Trust that any responses can wait until everyone has checked in (you can
        just do another round if it's feeling called for).
      </p>
      {user && (
        <CheckInTimer
          checkInTime={config.timerLength}
          roomId={roomId}
          roomTimer={timer}
          userId={user.uid}
          userName={userInRoom.name}
        />
      )}

      <h3>My check-in</h3>

      {myCheckIn && (
        <CheckInSmall checkIn={myCheckIn.checkInWords} showRemoveIcon={false} />
      )}

      {otherCheckIns &&
        otherCheckIns.map((c, i) => (
          <CheckInWithTitle
            checkIn={c.checkInWords}
            key={i}
            userName={c.name}
          />
        ))}

      <button>We've all checked in</button>
    </>
  );
}
