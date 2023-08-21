import React from "react";
import styled from "@emotion/styled";

const ProgressContainer = styled.div<{ width?: number }>(
  ({ width = 180, theme }) => `
  display: flex;
  align-items: center;
  width: ${width}px;
  height: 12px;
  background-color: ${theme.colors["blue200"]};
  border-radius: 5px;
  overflow: hidden;
`
);

const ProgressBarFill = styled.div<{ value: number; max: number }>`
  height: 100%;
  background-color: ${props => props.theme.colors["blue400"]};
  width: ${props => props.max ? (props.value / props.max) * 100 : 0}%;
  border-radius: 5px ${props => props.value === props.max ? '5px' : '0px'} 0px 5px;
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
