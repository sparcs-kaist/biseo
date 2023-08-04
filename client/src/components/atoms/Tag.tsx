import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { theme } from "@/theme";
import type { Color } from "@/theme";

const colors = (color: Color, bg: Color) =>
  css({
    color: theme.colors[color],
    backgroundColor: theme.colors[bg],
  });

type TagTypes = "public" | "private" | "identified" | "anonymous" | "votable";

const tagNames = {
  public: "공개",
  private: "비공개",
  identified: "기명",
  anonymous: "무기명",
  votable: "투표 가능",
} as const;

const tagStyles = {
  public: colors("orange600", "orange200"),
  private: colors("gray600", "gray200"),
  identified: colors("green600", "green200"),
  anonymous: colors("purple600", "purple200"),
  votable: colors("blue600", "blue200"),
} as const;

const TagInner = styled.div<{
  type: TagTypes;
}>(({ type }) => [
  css`
    display: flex;
    height: 18px;
    border-radius: 3px;
    align-items: center;
    justify-content: center;
    padding: 2px 10px;
    font-size: 10px;
    font-weight: 500;
  `,
  tagStyles[type],
]);

interface Props {
  type: TagTypes;
}

export const Tag: React.FC<Props> = ({ type }) => {
  return <TagInner type={type}>{tagNames[type]}</TagInner>;
};
