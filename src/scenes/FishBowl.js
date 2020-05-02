import React, { useEffect, useState } from "react";
import { navigate } from "@reach/router";
import { CopyToClipboard } from "react-copy-to-clipboard";
import _ from "lodash";

import * as FirestoreService from "../services/firestore";
import {
  MauveBackground,
  MobileWidthWrapper,
  Heading,
  MauveButton,
  ButtonText,
  WhiteFadeBackground,
  RightSpan,
} from "../components/styledComponents";

export default function FishBowl(props) {
  const roomId =
    props.location.pathname.match(/(?<=(room\/))(.*?)(?=(\/user))/g)[0] || "";
  const userId =
    props.location.pathname.match(/(?<=(user\/))(.*?)(?=(\/bowl))/g)[0] || "";

  const [error, setError] = useState(null);
  const [room, setRoom] = useState({});
  const [linkCopied, setLinkCopied] = useState(false);

  const teamsFormed = room.teams === undefined ? false : true;

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

  function updateLinkCopyState() {
    setLinkCopied(true);
  }

  const CopyLinkButton = (
    <RightSpan>
      <CopyToClipboard text={`${window.location.origin}/join-room/${roomId}`}>
        <MauveButton onClick={updateLinkCopyState}>
          <ButtonText>
            Copy invite url
            {linkCopied ? "  🙌 Link copied" : null}
          </ButtonText>
        </MauveButton>
      </CopyToClipboard>
    </RightSpan>
  );

  return (
    <>
      <MauveBackground>
        <MobileWidthWrapper>
          <WhiteFadeBackground>
            <Welcome></Welcome>
          </WhiteFadeBackground>
        </MobileWidthWrapper>
      </MauveBackground>
    </>
  );
}
