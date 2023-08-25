import { Box, Card, Text, UserTag } from "@/components/atoms";
import { AdminTag } from "@/components/molecules";
import { UserTag as IUserTag } from "@biseo/interface/user/tag";
import { useNavigate } from "react-router-dom";

const _tags = {
  user: true,
  template: false,
};

interface Props {
  tag: IUserTag;
}

export const UserTagCards: React.FC<Props> = ({ tag }) => {
  const navigate = useNavigate();
  const openModal = () => navigate(`edittag?tagId=${tag.id}`);
  return (
    <Card primary={false} round={5} onClick={openModal}>
      <Box gap={8}>
        <Box gap={8} dir="row">
          <AdminTag tags={_tags} suffix={23} />
          <UserTag>{tag.title}</UserTag>
        </Box>
        <Box w={340}>
          <Text variant="title2" color="gray600">
            {tag.description}
          </Text>
        </Box>
      </Box>
    </Card>
  );
};
