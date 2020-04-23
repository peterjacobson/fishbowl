import React, { useContext, useState } from "react";
import { Accordion } from "react-sanfona";
import greenFeelings from "../data/greenFeelings";
import needs from "../data/needs";
import peachFeelings from "../data/peachFeelings";
import strategies from "../data/strategies";
import { RoomContext } from "../services/room";
import Card from "./Card";
import CompletionChecks from "./CompletionChecks";
import {
  AccordionHeader,
  CollapseWrapper,
  DropdownIcon,
  DropdownWrap,
  DropupIcon,
  HelpButton,
  Panel,
  RightSpan,
} from "./styledComponents";

// TODO: placeholders
const toggleGreenHelp = () => {};

const accordionAnimation = {
  duration: 300,
  easing: "cubic-bezier(0.420, 0.000, 0.580, 1.000)",
};

export default function CheckinSelector({
  addCheckinWord,
  itemType,
  myCheckIn,
  removeCheckInWord,
}) {
  const [openAccordion, setOpenAccordion] = useState(null);
  const {
    roomData: { config },
  } = useContext(RoomContext);

  const toggleAccordionOpen = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const typeHash = {
    green: {
      itemCollection: greenFeelings,
      itemQuantity: config.numGreenFeelings,
    },
    peach: {
      itemCollection: peachFeelings,
      itemQuantity: config.numGreenFeelings,
    },
    need: { itemCollection: needs, itemQuantity: config.numNeeds },
    // TODO: Always 1?
    strategy: { itemCollection: strategies, itemQuantity: 1 },
  };

  const { itemCollection, itemQuantity } = typeHash[itemType];

  return (
    <Accordion allowMultiple={false}>
      <DropdownWrap type={itemType}>
        <Panel
          title={
            <AccordionHeader onClick={() => toggleAccordionOpen(2)}>
              <CompletionChecks
                myCheckIn={myCheckIn}
                numRequired={itemQuantity}
                type={itemType}
              />
              Choose{" "}
              {["green", "peach"].includes(itemType) ? "feeling" : itemType}
              <HelpButton onClick={toggleGreenHelp} />
              <RightSpan>
                {openAccordion === 0 ? <DropupIcon /> : <DropdownIcon />}
              </RightSpan>
            </AccordionHeader>
          }
          key="1"
          {...accordionAnimation}
          onClick={() => toggleAccordionOpen(0)}
          expanded={openAccordion === 0}
        >
          <CollapseWrapper>
            {itemCollection.map((word, index) => (
              <Card
                addCheckinWord={addCheckinWord}
                key={index}
                index={index}
                lang="en"
                myCheckIn={myCheckIn}
                removeCheckInWord={removeCheckInWord}
                type={itemType}
                word={word}
              />
            ))}
          </CollapseWrapper>
        </Panel>
      </DropdownWrap>
    </Accordion>
  );
}
