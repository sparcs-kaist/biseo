import React, { useState, useCallback } from "react";
import { Box, Card, Text, Button } from "@/components/atoms";
import type { OngoingAgenda } from "@biseo/interface/agenda";
import {
  AgendaTag,
  ChoiceComponent,
  CompletedChoice,
  NotVotableChoice,
} from "@/components/molecules";
import { useAgenda } from "@/services/agenda";

interface OngoingAgendaProps {
  agenda: OngoingAgenda;
}

const _tags = {
  public: false,
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

  const chosen = chosenChoiceId !== 0;

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

  const choices = agenda.user.votable ? (
    agenda.user.voted ? (
      <CompletedChoice
        choice={agenda.choices.find(choice => choice.id === agenda.user.voted)}
      />
    ) : (
      agenda.choices.map(choice => (
        <ChoiceComponent
          key={choice.id}
          choice={choice}
          chosen={choice.id == chosenChoiceId}
          onClick={() => choose(choice.id)}
        ></ChoiceComponent>
      ))
    )
  ) : (
    <NotVotableChoice />
  );

  return (
    <Card primary bold>
      <Box gap={10}>
        <Box gap={8}>
          <AgendaTag
            tags={{
              public: _tags.public,
              identified: _tags.identified,
              votable: agenda.user.votable,
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
        <Box gap={6}>
          <Text variant="body" color="blue600">
            {agenda.resolution}
          </Text>
          {choices}
        </Box>
        <Box dir="row" justify="end" w="fill">
          <Button w={90} disabled={!chosen} onClick={() => vote()}>
            <Text variant="option1" color={chosen ? "blue600" : "blue300"}>
              투표하기
            </Text>
          </Button>
        </Box>
      </Box>
    </Card>
  );
};
