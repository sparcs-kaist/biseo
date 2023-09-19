import React from "react";
import { useUserTag } from "@/services/user-tag";
import { TagSelect } from "./TagSelect";

interface Props {
  onChange: (selection: string[]) => void;
}

export const SelectTagBox: React.FC<Props> = ({ onChange }) => {
  const { tags } = useUserTag(state => ({
    tags: state.userTags,
  }));

  return <TagSelect tags={tags} onChange={onChange} />;
};
