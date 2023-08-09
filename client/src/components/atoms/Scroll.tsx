import styled from "@emotion/styled";

export const Scroll = styled.div`
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 14px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    border: 4px solid transparent;
    background-clip: padding-box;
    background-color: ${props => props.theme.colors.gray400};
    border-radius: 100px;
  }
`;
