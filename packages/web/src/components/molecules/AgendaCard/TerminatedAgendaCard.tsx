import React, { useState, useMemo, useCallback, useRef } from "react";

import type { TerminatedAgenda } from "@biseo/interface/agenda";

import { Card, Divider } from "@biseo/web/components/atoms";
import { AgendaTag } from "@biseo/web/components/molecules/AgendaTag";
import { OptionVoteResult } from "@biseo/web/components/molecules/OptionVoteResult";
import { VoteResult } from "@biseo/web/components/molecules/VoteResult";
import { VoteDetail } from "@biseo/web/components/molecules/VoteDetail";
import { VotedMembers } from "@biseo/web/components/molecules/VotedMembers";
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

interface Props {
  agenda: TerminatedAgenda;
}

type Voter = {
  displayName: string;
  choiceId: number;
};

export const TerminatedAgendaCard: React.FC<Props> = ({ agenda }) => {
  const [enabled, setEnabled] = useState<boolean>(false);
  const isDragging = useRef<boolean>(false);
  const [revealChoice, setRevealChoice] = useState<boolean>(false);
  const [detectDrag, setDetectDrag] = useState<NodeJS.Timeout>();

  const switchRevealChoice = (prev: boolean) => {
    setRevealChoice(!prev);
  };
  const totalCount: number = useMemo(
    () => agenda.choices.reduce((acc, c) => acc + c.count, 0),
    [agenda.choices],
  );
  const checkDrag = useCallback(() => {
    if (!isDragging.current) {
      setEnabled(value => !value);
      clearTimeout(detectDrag);
    }
    window.removeEventListener("mouseup", checkDrag);
  }, []);

  const optionVoteResult = useCallback(() => {
    if (agenda.type.public) {
      return agenda.choices.map(choice => (
        <OptionVoteResult
          ispublic={agenda.type.public}
          name={choice.name}
          count={choice.count}
          totalCount={totalCount}
          userChoice={revealChoice && agenda.user.voted === choice.id}
        />
      ));
    }
    let currmax = 0;
    return agenda.choices.map(choice => {
      const ismax = choice.count >= currmax;
      currmax = ismax ? choice.count : currmax;
      return (
        <OptionVoteResult
          ispublic={agenda.type.public}
          name={choice.name}
          count={ismax ? 1 : 0}
          totalCount={1}
          userChoice={revealChoice && agenda.user.voted === choice.id}
        />
      );
    });
  }, [revealChoice]);

  return (
    <Card
      bold={enabled}
      clickable
      onMouseDown={e => {
        isDragging.current = false;
        window.addEventListener("mouseup", checkDrag);
        setDetectDrag(
          setTimeout(() => {
            isDragging.current = true;
          }, 200),
        );
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
            type={agenda.type.public}
            clickHandler={switchRevealChoice}
            buttonClick={() => {
              isDragging.current = true;
            }}
            revealChoice={revealChoice}
            voted={agenda.user.voted != null}
          />
          <div css={[column, gap(12), w("fill")]}>{optionVoteResult()}</div>
          <Divider />
          <VoteDetail named={agenda.type.named} />
          {agenda.type.named ? (
            <div css={[column, gap(6), w("fill")]}>
              {agenda.choices.map(choice => (
                <VotedMembers
                  userList={(agenda.voters.voted as Array<Voter>)
                    .filter(voter => {
                      if (choice.id === voter.choiceId) {
                        return true;
                      }
                      return false;
                    })
                    .map(voter => voter.displayName)}
                  name={choice.name}
                />
              ))}
            </div>
          ) : null}
        </div>
      ) : (
        <div css={[column, gap(8), w("fill")]}>
          <div css={[row, justify.between, align.center]}>
            <AgendaTag
              tags={{
                public: agenda.type.public,
                identified: agenda.type.named,
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
