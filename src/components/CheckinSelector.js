import React from "react";

import { Accordion, AccordionHeader } from "react-sanfona";

import {
  CollapseWrapper,
  DropdownWrap,
  DropdownIcon,
  DropupIcon,
  HelpButton,
  Panel,
  RightSpan,
} from "../components/styledComponents";

const toggleAccordianOpen = () => {};
const toggleGreenHelp = () => {};

export default function CheckinSelector() {
  return (
    <Accordion allowMultiple={false}>
      <DropdownWrap type="green">
        <Panel
          title={
            <AccordionHeader onClick={() => toggleAccordianOpen(2)}>
              <HelpButton onClick={toggleGreenHelp} />
              <RightSpan>
                {openAccordion === 0 ? <DropupIcon /> : <DropdownIcon />}
              </RightSpan>
            </AccordionHeader>
          }
          key="1"
          {...accordionAnimation}
          onClick={() => toggleAccordianOpen(0)}
          expanded={openAccordion === 0}
        >
          <CollapseWrapper>
            {greenFeelings.map((word, index) => (
              <Card
                type={"green"}
                word={word}
                lang={lang}
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

// <CompletionChecks
//   type="green"
//   numRequired={roomConfig.numGreenFeelings}
// />
// {roomConfig.numGreenFeelings === 1
//   ? "Something (comfortable) I've felt in the last 24hrs"
//   : `${converter.toWords(
//       roomConfig.numGreenFeelings
//     )} things I've felt in the last 24hrs`}

//       {roomConfig ? (
//         <>
//           {roomConfig.numGreenFeelings > 0 ? (
//             <DropdownWrap type="green">
//               <Panel
//                 title={
//                   <AccordionHeader onClick={() => toggleAccordianOpen(2)}>
//                     <CompletionChecks
//                       type="green"
//                       numRequired={roomConfig.numGreenFeelings}
//                     />
//                     {roomConfig.numGreenFeelings === 1
//                       ? "Something (comfortable) I've felt in the last 24hrs"
//                       : `${converter.toWords(
//                           roomConfig.numGreenFeelings
//                         )} things I've felt in the last 24hrs`}
//                     <HelpButton onClick={toggleGreenHelp} />
//                     <RightSpan>
//                       {openAccordion === 0 ? <DropupIcon /> : <DropdownIcon />}
//                     </RightSpan>
//                   </AccordionHeader>
//                 }
//                 key="1"
//                 {...accordionAnimation}
//                 onClick={() => toggleAccordianOpen(0)}
//                 expanded={openAccordion === 0}
//               >
//                 <CollapseWrapper>
//                   {greenFeelings.map((word, index) => (
//                     <Card
//                       type={"green"}
//                       word={word}
//                       lang={lang}
//                       removeCheckinWord={removeCheckinWord}
//                       addCheckinWord={addCheckinWord}
//                       key={index}
//                       index={index}
//                       myCheckIn={myCheckIn}
//                     />
//                   ))}
//                 </CollapseWrapper>
//               </Panel>
//             </DropdownWrap>
//           ) : null}
//           {roomConfig.numPeachFeelings > 0 ? (
//             <DropdownWrap type="peach">
//               <AccordionItem
//                 title={
//                   <AccordionHeader onClick={() => toggleAccordianOpen(2)}>
//                     <CompletionChecks
//                       type="peach"
//                       numRequired={roomConfig.numPeachFeelings}
//                     />
//                     {roomConfig.numPeachFeelings === 1
//                       ? "Something (uncomfortable) I've felt in the last 24hrs"
//                       : `${converter.toWords(
//                           roomConfig.numPeachFeelings
//                         )} things I've felt in the last 24hrs`}
//                     <HelpButton onClick={togglePeachHelp} />
//                     <RightSpan>
//                       {openAccordion === 1 ? <DropupIcon /> : <DropdownIcon />}
//                     </RightSpan>
//                   </AccordionHeader>
//                 }
//                 key="2"
//                 {...accordionAnimation}
//                 onClick={() => toggleAccordianOpen(1)}
//                 expanded={openAccordion === 1}
//               >
//                 <CollapseWrapper>
//                   {peachFeelings.map((word, index) => (
//                     <Card
//                       type={"peach"}
//                       word={word}
//                       lang={lang}
//                       removeCheckinWord={removeCheckinWord}
//                       addCheckinWord={addCheckinWord}
//                       key={index}
//                       index={index}
//                       myCheckIn={myCheckIn}
//                     />
//                   ))}
//                 </CollapseWrapper>
//               </AccordionItem>
//             </DropdownWrap>
//           ) : null}
//           {roomConfig.numNeeds > 0 ? (
//             <DropdownWrap type="need">
//               <AccordionItem
//                 title={
//                   <AccordionHeader onClick={() => toggleAccordianOpen(2)}>
//                     <CompletionChecks
//                       type="need"
//                       numRequired={roomConfig.numNeeds}
//                     />
//                     {roomConfig.numNeeds === 1 ? (
//                       <>
//                         A need
//                         <HelpButton onClick={toggleNeedsHelp} /> that's alive in
//                         me
//                       </>
//                     ) : (
//                       <>
//                         {converter.toWords(roomConfig.numNeeds)} needs
//                         <HelpButton onClick={toggleNeedsHelp} /> that are alive
//                         in me
//                       </>
//                     )}
//
//                     <RightSpan>
//                       {openAccordion === 2 ? <DropupIcon /> : <DropdownIcon />}
//                     </RightSpan>
//                   </AccordionHeader>
//                 }
//                 key="3"
//                 {...accordionAnimation}
//                 onClick={() => toggleAccordianOpen(2)}
//                 expanded={openAccordion === 2}
//               >
//                 <CollapseWrapper>
//                   {needs.map((word, index) => (
//                     <Card
//                       type={"need"}
//                       word={word}
//                       lang={lang}
//                       removeCheckinWord={removeCheckinWord}
//                       addCheckinWord={addCheckinWord}
//                       key={index}
//                       index={index}
//                       myCheckIn={myCheckIn}
//                     />
//                   ))}
//                 </CollapseWrapper>
//               </AccordionItem>
//             </DropdownWrap>
//           ) : null}
//           <DropdownWrap type="strategy">
//             <AccordionItem
//               title={
//                 <AccordionHeader onClick={() => toggleAccordianOpen(2)}>
//                   <CompletionChecks type="strategy" numRequired={1} />
//                   One or more strategies to meet my needs
//                   <RightSpan>
//                     {openAccordion === 3 ? <DropupIcon /> : <DropdownIcon />}
//                   </RightSpan>
//                 </AccordionHeader>
//               }
//               key="4"
//               {...accordionAnimation}
//               onClick={() => toggleAccordianOpen(3)}
//               expanded={openAccordion === 3}
//             >
//               <CollapseWrapper>
//                 {strategies.map((word, index) => (
//                   <Card
//                     type={"strategy"}
//                     word={word}
//                     lang={lang}
//                     removeCheckinWord={removeCheckinWord}
//                     addCheckinWord={addCheckinWord}
//                     key={index}
//                     index={index}
//                     myCheckIn={myCheckIn}
//                   />
//                 ))}
//               </CollapseWrapper>
//             </AccordionItem>
//           </DropdownWrap>
//         </>
//       ) : null}
