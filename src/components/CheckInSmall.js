import React from "react";

import {
  GreenFeeling,
  Need,
  PeachFeeling,
  RemoveIcon,
  Strategy,
  ma,
} from "./styledComponents";
import * as FirestoreService from "../services/firestore";

function rotateStyle() {
  const angleDeg = (Math.random() - 0.5) * 4;
  return { transform: `rotate(${angleDeg}deg)` };
}

function translate(word, type, lang) {
  return lang === "ma" ? ma[type][word].ma : word;
}

// TODO: hardcoded
const lang = "en";

const typeSelector = (type) => {
  switch (type) {
    case "green":
      return GreenFeeling;
    case "peach":
      return PeachFeeling;
    case "need":
      return Need;
    case "strategy":
      return Strategy;
  }
};

export default function CheckInSmall({
  checkIn,
  roomId,
  setCheckIn,
  showRemoveIcon,
  userId,
}) {
  const sortOrder = ["green", "peach", "need", "strategy"];

  const removeCheckInWord = (word) => {
    const nextCheckin = checkIn.filter((item) => item.word !== word);
    setCheckIn(nextCheckin);
    FirestoreService.updateCheckIn(nextCheckin, roomId, userId);
  };

  return (
    <div>
      {checkIn
        .slice()
        .sort((a, b) => sortOrder.indexOf(a.type) - sortOrder.indexOf(b.type))
        .map((item) => {
          const C = typeSelector(item.type);
          return (
            <C style={rotateStyle()}>
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

