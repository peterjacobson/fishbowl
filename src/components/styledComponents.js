import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaQuestionCircle } from "react-icons/fa";
import styled from "styled-components";
import Modal from "styled-react-modal";
import { ReactTypeformEmbed } from "react-typeform-embed";

import { FiArrowRight } from "react-icons/fi";

// import room4 from "../img/room4.jpg";
// import room4 from "../img/pinapples.jpg";
import room4 from "../img/art2.jpg";
// import texture1cover from "../img/texture1cover.png";
import blueswatch1 from "../img/blueswatch1.png";
import logotextb from "../img/logotextb.png";

export const colors = {
  peach: ["#E88FA2", "#EB9B81"],
  green: ["#1696A0", "#88C072"],
  need: ["#2A3076", "#1792C8"],
  strategy: ["#d62346", "#f0aa71"],
};

// export const teamColors = ["#1792C8", "#88C072"];
export const teamColors = ["#3be7fe", "#a3e803"];

export const UnsplashCreditWrapper = styled.div`
  text-align: center;
  font-size: 0.8em;
`;

export function UnsplashCredit() {
  return (
    <UnsplashCreditWrapper>
      {" "}
      Photo by{" "}
      <a
        target="_blank"
        href="https://unsplash.com/@steve_j?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
      >
        Steve Johnson on Unsplash
      </a>
    </UnsplashCreditWrapper>
  );
}

export const WhiteFadeBackground = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100vh;
`;

export const JumpingFish = styled.h1`
  margin-right: auto;
  width: 30px;
  transform: rotate(270deg);
`;

export const JumpingFishBar = styled.div`
  height: 0px;
`;

export const BlueBackground = styled.div`
  background: url(${room4});
  background-size: cover;
  min-height: 100vh;
  height: 100%;
`;

export const VertSpacer = styled.div`
  height: 6px;
`;

export const NegativeSpacer = styled.div`
  height: -30px;
`;

export const WhiteBackground = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: column;
  max-width: 400px;
  padding: 10px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
  border-radius: 10px;
  background-color: white;
  -webkit-box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.75);
  text-align: center;
`;

export const FullWidth = styled.div`
  width: 100%;
`;

export const TeamColorBackground = styled(WhiteBackground)`
  padding: 0px;
  border-style: solid;
  border-width: 13px;
  border-radius: 22px;
  border-color: ${(props) => teamColors[props.team]};
`;

export const TeamColorFill = styled(WhiteBackground)`
  padding: 0px;
  padding-bottom: 4px;
  border-style: solid;
  border-radius: 10px;
  background-color: ${(props) => teamColors[props.team]};
`;

export const Padding = styled.div`
  padding: 5px;
`;

export const MauveBackground = styled.div`
  background: url(${room4});
  background-size: cover;
  min-height: 100vh;
  height: 100%;
`;

export const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  /* width: 100%; */
  /* max-width: 414px; */
  margin-left: -20px;
  margin-right: -20px;
  margin-bottom: 20px;
`;

export const BigText = styled.span`
  font-size: 1.4em;
  font-weight: 600;
`;

export const SmallText = styled.p`
  font-size: 0.8em;
`;

export const Points = styled.div`
  border-radius: 30px;
  border-color: ${(props) => teamColors[props.team]};
  border-style: solid;
  border-width: 6px;
  height: 30px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  line-height: 30px;
  margin-top: -20px;
  background: white;
  padding: 0px 6px;
  color: black;
`;

export const FishBowlWrapper = styled(Points)`
  margin-top: -30px;
  border-color: white;
`;

export const FeedbackBackground = styled.div`
  background-color: white;
  -webkit-box-shadow: 0px 0px 87px 107px rgba(255, 255, 255, 1);
  -moz-box-shadow: 0px 0px 87px 107px rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 87px 107px rgba(255, 255, 255, 1);
`;

export const MauveScreenFill = styled(MauveBackground)`
  height: 100vh;
`;

export const TeamNames = styled.span`
  /* color: white; */
  font-size: 0.8em;
  font-weight: 600;
  margin-top: -6px;
`;

export const Typeform = styled(ReactTypeformEmbed)`
  position: relative !important;
  height: 500px;
  margin-left: auto;
  margin-right: auto;
`;

export const CenterForm = styled.form`
  margin-top: 6px;
`;

export const Error = styled.p`
  text-align: center;
