import React from "react";
import {
  BorderedBox,
  Box,
  Text,
  ToggleContainor,
  ToggleButton,
} from "@biseo/web/components/atoms";

interface Props {
  switchPublic: (prev: boolean) => void;
  switchNamed: (prev: boolean) => void;
  ispublic: boolean;
  isnamed: boolean;
}

export const AdminAgendaTags: React.FC = () => (
  <Box w={270} h={28} gap={16} dir="row" justify="center">
    <Box dir="row" w={122} h={28} gap={10} align="center">
      <Text variant="body" color="black">
        투표 결과
      </Text>
      <BorderedBox
        borderColor="gray200"
        bg="white"
        w={65}
        h={28}
        justify="center"
        borderSize={1}
        padHorizontal={15}
        round={5}
        borderStyle="solid"
        gap={99}
      >
        <Text color="gray600" variant="option1">
          비공개
        </Text>
      </BorderedBox>
    </Box>
    <Box dir="row" w={122} h={28} gap={10} align="center">
      <Text variant="body" color="black">
        투표 상세
      </Text>
      <BorderedBox
        borderColor="gray200"
        bg="white"
        w={65}
        h={28}
        justify="center"
        borderSize={1}
        padHorizontal={15}
        round={5}
        gap={99}
        borderStyle="solid"
      >
        <Text color="gray600" variant="option1">
          무기명
        </Text>
      </BorderedBox>
    </Box>
  </Box>
);

export const AdminAgendaTagsSelect: React.FC<Props> = ({
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
