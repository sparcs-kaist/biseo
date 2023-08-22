import React from "react";
import { Box, NewAddButton, Text } from "@/components/atoms";
import { PlusIcon } from "@/assets";

interface Props {
  content: string;
  onClick?: () => void;
}
//when you click the button, it will go to the other page


export const AddButton: React.FC<Props> = ({ content, onClick }) => (
    <NewAddButton onClick={onClick}>
        <Text color="gray500" variant="body">
            <PlusIcon></PlusIcon> {content}
        </Text>
    </NewAddButton>
);
