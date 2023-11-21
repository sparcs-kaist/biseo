import { colors } from "@biseo/web/styles";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

/**
 * @deprecated use `scroll` and `scrollBar` instead
 */
export const Scroll = styled.div<{ hide?: boolean }>`
  height: 100%;

  overflow-y: scroll;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 14px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    border: 4px solid transparent;
    background-clip: padding-box;
    ${props =>
      !props.hide &&
      css`
        background-color: ${colors.gray400};
      `}
    border-radius: 100px;
  }
`;
