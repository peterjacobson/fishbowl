import React, { useState } from "react";

import { rounds } from "../data/roundData";
import {
  AdminButton,
  StyledModal,
  ModalInner,
  ModalText,
  WhatIsButton,
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
        <h3>What is Fishbowl?</h3>
      </WhatIsButton>
      <StyledModal
        isOpen={modalOpen}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
      >
        <ModalInner>
          <AdminButton onClick={() => setModalOpen(false)}>Close</AdminButton>
          <ModalText>
            Fishbowl is a creative game based on Charades and Articulate.
          </ModalText>
          <h4>Game setup</h4>
          <ModalText>
            Each player gets three slips of paper, and they write one word or
            short phrase on each slip
          </ModalText>
          <ModalText>
            All these slips go into a <b>Fishbowl</b> or hat, hence the name "Fishbowl"
          </ModalText>
          <ModalText>Players are split into two teams</ModalText>
          <h4>Game play</h4>
          <ModalText>There are Five Rounds</ModalText>
          {rounds.map(round => (
            <>
              <h
              </>
          ))}
          <ModalText></ModalText>
          <ModalText>{JSON.stringify(rounds)}</ModalText>
          <AdminButton onClick={() => setModalOpen(false)}>Close</AdminButton>
        </ModalInner>
      </StyledModal>
    </>
  );
}
