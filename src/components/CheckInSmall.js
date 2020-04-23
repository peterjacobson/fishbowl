import React from "react";

import {
  GreenFeeling,
  Need,
  PeachFeeling,
  RemoveIcon,
  Strategy,
  ma,
} from "./styledComponents";

function rotateStyle() {
  const angleDeg = (Math.random() - 0.5) * 4;
  return { transform: `rotate(${angleDeg}deg)` };
}

function translate(word, type, lang) {
  return lang === "ma" ? ma[type][word].ma : word;
}

// TODO: hardcoded
const lang = "en";

const typeHash = {
  green: GreenFeeling,
  peach: PeachFeeling,
  need: Need,
  strategy: Strategy,
};

export default function CheckInSmall({
  checkIn,
  removeCheckInWord,
  showRemoveIcon,
}) {
  const sortOrder = ["green", "peach", "need", "strategy"];

  return (
    <div>
      {checkIn
        .slice()
        .sort((a, b) => sortOrder.indexOf(a.type) - sortOrder.indexOf(b.type))
        .map((item, i) => {
          const C = typeHash[item.type];
          return (
            <C key={i} style={rotateStyle()}>
              {translate(item.word, item.type, lang)}{" "}
              {showRemoveIcon && (
                <RemoveIcon onClick={() => removeCheckInWord(item.word)} />
              )}
            </C>
          );
        })}
    </div>
  );
}