`;

export const NavigationButtons = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 20px;
`;

export const NavigationText = styled.p`
  font-weight: 400;
  font-size: 1.2em;
  text-align: right;
  margin-right: 10px;
  margin-left: auto;
`;

export const LowKeyButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  max-width: 300px;
  margin-right: auto;
  margin-left: auto;
  text-align: center;
`;

export const NameTextField = styled.input`
  /* max-width: 300px; */
  border: none;
  background: none;
  border-bottom: 1px solid black;
  /* font-size: 1.5em !important; */
  margin-left: auto !important;
  margin-right: auto !important;
  margin-bottom: 10px;
  text-align: center;
  display: flex;
`;

export const Button = styled.button`
  border: none;
  padding: 10px;
  color: white;
  border-radius: 25px;
  background-color: #e02cb8;
  -webkit-box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.75);
  margin-right: 5px;
  margin-bottom: 5px;
  height: 50px;
  /* width: 50px; */
  cursor: pointer;
`;

export const ButtonWithText = styled(Button)`
  margin-right: 0px;
  margin-bottom: 0px;
  font-size: 1.3em;
  height: auto;
  line-height: 1em;
  color: white !important;
  z-index: 100;
`;

export const AdminButton = styled(Button)`
  background-color: rgba(255, 255, 255, 0.8);
  font-size: 1em;
  line-height: 1em;
  height: auto;
  color: #2a3076 !important;
  z-index: 100;
`;

export const WhatIsButton = styled(AdminButton)`
  max-width: 350px;
  height: 60px;
  line-height: 1em;
  padding: 0;
`;

export const BlueButton = styled(Button)`
  background-color: #4e5fba;
`;
export const MauveButton = styled(Button)`
  background-color: #bb5197;
`;

export const CopyTextButton = styled(Button)`
  background-color: #bb5197;
  margin-top: 5px;
  padding: 10px;
  height: auto;
  font-size: 0.9em;
`;

export const SnapButton = styled(MauveButton)`
  margin-left: 20px;
  padding: 10px;
  height: 36px;
  border-radius: 18px;
  font-size: 0.9em;
`;

export const ToastName = styled.p`
  font-weight: 300;
  font-size: 1em;
  margin-bottom: 5px;
`;

export const ButtonText = styled.span`
  font-size: 1.2em;
  color: white;
`;

export const RightArrowIcon = styled(FiArrowRight)`
  font-size: 24px;
  color: white;
  width: 30px;
`;

export const LeftArrowIcon = styled(RightArrowIcon)`
  transform: rotate(180deg);
`;

export const UserCheckInWrapper = styled.div`
  margin-bottom: 50px;
`;

export const SelectLabel = styled.p`
  font-size: 20px;
  color: white;
  margin-bottom: 10px;
  text-align: center;
  max-width: 250px;
  margin-left: auto;
  margin-right: auto;
`;

export const WhiteCircle = styled.div`
  background-color: white;
  height: 106px;
  width: 106px;
  margin-bottom: -53px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 100%;
  -webkit-box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.75);
  z-index: 0;
`;

export const HeartworkLogoBig = styled.div`
  background: url(${logotextb});
  margin-top: -48px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 54px;
  background-size: contain;
  background-position: center;
  height: 50px;
  width: 121px;
  background-repeat: no-repeat;
`;

export const Centerer = styled.div`
  margin-left: auto;
  margin-right: auto;
`;

export const MobileWidthWrapper = styled.div`
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  /* padding: 10px; */
  /* padding-top: 54px; */
`;

export const Heading = styled.h3`
  margin-left: auto;
  margin-top: 15px;
  font-weight: 400;
  margin-right: auto;
  line-height: 1.3em;
  /* width: 341px; */
  text-align: center;
  /* padding: 20px; */
`;

export const SwatchHeading = styled(Heading)`
  /* background: url(${blueswatch1}); */
  /* background-size: cover;
  background-position: center; */
`;

export const Background = styled.div`
  height: 100vh;

  background-size: cover;
`;

export const HelpButton = styled(FaQuestionCircle)`
  color: white;
  cursor: pointer;
  -webkit-text-shadow: 1px 1px rgba(0, 0, 0, 0.5);
  -moz-text-shadow: 1px 1px rgba(0, 0, 0, 0.5);
  text-shadow: 1px 1px rgba(0, 0, 0, 0.5);
