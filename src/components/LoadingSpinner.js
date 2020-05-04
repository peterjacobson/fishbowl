import React from "react";
import { JumpingFish, JumpingFishBar } from "./styledComponents";

export default function LoadingSpinner() {
  return (
    <JumpingFishBar className="rotating">
      <JumpingFish>🐠</JumpingFish>
    </JumpingFishBar>
  );
}
