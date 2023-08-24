import { Box, Card, Text } from "@/components/atoms";
import { AgendaTag } from "@/components/molecules";
import type { AdminAgenda } from "@biseo/interface/admin/agenda";
import { useNavigate } from "react-router-dom";

const _tags = {
  public: false,
  identified: false,
  votable: false,
};

interface Props {
  agenda: AdminAgenda;
}

export const AdminTerminatedAgendaCard: React.FC<Props> = ({ agenda }) => {
  const navigate = useNavigate();
  const openModal = () => navigate(`terminated?agendaId=${agenda.id}`);

  return (
    <Card clickable onClick={openModal}>
      <Box gap={8}>
        <AgendaTag
          tags={{
            public: _tags.public,
            identified: _tags.identified,
            votable: _tags.votable,
          }}
        />
        <Box gap={2}>
          <Text variant="title2" color="black">
            {agenda.title}
          </Text>
          <Text variant="subtitle" color="gray500">
            {agenda.content}
          </Text>
        </Box>
      </Box>
    </Card>
  );
};
