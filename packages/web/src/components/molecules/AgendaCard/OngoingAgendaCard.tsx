import React, { useState, useCallback, useMemo } from "react";

import type { OngoingAgenda } from "@biseo/interface/agenda";

import { Card, Button } from "@biseo/web/components/atoms";
import { AgendaTag } from "@biseo/web/components/molecules/AgendaTag";
import {
  ChoiceComponent,
  CompletedChoice,
  NotVotableChoice,
} from "@biseo/web/components/molecules/Choice";

import { useAgenda } from "@biseo/web/services/agenda";

import { gap, row, justify, text, w, column } from "@biseo/web/styles";

interface OngoingAgendaProps {
  agenda: OngoingAgenda;
}

const agendaTags = {
  public: true,
  identified: false,
  votable: true,
};

export const OngoingAgendaCard: React.FC<OngoingAgendaProps> = ({ agenda }) => {
  const [chosenChoiceId, setChosenChoiceId] = useState(0);
  const { voteAgenda } = useAgenda(state => ({
    voteAgenda: state.voteAgenda,
  }));

  const vote = useCallback(() => {
    voteAgenda(chosenChoiceId, agenda.id);
  }, [chosenChoiceId]);

  const chosen = useMemo(() => chosenChoiceId !== 0, [chosenChoiceId]);

  const choose = useCallback(
    (choiceId: number) => {
      if (choiceId === chosenChoiceId) {
        setChosenChoiceId(0);
      } else {
        setChosenChoiceId(choiceId);
      }
    },
    [chosenChoiceId],
  );

  let choices: JSX.Element | JSX.Element[] = <NotVotableChoice />;
  if (agenda.user.votable) {
    if (agenda.user.voted) {
      choices = (
        <CompletedChoice
          choice={agenda.choices.find(
            choice => choice.id === agenda.user.voted,
          )}
        />
      );
    } else {
      choices = agenda.choices.map(choice => (
        <ChoiceComponent
          key={choice.id}
          choice={choice}
          chosen={choice.id === chosenChoiceId}
          onClick={() => choose(choice.id)}
        />
      ));
    }
  }

  return (
    <Card primary bold={agenda.user.votable && !agenda.user.voted}>
      <div css={[column, gap(10)]}>
        <div css={[column, gap(8)]}>
          <AgendaTag
            tags={{
              public: agendaTags.public,
              identified: agendaTags.identified,
              votable: agenda.user.votable,
            }}
          />
          <div css={[column, gap(2)]}>
            <h1 css={[text.title2, text.black]}>{agenda.title}</h1>
            <p css={[text.subtitle, text.gray500]}>{agenda.content}</p>
          </div>
        </div>
        <div css={[column, gap(6)]}>
          <p css={[text.body, text.blue600]}>{agenda.resolution}</p>
          {choices}
        </div>
        {agenda.user.votable && !agenda.user.voted && (
          <div css={[row, justify.end, w("fill")]}>
            <Button w={90} disabled={!chosen} onClick={() => vote()}>
              <p css={[text.option1, chosen ? text.blue600 : text.blue300]}>
                투표하기
              </p>
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};
