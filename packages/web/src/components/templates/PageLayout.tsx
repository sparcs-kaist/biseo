import React from "react";
import { Outlet } from "react-router-dom";
import styled from "@emotion/styled";
import { Header } from "@biseo/web/components/organisms";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  & > main {
    flex: 1;
    overflow: hidden;
  }
`;

export const PageLayout: React.FC = () => (
  <Page>
    <Header />
    <main>
      <Outlet />
    </main>
  </Page>
);
