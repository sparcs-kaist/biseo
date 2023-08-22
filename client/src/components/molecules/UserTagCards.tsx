import { Box, Card, Text, UserTag } from "@/components/atoms";
import { AdminTag } from "@/components/molecules";

const _tags = {
  user: true,
  template: false,
};

export const UserTagCards: React.FC = () => {
  return (
    <Card primary={false} round={5}>
      <Box gap={8}>
        <Box gap={8} dir="row">
          <AdminTag tags={_tags} suffix={23} />
          <UserTag>정회원</UserTag>
        </Box>
        <Box w={340}>
          <Text variant="title2" color="gray600">
            😎 2023년도 정회원
          </Text>
        </Box>
      </Box>
    </Card>
  );
};
