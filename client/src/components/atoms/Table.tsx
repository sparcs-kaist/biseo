import styled from "@emotion/styled";

export const Cell = styled.td<{ w?: number }>`
  width: ${props => (props.w ? `${props.w}px` : "100%")};
  align-items: flex-start;
  padding: 6px 5px;
  font-size: 10px;
  font-weight: 500;
`;

export const Header = styled.thead`
  position: relative;
  display: flex;
  height: 32px;
  align-items: center;
  text-align: left;
  background-color: ${props => props.theme.colors.gray100};
  color: ${props => props.theme.colors.gray500};
  gap: 5px;
  padding: 0 5px;
`;

export const Row = styled.tr<{ selected?: boolean }>`
  position: relative;
  display: flex;
  height: 32px;
  align-items: center;
  gap: 5px;
  background-color: ${props =>
    props.selected ? props.theme.colors.blue100 : props.theme.colors.white};
  color: ${props => props.theme.colors.gray600};
  border-top: solid 1px ${props => props.theme.colors.gray200};
  padding: 0 5px;
`;

export const Table = styled.table`
  width: 100%;
  border: solid 1px ${props => props.theme.colors.gray200};
  border-radius: 5px;
  border-spacing: 0;
  overflow: hidden;
`;
