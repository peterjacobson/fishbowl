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

export default function CheckinSmall({
  myCheckIn,
  roomId,
  setMyCheckIn,
  showRemoveIcon,
  userId,
}) {
  const sortOrder = ["green", "peach", "need", "strategy"];

  const removeCheckinWord = (type, word) => {
    const nextCheckin = myCheckIn.filter((item) => item.word !== word);
    setMyCheckIn(nextCheckin);
    FirestoreService.updateCheckIn(nextCheckin, roomId, userId);
  };

  return (
    <div>
      My checkin:
      {myCheckIn
        .slice()
        .sort((a, b) => sortOrder.indexOf(a.type) - sortOrder.indexOf(b.type))
        .map((item) => {
          const C = typeSelector(item.type);
          return (
            <C style={rotateStyle()}>
              {translate(item.word, item.type, lang)}{" "}
              {showRemoveIcon && (
                <RemoveIcon
                  onClick={() => removeCheckinWord(item.type, item.word)}
                />
              )}
            </C>
          );
        })}
    </div>
  );
}

