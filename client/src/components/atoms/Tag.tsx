import React from "react";
import styled from "@emotion/styled";
import { css, SerializedStyles } from "@emotion/react";
import { theme } from "@/theme";
import type { Color } from "@/theme";

const colors = (color: Color, bg: Color) =>
  css({
    color: theme.colors[color],
    backgroundColor: theme.colors[bg],
  });

type TagTypes =
  | "public"
  | "private"
  | "identified"
  | "anonymous"
  | "votable"
  | "user"
  | "template";

const tagNames: Record<TagTypes, string> = {
  public: "공개",
  private: "비공개",
  identified: "기명",
  anonymous: "무기명",
  votable: "투표 가능",
  user: "태그 대상",
  template: "투표항목",
};

const tagStyles: Record<TagTypes, SerializedStyles> = {
  public: colors("orange600", "orange200"),
  private: colors("gray600", "gray200"),
  identified: colors("green600", "green200"),
  anonymous: colors("purple600", "purple200"),
  votable: colors("blue600", "blue200"),
  user: colors("purple600", "purple200"),
  template: colors("orange600", "orange200"),
};

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
  suffix?: number;
  type: TagTypes;
}

export const Tag: React.FC<Props> = ({ suffix, type }) => (
  <TagInner type={type}>
    {tagNames[type]} {suffix}
  </TagInner>
);
