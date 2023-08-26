import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@/components/atoms";
import { Header } from "@/components/organisms";
import styled from "@emotion/styled";

export const PageLayout: React.FC = () => (
  <Page>
    <Header />
    {/*<Box as="main" align="center" justify="flex-start" w="fill">*/}
    <main>
      <Outlet />
    </main>
    {/*</Box>*/}
  </Page>
);

const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  & > main {
    flex: 1;
    overflow: hidden;
  }
`;
