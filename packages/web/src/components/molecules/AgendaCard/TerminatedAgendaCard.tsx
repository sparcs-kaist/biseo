import React, { useState, useMemo } from "react";

import type { TerminatedAgenda } from "@biseo/interface/agenda";

import { Card, Divider } from "@biseo/web/components/atoms";
import { AgendaTag } from "@biseo/web/components/molecules/AgendaTag";
import { OptionVoteResult } from "@biseo/web/components/molecules/OptionVoteResult";
import { VoteResult } from "@biseo/web/components/molecules/VoteResult";
import { VoteDetail } from "@biseo/web/components/molecules/VoteDetail";
import { VoteParticipate } from "@biseo/web/components/molecules/VoteParticipate";
import {
  align,
  center,
  column,
  gap,
  justify,
  row,
  text,
  w,
} from "@biseo/web/styles";
import {
  formatDate,
  formatDateSimple,
  formatTime,
} from "@biseo/web/utils/format";

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
        <div css={[column, gap(15), w("fill")]}>
          <div css={[column, gap(2)]}>
            <h1 css={[text.title2, text.black]}>{agenda.title}</h1>
            <p css={[text.subtitle, text.gray500]}>{agenda.content}</p>
          </div>
          <div>
            <p css={[text.body, text.blue600]}>{agenda.resolution}</p>
          </div>
          <Divider />
          <div css={[row, center, justify.between, text.subtitle, text.black]}>
            <span>투표 일시</span>
            <span css={[row, gap(4)]}>
              <span>{formatDate(agenda.endAt)}</span>
              <span>{formatTime(agenda.endAt)}</span>
            </span>
          </div>
          <VoteParticipate
            named={agenda.type.named}
            voted={agenda.voters.voted}
            total={agenda.voters.total}
          />
          <VoteResult
            type={agendaTags.public}
            clickHandler={switchRevealChoice}
            revealChoice={revealChoice}
            voted={agenda.user.voted != null}
          />
          <div css={[column, gap(12), w("fill")]}>
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
          <VoteDetail named={agenda.type.named} />
        </div>
      ) : (
        <div css={[column, gap(8), w("fill")]}>
          <div css={[row, justify.between, align.center]}>
            <AgendaTag
              tags={{
                public: agendaTags.public,
                identified: agendaTags.identified,
                votable: agenda.user.votable,
              }}
            />
            <p css={[text.subtitle, text.gray400]}>
              {formatDateSimple(agenda.endAt)}
            </p>
          </div>

          <div css={[column, gap(2)]}>
            <h1 css={[text.title2, text.black]}>{agenda.title}</h1>
            <p css={[text.subtitle, text.gray500]}>{agenda.content}</p>
          </div>
        </div>
      )}
    </Card>
  );
};
