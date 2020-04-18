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
  return (
    <StyledCard
      key={index}
      type={type}
      on={isSelected}
      onClick={() =>
        isSelected ? removeCheckinWord(type, word) : addCheckinWord(type, word)
      }
    >
      {type === "strategy" ? (
        word
      ) : lang === "ma" && ma[type][word] ? (
        <MaoriKupu>{ma[type][word].ma}</MaoriKupu>
      ) : (
        word
      )}
      <RightSpan>{isSelected ? <RemoveIcon /> : <AddIcon />}</RightSpan>
    </StyledCard>
  );
}
