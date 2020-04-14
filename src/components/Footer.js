import React from "react";

import styled from "styled-components";
import heartworklogo from "../img/heartworklogo.png";
import yourlogo from "../img/yourlogo.png";

const HeartworkLink = styled.a`
  display: inline-block;
  position: relative;
  width: 60px;
  height: 60px;
  border: none;
  background: url(${heartworklogo});
  background-size: cover;
  background-position: center;
`;

const YourLogo = styled(HeartworkLink)`
  background: url(${yourlogo});
  background-size: cover;
  background-position: center;
  width: 70px;
  height: 70px;
`;

const FooterContainer = styled.p`
  margin-top: 100px;
`;

export default function Footer(props) {
  return (
    <FooterContainer>
      Created by Heartwork
      <HeartworkLink href="https://heartwork.co.nz/" target="_blank" />
      <br />
      with thanks to our awesome sponsors
      <br />
      <YourLogo />
    </FooterContainer>
  );
}
