import React from "react";
import styled from "styled-components";

const colors = {
  peach: ["#E88FA2", "#EB9B81"],
  green: ["#1696A0", "#88C072"],
  need: ["#2A3076", "#1792C8"],
  strategy: ["#d62346", "#f0aa71"],
};

const NeedsWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
`;

const Need = styled.div`
  margin-right: 5px;
  margin-bottom: 5px;
  border-radius: 3px;
  padding: 4px;
  font-size: 0.7em;
  color: white;
  display: inline-block;
  background: linear-gradient(
    to bottom right,
    ${colors.need[0]},
    ${colors.need[1]}
  );
  transform: rotate(${(props) => props.angle}deg);
`;

function randomAngle() {
  const maxAngle = 2;
  const randomAngleDeg = (Math.random() - 0.5) * maxAngle * 2;
  return randomAngleDeg;
}

export function Needs({ needs }) {
  return (
    <NeedsWrapper>
      {needs.map((need, i) => (
        <Need key={i} angle={randomAngle()}>
          {need}
        </Need>
      ))}
    </NeedsWrapper>
  );
}
