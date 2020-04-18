import React, { useEffect, useState } from "react";

export default function MyCheckin() {
  return (
    <Background>
      <LangButton onClick={toggleLang}>
        {lang === "ma" ? "En" : "Mā"}
      </LangButton>
      <Confetti width={width} height={height} recycle={false} />
      <CarouselProvider
        totalSlides={5}
        naturalSlideWidth={10000}
        naturalSlideHeight={10000}
        isIntrinsicHeight={true}
        touchEnabled={false}
        dragEnabled={false}
      >
        <Slider>
          <StyledSlide index={0}>
            <h1>👋 Welcome {user}</h1>

            <br />
            <Intro>
              This is a quick way to surface what is most alive for people right
              now and what you all need. In doing so, we hope you and the people
              you’re meeting with will find ways to get what you need quicker,
              so you can spend more time doing what matters.
              <ConfigContainer>
                <p>{otherUserNameList}</p>
                <CopyToClipboardSpan
                  text={`${window.location.origin}/?listId=${roomId}`}
                  onCopy={() => setLinkCopied(true)}
                >
                  <LittleButton>Copy invite link to this room</LittleButton>
                </CopyToClipboardSpan>
                <p>{linkCopied ? "Link Copied 🙌" : null}</p>
              </ConfigContainer>
            </Intro>
            <br />
            <br />
            <ButtonNext>Next</ButtonNext>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <WidthWrapper>
              <h3>
                What if someone needs more care/support than I can or know how
                to provide?
              </h3>
              <p>
                If someone is in deeper distress than you feel you have the
                resources to navigate togther, they can get professional help...
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
                <a href="https://www.lifeline.org.nz/" target="_blank">
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
                >
                  <strong>Healthline</strong>
                </a>
                &nbsp;&ndash; 0800 611 116
              </p>
              <p>
                <a href="http://samaritans.org.nz/" target="_blank">
                  <strong>Samaritans</strong>
                </a>
                &nbsp;&ndash; 0800 726 666&nbsp;
              </p>
              <p>
                More here:{" "}
                <a
                  href="https://www.mentalhealth.org.nz/get-help/in-crisis/helplines/"
                  target="_blank"
                >
                  <strong>MentalHealth.org.nz helplines</strong>
                </a>
              </p>
            </WidthWrapper>
            <Footer />
          </StyledSlide>
          <StyledSlide index={1}>
            <h1>Select my check-in</h1>
            {myCheckinSmall}
            {/* <br />
            <br />
            <br />
            <ButtonNext onClick={scrollToTop}>
              I've selected my check-in
            </ButtonNext>
            <br />
            <br /> */}
            <br />
            <h3>Select my check-in</h3>
            {selectElements}
            <br />
            <br />
            <br />
            {othersCheckInsElements}
            <br />
            <br />
            <br />
            {navButtons(3, "I've selected my check-in", 1)}
            <br />
            <br />
            <br />
            {/* <ErrorMessage errorCode={error}></ErrorMessage> */}
            <Footer />
          </StyledSlide>

          <StyledSlide index={2}>
            {roomConfig.hasSpokenCheckin ? (
              <>
                <h1>Spoken check-in</h1>
                <CheckinName>Step one</CheckinName>
                <Intro>
                  Any person click “start my check-in” and share whatever you
                  want about the words you’ve chosen.
                </Intro>
                <Intro>Everyone else shut up and listen 😉</Intro>
                <CheckinName>Step two</CheckinName>
                <Intro>Repeat, until everyone who wants to has spoken.</Intro>
                <EasyTimer
                  timer={timer}
                  startTimerNow={startTimerNow}
                  stopTimerNow={stopTimerNow}
                  timerLength={roomConfig ? roomConfig.timerLength : 60}
                />
              </>
            ) : (
              <>
                <h1>Reflect on everyone's check-ins</h1>
              </>
            )}

            <CheckinName>My check-in:</CheckinName>
            {printCheckinItemsBig(myCheckIn, false)}
            {othersCheckInsElements}
            <br />
            <br />
            <br />
            {navButtons(
              4,
              roomConfig.hasSpokenCheckin
                ? "Everyone who wants to has checked-in"
                : "Next step",
              2
            )}
            <Footer />
          </StyledSlide>

          <StyledSlide index={3}>
            <h1>Next step</h1>
            <br />
            <Intro>
              👋 Hi, we’re Clare & Peter. We hope you’ve got some value from our
              room.
            </Intro>
            <ClarePeterPhoto src={clarePeter} />
            <h2>What next?</h2>
            <br />
            <StyledBackButton>Back</StyledBackButton>
            <br />
            <a href="/" target="_blank">
              <LittleButton>
                Create a new private Heartwork check-in room
              </LittleButton>
            </a>
            <br />
            <a href="#donate">
              <LittleButton>
                Support Clare and Peter at Heartwork to keep making and
                improving these tools
              </LittleButton>
            </a>
            <br />
            <ButtonNext onClick={scrollToTop}>
              Reflect on feelings, needs and strategies
            </ButtonNext>
            <br />
            <a
              href="https://www.heartwork.co.nz/shop-1/5gvwaf9e4s8gt6xagauhbvx6mfsi7d"
              target="_blank"
            >
              <LittleButton>Get your own Heartwork decks</LittleButton>
            </a>
            <br />
            <a href="https://www.heartwork.co.nz" target="_blank">
              <LittleButton>Learn more</LittleButton>
            </a>
            <br id="donate" />
            <br />
            <br />
            <h2>Living in the gift economy</h2>
            <a
              href="https://www.heartwork.co.nz/checkout/subscribe?cartToken=j-7gFqjxXqJ7BmTm9Yt2L2sI1Kb1p_mtD_enWqAV"
              target="_blank"
            >
              <LittleButton>
                Support us for the price of a weekly coffee - $4.50
              </LittleButton>
            </a>
            <a
              href="https://www.heartwork.co.nz/checkout/subscribe?cartToken=AqsVsyGxX5pj_eiztgD9mKwRRwlTNg-o0mrSM4a3"
              target="_blank"
            >
              <LittleButton>
                Support us for the price of a weekly drink at your local - $11
              </LittleButton>
            </a>
            <a
              href="https://www.heartwork.co.nz/checkout/subscribe?cartToken=Y65SCIbzcDHc-yVcClx9zcdvwESJc-kP6EjZuhKm"
              target="_blank"
            >
              <LittleButton>
                Support us for the price of a weekly pizza out - $23
              </LittleButton>
            </a>
            <Intro>
              We’re Clare and Peter. We live and breathe this work. We made this
              to help you and other people to get clear on what you need so you
              can spend more time doing what matters to you!
            </Intro>
            <Intro>
              We’d love for all of our work to be as accessible as possible for
              people all around the world so we offer as much as possible to you
              at no cost.
            </Intro>
            <Intro>
              If you value this work and you’d like to contribute, you can
              become a Heartwork subscriber now!
            </Intro>
            <h3>Connect with us</h3>
            <Intro>
              We'd love to connect with you. Connect here:
              <br />
              <a
                href="https://www.linkedin.com/company/heartworkcollective"
                target="_blank"
              >
                <FaLinkedin />
                Heartwork
              </a>{" "}
              {"   "}
              <a
                href="https://www.facebook.com/heartworkcommunity"
                target="_blank"
              >
                <FaFacebook />
                Heartwork
              </a>
              <br />
              <br />
              <a
                href="https://www.linkedin.com/in/clare-rousseau-co-initiator-heartwork-82b01832/"
                target="_blank"
              >
                <FaLinkedin />
                Clare
              </a>
              {"   "}
              <a
                href="https://www.linkedin.com/in/peterrhysjacobson/"
                target="_blank"
              >
                <FaLinkedin />
                Peter
              </a>
            </Intro>

            <div>
              <StyledBackButton>Back</StyledBackButton>
            </div>
            <Footer />
          </StyledSlide>
          <StyledSlide index={4}>
            <h1>Reflect on feelings, needs and strategies</h1>
            <p>
              One way of thinking about communication (including non-verbal) is
              that it is all an attempt or a strategy to fulfil a universal
              human need. Sometimes these actions, words and behaviours might
              not be effective, they might even be defensive or violent. But if
              we understand the concept of needs, we may be able to empathise
              effectively with the person and find a way to work with them that
              is win-win.
            </p>

            <h2>Some Universal Human Needs</h2>
            {allNeeds()}
            <p>
              Name it to tame it - naming feelings is a proven way to help
              someone come back to their senses from a freeze/fight/flight
              response.
            </p>
            {allPeach()}
            <p>
              How would you love the others to feel? How would you love to feel?
            </p>
            {allGreen()}
            <p>
              What strategies could you lead to meet your needs and contribute
              to others meeting their needs?
            </p>
            {allStrategies()}
            <StyledBackButton>Back</StyledBackButton>
            <br />
            <br />
            <br />
            <br />
            <br />
            <Footer />
          </StyledSlide>
        </Slider>
      </CarouselProvider>
      <FocusBackground
        style={{ display: openAccordion === null ? "none" : "inherit" }}
      />
      <StyledModal
        isOpen={showingGreenHelp}
        onBackgroundClick={toggleGreenHelp}
        onEscapeKeydown={toggleGreenHelp}
      >
        <ModalInner>
          <HelpText>
            <h3>Feelings</h3>
          </HelpText>
          <HelpText>
            Sometimes “feelings” can be a turn off. So you can choose to
            check-in with or without feelings.
          </HelpText>
          <HelpText>
            <b>The value of including feelings</b> is that our feelings are a
            useful gauge for our underlying human needs. Knowing where people
            are really at can also help a group make better decisions about how
            and where to spend their energy.
          </HelpText>
          <HelpText>
            So it’s up to you whether you include them - just remember that if
            you do, some people may not want to share or speak to what’s real
            for them, and that’s okay too.
          </HelpText>
          <HelpText>
            <h3>Green (comfortable) feelings</h3>
          </HelpText>
          <HelpText>
            Sometimes we can be focussed on what’s not working - so much so we
            can miss the delight and forget what is working really well.{" "}
            <b>
              We find naming green feelings can be energising and an opportunity
              for celebration.
            </b>
          </HelpText>
        </ModalInner>
      </StyledModal>

      <StyledModal
        isOpen={showingPeachHelp}
        onBackgroundClick={togglePeachHelp}
        onEscapeKeydown={togglePeachHelp}
      >
        <ModalInner>
          <HelpText>
            <h3>Feelings</h3>
          </HelpText>
          <HelpText>
            Sometimes “feelings” can be a turn off. So you can choose to
            check-in with or without feelings.
          </HelpText>
          <HelpText>
            <b>The value of including feelings</b> is that our feelings are a
            useful gauge for our underlying human needs. Knowing where people
            are really at can also help a group make better decisions about how
            and where to spend their energy.
          </HelpText>
          <HelpText>
            So it’s up to you whether you include them - just remember that if
            you do, some people may not want to share or speak to what’s real
            for them, and that’s okay too.
          </HelpText>
          <HelpText>
            <h3>Peach (uncomfortable) feelings</h3>
          </HelpText>
          <HelpText>
            Sometimes it can be hard for people to talk about and name
            uncomfortable feelings, which is totally understandable given the
            world many of us were raised in.
          </HelpText>
          <HelpText>
            <b>The value in including uncomfortable feelings</b> in a check-in,
            is it can help people to get really clear on what they need and take
            action, which may or may not include asking the group for support of
            some kind.
          </HelpText>
          <HelpText>
            Also, there’s an expression that goes “name it to tame it”. In other
            words, sometimes just naming feelings is all we need to dissolve
            them. Like acknowledging “I felt angry” and then realising you’re
            need was just to acknowledge it.
          </HelpText>
        </ModalInner>
      </StyledModal>
      <StyledModal
        isOpen={showingNeedsHelp}
        onBackgroundClick={toggleNeedsHelp}
        onEscapeKeydown={toggleNeedsHelp}
      >
        <ModalInner>
          <HelpText>
            <b>
              All human behaviour can be viewed as attempts to meet universal
              human needs.
            </b>
          </HelpText>
          <HelpText>
            <b>A universal human need is</b> distinct from a "strategy" to meet
            a need. Needs are not attached to any one time, place or person. For
            something to be a "need" there must be many different possible
            strategies to meet it.
          </HelpText>
          <HelpText>
            <b>The most important thing</b> is for each person to know what
            their needs are. Often clarity on a need is enough for a person to
            meet that need themselves.
          </HelpText>
          <HelpText>
            <b>Knowing other people’s needs helps us</b> best create with them.
            If I know you’re yearning for agency, I’ll approach you differently
            than if I know you’re yearning for collaboration.
          </HelpText>
          <HelpText>
            It’s hard to know what someone else’s needs are at any given moment
            so it can be valuable to let each person reflect and speak for
            themselves.
          </HelpText>
          <HelpText>
            <i>
              I might be silent in a meeting as a strategy to meet any number of
              different needs: perhaps I have a need for peace, perhaps I want
              to contribute as a leader and be effective and so I want to give
              others space to speak, perhaps I’m exhausted and have a need for
              rest, or something else entirely.
            </i>
          </HelpText>
        </ModalInner>
      </StyledModal>
    </Background>
  );
}
