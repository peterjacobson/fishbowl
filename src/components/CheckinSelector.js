import React, { useState } from "react";

import { Accordion } from "react-sanfona";
import converter from "number-to-words";

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

const accordionAnimation = {
  duration: 300,
  easing: "cubic-bezier(0.420, 0.000, 0.580, 1.000)",
};

const numberAllowedDict = {
  green: "numGreenFeelings",
  peach: "numPeachFeelings",
  need: "numNeeds",
  strategy: "numStrategies",
};

export default function CheckinSelector({
  itemType,
  myCheckIn,
  roomId,
  roomConfig,
  setMyCheckIn,
  userId,
  openAccordion,
  accordionIndex,
  setOpenAccordion,
}) {
  const toggleAccordionOpen = (e) => {
    e.stopPropagation();
    setOpenAccordion(openAccordion === accordionIndex ? null : accordionIndex);
  };

  const wordsSelected = myCheckIn
    .filter((item) => item.type === itemType)
    .map((item) => item.word);

  const somethingSelected = wordsSelected.length > 0;

  const numAllowed = roomConfig[numberAllowedDict[itemType]] || 1;

  const addCheckinWord = (type, word) => {
    if (wordsSelected.length < numAllowed) {
      const nextCheckin = [...myCheckIn, { type, word }];
      setMyCheckIn(nextCheckin);
      FirestoreService.updateCheckIn(nextCheckin, roomId, userId);
    }
  };

  const removeCheckinWord = (type, word) => {
    const nextCheckin = myCheckIn.filter((item) => item.word !== word);
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
    need: {
      itemCollection: needs,
      itemQuantity: roomConfig.numNeeds,
    },
    // TODO: Always 1?
    strategy: { itemCollection: strategies, itemQuantity: 1 },
  };

  const { itemCollection, itemQuantity } = typeHash[itemType];

  const accordionHeadingText = somethingSelected
    ? wordsSelected.join(", ")
    : `Pick ${converter.toWords(numAllowed)}`;

  return (
    <Accordion allowMultiple={false}>
      <DropdownWrap type={itemType}>
        <Panel
          title={
            <AccordionHeader onClick={toggleAccordionOpen}>
              <CompletionChecks
                myCheckIn={myCheckIn}
                numRequired={itemQuantity}
                type={itemType}
              />
              {accordionHeadingText}
              {/* <HelpButton onClick={toggleGreenHelp} /> */}
              <RightSpan>
                {openAccordion === accordionIndex ? (
                  <DropupIcon />
                ) : (
                  <DropdownIcon />
                )}
              </RightSpan>
            </AccordionHeader>
          }
          key="1"
          {...accordionAnimation}
          onClick={toggleAccordionOpen}
          expanded={openAccordion === accordionIndex}
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
