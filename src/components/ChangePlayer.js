import React from "react";
import { navigate } from "@reach/router";

import { AdminButton, LowKeyButtonWrapper } from "./styledComponents";

export function ChangePlayer() {
  const roomId =
    window.location.pathname.match(/room\/(.*?)\//g)[0].slice(5, -1) || "";

  return (
    <LowKeyButtonWrapper>
      <AdminButton onClick={() => navigate(`/join-room/${roomId}`)}>
        Change Player
      </AdminButton>
    </LowKeyButtonWrapper>
  );
}
