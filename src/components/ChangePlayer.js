import React from "react";
import { navigate } from "@reach/router";

import { AdminButton, LowKeyButtonWrapper } from "./styledComponents";

export function ChangePlayer() {
  const roomId =
    window.location.pathname.match(/(?<=(room\/))(.*?)(?=(\/user))/g)[0] || "";

  return (
    <LowKeyButtonWrapper>
      <AdminButton onClick={() => navigate(`/join-room/${roomId}`)}>
        Change Player
      </AdminButton>
    </LowKeyButtonWrapper>
  );
}
