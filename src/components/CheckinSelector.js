import React, { useState } from "react";

import { Accordion } from "react-sanfona";
import CompletionChecks from "./CompletionChecks";
import Card from "./Card";
import greenFeelings from "../data/greenFeelings";
import peachFeelings from "../data/peachFeelings";
import needs from "../data/needs";
import strategies from "../data/strategies";
import * as FirestoreService from "../services/firestore";

import {
  AccordionHeader,
  CollapseWrapper,
  DropdownWrap,
  DropdownIcon,
  DropupIcon,
  HelpButton,
  Panel,
  RightSpan,
} from "./styledComponents";

// TODO: placeholders
const toggleGreenHelp = () => {};
const removeCheckinWord = () => {};

const accordionAnimation = {
  duration: 300,
  easing: "cubic-bezier(0.420, 0.000, 0.580, 1.000)",
};

export default function CheckinSelector({
  itemType,
  myCheckIn,
  roomId,
  roomConfig,
  setMyCheckIn,
  userId,
}) {
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordionOpen = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const addCheckinWord = (type, word) => {
    const nextCheckin = [...myCheckIn, { type, word }];
    setMyCheckIn(nextCheckin);
    FirestoreService.updateCheckIn(nextCheckin, roomId, userId);
  };

  const typeHash = {
    green: {
      itemCollection: greenFeelings,
      itemQuantity: roomConfig.numGreenFeelings,
    },
    peach: {
      itemCollection: peachFeelings,
      itemQuantity: roomConfig.numGreenFeelings,
    },
    need: { itemCollection: needs, itemQuantity: roomConfig.numNeeds },
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
                type={itemType}
                word={word}
                lang="en"
                removeCheckinWord={removeCheckinWord}
                addCheckinWord={addCheckinWord}
                key={index}
                index={index}
                myCheckIn={myCheckIn}
              />
            ))}
          </CollapseWrapper>
        </Panel>
      </DropdownWrap>
    </Accordion>
  );
}
