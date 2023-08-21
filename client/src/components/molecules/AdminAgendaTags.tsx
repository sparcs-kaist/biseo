import { BorderedBox, Box, Text } from "@/components/atoms";

export const AdminAgendaTags: React.FC = () => (
  <Box dir="row" gap={16}>
    <Box dir="row" gap={10} align="center">
      <Text variant="body" color="black">
        투표 결과
      </Text>
      <BorderedBox
        borderColor="gray200"
        bg="white"
        w="hug"
        h={30}
        justify="center"
        borderSize={1}
        padHorizontal={15}
        round={5}
        borderStyle="solid"
      >
        <Text color="gray600" variant="option1">
          비공개
        </Text>
      </BorderedBox>
    </Box>
    <Box dir="row" gap={10} align="center">
      <Text variant="body" color="black">
        투표 상세
      </Text>
      <BorderedBox
        borderColor="gray200"
        bg="white"
        w="hug"
        h={30}
        justify="center"
        borderSize={1}
        padHorizontal={15}
        round={5}
        borderStyle="solid"
      >
        <Text color="gray600" variant="option1">
          무기명
        </Text>
      </BorderedBox>
    </Box>
  </Box>
);
