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

export const colors = {
  peach: ["#E88FA2", "#EB9B81"],
  green: ["#1696A0", "#88C072"],
  need: ["#2A3076", "#1792C8"],
  strategy: ["#d62346", "#f0aa71"],
};

export const Background = styled.div`
  height: 100vh;
  background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.3)
    ),
    url(${room4});
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
