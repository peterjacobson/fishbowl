import React, { useEffect, useState, useRef } from "react";
import { navigate } from "@reach/router";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import _ from "lodash";

import * as FirestoreService from "../services/firestore";
import CheckInSmall from "../components/CheckInSmall";
import CheckinSelector from "../components/CheckinSelector";
import {
  MauveBackground,
  MobileWidthWrapper,
  Heading,
  NavigationButtons,
  NavigationText,
  MauveButton,
  RightArrowIcon,
  SelectLabel,
  WordSelectorWrapper,
  RightSpan,
  ButtonText,
  UserCheckInWrapper,
  Button,
  Need,
  GreenFeeling,
  PeachFeeling,
  Strategy,
  SnapButton,
  ToastName,
} from "../components/styledComponents";

export default function FishBowl(props) {
  const roomId =
    props.location.pathname.match(/(?<=(room\/))(.*?)(?=(\/user))/g)[0] || "";
  const userId =
    props.location.pathname.match(/(?<=(user\/))(.*?)(?=(\/bowl))/g)[0] || "";
  const [error, setError] = useState(null);
  const [myCheckIn, setMyCheckIn] = useState([]);
  const [roomConfig, setRoomConfig] = useState({});
  const [roomUsers, setRoomUsers] = useState([]);
  const [linkCopied, setLinkCopied] = useState(false);
  const [checkIns, setCheckIns] = useState([]);
  const [openAccordion, setOpenAccordion] = useState(null);

  useEffect(() => {
    const unsubscribe = FirestoreService.streamRoom(roomId, {
      next: (querySnapshot) => {
        const queryData = querySnapshot.data();
        setRoomUsers(queryData.users);
        // setTimer(querySnapshot.data().timer || defaultTimer);
        setRoomConfig(queryData.config);
      },
      error: () => setError("grocery-list-item-get-fail"),
    });
    return unsubscribe;
  }, [roomId]);

  if (!roomId || !userId) {
    navigate("/");
  }

  function updateLinkCopyState() {
    setLinkCopied(true);
  }

  return (
    <>
      <MauveBackground onClick={() => setOpenAccordion(null)}>
        <MobileWidthWrapper>
          <RightSpan>
            <CopyToClipboard
              text={`${window.location.origin}/join-room/${roomId}`}
            >
              <MauveButton onClick={updateLinkCopyState}>
                <ButtonText>
                  Copy invite url
                  {linkCopied ? "  🙌 Link copied" : null}
                </ButtonText>
              </MauveButton>
            </CopyToClipboard>
          </RightSpan>
          <Heading>Welcome {}</Heading>
          {roomId}
          <br />
          {userId}
        </MobileWidthWrapper>
      </MauveBackground>
    </>
  );
}
