import React from "react";

import styled from "styled-components";
import logotextb from "../img/logotextb.png";
import yourlogo from "../img/yourlogo.png";
import kadesign from "../img/kadesign.png";

const HeartworkLink = styled.a`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  border: none;
  background: url(${logotextb});
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
const KimLogo = styled(HeartworkLink)`
  background: url(${kadesign});
  background-size: cover;
  background-position: center;
  width: 120px;
  height: 30px;
`;

const FooterContainer = styled.div`
  text-align: center;
  margin-top: 100px;
  max-width: 350px;
  margin-left: auto;
  margin-right: auto;
`;

export default function Footer(props) {
  return (
    <FooterContainer>
      <p>
        Created with love by
        <br />
        <br />
        <HeartworkLink href="https://heartwork.co.nz/" target="_blank" />
        <br />
        <br />
        supported by our sponsors
        <br />
        <br />
        <KimLogo />
        <br />
        <br />
        <YourLogo />
        <br />
        <br />
        <YourLogo />
      </p>
      <p>
        We're looking for values aligned organisations and people to support
        this work and create with us. If this is you, give Clare a call on{" "}
        <a href="tel:+6421933143">+64 21933143</a> or an email at{" "}
        <a href="mailto:clare@heartworkhq.com">clare@heartworkhq.com</a>, she'd
        love to hear from you.
      </p>
    </FooterContainer>
  );
}
