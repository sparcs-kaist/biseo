import React from "react";
import { useUserTag } from "@/services/user-tag";
import { TagSelect_temp } from "@/components/atoms";

interface Props {
  selected: string[];
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

export const SelectTagBox: React.FC<Props> = ({ selected, onChange }) => {
  const { tags } = useUserTag(state => ({
    tags: state.userTags,
  }));

  return (
    <>
      <TagSelect_temp tags={tags} />
    </>
  );
};
