import React, { useState } from "react";

import {
  ConfigContainer,
  CopyToClipboardSpan,
  Intro,
  LittleButton,
  WidthWrapper,
} from "../components/styledComponents";

export default function MyCheckin({ roomId, userId }) {
  const [linkCopied, setLinkCopied] = useState(null);

  return (
    <>
      <Intro>
        This is a quick way to surface what is most alive for people right now
        and what you all need. In doing so, we hope you and the people you’re
        meeting with will find ways to get what you need quicker, so you can
        spend more time doing what matters.
        <ConfigContainer>
          <p>[ Other users list will appear here ]</p>
          <CopyToClipboardSpan
            text={`${window.location.origin}/?listId=${roomId}`}
            onCopy={() => setLinkCopied(true)}
          >
            <LittleButton>Copy invite link to this room</LittleButton>
          </CopyToClipboardSpan>
          <p>{linkCopied ? "Link Copied 🙌" : null}</p>
        </ConfigContainer>
      </Intro>
      <button>Next</button>
      <WidthWrapper>
        <h3>
          What if someone needs more care/support than I can or know how to
          provide?
        </h3>
        <p>
          If someone is in deeper distress than you feel you have the resources
          to navigate togther, they can get professional help...
        </p>
        <h3>...in Aotearoa New Zealand</h3>
        <p>by calling National helplines</p>
        <p>
          Need to talk? Free call or text
          <a href="https://1737.org.nz/">
            &nbsp;<strong>1737</strong>
          </a>
          &nbsp;any time for support from a trained counsellor&nbsp;
        </p>
        <p>
          <a
            href="https://www.lifeline.org.nz/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>Lifeline</strong>
          </a>
          &ndash; 0800 543 354 (0800 LIFELINE) or free text 4357 (HELP)
        </p>
        <p>
          <a href="https://www.lifeline.org.nz/suicide-crisis-helpline">
            <strong>Suicide Crisis Helpline</strong>
          </a>
          &nbsp;&ndash; 0508 828 865 (0508 TAUTOKO)
        </p>
        <p>
          <a
            href="http://www.health.govt.nz/your-health/services-and-support/health-care-services/healthline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>Healthline</strong>
          </a>
          &nbsp;&ndash; 0800 611 116
        </p>
        <p>
          <a
            href="http://samaritans.org.nz/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>Samaritans</strong>
          </a>
          &nbsp;&ndash; 0800 726 666&nbsp;
        </p>
        <p>
          More here:{" "}
          <a
            href="https://www.mentalhealth.org.nz/get-help/in-crisis/helplines/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>MentalHealth.org.nz helplines</strong>
          </a>
        </p>
      </WidthWrapper>
    </>
  );
}
