import { Box, Text, Tag } from "@biseo/web/components/atoms";

interface Props {
  type: boolean;
}

export const VoteDetail: React.FC<Props> = type =>
  type ? (
    <Box w="fill" justify="space-between" dir="row" align="center">
      <Text variant="subtitle" color="black">
        투표 상세
      </Text>
      <Tag type="identified" />
    </Box>
  ) : (
    <Box w="fill" justify="space-between" dir="row" align="center">
      <Text variant="subtitle" color="black">
        투표 상세
      </Text>
      <Tag type="anonymous" />
    </Box>
  );
