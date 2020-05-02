import { AccordionItem } from "react-sanfona";
import { ButtonBack, Slide } from "pure-react-carousel";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaQuestionCircle } from "react-icons/fa";
import ReactSlider from "react-slider";
import styled from "styled-components";
import Modal from "styled-react-modal";
import { teReoGreen } from "../data/greenFeelings";
import { teReoNeeds } from "../data/needs";
import { teReoPeach } from "../data/peachFeelings";
import { ReactTypeformEmbed } from "react-typeform-embed";

import { FiCheckCircle, FiCircle, FiArrowRight } from "react-icons/fi";
import {
  IoIosAddCircleOutline,
  IoIosArrowDropdown,
  IoIosArrowDropup,
  IoIosRemoveCircleOutline,
} from "react-icons/io";

import room4 from "../img/room4.jpg";
import texture1cover from "../img/texture1cover.png";
import blueswatch1 from "../img/blueswatch1.png";
import logotextb from "../img/logotextb.png";
export const ma = {
  green: teReoGreen,
  peach: teReoPeach,
  need: teReoNeeds,
};

export const colors = {
  peach: ["#E88FA2", "#EB9B81"],
  green: ["#1696A0", "#88C072"],
  need: ["#2A3076", "#1792C8"],
  strategy: ["#d62346", "#f0aa71"],
};

export const WhiteFadeBackground = styled.div`
  padding: -200px 40px;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100vh;
`;

export const BlueBackground = styled.div`
  background: url(${room4});
  background-size: cover;
  min-height: 100vh;
  height: 100%;
`;

export const WhiteBackground = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  padding: 8px;
  margin: auto;
  border-radius: 10px;
  background-color: white;
  -webkit-box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.75);
`;

export const MauveBackground = styled.div`
  background: url(${room4});
  background-size: cover;
  min-height: 100vh;
  height: 100%;
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

export const Typeform = styled(ReactTypeformEmbed)`
  position: relative !important;
  height: 500px;
  margin-left: auto;
  margin-right: auto;
`;

export const CenterForm = styled.form`
  margin-top: 30px;
`;

export const Error = styled.p`
  text-align: center;
`;

export const NavigationButtons = styled.div`
  margin-top: 80px;
  margin-bottom: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 20px;
`;

export const NavigationText = styled.p`
  font-weight: 400;
  font-size: 1.5em;
  text-align: right;
  margin-right: 25px;
  margin-left: auto;
`;

export const NameTextField = styled.input`
  border: none;
  background: none;
  border-bottom: 1px solid black;
  font-size: 3em !important;
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
  background-color: #4e5fba;
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
  font-size: 1.4em;
  color: white !important;
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

export const HeartworkLogoBig = styled.div`
  background: url(${logotextb});
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 54px;
  background-size: contain;
  height: 50px;
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
  /* padding: 10px; */
  /* padding-top: 54px; */
`;

export const Heading = styled.h1`
  margin-left: auto;
  margin-right: auto;
  height: 50px;
  line-height: 50px;
  width: 341px;
  text-align: center;
  margin-bottom: 39px;
  /* padding: 20px; */
`;

export const SwatchHeading = styled(Heading)`
  /* background: url(${blueswatch1}); */
  background-size: cover;
  background-position: center;
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

export const HelpText = styled.p`
  margin-left: 10px;
  color: #333;
`;

export const NarrowCenterText = styled.p`
  margin-left: auto;
  margin-right: auto;
  max-width: 350px;
  margin-bottom: 30px;
  z-index: 10;
`;

export const ConfigContainer = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: 20px;
  -webkit-box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.75);
`;

export const VocabContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 20px;
`;

export const AllNeedsContainer = styled(VocabContainer)`
  background: linear-gradient(
    to bottom right,
    ${colors.need[0]},
    ${colors.need[1]}
  );
`;
export const AllGreenContainer = styled(VocabContainer)`
  background: linear-gradient(
    to bottom right,
    ${colors.green[0]},
    ${colors.green[1]}
  );
`;
export const AllPeachContainer = styled(VocabContainer)`
  background: linear-gradient(
    to bottom right,
    ${colors.peach[0]},
    ${colors.peach[1]}
  );
`;
export const AllStrategyContainer = styled(VocabContainer)`
  background: linear-gradient(
    to bottom right,
    ${colors.strategy[0]},
    ${colors.strategy[1]}
  );
`;

export const WordSelectorWrapper = styled.div`
  margin-bottom: 40px;
`;

export const VocabColumn = styled.div`
  width: 100%;
  max-width: 200px;
  margin: 0;
  padding: 0;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
`;

export const VocabWord = styled.p`
  color: white;
  margin: 0px;
  margin-bottom: 3px;
  font-size: 1.2em;
  display: inline-block;
`;

export const WidthWrapper = styled.div`
  max-width: 440px;
`;

export const Prompt = styled.h2`
  margin-bottom: 2px;
`;

export const StyledSlide = styled(Slide)`
  padding: 25px;
`;

export const LittleButton = styled.button`
  font-size: 1em;
  display: inline-block;
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

export const StyledBackButton = styled(ButtonBack)`
  background: none;
  color: black;
  text-decoration: underline;
  box-shadow: none;
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

export const Panel = styled(AccordionItem)``;

export const CollapseWrapper = styled.div`
  margin-top: 10px;
`;

export const AddIcon = styled(IoIosAddCircleOutline)`
  font-size: 1em;
  cursor: pointer;
`;
export const RemoveIcon = styled(IoIosRemoveCircleOutline)`
  font-size: 1em;
  cursor: pointer;
`;

export const DropdownIcon = styled(IoIosArrowDropdown)`
  font-size: 1.25em;
`;
export const DropupIcon = styled(IoIosArrowDropup)`
  font-size: 1.25em;
`;

export const UncheckedIcon = styled(FiCircle)``;

export const CheckedIcon = styled(FiCheckCircle)``;

export const Completion = styled.span`
  margin-right: 10px;
`;

export const DropdownWrap = styled(ConfigContainer)`
  color: white;
  background: linear-gradient(
    130deg,
    ${(props) => colors[props.type][0]},
    ${(props) => colors[props.type][1]}
  ) !important;
`;

export const StyledCard = styled.div`
  border-radius: 20px;
  padding: 4px 20px;
  background-color: ${(props) =>
    props.on ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0)"};
  color: white;
  font-size: 1.4em;
  -webkit-box-shadow: -1px -2px 5px -2px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: -1px -2px 5px -2px rgba(0, 0, 0, 0.25);
  box-shadow: -1px -2px 5px -2px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

export const AccordionHeader = styled.div`
  vertical-align: middle;
  font-size: 1.2em;
  cursor: pointer;
`;

export const RightSpan = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const CheckinName = styled.h3`
  margin-bottom: 4px;
`;

export const MaoriKupu = styled.span``;

export const MaStory = styled.span`
  font-size: 0.8em;
`;

export const LangButton = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  /* width: 30px;
  height: 30px; */
  padding: 20px;
  border-radius: 100%;
  -webkit-box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.75);
  background-color: white;
  z-index: 300;
  cursor: pointer;
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

export const CheckInHeading = styled.h2`
  text-align: center;
  max-width: 250px;
  margin-left: auto;
  margin-right: auto;
`;

export const CheckinQuestions = styled.div`
  /* margin-left: 20px; */
  /* padding: 10px; */
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

export const Text = styled.p`
  max-width: 350px;
`;
