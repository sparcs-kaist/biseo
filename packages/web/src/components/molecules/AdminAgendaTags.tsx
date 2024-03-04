import React from "react";
import {
  Box,
  Text,
  ToggleContainor,
  ToggleButton,
} from "@biseo/web/components/atoms";

interface SelectProps {
  switchPublic: (prev: boolean) => void;
  switchNamed: (prev: boolean) => void;
  ispublic: boolean;
  isnamed: boolean;
}

interface TagProps {
  ispublic: boolean;
  isnamed: boolean;
}

export const AdminAgendaTags: React.FC<TagProps> = ({
  ispublic = true,
  isnamed = false,
}) => (
  <Box w={270} h={28} gap={16} dir="row" justify="center">
    <Box dir="row" w={130} h={28} gap={8} align="center">
      <Text variant="body" color="black">
        투표 결과
      </Text>
      <ToggleContainor h={25}>
        <ToggleButton isLeft selected={ispublic}>
          <Text variant="option1" color={ispublic ? "blue500" : "gray400"}>
            공개
          </Text>
        </ToggleButton>
        <ToggleButton isLeft={false} selected={!ispublic}>
          <Text variant="option1" color={!ispublic ? "blue500" : "gray400"}>
            비공개
          </Text>
        </ToggleButton>
      </ToggleContainor>
    </Box>
    <Box dir="row" w={130} h={28} gap={8} align="center">
      <Text variant="body" color="black">
        투표 상세
      </Text>
      <ToggleContainor h={25}>
        <ToggleButton isLeft selected={isnamed}>
          <Text variant="option1" color={isnamed ? "blue500" : "gray400"}>
            기명
          </Text>
        </ToggleButton>
        <ToggleButton isLeft={false} selected={!isnamed}>
          <Text variant="option1" color={!isnamed ? "blue500" : "gray400"}>
            무기명
          </Text>
        </ToggleButton>
      </ToggleContainor>
    </Box>
  </Box>
);

export const AdminAgendaTagsSelect: React.FC<SelectProps> = ({
  switchPublic,
  switchNamed,
  ispublic,
  isnamed,
}) => (
  <Box w={270} h={28} justify="space-between" dir="row">
    <Box dir="row" w={130} h={28} gap={8} align="center">
      <Text variant="body" color="black">
        투표 결과
      </Text>
      <ToggleContainor h={25}>
        <ToggleButton
          isLeft
          selected={ispublic}
          onClick={() => {
            switchPublic(true);
          }}
        >
          <Text variant="option1" color={ispublic ? "blue500" : "gray400"}>
            공개
          </Text>
        </ToggleButton>
        <ToggleButton
          isLeft={false}
          selected={!ispublic}
          onClick={() => {
            switchPublic(false);
          }}
        >
          <Text variant="option1" color={!ispublic ? "blue500" : "gray400"}>
            비공개
          </Text>
        </ToggleButton>
      </ToggleContainor>
    </Box>
    <Box dir="row" w={130} h={28} gap={8} align="center">
      <Text variant="body" color="black">
        투표 상세
      </Text>
      <ToggleContainor h={25}>
        <ToggleButton
          isLeft
          selected={isnamed}
          onClick={() => {
            switchNamed(true);
          }}
        >
          <Text variant="option1" color={isnamed ? "blue500" : "gray400"}>
            기명
          </Text>
        </ToggleButton>
        <ToggleButton
          isLeft={false}
          selected={!isnamed}
          onClick={() => {
            switchNamed(false);
          }}
        >
          <Text variant="option1" color={!isnamed ? "blue500" : "gray400"}>
            무기명
          </Text>
        </ToggleButton>
      </ToggleContainor>
    </Box>
  </Box>
);
