import React, { useState, useMemo } from "react";

import type { TerminatedAgenda } from "@biseo/interface/agenda";

import { Card, Divider } from "@/components/atoms";
import { AgendaTag } from "@/components/molecules/AgendaTag";
import { OptionVoteResult } from "@/components/molecules/OptionVoteResult";
import { VoteResult } from "@/components/molecules/VoteResult";
import { VoteDetail } from "@/components/molecules/VoteDetail";
import { VoteParticipate } from "@/components/molecules/VoteParticipate";

import { column, gap, text, w } from "@/styles";

const agendaTags = {
  public: true,
  identified: false,
  votable: true,
};

interface Props {
  agenda: TerminatedAgenda;
}

export const TerminatedAgendaCard: React.FC<Props> = ({ agenda }) => {
  const [enabled, setEnabled] = useState<boolean>(false);
  const [revealChoice, setRevealChoice] = useState<boolean>(false);
  const switchRevealChoice = (prev: boolean) => {
    setRevealChoice(!prev);
  };
  const totalCount: number = useMemo(
    () => agenda.choices.reduce((acc, c) => acc + c.count, 0),
    [agenda.choices],
  );
  return (
    <Card
      bold={enabled}
      clickable
      onClick={e => {
        setEnabled(value => !value);
        e.stopPropagation();
      }}
    >
      {enabled ? (
        <div css={[gap(15), w("fill"), column]}>
          <div css={[gap(2), column]}>
            <h1 css={[text.title2, text.black]}>{agenda.title}</h1>
            <p css={[text.subtitle, text.gray500]}>{agenda.content}</p>
          </div>
          <div>
            <p css={[text.body, text.blue600]}>{agenda.resolution}</p>
          </div>
          <Divider />
          <VoteParticipate
            voted={agenda.voters.voted}
            total={agenda.voters.total}
          />
          <VoteResult
            type={agendaTags.public}
            clickHandler={switchRevealChoice}
            revealChoice={revealChoice}
            voted={agenda.user.voted != null}
          />
          <div css={[gap(12), w("fill")]}>
            {agenda.choices.map(choice => (
              <OptionVoteResult
                name={choice.name}
                count={choice.count}
                totalCount={totalCount}
                userChoice={revealChoice && agenda.user.voted === choice.id}
              />
            ))}
          </div>
          <Divider />
          <VoteDetail type={agendaTags.identified} />
        </div>
      ) : (
        <div css={[gap(8), column, w("fill")]}>
          <AgendaTag
            tags={{
              public: agendaTags.public,
              identified: agendaTags.identified,
              votable: agenda.user.votable,
            }}
          />
          <div css={[gap(2)]}>
            <h1 css={[text.title2, text.black]}>{agenda.title}</h1>
            <p css={[text.subtitle, text.gray500]}>{agenda.content}</p>
          </div>
        </div>
      )}
    </Card>
  );
};
