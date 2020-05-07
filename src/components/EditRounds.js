import React, { useState, useEffect } from "react";
import ReactSlider from "react-slider";
import styled from "styled-components";

import * as FirestoreService from "../services/firestore";
import { getRoomId } from "../services/urlData";
import { AdminButton, VertSpacer } from "./styledComponents";

const Slider = styled(ReactSlider)`
  width: 100%;
  height: 30px;
`;

const SliderThumb = styled.div`
  height: 30px;
  line-height: 30px;
  width: auto !important;
  padding: 0px 4px;
  text-align: center;
  background-color: #000;
  color: #fff;
  font-size: 20px;
  border-radius: 15px;
  cursor: grab;
`;

const Thumb = (text) => {
  return (props, state) => (
    <SliderThumb {...props}>
      {state.valueNow} {text}
    </SliderThumb>
  );
};

const SliderTrack = styled.div`
  top: 0;
  bottom: 0;
  background: ${(props) => (props.index === 1 ? "#ddd" : "pink")};
  border-radius: 999px;
`;

const Track = (props, state) => <SliderTrack {...props} index={state.index} />;

export default function EditRounds() {
  const [showingEdit, setShowingEdit] = useState(false);
  const [numPlayers, setNumPlayers] = useState(6);
  const [numRounds, setNumRounds] = useState(5);
  const [numFishPerPlayer, setNumFishPerPlayer] = useState(3);

  const turnTime =
    numFishPerPlayer === 3 ? 60 : numFishPerPlayer === 2 ? 40 : 30;

  useEffect(() => {
    const roomId = getRoomId();
    const update = {
      numPlayers,
      numRounds,
      numFishPerPlayer,
      turnTime,
    };
    FirestoreService.updateRoom(roomId, update);
  }, [numRounds, numFishPerPlayer]);

  function estGameMins() {
    const avgSecondsToGuessFish = 20;
    const estGameSeconds =
      numPlayers * numFishPerPlayer * avgSecondsToGuessFish * numRounds;
    const guessResolutionMins = 5;
    return (
      Math.ceil(estGameSeconds / 60 / guessResolutionMins) * guessResolutionMins
    );
  }

  function toggleShowing() {
    setShowingEdit(!showingEdit);
  }

  return (
    <>
      <Slider
        min={4}
        step={1}
        max={16}
        renderTrack={Track}
        renderThumb={Thumb("players")}
        value={numPlayers}
        onChange={setNumPlayers}
      />
      <p>Rough Estimated Game Time</p>
      <h4>~{estGameMins()}mins</h4>
      {showingEdit ? (
        <>
          <VertSpacer />
          <VertSpacer />
          <Slider
            min={1}
            step={1}
            max={5}
            renderTrack={Track}
            renderThumb={Thumb("rounds")}
            value={numRounds}
            onChange={setNumRounds}
          />
          <VertSpacer />
          <VertSpacer />
          <Slider
            min={1}
            step={1}
            max={3}
            renderTrack={Track}
            renderThumb={Thumb("🐠fish/player")}
            value={numFishPerPlayer}
            onChange={setNumFishPerPlayer}
          />
          <VertSpacer />
          <VertSpacer />
        </>
      ) : null}
      <AdminButton onClick={toggleShowing}>
        {showingEdit ? "Done editing game" : "Edit Game Length"}
      </AdminButton>
    </>
  );
}
