import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { ButtonWithText } from "../components/styledComponents";

export function CopyInviteUrl() {
  const [linkCopied, setLinkCopied] = useState(false);
  const roomId =
    window.location.pathname.match(/(?<=(room\/))(.*?)(?=(\/user))/g)[0] || "";
  return (
    <CopyToClipboard text={`${window.location.origin}/join-room/${roomId}`}>
      <ButtonWithText onClick={() => setLinkCopied(true)}>
        Copy invite url
        {linkCopied ? "  🙌 Link copied" : null}
      </ButtonWithText>
    </CopyToClipboard>
  );
}
