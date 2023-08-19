import { TerminatedAgenda } from "biseo-interface/agenda";
import { AdminTerminatedAgenda } from "../organisms/AdminTerminatedAgenda";
import { Box, Card } from "../atoms";
import { AgendaTag } from "./AgendaTag";
import { AgendaFoldedText } from "./AgendaFoldedText";
import { AdminAgenda } from "biseo-interface/admin/agenda";

const _tags = {
  public: false,
  identified: false,
  votable: false,
};

interface Props {
  agenda: AdminAgenda;
}

export const AdminTerminatedAgendaCard: React.FC<Props> = ({ agenda }) => {
  return (
    <Card
      primary={false}
      clickable
      onClick={e => {
        /* use navigate? */
      }}
      round={5}
    >
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
