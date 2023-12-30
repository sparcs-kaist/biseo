import { colors } from "@biseo/web/styles";
import styled from "@emotion/styled";
import React from "react";

const ProgressContainer = styled.div<{ width?: number }>(
  ({ width = 180 }) => `
  display: flex;
  align-items: center;
  width: ${width}px;
  height: 12px;
  background-color: ${colors.blue200};
  border-radius: 5px;
  overflow: hidden;
`,
);

const ProgressBarFill = styled.div<{ value: number; max: number }>`
  height: 100%;
  background-color: ${colors.blue400};
  width: ${props => (props.max ? (props.value / props.max) * 100 : 0)}%;
  border-radius: 5px ${props => (props.value === props.max ? "5px" : "0px")} 0px
    5px;
`;

interface ProgressProps {
  value: number;
  max: number;
}

export const ProgressBar: React.FC<ProgressProps> = ({ value, max }) => (
  <ProgressContainer>
    <ProgressBarFill value={value} max={max} />
  </ProgressContainer>
);
