import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { ButtonWithText, AdminButton } from "../components/styledComponents";

export function CopyInviteUrl(props) {
  const { admin } = props;
  const [linkCopied, setLinkCopied] = useState(false);
  const roomId =
    window.location.pathname.match(/(?<=(room\/))(.*?)(?=(\/user))/g)[0] || "";
  return admin ? (
    <CopyToClipboard text={`${window.location.origin}/join-room/${roomId}`}>
      <AdminButton onClick={() => setLinkCopied(true)}>
        Copy invite url
        {linkCopied ? " 🙌" : null}
      </AdminButton>
    </CopyToClipboard>
  ) : (
    <CopyToClipboard text={`${window.location.origin}/join-room/${roomId}`}>
      <ButtonWithText onClick={() => setLinkCopied(true)}>
        Copy invite url
        {linkCopied ? " 🙌" : null}
      </ButtonWithText>
    </CopyToClipboard>
  );
}
