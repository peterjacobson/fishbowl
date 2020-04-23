import React from "react";

import {
  AddIcon,
  MaoriKupu,
  RemoveIcon,
  RightSpan,
  StyledCard,
  ma,
} from "../components/styledComponents";

export default function Card({
  type,
  word,
  lang,
  index,
  myCheckIn,
  removeCheckinWord,
  addCheckinWord,
}) {
  const isSelected = myCheckIn.find((item) => item.word === word);
  function handleClick(e) {
    e.stopPropagation();
    isSelected ? removeCheckinWord(type, word) : addCheckinWord(type, word);
  }
  return (
    <StyledCard key={index} type={type} on={isSelected} onClick={handleClick}>
      {isSelected ? <RemoveIcon /> : <AddIcon />}
      &nbsp;&nbsp;&nbsp;
      {type === "strategy" ? (
        word
      ) : lang === "ma" && ma[type][word] ? (
        <MaoriKupu>{ma[type][word].ma}</MaoriKupu>
      ) : (
        word
      )}
      {/* <RightSpan> */}
      {/* </RightSpan> */}
    </StyledCard>
  );
}
