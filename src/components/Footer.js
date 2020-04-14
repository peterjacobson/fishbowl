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

const FooterContainer = styled.div`
  margin-top: 100px;
`;

export default function Footer(props) {
  return (
    <FooterContainer>
      <p>
        Created by Heartwork
        <HeartworkLink href="https://heartwork.co.nz/" target="_blank" />
        <br />
        with thanks to our awesome sponsors
        <br />
        <YourLogo />
      </p>
      <p>
        Want to get involved? We welcome contributions from volunteers and
        organizational sponsors - email{" "}
        <a href="mailto:clare@heartworkhq.com">clare@heartworkhq.com</a> to
        connect.
      </p>
    </FooterContainer>
  );
}
