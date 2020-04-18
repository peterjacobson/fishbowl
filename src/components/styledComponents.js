import React from "react";
import styled from "styled-components";
import ReactSlider from "react-slider";
import { FaQuestionCircle } from "react-icons/fa";
import Modal from "styled-react-modal";

import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";

import room4 from "../img/room4.jpg";
import texture1cover from "../img/texture1cover.png";
import blueswatch1 from "../img/blueswatch1.png";
import logotext from "../img/logotext.png";

export const colors = {
  peach: ["#E88FA2", "#EB9B81"],
  green: ["#1696A0", "#88C072"],
  need: ["#2A3076", "#1792C8"],
  strategy: ["#d62346", "#f0aa71"],
};

export const BlueBackground = styled.div`
  background: linear-gradient(
      135deg,
      rgba(22, 33, 100, 1),
      rgba(37, 50, 140, 0.8)
    ),
    url(${room4});
  background-size: cover;
  height: 100%;
`;

export const CenterForm = styled.form`
  margin-top: 80px;
`;

export const Error = styled.p`
  text-align: center;
`;

export const NavigationButtons = styled.div`
  margin-top: 80px;
  margin-bottom: 80px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding-right: 20px;
`;

export const NavigationText = styled.p`
  font-weight: 400;
  font-size: 1.5em;
  text-align: right;
  margin-right: 25px;
`;

export const NameTextField = styled.input`
  border: none;
  background: none;
  border-bottom: 1px solid white;
  font-size: 1.5em !important;
  margin-left: auto !important;
  margin-right: auto !important;
  margin-top: 30px;
  text-align: center;
  display: flex;
`;

export const Button = styled.button`
  border: none;
  padding: 10px;
  color: white;
  border-radius: 100%;
  background-color: #4e5fba;
  -webkit-box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.75);
  margin-right: 5px;
  margin-bottom: 5px;
  height: 50px;
  width: 50px;
`;

export const HeartworkLogoBig = styled.div`
  background: url(${logotext});
  margin-left: auto;
  margin-right: auto;
  padding-top: 54px;
  background-size: contain;
  height: 121px;
  width: 121px;
  background-repeat: no-repeat;
`;

export const Centerer = styled.div`
  padding: 20px;
  margin-left: auto;
  margin-right: auto;
`;

export const MobileWidthWrapper = styled.div`
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 54px;
`;

export const SwatchHeading = styled.h1`
  background: url(${blueswatch1});
  background-size: cover;
  margin-left: auto;
  margin-right: auto;
  height: 50px;
  width: 341px;
  text-align: center;
  margin-bottom: 39px;
  padding: 20px;
`;

export const Background = styled.div`
  height: 100vh;

  background-size: cover;
`;

export const InputName = styled.input`
  border: none;
  border-bottom: 3px solid #d62346;
  font-size: 3em;
  background: none;
`;

export const RoomConfig = styled.div`
  /* max-width: 440px; */
  /* height: 100vh; */
`;

export const StyledSlider = styled(ReactSlider)`
  width: 100%;
  height: 30px;
`;

export const StyledThumb = styled.div`
  height: 30px;
  line-height: 30px;
  width: 100px;
  text-align: center;
  background-color: #000;
  color: #fff;
  font-size: 20px;
  border-radius: 15px;
  cursor: grab;
`;

export const StyledTimerThumb = styled(StyledThumb)`
  width: 140px;
`;
export const StyledSavvyThumb = styled(StyledThumb)`
  width: 170px;
`;

export const Question = styled.p`
  margin-top: 0;
  margin-bottom: 2px;
  padding: 5px 20px;
  color: white;
  border-radius: 5px;
`;

export const CheckinQuestions = styled.div`
  /* margin-left: 20px; */
  /* padding: 10px; */
`;

export const StyledSlide = styled(Slide)`
  padding: 25px;
`;

export const StyledBackButton = styled(ButtonBack)`
  background: none;
  color: black;
  text-decoration: underline;
  box-shadow: none;
`;

export const StyledCheckbox = styled.input`
  margin-left: 0px;
  cursor: pointer;
`;

export const StyledLabel = styled.label`
  cursor: pointer;
`;

export const StyledTrack = styled.div`
  top: 0;
  bottom: 0;
  background: ${(props) => (props.index === 1 ? "#ddd" : "pink")};
  border-radius: 999px;
`;

export const StyledGreenTrack = styled.div`
  top: 0;
  bottom: 0;
  background: ${(props) =>
    props.index === 1
      ? "#ddd"
      : `linear-gradient(
      to bottom right,
      ${colors.green[0]},
      ${colors.green[1]}
    )`};
  border-radius: 999px;
`;
export const StyledPeachTrack = styled.div`
  top: 0;
  bottom: 0;
  background: ${(props) =>
    props.index === 1
      ? "#ddd"
      : `linear-gradient(
      to bottom right,
      ${colors.peach[0]},
      ${colors.peach[1]}
    )`};
  border-radius: 999px;
`;
export const StyledNeedTrack = styled.div`
  top: 0;
  bottom: 0;
  background: ${(props) =>
    props.index === 1
      ? "#ddd"
      : `linear-gradient(
      to bottom right,
      ${colors.need[0]},
      ${colors.need[1]}
    )`};
  border-radius: 999px;
`;

export const SpokenCheckin = styled.div`
  margin-bottom: 5px;
`;

export const HelpText = styled.p`
  margin-left: 10px;
  color: #333;
`;

export const ConfigContainer = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: 20px;
  -webkit-box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.75);
`;

export const ConfigH2 = styled.h3`
  margin-top: 10px;
  margin-bottom: 5px;
`;
export const ConfigH3 = styled.h3`
  margin-top: 10px;
  margin-bottom: 5px;
`;

export const InlineH1 = styled.p`
  margin-top: 10px;
  margin-bottom: 5px;
  display: inline-block;
  font-size: 2em;
`;

export const StyledModal = Modal.styled`
  max-width: 660px;
  margin-left: auto;
  margin-right: auto;
`;

export const ModalInner = styled.div`
  padding: 20px 30px;
  background-color: white;
  max-width: 440px;
  margin-left: auto;
  margin-right: auto;
`;

export const HelpButton = styled(FaQuestionCircle)`
  color: ${colors.green[1]};
  cursor: pointer;
`;

export const Text = styled.p`
  max-width: 350px;
`;