`;

export const StyledModal = Modal.styled`
  max-width: 350px;
  margin-left: auto;
  margin-right: auto;
`;

export const ModalInner = styled.div`
  padding: 20px 30px;
  background-color: white;
  max-width: 440px;
  max-height: 600px;
  overflow: scroll;
  margin-left: auto;
  margin-right: auto;
`;

export const HelpText = styled.p`
  margin-left: 10px;
  color: #333;
`;

export const ModalText = styled.p`
  font-size: 0.9em;
`;

export const NarrowCenterText = styled.p`
  margin-left: auto;
  margin-right: auto;
  max-width: 350px;
  margin-top: 10px;
  margin-bottom: 3px;
  z-index: 10;
`;

export const VerticalCenterer = styled.div`
  margin-top: auto;
  margin-bottom: auto;
`;

export const WidthWrapper = styled.div`
  max-width: 440px;
`;

export const CopyToClipboardSpan = styled(CopyToClipboard)`
  display: inline-block;
`;

export const Intro = styled.p`
  max-width: 350px;
`;

export const CheckInItemRow = styled.div`
  width: 100%;
`;

export const CheckInItem = styled.div`
  margin-right: 5px;
  margin-bottom: 5px;
  border-radius: 3px;
  padding: 10px 20px;
  font-size: 1.3em;
  color: white;
  display: inline-block;
`;

export const CardDisplay = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 50px;
`;

export const CardOuter = styled.div`
  margin-top: -20px;
  margin-right: 5px;
  margin-bottom: 5px;
  border-radius: 3px;
  padding: 10px 10px;
  font-size: 1.3em;
  color: white;
  box-sizing: border-box;
  width: 195px;
  height: 280px;
  display: inline-block;
  flex-direction: column;
  justify-content: center;
  background: linear-gradient(
    to bottom right,
    ${(props) => colors[props.type][0]},
    ${(props) => colors[props.type][1]}
  );
`;

export const CardOuterBig = styled.div`
  flex-direction: column;
  justify-content: center;
  background: linear-gradient(
    to bottom right,
    ${(props) => colors[props.type][0]},
    ${(props) => colors[props.type][1]}
  );
  padding: 40px;
  padding-top: 60px;
  border-radius: 20px;
  height: 350px;
`;

export const CardMāori = styled.p`
  color: white !important;
  font-size: 1.3em;
  text-align: center;
  margin-top: 10px;
`;
export const CardEnglish = styled.p`
  color: white !important;
  margin-top: 10px;
  font-size: 1.2em;
  text-align: center;
`;

export const CardBreakdown = styled.p`
  color: white !important;
  margin-top: 10px;
  font-size: 0.8em;
`;

export const StoryPart = styled.p`
  color: white !important;
  margin-bottom: 5px;
`;

export const CardMāoriBig = styled.p`
  color: white !important;
  font-size: 1.7em;
  text-align: center;
  margin-top: 30px;
`;
export const CardEnglishBig = styled.p`
  color: white !important;
  margin-top: 30px;
  font-size: 1.5em;
  text-align: center;
`;

export const CardBreakdownBig = styled.p`
  color: white !important;
  margin-top: 60px;
  font-size: 1.1em;
`;

export const StoryPartBig = styled.p`
  color: white !important;
  margin-bottom: 5px;
`;

export const B = styled.b`
  font-weight: 400;
`;

export const PeachFeeling = styled(CheckInItem)`
  background: linear-gradient(
    to bottom right,
    ${colors.peach[0]},
    ${colors.peach[1]}
  );
`;
export const GreenFeeling = styled(CheckInItem)`
  background: linear-gradient(
    to bottom right,
    ${colors.green[0]},
    ${colors.green[1]}
  );
`;
export const Need = styled(CheckInItem)`
  background: linear-gradient(
    to bottom right,
    ${colors.need[0]},
    ${colors.need[1]}
  );
`;
export const Strategy = styled(CheckInItem)`
  background: linear-gradient(
    to bottom right,
    ${colors.strategy[0]},
    ${colors.strategy[1]}
  );
`;

export const ClarePeterPhoto = styled.img`
  align-self: center;
  max-width: 220px;
  display: block;
`;

export const FocusBackground = styled.div`
  position: absolute;
  height: 100%;
  max-width: 660px;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 30;
`;
