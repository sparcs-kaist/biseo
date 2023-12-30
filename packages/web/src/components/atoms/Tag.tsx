import type { ColorKeys } from "@biseo/web/styles";
import { colors } from "@biseo/web/styles";
import { css, type SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";

const tagColors = (color: ColorKeys, bg: ColorKeys) =>
  css({
    color: colors[color],
    backgroundColor: colors[bg],
  });

type TagTypes =
  | "public"
  | "private"
  | "identified"
  | "anonymous"
  | "votable"
  | "participant"
  | "user"
  | "template";

const tagNames: Record<TagTypes, string> = {
  public: "공개",
  private: "비공개",
  identified: "기명",
  anonymous: "무기명",
  votable: "투표 가능",
  participant: "",
  user: "태그 대상",
  template: "투표항목",
};

const tagStyles: Record<TagTypes, SerializedStyles> = {
  public: tagColors("orange600", "orange200"),
  private: tagColors("gray600", "gray200"),
  identified: tagColors("green600", "green200"),
  anonymous: tagColors("purple600", "purple200"),
  votable: tagColors("blue600", "blue200"),
  participant: tagColors("blue600", "blue200"),
  user: tagColors("purple600", "purple200"),
  template: tagColors("orange600", "orange200"),
};

const TagInner = styled.div<{
  type: TagTypes;
}>(({ type }) => [
  css`
    display: flex;
    height: 18px;
    justify-content: center;
    align-items: center;

    font-weight: 500;

    border-radius: 3px;
    padding: 2px 10px;
    font-size: 10px;
  `,
  tagStyles[type],
]);

interface Props {
  suffix?: number | string;
  type: TagTypes;
}

export const Tag: React.FC<Props> = ({ suffix = "", type }) => (
  <TagInner type={type}>
    {tagNames[type]} {suffix}
  </TagInner>
);
