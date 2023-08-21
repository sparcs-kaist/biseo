import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const CheckBox = styled.input(
  ({}) => css`
    width: 9px;
  `,
);

CheckBox.defaultProps = { type: "checkbox" };
