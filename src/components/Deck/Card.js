import React from "react";
import { string, number, array } from "prop-types";
import { animated, interpolate } from "react-spring/hooks";

const Card = ({ i, x, y, rot, scale, trans, bind, data }) => {
  const { content, heading, body, extra } = data[i];

  return (
    <animated.div
      key={i}
      style={{
        transform: interpolate(
          [x, y],
          (x, y) => `translate3d(${x}px,${y}px,0)`
        ),
      }}
      className="card-deck__card-outer"
    >
      <animated.div
        {...bind(i)}
        style={{
          transform: interpolate([rot, scale], trans),
        }}
      >
        <div className="card card-deck__card-inner">{JSON.stringify(data)}</div>
      </animated.div>
    </animated.div>
  );
};

Card.propTypes = {
  front: string,
  back: string,
  heading: string,
  body: string,
  extra: string,
};

export default Card;
