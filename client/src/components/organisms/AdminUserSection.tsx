import React from "react";
import { PlusIcon } from "@/assets";
import { Box, Text } from "@/components/atoms";
import {
  SectionHeader,
  UserTagCards,
  AgendaTemplateCards,
  AddButton,
} from "@/components/molecules";

export const AdminUserSection: React.FC = () => {
  return (
    <Box dir="row" gap={20}>
      <Box dir="column" w={380}>
        <SectionHeader count={3}>투표 템플릿</SectionHeader>
        <Box dir="column" w="fill" gap={15}>
          <Box dir="column" w="fill" gap={15}>
            <AddButton content="새로운 템플릿"/>
          </Box>
          <AgendaTemplateCards />
        </Box>
      </Box>
      <Box dir="column" w={380}>
        <SectionHeader count={4}>유저 태그</SectionHeader>
        <Box dir="column" w="fill" gap={15}>
          <Box dir="column" w="fill" gap={15}>
            <AddButton content="새로운 태그"/>
          </Box>
          <UserTagCards />
          <UserTagCards />
        </Box>
      </Box>
    </Box>
  );
};
