import { Box, Card } from "@/components/atoms";
import { AgendaTag, AgendaFoldedText } from "@/components/molecules";
import type { AdminAgenda } from "biseo-interface/admin/agenda";
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
    <Card primary={false} clickable onClick={openModal} round={5}>
      <Box gap={8}>
        <AgendaTag
          tags={{
            public: _tags.public,
            identified: _tags.identified,
            votable: _tags.votable,
          }}
        />
        <AgendaFoldedText title={agenda.title} subtitle={agenda.content} />
      </Box>
    </Card>
  );
};
