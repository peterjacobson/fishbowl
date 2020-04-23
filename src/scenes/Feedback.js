import React, { useEffect, useState } from "react";
import { navigate } from "@reach/router";
import { ReactTypeformEmbed } from "react-typeform-embed";

import * as FirestoreService from "../services/firestore";
import CheckInSmall from "../components/CheckInSmall";
import {
  MauveBackground,
  MobileWidthWrapper,
  Heading,
  NarrowCenterText,
  UserCheckInWrapper,
  MauveButton,
  LeftArrowIcon,
  NavigationButtons,
  NavigationText,
  RightArrowIcon,
  Typeform,
} from "../components/styledComponents";
import { relativeTimeThreshold } from "moment";
import Footer from "../components/Footer";

export default function CheckInTogether({ roomId }) {
  const [error, setError] = useState(null);
  const [roomUsers, setRoomUsers] = useState([]);
  const [myCheckIn, setMyCheckIn] = useState(null);
  const [checkIns, setCheckIns] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    FirestoreService.getCurrentUser((user) => {
      if (user) {
        return setUserId(user.uid);
      }
      navigate("/");
    });
  });

  return (
    <MauveBackground>
      <MobileWidthWrapper>
        <Heading>We value your feedback</Heading>
        <NarrowCenterText>
          Take 3 minutes to contribute your insights and feedback so we can make
          this app better for yourself and others.
        </NarrowCenterText>
        <Typeform
          url="https://heartworkhq.typeform.com/to/ax5jaH"
          opacity={0}
          style={{ position: "relative", height: "600px" }}
          popup={false}
        />

        <NavigationButtons>
          <MauveButton
            onClick={() =>
              navigate(`/room/${roomId}/user/${userId}/check-in-together`)
            }
          >
            <LeftArrowIcon />
          </MauveButton>
          {/* <NavigationText>
            Next:&nbsp;&nbsp;&nbsp;Contribute 3 mins
          </NavigationText>
          <MauveButton
            onClick={() =>
              navigate(`/room/${roomId}/user/${userId}/check-in-together`)
            }
          >
            <RightArrowIcon />
          </MauveButton> */}
        </NavigationButtons>
        <Footer />
      </MobileWidthWrapper>
    </MauveBackground>
  );
}
