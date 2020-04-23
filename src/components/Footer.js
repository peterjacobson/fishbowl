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
  text-align: left;
  margin-top: 130px;
  max-width: 370px;
  margin-left: auto;
  margin-right: auto;
`;

const Link = styled.a`
  color: #b1bcea !important;
`;

const FooterText = styled.p`
  /* color: #94a3df !important; */
  color: #b1bcea !important;
  margin-bottom: 8px;
  line-height: 20px;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0px;
`;

export default function Footer(props) {
  return (
    <FooterContainer>
      <FooterText>
        Created with love by{" "}
        <Link href="https://heartwork.co.nz/" target="_blank">
          Heartwork
        </Link>
      </FooterText>
      <FooterText>Bought to you by our sponsors</FooterText>
      <LogoContainer>
        <KimLogo href="https://www.kimberleyannedesign.com" target="_blank" />
        <YourLogo />
        <YourLogo />
      </LogoContainer>
      <FooterText>
        <b>We're looking for values aligned organisations</b>
        <br /> and people to support this work and create with us. <br />
      </FooterText>
      <FooterText>
        If this is you, give Clare a call on
        <br />
        <Link href="tel:+6421933143">+64 21933143</Link>
        <br />
        or email her at
        <br />
        <Link href="mailto:clare@heartworkhq.com">clare@heartworkhq.com</Link>
        <br />~ she'd love to hear from you.
      </FooterText>
    </FooterContainer>
  );
}
