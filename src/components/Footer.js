import React from "react";

import styled from "styled-components";
import logotextb from "../img/logotextb.png";
import yourlogo from "../img/yourlogo.png";
import heartworklogo from "../img/heartworklogo.png";
import kadesignb from "../img/kadesignb.png";

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

const WhiteBackground = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  max-width: 400px;
  padding: 8px;
  margin: auto;
  border-radius: 10px;
  background-color: white;
  -webkit-box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.75);
`;

const HeartworkLogoSmall = styled.span`
  display: inline-block;
  position: relative;
  width: 34px;
  height: 34px;
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
const KimLogo = styled(HeartworkLink)`
  background: url(${kadesignb});
  background-size: contain;
  background-position: center;
  width: 133px;
  height: 30px;
`;

const FooterContainer = styled.div`
  text-align: left;
  max-width: 370px;
  margin-left: auto;
  margin-right: auto;
  padding: 30px;
`;

const Link = styled.a`
  /* color: #b1bcea !important; */
`;

const FooterText = styled.p`
  /* color: #94a3df !important; */
  /* color: #b1bcea !important; */
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
    <WhiteBackground>
      <FooterContainer>
        <FooterText>
          Created with love by{" "}
          <Link href="https://heartwork.co.nz/" target="_blank">
            Heartwork <HeartworkLogoSmall />
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
        <FooterText>
          Find{" "}
          <a href="https://old-check-in-app.firebaseapp.com/">
            the previous version of the app here
          </a>
        </FooterText>
        <br />
        <br />
        <br />
        <br />
        <br />
      </FooterContainer>
    </WhiteBackground>
  );
}
