import React from "react";

import { CheckedIcon, Completion, UncheckedIcon } from "./styledComponents";

export default function CompletionChecks({ myCheckIn, numRequired, type }) {
  const selectedOfType = myCheckIn.filter((item) => item.type === type);

  if (numRequired) {
    return (
      <Completion>
        {selectedOfType.length > 0 && selectedOfType.length < numRequired
          ? new Array(selectedOfType.length).fill("").map(() => <CheckedIcon />)
          : null}
        {selectedOfType.length >= numRequired
          ? new Array(numRequired).fill("").map(() => <CheckedIcon />)
          : null}

        {selectedOfType.length > numRequired
          ? null
          : new Array(numRequired - selectedOfType.length)
              .fill("")
              .map(() => <UncheckedIcon />)}
      </Completion>
    );
  }

  return null;
}
