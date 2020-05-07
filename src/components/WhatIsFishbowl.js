import React, { useState } from "react";

import { rounds } from "../data/roundData";
import {
  StyledModal,
  ModalInner,
  ModalText,
  WhatIsButton,
  CloseModalButton,
  VertSpacer,
} from "./styledComponents";
import Modal from "styled-react-modal";

export default function WhatIsFishbowl() {
  const [modalOpen, setModalOpen] = useState(false);

  function toggleModal(e) {
    setModalOpen(!modalOpen);
  }

  return (
    <>
      <WhatIsButton onClick={() => setModalOpen(true)}>
        <h4>What is 🐠Fishbowl?</h4>
      </WhatIsButton>
      <StyledModal
        isOpen={modalOpen}
        onBackgroundClick={() => setModalOpen(false)}
        onEscapeKeydown={toggleModal}
      >
        <ModalInner>
          <CloseModalButton onClick={() => setModalOpen(false)}>
            Close
          </CloseModalButton>
          <h2>🤷‍♀️What is 🐠Fishbowl?</h2>
          <VertSpacer />
          <VertSpacer />
          <ModalText>
            🐠Fishbowl is a <b>creative communication</b> team game based on
            Charades and Articulate.
          </ModalText>
          <VertSpacer />
          <ModalText>
            It's infinitely variable, as gameplay depends on what players put in
            the fishbowl and the creativity of the players
          </ModalText>
          <VertSpacer />
          <VertSpacer />
          <VertSpacer />
          <VertSpacer />
          <h2>
            😌You'll be easefully walked through each step of the game in this
            app 👌
          </h2>
          <ModalText>
            If you'd like to know what to expect, or you'd like to play this
            game in person (even more awesome), read on.
          </ModalText>
          <VertSpacer />
          <VertSpacer />
          <VertSpacer />
          <VertSpacer />

          <h2>👾Game setup</h2>
          <ModalText>
            <b>1.</b> Each player adds three 🐠fish (words or short phrases) to
            the 🐠fishbowl.
          </ModalText>
          <VertSpacer />
          <VertSpacer />
          <ModalText>
            <b>2.</b> Players are split into two teams
          </ModalText>
          <VertSpacer />
          <VertSpacer />
          <VertSpacer />
          <VertSpacer />
          <h2>🥳Game play</h2>
          <ModalText>
            There are five <b>rounds</b>.
          </ModalText>
          <VertSpacer />
          <ModalText>
            The team that <b>has the most 🐠fish</b> at the end of five rounds{" "}
            <b>🎊Wins🎉</b>
          </ModalText>
          <VertSpacer />
          <ModalText>
            In each <b>round</b>, teams take <b>1 min turns</b> to get as many
            🐠fish as possible
          </ModalText>
          <VertSpacer />
          <ModalText>
            In each <b>1 min turn</b>, one player from the active team has to
            get their team to guess as many 🐠fish as possible, while sticking
            to the <b>round rules</b>
          </ModalText>
          <VertSpacer />
          <VertSpacer />
          <ul>
            {rounds.map((round, i) => (
              <li>
                <b>
                  Round{i + 1}: {round.name}
                </b>
                {round.rules}
                <VertSpacer />
                <VertSpacer />
              </li>
            ))}
          </ul>
          <ModalText></ModalText>
          <CloseModalButton onClick={() => setModalOpen(false)}>
            Close
          </CloseModalButton>
        </ModalInner>
      </StyledModal>
    </>
  );
}
