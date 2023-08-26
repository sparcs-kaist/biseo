import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "@/components/organisms";
import styled from "@emotion/styled";

export const PageLayout: React.FC = () => (
  <Page>
    <Header />
    <main>
      <Outlet />
    </main>
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
