import React from "react";
import styled from "@emotion/styled";

const ProgressContainer = styled.div<{ width?: number }>(
  ({ width = 180, theme }) => `
  display: flex;
  align-items: center;

  progress {
    appearance: none;
    width: ${width}px;
    height:12px;

    ::-webkit-progress-bar {
      border-radius: 5px;
      background-color: ${theme.colors["blue200"]};;
    }
    ::-webkit-progress-value {
      border-radius: 5px 0px 0px 5px;
      background-color: ${theme.colors["blue400"]};
    }
  }
`,
);

interface ProgressProps {
  value: number;
  max: number;
}

export const ProgressBar: React.FC<ProgressProps> = ({ value, max }) => (
  <ProgressContainer>
    <progress value={value} max={max} />
  </ProgressContainer>
);
