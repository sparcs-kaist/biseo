import { Box, Card, Text } from "@/components/atoms";
import { AgendaTag, AgendaFoldedText } from "@/components/molecules";
import type { AdminAgenda } from "biseo-interface/admin/agenda";
import { useNavigate } from "react-router-dom";

const _tags = {
  public: false,
  identified: false,
  votable: false,
};

export const AgendaTemplateCards: React.FC = () => {
  return (
    <Card primary={false} round={5}>
      <Box gap={8}>
        <Box gap={8}>
          <AgendaTag
            tags={{
              public: _tags.public,
              identified: _tags.identified,
              votable: _tags.votable,
            }}
          />
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
