import React from "react";

export default function CheckinSmall({ myCheckIn }) {
  return (
    <div>
      My checkin:
      <ul>
        {myCheckIn.map((ci) => (
          <li>{ci.word}</li>
        ))}
      </ul>
    </div>
  );
}
