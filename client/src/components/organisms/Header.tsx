import React from "react";
import styled from "@emotion/styled";

import { ReactComponent as LogoIcon } from "@/assets/logo.svg";
import { Box, Divider } from "@/components/atoms";

export const Header: React.FC = () => (
  <header>
    <Box padTop={10} padHorizontal={50}>
      <Logo />
    </Box>
    <Divider />
  </header>
);

const Logo = styled(LogoIcon)`
  margin-top: 13px;
`;
