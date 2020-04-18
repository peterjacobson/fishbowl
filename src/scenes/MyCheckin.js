import React, { useState } from "react";

import CheckinSmall from "../components/CheckinSmall";
import CheckinSelector from "../components/CheckinSelector";

export default function MyCheckin({ roomId, userId }) {
  const [myCheckIn, setMyCheckIn] = useState(null);
  return (
    <>
      <h1>Select my check-in</h1>
      <CheckinSelector />
      <CheckinSmall />
      <button>I'm Ready</button>
    </>
  );
}
