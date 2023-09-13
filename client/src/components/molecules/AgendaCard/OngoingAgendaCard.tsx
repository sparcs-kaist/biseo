import React, { useState, useCallback, useMemo } from "react";

import type { OngoingAgenda } from "@biseo/interface/agenda";

import { Box, Card, Button } from "@/components/atoms";
import { AgendaTag } from "@/components/molecules/AgendaTag";
import {
  ChoiceComponent,
  CompletedChoice,
  NotVotableChoice,
} from "@/components/molecules/Choice";

import { useAgenda } from "@/services/agenda";

import { row, justify, text, w } from "@/styles";

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
    <Card primary bold>
      <Box gap={10} w="fill">
        <Box css={{ gap: 8 }}>
          <AgendaTag
            tags={{
              public: agendaTags.public,
              identified: agendaTags.identified,
              votable: agenda.user.votable,
            }}
          />
          <div css={{ gap: 2 }}>
            <h1 css={[text.title2, text.black]}>{agenda.title}</h1>
            <p css={[text.subtitle, text.gray500]}>{agenda.content}</p>
          </div>
        </Box>
        <Box css={{ gap: 6 }}>
          <p css={[text.body, text.blue600]}>{agenda.resolution}</p>
          {choices}
        </Box>
        {agenda.user.votable && !agenda.user.voted && (
          <Box css={[row, justify.end, w("fill")]}>
            <Button w={90} disabled={!chosen} onClick={() => vote()}>
              <p css={[text.option1, chosen ? text.blue600 : text.blue300]}>
                투표하기
              </p>
            </Button>
          </Box>
        )}
      </Box>
    </Card>
  );
};
