import { DownArrowIcon } from "@biseo/web/assets";
import { BorderedBox, Box, Text } from "@biseo/web/components/atoms";

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

export const AdminAgendaTagsSelect: React.FC = () => (
  <Box w={270} h={28} justify="space-between" dir="row">
    <Box dir="row" w={130} h={28} gap={8} align="center">
      <Text variant="body" color="black">
        투표 결과
      </Text>
      <BorderedBox
        borderColor="gray200"
        bg="white"
        w={75}
        h={28}
        align="center"
        justify="space-between"
        borderSize={1}
        padHorizontal={12}
        padVertical={7}
        round={5}
        borderStyle="solid"
        dir="row"
      >
        <Text color="gray600" variant="option1">
          비공개
        </Text>

        <Box padVertical={7}>
          <DownArrowIcon />
        </Box>
      </BorderedBox>
    </Box>
    <Box dir="row" w={130} h={28} gap={8} align="center">
      <Text variant="body" color="black">
        투표 상세
      </Text>
      <BorderedBox
        borderColor="gray200"
        bg="white"
        w={75}
        h={28}
        align="center"
        justify="space-between"
        borderSize={1}
        padHorizontal={12}
        padVertical={7}
        round={5}
        borderStyle="solid"
        dir="row"
      >
        <Text color="gray600" variant="option1">
          무기명
        </Text>

        <Box padVertical={7}>
          <DownArrowIcon />
        </Box>
      </BorderedBox>
    </Box>
  </Box>
);
